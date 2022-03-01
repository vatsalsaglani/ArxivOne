import { useContext, useState, useEffect } from "react";

import Head from "next/head";
import Image from "next/image";

import { Tab } from "@headlessui/react";
import { getProviders, signIn, getSession, useSession } from "next-auth/react";

// components
import SignInComponent from "../components/SignIn";
import SignUpComponent from "../components/SignUp";
import GlobalContext from "../contexts/global";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Home() {
  // console.log(providers);
  const { user } = useContext(GlobalContext);
  console.log("USER: ", user);
  const { data: session } = useSession();
  console.log("SESS: ", session);
  return (
    <div
      className={
        "container mx-auto min-w-full min-h-screen bg-gradient-to-r from-cyan-500 to-blue-500 p-4 flex flex-col items-center justify-center"
      }
    >
      <div className="w-full max-w-md px-2 py-16 sm:px-0">
        <Tab.Group>
          <Tab.List className={"flex p-1 space-x-1 bg-blue-900/20 rounded-xl"}>
            <Tab
              className={({ selected }) =>
                classNames(
                  "w-full py-2.5 text-sm leading-5 font-medium text-blue-700 rounded-lg",
                  "focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60",
                  selected
                    ? "bg-white shadow"
                    : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
                )
              }
            >
              Sign In
            </Tab>
            <Tab
              className={({ selected }) =>
                classNames(
                  "w-full py-2.5 text-sm leading-5 font-medium text-blue-700 rounded-lg",
                  "focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60",
                  selected
                    ? "bg-white shadow"
                    : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
                )
              }
            >
              Sign Up
            </Tab>
          </Tab.List>
          <Tab.Panels className={"mt-2"}>
            <Tab.Panel
              className={classNames(
                "bg-white rounded-xl p-3",
                "focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60"
              )}
            >
              <SignInComponent />
            </Tab.Panel>
            <Tab.Panel
              className={classNames(
                "bg-white rounded-xl p-3",
                "focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60"
              )}
            >
              <SignUpComponent />
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
}
