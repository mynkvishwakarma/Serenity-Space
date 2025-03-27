// components/CreateBlogPost.tsx
"use client";

import { Spotlight } from "@/components/ui/Spotlight";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function CreateBlogPost() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await axios.post("/api/blogs", {
        name,
        description,
      });
      router.push("/");
    } catch (error: any) {
      if (error.response && error.response.status === 400) {
        setError("A blog with this name already exists.");
      } else {
        setError("An error occurred.");
      }
    }
  };

  return (
    <div className="min-h-screen border-white bg-black text-white flex justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="white"></Spotlight>
      <div className="w-4/5 space-y-8">
        <div>
          <h2 className="mt-16 text-center text-2xl font-extrabold">Create a New Blog Post</h2>
          <p className="text-center text-red-600">{error}</p>
        </div>
        <form className="mt-10 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="p-1">
              <label htmlFor="name" className="sr-only">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-white placeholder-white text-white rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm bg-transparent"
                placeholder="Blog Title"
              />
            </div>
            <div className="p-1">
              <label htmlFor="description" className="sr-only">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                className="appearance-none rounded-none relative block w-full h-60 px-3 py-2 border border-white placeholder-white rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm bg-transparent"
                placeholder="Write Your Blog Content Here..."
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Submit Blog Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
