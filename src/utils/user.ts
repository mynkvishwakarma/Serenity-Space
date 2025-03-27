import prisma from "@/lib/prisma";
import { v4 as uuidv4 } from 'uuid';

export async function createUserWithAccount({ name, email, password }: { name: string, email: string, password: string }) {
  try {
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password,
        accounts: {
          create: {
            type: "credentials",
            provider: "email",
            providerAccountId: uuidv4(),
          }
        }
      },
      include: {
        accounts: true,
      }
    });
    return newUser;
  } catch (error) {
    console.error("Error creating user with account:", error);
    throw new Error("Could not create user with account");
  }
}

export async function getUserByEmail(email){
    try {
        const user = await prisma.user.findUnique({
            where:{
                email,
            },
        });
        return user;
        
    } catch (error) {
        console.log("Error getting user by email: ",error);
        throw error;
    }
}