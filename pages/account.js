import { useEffect, useState } from "react";
import { Icon } from "../components/Navigation";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";

import { MdAlternateEmail } from "react-icons/md";
import { AiOutlineEye, AiFillGithub, AiFillEyeInvisible } from "react-icons/ai";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Account() {
  const { data: session } = useSession();
  const router = useRouter();
  if (session) {
    router.push("/dashboard");
  }

  const [passwordText, setPasswordText] = useState("password");
  const onClickEye = () => {
    const stateChange = {
      text: "password",
      password: "text",
    };
    setPasswordText(stateChange[passwordText]);
  };

  const signInWithEmail = (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    console.log("EMAIL: ", email, "Password: ", password);
    if (email.length > 0 && password.length > 0) {
      // do check
      signIn("credentials", { email: email, password: password });
    } else {
      console.log("IN TOAST");
      toast.info("Email or Password is empty", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  if (session) {
    return <div></div>;
  }

  return (
    <div>
      <ToastContainer />
      <div className="container mx-auto min-h-screen min-w-full sm:px-6 lg:px-8">
        <div className="mx-auto flex min-h-screen min-w-full max-w-lg flex-col items-center justify-center sm:px-6 lg:px-8 ">
          <h1 className="text-center text-2xl font-bold text-indigo-600 sm:text-3xl">
            Welcome Back
          </h1>

          <form
            action=""
            className="mt-6 mb-0 min-w-fit space-y-4 rounded-lg bg-gray-800 p-20 shadow-2xl"
          >
            <p className="text-xl font-bold">Sign in to your account</p>

            <div>
              <label htmlFor="email" className="text-md font-medium">
                Email
              </label>

              <div className="relative mt-1">
                <input
                  type="email"
                  id="email"
                  className="text-md w-full rounded-lg border-gray-200 p-4 pr-12 shadow-sm"
                  placeholder="Enter email"
                />

                <span className="absolute inset-y-0 right-4 inline-flex items-center">
                  <Icon icon={<MdAlternateEmail />} />
                </span>
              </div>
            </div>

            <div>
              <label htmlFor="password" className="text-md font-medium">
                Password
              </label>

              <div className="relative mt-1">
                <input
                  type={passwordText}
                  id="password"
                  className="text-md w-full rounded-lg border-gray-200 p-4 pr-12 shadow-sm"
                  placeholder="Enter password"
                />

                <span
                  className="absolute inset-y-0 right-4 inline-flex items-center hover:cursor-pointer"
                  onClick={() => {
                    onClickEye();
                  }}
                >
                  {passwordText === "password" ? (
                    <Icon icon={<AiFillEyeInvisible />} />
                  ) : (
                    <Icon icon={<AiOutlineEye />} />
                  )}
                </span>
              </div>
            </div>

            <div className={"flex flex-row items-stretch justify-center"}>
              <button
                type="submit"
                className="text-md block w-full rounded-lg bg-indigo-600 px-5 py-3 font-medium text-white"
                onClick={(e) => {
                  signInWithEmail(e);
                }}
              >
                Sign in
              </button>
            </div>
            <div
              as="button"
              className={
                "text-md flex w-full flex-row items-center justify-center rounded-lg bg-indigo-600 px-5 py-3 font-medium text-white hover:cursor-pointer"
              }
              onClick={() => {
                signIn("github");
              }}
            >
              <div>Sign in with GitHub</div>
              <div className={"ml-1"}>
                <Icon icon={<AiFillGithub />} size={16} />
              </div>
            </div>

            <p className="text-md text-center text-gray-500">
              No account?
              <a className="underline" href="">
                Sign up
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
