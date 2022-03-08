import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";
import { hashPassword } from "../../lib/hash_password_utils";
// export default function handler(req, res) {
//     res.status(200).json({ name: 'John Doe' })
//   }

export default async function handler(req, res) {
  let params = JSON.parse(req.body);
  // console.log("PARAMS: ", params);
  let prisma = new PrismaClient();
  const account = await prisma.user.findUnique({
    where: {
      email: params.email,
    },
  });
  // console.log("ACCOUNT USER: ", account);
  if (account) {
    res
      .status(200)
      .json({ ok: false, message: "Account with email already exists" });
  } else {
    const user = await prisma.user.create({
      data: {
        email: params.email,
        Auth: {
          create: {
            password: hashPassword(params.password),
          },
        },
        Hash: {
          create: {
            hash: hashPassword(params.email),
          },
        },
        accounts: {
          create: {
            type: "credentials",
            provider: "credentials",
            providerAccountId: uuidv4(),
          },
        },
      },
    });
    if (user) {
      res.status(200).json({ ok: true, message: "Success!" });
    } else {
      res.status(200).json({ ok: false, message: "Error creating account" });
    }
  }
}
