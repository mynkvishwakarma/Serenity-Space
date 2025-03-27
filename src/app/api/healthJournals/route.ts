import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "POST") {
    const {
      userId,
      physicalHealthFeelings,
      physicalHealthRoutine,
      mentalHealthFeelings,
      mentalHealthTriggers,
      mentalHealthSolutions,
    } = req.body;

    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    try {
      const newHealthBlog = await prisma.healthBlog.create({
        data: {
          userId,
          physicalHealthFeelings,
          physicalHealthRoutine,
          mentalHealthFeelings,
          mentalHealthTriggers,
          mentalHealthSolutions,
        },
      });

      return res.status(201).json(newHealthBlog);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Something went wrong" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
