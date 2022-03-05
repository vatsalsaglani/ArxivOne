import { useEffect, useState } from "react";
import { signIn } from "next-auth/react";

// components
import { Icon } from "./Navigation";

// icons
import { MdAlternateEmail } from "react-icons/md";
import { AiOutlineEye, AiFillGithub, AiFillEyeInvisible } from "react-icons/ai";

export default function SignInComponent() {
  const [passwordText, setPasswordText] = useState("password");
  const onClickEye = () => {
    const stateChange = {
      text: "password",
      password: "text",
    };
    setPasswordText(stateChange[passwordText]);
  };
  return (
    <div className="mx-auto flex min-h-screen min-w-full flex-col items-center justify-center">
      <div className="relative h-full w-full max-w-lg">
        <div className="absolute top-0 -left-5 h-96 w-96 animate-blob rounded-full bg-pink-300 opacity-70 mix-blend-multiply blur-xl filter"></div>
        <div className="animation-delay-2000 absolute top-0 -right-5 h-96 w-96 animate-blob rounded-full bg-yellow-300 opacity-70 mix-blend-multiply blur-xl filter"></div>
        <div className="animation-delay-4000 absolute -bottom-10 left-20 h-96 w-96 animate-blob rounded-full bg-pink-300 opacity-70 mix-blend-multiply blur-xl filter"></div>
        <div className="relative flex flex-col items-center justify-center sm:px-6 lg:px-8">
          <h1 className="mb-2 text-center text-2xl font-bold text-sky-600 sm:text-4xl">
            Welcome Back
          </h1>
          <form
            action=""
            className={
              "mt-6 mb-0 min-w-fit space-y-4 rounded-lg p-20 shadow-2xl"
            }
          >
            <p className="text-xl font-medium text-sky-600 ">
              Sign in to your account
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
                <span className="absolute inset-y-0 right-4 inline-flex items-center">
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
                  className="absolute inset-y-0 right-4 inline-flex items-center"
                  onClick={() => {
                    onClickEye();
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
          </form>
        </div>
      </div>
    </div>
  );
}
