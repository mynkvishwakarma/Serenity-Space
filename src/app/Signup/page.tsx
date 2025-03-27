"use client";

import { Spotlight } from "@/components/ui/Spotlight";
import { useState } from "react";
import axios from 'axios';
import { useRouter } from "next/navigation";
import { signIn, useSession } from 'next-auth/react';

export default function CreateAccount() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const { status } = useSession();

  if (status === 'authenticated') {
    router.push('/');
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/users', {
        name,
        email,
        password,
      });
      router.push("/Login");
    } catch (error: any) {
      if (error.response && error.response.status === 400) {
        setError("Email already exists.");
      } else {
        setError("An error occurred.");
      }
    }
  }

  return (
  
    <div className="min-h-screen border-white bg-black text-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 ">
<Spotlight
         className="-top-40 left-0 md:left-60 md:-top-20"
       fill="white"
    ></Spotlight>
    <div className="max-w-md w-72 space-y-8">
      <div>
        <h2 className="mt-16 text-center text-2xl font-extrabold ">
          Sign Up to your account
        </h2>
        <p className="text-center text-red-600">{error}</p>
      </div>
      <form className="mt-8 space-y-6" action="#" method="POST" onSubmit={handleSubmit}>
        <input type="hidden" name="remember" value="true" />
        <div className="rounded-md shadow-sm -space-y-px">
        <div className="p-1">
            <label htmlFor="email-address" className="sr-only">
              Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="email"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-white placeholder-white text-white rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm bg-transparent "
              placeholder="Name"
            />
          </div>
          <div className="p-1">
            <label htmlFor="email-address" className="sr-only">
              Email address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-white placeholder-white rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm bg-transparent"
              placeholder="Email address"
            />
          </div>
          <div className="p-1">
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-white placeholder-white text-whiterounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm bg-transparent"
              placeholder="Password"
            />
          </div>
        </div>
        <div>
          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Sign Up
          </button>
        </div>
        <p className="text-center">have you an account ? <a href="/Login">Log In</a></p>
      </form>
      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or continue with</span>
          </div>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-3">
            <div>
              <button
              onClick={() => signIn("google")}
              className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                <span className="sr-only">Sign in with Google</span>
                <img src="https://w7.pngwing.com/pngs/344/344/png-transparent-google-logo-google-logo-g-suite-google-text-logo-symbol-thumbnail.png" alt="Google" className="h-5 w-5" />
              </button>
            </div>
           
            <div>
              <button
                onClick={() => signIn("github")}
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                <span className="sr-only">Sign in with GitHub</span>
                <img src="https://w7.pngwing.com/pngs/828/816/png-transparent-github-computer-icons-gitlab-github-white-cat-like-mammal-carnivoran-thumbnail.png" alt="GitHub" className="h-5 w-5" />
              </button>
            </div>
          </div>
      </div>
    </div>
  </div>
  );
}
