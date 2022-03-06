import { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
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
    <div className="container mx-auto bg-slate-200 px-10  py-8 ">
      <h2>Dashboard</h2>
      {/* <h3>{session.user.email}</h3> */}
      {/* <Link href="/account"></Link> */}
    </div>
  );
}
