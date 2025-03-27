"use client";

import { Spotlight } from "@/components/ui/Spotlight";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function CreateBlogPost() {
  const [userId, setUserId] = useState(""); // Assuming userId will be provided or fetched from session
  const [physicalHealthFeelings, setPhysicalHealthFeelings] = useState("");
  const [physicalHealthRoutine, setPhysicalHealthRoutine] = useState("");
  const [mentalHealthFeelings, setMentalHealthFeelings] = useState("");
  const [mentalHealthTriggers, setMentalHealthTriggers] = useState("");
  const [mentalHealthSolutions, setMentalHealthSolutions] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post("/api/healthJournals", {
        userId,
        physicalHealthFeelings,
        physicalHealthRoutine,
        mentalHealthFeelings,
        mentalHealthTriggers,
        mentalHealthSolutions,
      });
  
      console.log(response.data);
      router.push("/"); // Redirect on success
    } catch (error) {
      setError(
        error.response?.data?.error || "An unexpected error occurred."
      );
    }
  };
  

  return (
    <div className="min-h-screen border-white bg-black text-white flex justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="white"></Spotlight>
      <div className="w-4/5 space-y-8">
        <div>
          <p className="text-center text-red-600">{error}</p>
        </div>
        <form className="mt-10 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <h2 className="mt-16 text-2xl font-extrabold">Physical Health:</h2>

            <div className="p-1">
              <h5 className="p-2">1. How do I feel physically today?</h5>
              <textarea
                value={physicalHealthFeelings}
                onChange={(e) => setPhysicalHealthFeelings(e.target.value)}
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-white placeholder-white rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm bg-transparent"
                placeholder="Answer..."
              />
            </div>
            <div className="p-1">
              <h5 className="p-2">2. What is my current exercise routine?</h5>
              <textarea
                value={physicalHealthRoutine}
                onChange={(e) => setPhysicalHealthRoutine(e.target.value)}
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-white placeholder-white rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm bg-transparent"
                placeholder="Answer..."
              />
            </div>

            <h2 className="mt-24 text-2xl font-extrabold">Mental Health:</h2>
            <div className="p-1">
              <h5 className="p-2">1. How do I feel today?</h5>
              <textarea
                value={mentalHealthFeelings}
                onChange={(e) => setMentalHealthFeelings(e.target.value)}
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-white placeholder-white rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm bg-transparent"
                placeholder="Answer..."
              />
            </div>
            <div className="p-1">
              <h5 className="p-2">2. What happened that I feel this way?</h5>
              <textarea
                value={mentalHealthTriggers}
                onChange={(e) => setMentalHealthTriggers(e.target.value)}
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-white placeholder-white rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm bg-transparent"
                placeholder="Answer..."
              />
            </div>
            <div className="p-1">
              <h5 className="p-2">3. What can I do to feel better?</h5>
              <textarea
                value={mentalHealthSolutions}
                onChange={(e) => setMentalHealthSolutions(e.target.value)}
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-white placeholder-white rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm bg-transparent"
                placeholder="Answer..."
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
