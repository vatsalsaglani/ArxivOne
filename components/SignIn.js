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
      <div className="my-10 flex h-fit w-full flex-col items-center justify-center py-2.5">
        {providers
          ? Object.values(providers).map((provider) => (
              <button
                key={provider.id}
                className={
                  "my-8 w-80 rounded-full bg-gradient-to-r from-green-400 to-blue-500 p-4 hover:from-blue-500 hover:to-green-600"
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
