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
      <div className="container mx-auto sm:px-6 lg:px-8">
        <SignInComponent />
      </div>
    </div>
  );
}
