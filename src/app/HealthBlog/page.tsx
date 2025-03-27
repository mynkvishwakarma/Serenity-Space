
"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import { Spotlight } from "@/components/ui/Spotlight"
import { BackgroundGradient } from "@/components/ui/background-gradient";

interface Blog {
  id: string;
  name: string;
  description: string;
  createdAt: string;
}



function page() {

  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get("/api/blogs");
        setBlogs(response.data);
      } catch (error) {
        setError("Failed to load blogs");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) return <p className="text-center text-2xl mt-72">Loading...</p>;
  if (error) return <p className="text-center mt-72">{error}</p>;
  return (
    <div className='h-auto md:h-[40rem] w-full rounded-md flex flex-col items-center justify-center relative overflow-hidden mx-auto py-10 md:py-0 min-h-screen bg-black/[0.96] antialiased bg-grid-white/[0.02] text-white '>
        <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />
       <div className="container mx-auto py-8 px-4 w-9/12">
      <h1 className="text-2xl font-bold mb-4">Blog Posts</h1>
      {blogs.length > 0 ? (
        <ul className="space-y-4">
          {blogs.map((blog) => (
           <BackgroundGradient>
           <div key={blog.id} className=" p-4 rounded-md">
             <h2 className="text-xl font-semibold">{blog.name}</h2>
             <p className="text-gray-700 mt-2">{blog.description}</p>
             <p className="text-gray-500 text-sm mt-1">
               Posted on {new Date(blog.createdAt).toLocaleDateString()}
             </p>
           </div>
           </BackgroundGradient>
          ))}
        </ul>
      ) : (
        <p>No blog posts available.</p>
      )}
    </div>   
    </div>
  )
}

export default page