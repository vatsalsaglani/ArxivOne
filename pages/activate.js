import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

import { Icon } from "../components/Navigation";

import Link from "next/link";

// lib

// import { compareHash } from "../lib/hash_password_utils";

export default function ActivateAccount() {
  const { data: session, status: authStatus } = useSession();
  console.log("SESSION: ", session);
  const router = useRouter();
  const [unauthorized, setUnAuthorized] = useState(false);

  const { x: hash } = router.query;
  console.log("ROUTER QUERY: ", router.query);
  console.log("HASH: ", hash);
  useEffect(() => {
    if (authStatus && !["authenticated", "loading"].includes(authStatus)) {
      console.log("PUSHING TO SIGN IN");
      router.push(`/signin?x=${hash}`);
    } else {
      const email = session?.user?.email;
      if (email) {
        fetch("/api/verifyUser", {
          method: "POST",
          body: JSON.stringify({
            email: email,
            hash: hash,
          }),
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        })
          .then((result) => {
            return result.json();
          })
          .then((verified_data) => {
            if (verified_data.ok) {
              router.push("/account");
            } else {
              console.log("UNAUTHORIZED");
              setUnAuthorized(verified_data.unauthorized);
            }
          });
      }
    }
  }, [authStatus]);

  if (["loading", "authenticated"].includes(authStatus)) {
    return (
      <div>
        <div>Authenticated. Checking WITH DB</div>
      </div>
    );
  } else if (unauthorized) {
    // not authorized
    return (
      <div>
        <div>UNAUTHORIZED</div>
      </div>
    );
  } else {
    // not authenticated
    return <div>UNAUTHENTICATED</div>;
  }
}
