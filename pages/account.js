import { useEffect, useState } from "react";
import { Icon } from "../components/Navigation";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";

import { MdAlternateEmail } from "react-icons/md";
import { AiOutlineEye, AiFillGithub } from "react-icons/ai";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Account() {
  const { data: session } = useSession();
  const router = useRouter();
  if (session) {
    router.push("/dashboard");
  }
  //   useEffect(() => {
  //     if (session) {
  //       router.push("/dashboard");
  //     }
  //   }, []);

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
    <div className="dark:bg-[#0F192B]">
      <ToastContainer />
      <div className="container mx-auto min-h-screen sm:px-6 lg:px-8">
        <div className="min-h-screen max-w-lg mx-auto flex flex-col items-center justify-center sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-center text-indigo-600 dark:text-indigo-400 sm:text-3xl">
            Login
          </h1>

          <form
            action=""
            className="p-20 mt-6 mb-0 space-y-4 rounded-lg shadow-2xl bg-gray-800"
          >
            <p className="text-lg font-medium">Sign in to your account</p>

            <div>
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>

              <div className="relative mt-1">
                <input
                  type="email"
                  id="email"
                  className="w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm"
                  placeholder="Enter email"
                />

                <span className="absolute inset-y-0 inline-flex items-center right-4">
                  <Icon icon={<MdAlternateEmail />} />
                </span>
              </div>
            </div>

            <div>
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>

              <div className="relative mt-1">
                <input
                  type="password"
                  id="password"
                  className="w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm"
                  placeholder="Enter password"
                />

                <span className="absolute inset-y-0 inline-flex items-center right-4">
                  <Icon icon={<AiOutlineEye />} />
                </span>
              </div>
            </div>

            <div className={"flex flex-row items-stretch justify-center"}>
              <button
                type="submit"
                className="block w-full px-5 py-3 text-md font-medium text-white bg-indigo-600 rounded-lg"
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
                "w-full px-5 py-3 text-md font-medium text-white flex flex-row items-center justify-center bg-indigo-600 rounded-lg hover:cursor-pointer"
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

            <p className="text-sm text-center text-gray-500">
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
