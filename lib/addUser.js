import { PrismaClient } from "@prisma/client";

export default async function addUser(email, password, confirm_password) {
  //   const prisma = new PrismaClient();
  if (email && password && confirm_password) {
    if (password === confirm_password) {
      const body = {
        email: email,
        password: password,
      };
      const config = {
        method: "POST",
        body: JSON.stringify(body),
      };
      let user = await fetch("/api/addUser", config);
      user = await user.json();
      console.log("USER ", user);
      if (user) {
        return {
          ok: true,
          message: "Sign up Successful",
        };
      } else {
        return {
          ok: false,
          message: "Error signing up. Please try again later",
        };
      }
    } else {
      return {
        message: "Password don't match",
        ok: false,
      };
    }
  } else {
    return {
      message: "None of the inputs can't be empty",
      ok: false,
    };
  }
}
