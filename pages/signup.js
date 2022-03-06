import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

import Head from "next/head";
import { useRouter } from "next/router";
import Link from "next/link";

import NavigationComponent from "../components/Navigation";
import SignUpComponent from "../components/SignUp";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SignUp() {
  const { data: session } = useSession();
  const router = useRouter();
  if (session) {
    router.push("/dashboard");
  }

  if (session) {
    return <div></div>;
  }

  return (
    <div>
      <Head>
        <title>Sign Up | ArxivOne</title>
      </Head>
      <ToastContainer />
      <div className="w-full">
        <NavigationComponent options={["features", "signin"]} />
      </div>
      <div className="text-Work container mx-auto sm:px-6 lg:px-8 ">
        <SignUpComponent />
      </div>
    </div>
  );
}
