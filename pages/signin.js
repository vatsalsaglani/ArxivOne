import { useEffect, useState } from "react";

import Head from "next/head";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";

// components
import SignInComponent from "../components/SignIn";
import NavigationComponent from "../components/Navigation";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Account() {
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
        <title>Sign in | ArxivOne</title>
      </Head>
      <ToastContainer />
      <div className="w-full">
        <NavigationComponent />
      </div>

      <div className="text-Work container mx-auto sm:px-6 lg:px-8">
        <SignInComponent />
      </div>
    </div>
  );
}
