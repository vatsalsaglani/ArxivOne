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
    <div className="mb-10 block ">
      <div className="w-full">
        <NavigationComponent />
      </div>
      <div
        className={
          "container mx-auto flex min-h-screen min-w-full flex-col items-center justify-center p-4"
        }
      >
        <div className="relative h-full w-full max-w-lg">
          <div className="absolute top-0 -left-5 h-96 w-96 animate-blob rounded-full bg-pink-300 opacity-70 mix-blend-multiply blur-xl filter"></div>
          <div className="animation-delay-2000 absolute top-0 -right-5 h-96 w-96 animate-blob rounded-full bg-yellow-300 opacity-70 mix-blend-multiply blur-xl filter"></div>
          <div className="animation-delay-4000 absolute -bottom-10 left-20 h-96 w-96 animate-blob rounded-full bg-pink-300 opacity-70 mix-blend-multiply blur-xl filter"></div>
          <div className="relative mx-auto max-w-3xl text-center">
            <h1 className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl">
              Save and Explore
              <span className="sm:block">new Research Papers.</span>
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-gray-600 sm:text-xl sm:leading-relaxed">
              Organize and follow new research papers in your domain with the
              power of AI
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link href="/account">
                <a className="block w-full rounded border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-white focus:outline-none focus:ring active:text-opacity-75 sm:w-auto">
                  Get Started
                </a>
              </Link>

              <a className="block w-full rounded border-blue-600 px-12 py-3 text-sm font-medium text-black ring-0 ring-blue-600 hover:bg-blue-600 hover:text-white focus:outline-none focus:ring active:bg-blue-500 sm:w-auto">
                Learn More
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
