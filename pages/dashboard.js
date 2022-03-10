import { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

import SideBar from "../components/Sidebar";

export default function Dashboard() {
  const { data: session, status: authStatus } = useSession();
  const router = useRouter();

  // console.log("USER SESSION: ", session);
  // TODO: gets user email
  // console.log(session.user.email);

  useEffect(() => {
    if (authStatus === "unauthenticated") {
      router.push("/signin");
    }
  }, [authStatus]);
  if (authStatus === "unauthenticated") {
    return <div></div>;
  } else if (authStatus === "loading") {
    return <div>Loading...</div>;
  }
  return (
    <div className="">
      {/* <div className=""> */}
      <SideBar />
      {/* </div> */}
      <div className="absolute mx-auto h-screen w-full bg-gray-900 px-5 py-6 font-Work text-black sm:left-16 sm:right-0 sm:max-w-[80vw] lg:right-0 lg:left-48 lg:py-10  lg:px-10">
        DASHBOARD
      </div>
    </div>
  );
}
