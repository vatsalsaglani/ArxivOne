import { useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";

export default function Home() {
  const { data: session } = useSession();
  console.dir(session, { depth: 0 });
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      router.push("/");
    }
  }, []);
  if (session) {
    return (
      <div
        className={
          "container mx-auto min-w-full min-h-screen bg-gradient-to-r from-cyan-500 to-blue-500 p-4 flex flex-col items-center justify-center"
        }
      ></div>
    );
  } else {
    return <div></div>;
  }
}
