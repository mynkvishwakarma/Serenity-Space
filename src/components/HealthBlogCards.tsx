// components/HealthBlogCards.tsx

"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import { BackgroundGradient } from "./ui/background-gradient";

interface Blog {
  id: string;
  name: string;
  description: string;
  createdAt: string;
}

function HealthBlogCards() {
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

  if (loading) return <p className="text-center text-2xl">Loading...</p>;
  if (error) return <p className="text-center ">{error}</p>;

  return (
    <div className="bg-gray-800 p-4 mt-20 ">
      <div>
        <div className="text-center">
          <h1 className="text-base font-semibold text-teal-600 tracking-wide uppercase">Featured Blog</h1>
          <p className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">Explore with the best</p>
        </div>
      </div>
      <div className="mt-2 ">
      <div className="container mx-auto py-8 px-4 w-9/12">
      <h1 className="text-2xl font-bold mb-4">Blog Posts</h1>
      {blogs.length > 0  ? (
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
      <>
          {blogs.length <= 2 ? (<>
            <p className="text-center">Explore more...</p>
          </>):( <div className="mt-2 text-center">
            <Link
              href={"HealthBlog"}
              className="px-2 py-2 rounded border border-neutral-600 bg-white text-neutral-700 hover:bg-gray-100 transition duration-200"
            >
              View All
            </Link>
          </div>)}
          </>
    </div>
  );
}

export default HealthBlogCards;
