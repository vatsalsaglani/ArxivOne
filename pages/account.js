import { useEffect, useState, useContext } from "react";
import Head from "next/head";
import Link from "next/link";

import { useSession, signIn } from "next-auth/react";

import { useRouter } from "next/router";

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

  const sendReq = async () => {
    let r = await fetch("/api/addPost");
    console.log(r);
  };

  if (session && authStatus === "authenticated") {
    return (
      <div>
        <Head>
          <title>Account | ArixvOne</title>
        </Head>
        <div className="mx-auto px-4 py-6">Hello</div>
        <div>
          <button
            onClick={() => {
              sendReq();
            }}
          >
            SEND
          </button>
        </div>
      </div>
    );
  } else if (authStatus === "loading") {
    return <div>LOADING...</div>;
  } else {
    return <div></div>;
  }
}
