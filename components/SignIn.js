import { useEffect, useState } from "react";
import {
  useSession,
  signIn,
  signOut,
  getProviders,
  getSession,
} from "next-auth/react";
import { useRouter } from "next/router";

export default function SignInComponent({ providers }) {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push("/home");
    }
  }, []);

  if (session) {
    return <div></div>;
  } else {
    return (
      <div className="w-full py-2.5 my-10 h-fit flex flex-col justify-center items-center">
        {providers
          ? Object.values(providers).map((provider) => (
              <button
                key={provider.id}
                className={
                  "rounded-full my-8 w-80 p-4 bg-gradient-to-r from-green-400 to-blue-500 hover:from-blue-500 hover:to-green-600"
                }
                onClick={() => {
                  signIn(provider.id);
                }}
              >
                Sign in with {provider.name}
              </button>
            ))
          : null}
      </div>
    );
  }
}

export async function getServerSideProps(context) {
  const { req } = context;
  const session = await getSession({ req });
  console.log("SESSION: ", session);
  if (session) {
    return {
      redirect: { destination: "/home" },
    };
  }

  return {
    props: {
      providers: await getProviders(context),
    },
  };
}
