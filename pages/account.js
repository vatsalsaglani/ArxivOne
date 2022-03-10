import { useEffect, useState, useContext } from "react";
import Head from "next/head";
import Link from "next/link";

import { useSession, signIn } from "next-auth/react";

import { useRouter } from "next/router";

// components

import SideBar from "../components/Sidebar";

export default function Account() {
  // console.log("ACCOUNT ACCOUNT");
  const { data: session, status: authStatus } = useSession();
  const router = useRouter();
  console.log("STATUS: ", authStatus);
  console.log("SESSION: ", session);

  useEffect(() => {
    if (authStatus && !["authenticated", "loading"].includes(authStatus)) {
      console.log("NOT SESSION, ", session);
      console.log("PUSHING TO SIGNING");
      router.push("/signin");
    }
  }, [authStatus]);

  if (session && authStatus === "authenticated") {
    return (
      <div className="">
        <Head>
          <title>Account | ArxivOne</title>
        </Head>
        {/* <div className=""> */}
        <SideBar selected={"ACCOUNT"} />
        {/* </div> */}
        <div className="absolute mx-auto h-screen w-full bg-gray-900 px-5 py-6 text-black sm:left-16 sm:right-0 sm:max-w-[80vw] lg:right-0 lg:left-48 lg:py-10 lg:px-10"></div>
      </div>
    );
  } else if (authStatus === "loading") {
    return <div>LOADING...</div>;
  } else {
    return <div></div>;
  }
}
