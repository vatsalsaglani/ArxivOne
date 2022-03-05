import { useEffect, useState } from "react";
import { Icon } from "../components/Navigation";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";

import { MdAlternateEmail } from "react-icons/md";
import { AiOutlineEye, AiFillGithub, AiFillEyeInvisible } from "react-icons/ai";

// components
import SignInComponent from "../components/SignIn";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Account() {
  const { data: session } = useSession();
  const router = useRouter();
  if (session) {
    router.push("/dashboard");
  }

  if (session) {
    return <div></div>;
  }

  return (
    <div>
      <ToastContainer />
      <div className="container mx-auto sm:px-6 lg:px-8">
        <SignInComponent />
      </div>
    </div>
  );
}
