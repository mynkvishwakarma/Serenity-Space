// pages/api/blogs.ts

import { createBlogPost } from "@/utils/blogs";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const POST = async (req) => {
  try {
    const { name, description } = await req.json();

    const newBlog = await createBlogPost({
      name,
      description,
    });
    return NextResponse.json(
      {
        message: "Blog post created successfully.",
        data: newBlog,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Error creating blog post.",
        error: error.message || "An unexpected error occurred",
      },
      { status: 500 }
    );
  }
};

export const GET = async () => {
  try {
    const blogs = await prisma.blog.findMany({
      orderBy: { createdAt: "desc" }, // Sorts by latest blog posts
    });
    return NextResponse.json(blogs, { status: 200 });
  } catch (error) {
    console.error("Error retrieving blogs:", error);
    return NextResponse.json({ message: "Error retrieving blogs" }, { status: 500 });
  }
};
