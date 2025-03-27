"use client";

import { InfiniteMovingCards } from "./ui/infinite-moving-cards";


function MovingCard() {
    const testimonials = [
        {
          quote: "Serenity has transformed my daily routines and brought a sense of peace I never thought possible.",
          name: "Alice Johnson",
          title: "Yoga Instructor"
        },
        {
          quote: "I've been able to find balance and mindfulness through Serenity's guidance. Highly recommend!",
          name: "David Lee",
          title: "Mindfulness Coach"
        },
        {
          quote: "Serenity's techniques are life-changing. I feel calmer and more focused each day.",
          name: "Maria Gonzalez",
          title: "Health & Wellness Blogger"
        },
        {
          quote: "This app has brought tranquility into my hectic schedule, helping me recharge and refocus.",
          name: "Samuel Thompson",
          title: "Corporate Executive"
        },
        {
          quote: "As a therapist, I recommend Serenity to clients for finding calm and inner peace.",
          name: "Linda Chang",
          title: "Licensed Therapist"
        },
        {
          quote: "Serenity has been a game changer in my self-care journey, offering practical and easy-to-use techniques.",
          name: "Chris Patel",
          title: "Freelance Writer"
        },
        {
          quote: "Serenity offers a refreshing approach to mindfulness that keeps me grounded in my everyday life.",
          name: "Tina Martinez",
          title: "Personal Trainer"
        },
        {
          quote: "A must-have app for anyone looking to bring mindfulness and relaxation into their routine.",
          name: "Ryan Douglas",
          title: "Life Coach"
        }
      ];
      
  return (
    <div className="mt-20 h-screen ">
        <div className="justify-center ">
            <h2 className=" text-center md:mt-0 text-2xl md:text-3xl font-bold bg-clip-text  bg-gradient-to-b from-natual-50 to-natual-400">Information about Serenity Space</h2>

            <div className="mt-10">
            <InfiniteMovingCards
            items={testimonials}
            direction="right"
            speed="slow"
            />
            </div>  
        </div>
    </div>
  )
}

export default MovingCard