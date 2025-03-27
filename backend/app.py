from flask import Flask, request, jsonify
import nltk
import json
import torch
import numpy as np
from nltk.stem.porter import PorterStemmer
import random
from torch.utils.data import Dataset, DataLoader
import torch.nn as nn
import os
from flask_cors import CORS

# Initialize Flask app
app = Flask(__name__)

# Enable CORS to handle requests from different origins (Frontend and Backend)
CORS(app)

# Download necessary NLTK packages
nltk.download('punkt')
nltk.download('punkt_tab')

# Tokenizer and Stemmer Functions
def tokenize(sentence):
    return nltk.word_tokenize(sentence)

stemmer = PorterStemmer()

def stem(word):
    return stemmer.stem(word.lower())

def bag_of_words(tokenized_sentence, all_words):
    tokenized_sentence = [stem(w) for w in tokenized_sentence]
    bag = np.zeros(len(all_words), dtype=np.float32)
    for idx, w in enumerate(all_words):
        if w in tokenized_sentence:
            bag[idx] = 1.0
    return bag

# Load intents and prepare data
with open('C:/Users/HP/OneDrive/Desktop/serenityapp/backend/intents.json', 'r') as f:
    intents = json.load(f)

all_words = []
tags = []
xy = []

for intent in intents['intents']:
    tag = intent['tag']
    tags.append(tag)
    for pattern in intent['patterns']:
        w = tokenize(pattern)
        all_words.extend(w)
        xy.append((w, tag))

ignore_words = ['?', '.', '!']
all_words = [stem(w) for w in all_words if w not in ignore_words]
all_words = sorted(set(all_words))
tags = sorted(set(tags))

X_train = []
Y_train = []
for (pattern_sentence, tag) in xy:
    bag = bag_of_words(pattern_sentence, all_words)
    X_train.append(bag)

    label = tags.index(tag)
    Y_train.append(label)  # CrossEntropyLoss

X_train = np.array(X_train)
Y_train = np.array(Y_train)

# Dataset Class
class ChatDataset(Dataset):
    def __init__(self):
        self.n_samples = len(X_train)
        self.x_data = X_train
        self.y_data = Y_train

    def __getitem__(self, index):
        return self.x_data[index], self.y_data[index]

    def __len__(self):
        return self.n_samples

dataset = ChatDataset()
train_loader = DataLoader(dataset=dataset,
                          batch_size=8,
                          shuffle=True,
                          num_workers=0)

# Neural Network Model Definition
class NeuralNet(nn.Module):
    def __init__(self, input_size, hidden_size, num_classes):
        super(NeuralNet, self).__init__()
        self.l1 = nn.Linear(input_size, hidden_size)
        self.l2 = nn.Linear(hidden_size, hidden_size)
        self.l3 = nn.Linear(hidden_size, num_classes)
        self.relu = nn.ReLU()

    def forward(self, x):
        out = self.l1(x)
        out = self.relu(out)
        out = self.l2(out)
        out = self.relu(out)
        out = self.l3(out)
        return out

# Initialize model
hidden_size = 8
input_size = len(X_train[0])
output_size = len(tags)
num_epochs = 1000
device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')

model = NeuralNet(input_size, hidden_size, output_size).to(device)

# Loss and Optimizer
criterion = nn.CrossEntropyLoss()
optimizer = torch.optim.Adam(model.parameters(), lr=0.001)

# Train the model
def train_model():
    for epoch in range(num_epochs):
        for (words, labels) in train_loader:
            words = words.to(device)
            labels = labels.to(device)
            outputs = model(words)
            loss = criterion(outputs, labels)

            optimizer.zero_grad()
            loss.backward()
            optimizer.step()

        if (epoch + 1) % 100 == 0:
            print(f'Epoch [{epoch + 1}/{num_epochs}], Loss: {loss.item():.4f}')
   
    print(f'Final Loss: {loss.item():.4f}')
    torch.save({
        "model_state": model.state_dict(),
        "input_size": input_size,
        "hidden_size": hidden_size,
        "output_size": output_size,
        "all_words": all_words,
        "tags": tags
    }, "data.pth")
    print("Model trained and saved to 'data.pth'.")

# Train model on first run if model file does not exist
if not os.path.exists("data.pth"):
    print("Training model...")
    train_model()

# Load trained model
data = torch.load("data.pth")

input_size = data["input_size"]
hidden_size = data["hidden_size"]
output_size = data["output_size"]
all_words = data['all_words']
tags = data['tags']
model_state = data["model_state"]

model = NeuralNet(input_size, hidden_size, output_size).to(device)
model.load_state_dict(model_state)
model.eval()

# Prediction function
def predict_class(sentence):
    sentence = tokenize(sentence)
    x = bag_of_words(sentence, all_words)
    x = x.reshape(1, x.shape[0])
    x = torch.from_numpy(x).to(device)

    output = model(x)
    _, predicted = torch.max(output, dim=1)

    tag = tags[predicted.item()]
    probs = torch.softmax(output, dim=1)
    prob = probs[0][predicted.item()]

    return tag, prob

# Flask route to handle user input and return bot response
@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    user_input = data.get('user_input')

    # Debugging: Log user input to see if it's coming correctly
    print(f"Received user input: {user_input}")

    if not user_input:
        return jsonify({"error": "No input provided"}), 400

    tag, prob = predict_class(user_input)

    # Debugging: Log the predicted tag and probability
    print(f"Predicted tag: {tag}, Probability: {prob}")

    if prob.item() > 0.75:
        for intent in intents["intents"]:
            if tag == intent["tag"]:
                response = random.choice(intent['responses'])
                return jsonify({'response': response})
    else:
        return jsonify({'response': "Sorry, I do not understand..."})

if __name__ == '__main__':
    app.run(debug=True)
