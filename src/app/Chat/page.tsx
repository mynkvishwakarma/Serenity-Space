'use client';
import { useState } from "react";
import axios from "axios";
import { Spotlight } from "@/components/ui/Spotlight";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const sendMessage = async () => {
    if (!userInput.trim()) return;

    // Add user message to the chat
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: userInput, sender: "user" },
    ]);
    setIsLoading(true);

    try {
      // Send user input to the Flask backend
      const response = await axios.post("http://127.0.0.1:5000/predict", {
        user_input: userInput,
      }, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Response from Flask:", response.data); // Log to check the response

      // Add bot response to the chat
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: response.data.response, sender: "bot" },
      ]);
    } catch (error) {
      console.error("Error:", error.response ? error.response.data : error.message);
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: "Oops! Something went wrong.", sender: "bot" },
      ]);
    }

    setIsLoading(false);
    setUserInput("");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="white" />
      <div className="chatbox bg-white w-10/12 p-4 rounded-lg shadow-lg">
        <h1 className="text-center font-bold text-2xl">ChatBot</h1>
        <div
          className="messages mb-4 p-2 flex-1 overflow-y-auto"
          style={{
            maxHeight: '400px', // Limit the height to make scrolling visible
          }}
        >
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`message p-3 rounded-lg my-2 w-11/12 ${
                msg.sender === "user"
                  ? "bg-blue-100 self-end text-right mx-auto"  // User's message aligned to the right and centered
                  : "bg-green-100 self-start text-left mx-auto"  // Bot's response aligned to the left and centered
              }`}
            >
              {msg.text}
            </div>
          ))}
          {isLoading && (
            <div className="message bg-gray-100 self-start p-3 text-center text-gray-500">
              Typing...
            </div>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="text"
            className="w-full p-2 border rounded"
            value={userInput}
            onChange={handleInputChange}
            placeholder="Ask me something..."
          />
          <button
            onClick={sendMessage}
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
