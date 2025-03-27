// utils/blogs.ts
import prisma from "@/lib/prisma";

export async function createBlogPost({ name, description }: { name: string; description: string }) {
  try {
    const newBlogPost = await prisma.blog.create({
      data: {
        name,
        description,
      },
    });
    return newBlogPost;
  } catch (error) {
    console.error("Error creating blog post:", error);
    throw new Error("Could not create blog post");
  }
}

export async function getBlogByName(name: string) {
  try {
    const blog = await prisma.blog.findFirst({
      where: {
        name,
      },
    });
    return blog;
  } catch (error) {
    console.error("Error getting blog by name:", error);
    throw new Error("Could not retrieve blog post");
  }
}
