import { useContext, useState, useEffect } from "react";

import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

import { Tab } from "@headlessui/react";
import { getProviders, signIn, getSession, useSession } from "next-auth/react";

import { useRouter } from "next/router";

// components
import SignInComponent from "../components/SignIn";
import SignUpComponent from "../components/SignUp";
import GlobalContext from "../contexts/global";
import NavigationComponent from "../components/Navigation";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Home() {
  const { data: session } = useSession();

  const router = useRouter();
  if (session) {
    router.push("/dashboard");
  }

  if (session) {
    return <div></div>;
  }
  return (
    <div className="block mb-10 ">
      <div className="w-full">
        <NavigationComponent />
      </div>
      <div
        className={
          "container mx-auto min-w-full min-h-screen p-4 flex flex-col items-center justify-center"
        }
      >
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl font-extrabold text-transparent sm:text-5xl bg-clip-text bg-gradient-to-r from-green-300 via-blue-500 to-purple-600">
            Save and Explore
            <span className="sm:block">new Research Papers.</span>
          </h1>
          <p className="max-w-xl mx-auto mt-4 sm:leading-relaxed sm:text-xl">
            Organize and follow new research papers in your domain with the
            power of AI
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <Link href="/account">
              <a
                className="block w-full px-12 py-3 text-sm font-medium text-white bg-blue-600 border border-blue-600 rounded sm:w-auto active:text-opacity-75 hover:bg-transparent hover:text-white focus:outline-none focus:ring"
                // href="/get-started"
              >
                Get Started
              </a>
            </Link>

            <a
              className="block w-full px-12 py-3 text-sm font-medium text-black hover:text-white border-blue-600 rounded sm:w-auto hover:bg-blue-600 active:bg-blue-500 focus:outline-none focus:ring"
              // href="/about"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
