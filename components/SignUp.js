import { useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import addUser from "../lib/addUser";
import { Icon } from "./Navigation";
// icons
import { MdAlternateEmail } from "react-icons/md";
import { AiOutlineEye, AiFillGithub, AiFillEyeInvisible } from "react-icons/ai";
import Link from "next/link";

export default function SignUpComponent() {
  const [passwordText, setPasswordText] = useState("password");
  const [confPassText, setConfPassText] = useState("password");

  const router = useRouter();

  const onClickEye = (pass_str) => {
    const stateChange = {
      pass: {
        text: "password",
        password: "text",
      },
      conf: {
        text: "password",
        password: "text",
      },
    };

    if (pass_str === "pass") {
      setPasswordText(stateChange[pass_str][passwordText]);
    } else {
      setConfPassText(stateChange[pass_str][confPassText]);
    }
  };
  const onSignUp = async (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("cnfpassword").value;
    console.log("TAPPED ON SIGN UP");
    console.log(email, password, confirmPassword);
    let result = await addUser(email, password, confirmPassword);
    console.log("RESULT: ", result);
    if (result.ok) {
      signIn("credentials", {
        email: email,
        password: password,
        redirect: false,
      });
      console.log("signed in");
      router.push("/account");
    } else {
      console.dir(result, { depth: null });
      console.log("Error Signing Up");
      toast(result.message, {
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

  return (
    <div className="mx-auto flex min-h-screen min-w-full flex-col items-center justify-center font-Work">
      <ToastContainer />
      <div className="relative h-full w-full max-w-lg">
        <div className="absolute top-0 -left-5 h-96 w-96 animate-blob rounded-full bg-pink-300 opacity-70 mix-blend-multiply blur-xl filter"></div>
        <div className="animation-delay-2000 absolute top-0 -right-5 h-96 w-96 animate-blob rounded-full bg-yellow-300 opacity-70 mix-blend-multiply blur-xl filter"></div>
        <div className="animation-delay-4000 absolute -bottom-10 left-20 h-96 w-96 animate-blob rounded-full bg-pink-300 opacity-70 mix-blend-multiply blur-xl filter"></div>
        <div className="relative flex flex-col items-center justify-center sm:px-6 lg:px-8">
          <h1 className="mb-2 text-center text-2xl font-bold text-sky-600 sm:text-4xl">
            Welcome
          </h1>
          <form
            action=""
            className={
              "mt-6 mb-0 min-w-fit space-y-4 rounded-lg p-20 shadow-2xl"
            }
          >
            <p className="text-xl font-medium text-sky-600 ">
              Create a new account
            </p>
            <div>
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-500"
              >
                Email
              </label>
              <div className="relative mt-1">
                <input
                  type="email"
                  id="email"
                  className="text-md w-full rounded-lg border-gray-200 p-4 pr-12 shadow-sm"
                  placeholder="Enter Email"
                />
                <span className="absolute inset-y-0 right-4 inline-flex items-center text-sky-500">
                  <Icon icon={<MdAlternateEmail size={16} />} />
                </span>
              </div>
            </div>
            <div>
              <label
                htmlFor="password"
                className="text-sm font-medium text-gray-500"
              >
                Password
              </label>
              <div className="relative mt-1">
                <input
                  type={passwordText}
                  id="password"
                  className="text-md w-full rounded-lg border-gray-200 p-4 pr-12 shadow-sm"
                  placeholder="Enter Password"
                />
                <span
                  className="absolute inset-y-0 right-4 inline-flex items-center text-sky-500 "
                  onClick={() => {
                    onClickEye("pass");
                  }}
                >
                  <Icon
                    icon={
                      passwordText === "password" ? (
                        <AiFillEyeInvisible size={16} />
                      ) : (
                        <AiOutlineEye size={16} />
                      )
                    }
                  />
                </span>
              </div>
            </div>
            <div>
              <label
                htmlFor="cnf"
                className="text-sm font-medium text-gray-500"
              >
                Confirm Password
              </label>
              <div className="relative mt-1">
                <input
                  type={confPassText}
                  id="cnfpassword"
                  className="text-md w-full rounded-lg border-gray-200 p-4 pr-12 shadow-sm"
                  placeholder="Confirm Password"
                />
                <span
                  className="absolute inset-y-0 right-4 inline-flex items-center text-sky-500 "
                  onClick={() => {
                    onClickEye("conf");
                  }}
                >
                  <Icon
                    icon={
                      confPassText === "password" ? (
                        <AiFillEyeInvisible size={16} />
                      ) : (
                        <AiOutlineEye size={16} />
                      )
                    }
                  />
                </span>
              </div>
            </div>

            <div>
              <button
                className="text-md hover:ring-bl relative mt-2 flex w-full items-center justify-center rounded-lg bg-sky-600 p-2 font-medium text-slate-100 shadow-xl hover:bg-transparent hover:text-slate-800 hover:ring-2 hover:ring-sky-500"
                onClick={(e) => {
                  onSignUp(e);
                }}
              >
                <span className="mr-1">Sign Up</span>
              </button>
            </div>
            <div className="flex w-full items-center justify-center space-x-1 text-sm text-slate-500">
              <span>Already have an account?</span>
              <Link href="/signin">
                <a>
                  <span className="transition ease-in-out hover:underline hover:decoration-sky-400 hover:duration-100">
                    Sign In
                  </span>
                </a>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
