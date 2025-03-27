import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/prisma";
import bcrypt from 'bcryptjs';

export const options ={

    adapter: PrismaAdapter(prisma),

    providers: [
      CredentialsProvider({
        type: 'credentials',
        
        credentials: {
          email: { label: "Email", type: "email", placeholder: "example@gmail.com" },
          password: { label: "Password", type: "password" }
        },
        async authorize(credentials, req) {
          const {email, password }:any = credentials;
          const user = await prisma.user.findUnique({
            where:{
              email
            }
          });
          const hashedPassword = user.password;
          const passwordMatch = await bcrypt.compare(password, hashedPassword)

          if(passwordMatch){
            return user;
          }else{
            return null;
          }
        }
      }),
      

        GoogleProvider({
          clientId: process.env.GOOGLE_CLIENT_ID!,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_ID!,
            clientSecret: process.env.GITHUB_SECRET!
        }),
        
      ],
      session :{
        strategy: "jwt",
      },
      pages: {
        signIn: "Login",
      }
};