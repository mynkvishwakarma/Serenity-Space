"use client";
import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "./ui/navbar-menu";
import { cn } from "../utils/cn";
import Link from "../../node_modules/next/link";
import { signIn,signOut, useSession } from 'next-auth/react';

export function NavbarDemo() {
    return (
      <div className="relative w-full flex items-center justify-center">
        <Navbar className="top-2" />
        <p className="text-black dark:text-white">
          The Navbar will show on top of the page
        </p>
      </div>
    );
  }
   
export default function Navbar({ className }: { className?: string }) {
    const [active, setActive] = useState<string | null>(null);
    const {data: session, status} = useSession();

    const handleLogout = ()=>{
      signOut();
    }

  return (
    <div  className={cn("fixed top-10 inset-x-0 max-w-2xl mx-auto z-50", className)}>
      <Menu setActive={setActive}>
      <Link href={"/"}>
          <MenuItem setActive={setActive} active={active} item="Home">
          
          </MenuItem>
       </Link>

        <Link href={"/HealthBlog"}>
          <MenuItem setActive={setActive} active={active} item="Health Blogs">
          
          </MenuItem>
       </Link>
       <Link href={"/Chat"}>
          <MenuItem setActive={setActive} active={active} item=" Chat">
          
          </MenuItem>
       </Link>

       {status !== "authenticated" ? (<>
        <MenuItem setActive={setActive} active={active} item="&#9776;">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/Signup">Sign Up</HoveredLink>
            <HoveredLink href="/Login">Log In</HoveredLink>
          </div>
        </MenuItem>
       </>) : (<>

        <MenuItem setActive={setActive} active={active} item="Journal">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/Journal/Health">Health </HoveredLink>
            <HoveredLink href="/Journal/Relationship">Relationship</HoveredLink>
            <HoveredLink href="/Journal/Daily">Daily</HoveredLink>
            <HoveredLink href="/Journal/Custom">Custom</HoveredLink>
          </div>
        </MenuItem>

        <MenuItem setActive={setActive} active={active} item="&#9776;">
          <div className="flex flex-col space-y-4 text-sm">
          <h2 className="text-white m">Welcome, {session.user.name}</h2>
          <h2 className="text-white m">Email: {session.user.email}</h2>
          <button className="text-white" onClick={handleLogout}>Sign Out</button>
          <h2 className="text-white m"></h2>
          </div>
        </MenuItem>

        {session.user.email === "admin@gmail.com" ? (<>
          <Link href={"/Admin"}>
          <MenuItem setActive={setActive} active={active} item="Admin Blogs">
          
          </MenuItem>
       </Link>
        </>):(<></>)}
       </>)}
      </Menu>

      
    </div>
  )
}
