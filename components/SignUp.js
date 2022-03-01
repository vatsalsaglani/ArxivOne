import { useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";

import addUser from "../lib/addUser";

export default function SignUpComponent() {
  const { data: session } = useSession();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const onChangeEmail = (event) => {
    let em = event.target.value;
    setEmail(em);
  };

  const onChangePassword = (event) => {
    let ps = event.target.value;
    setPassword(ps);
  };

  const onChangeConfirmPassword = (event) => {
    let cps = event.target.value;
    setConfirmPassword(cps);
  };

  const onSignUp = async (e) => {
    e.preventDefault();
    console.log("TAPPED ON SIGN UP");
    console.log(email, password, confirmPassword);
    let result = await addUser(email, password, confirmPassword);
    console.log("RESULT: ", result);
    if (result.ok) {
      signIn("credentials", {
        email: email,
        password: password,
      });
    } else {
      console.dir(result, { depth: null });
      console.log("Error Signing Up");
    }
  };

  useEffect(() => {
    if (session) {
      router.push("/home");
    }
  }, []);

  if (session) {
    return <div></div>;
  } else {
    return (
      <div
      // className={
      //   "container mx-auto min-w-full bg-gradient-to-r from-cyan-500 to-blue-500 p-4 flex flex-col items-center justify-center"
      // }
      >
        <div className={"w-full max-w-md px-2 py-16 sm:px-0"}>
          <form
            className="flex flex-col items-center justify-center p-12 mt-12"
            action=""
          >
            <label className="font-semibold text-xs" htmlFor="email">
              Email
            </label>
            <input
              className="flex items-center h-12 px-4 w-64 bg-gray-200 mt-2 rounded focus:outline-none focus:ring-2"
              type="email"
              onChange={(e) => onChangeEmail(e)}
            />
            <label
              className="font-semibold text-xs mt-3"
              htmlFor="passwordField"
            >
              Password
            </label>
            <input
              className="flex items-center h-12 px-4 w-64 bg-gray-200 mt-2 rounded focus:outline-none focus:ring-2"
              type="password"
              onChange={(e) => {
                onChangePassword(e);
              }}
            />
            <label
              className="font-semibold text-xs mt-3"
              htmlFor="passwordField"
            >
              Confirm Password
            </label>
            <input
              className="flex items-center h-12 px-4 w-64 bg-gray-200 mt-2 rounded focus:outline-none focus:ring-2"
              type="password"
              onChange={(e) => {
                onChangeConfirmPassword(e);
              }}
            />
            <button
              onClick={(e) => {
                onSignUp(e);
              }}
              className="flex items-center justify-center h-12 px-6 w-64 bg-blue-600 mt-8 rounded font-semibold text-sm text-blue-100 hover:bg-blue-700"
            >
              Sign up
            </button>
            <div className="flex mt-6 justify-center text-xs">
              <a className="text-blue-400 hover:text-blue-500" href="#">
                Forgot Password
              </a>
              <span className="mx-2 text-gray-300">/</span>
              <a className="text-blue-400 hover:text-blue-500" href="#">
                Sign Up
              </a>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
