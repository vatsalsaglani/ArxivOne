import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";

// export default function handler(req, res) {
//     res.status(200).json({ name: 'John Doe' })
//   }

export default async function handler(req, res) {
  let params = JSON.parse(req.body);
  console.log("PARAMS: ", params);
  let prisma = new PrismaClient();
  const user = await prisma.user.create({
    data: {
      email: params.email,
      Auth: {
        create: {
          password: params.password,
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
    res.status(200).json({ ok: true });
  } else {
    res.status(200).json({ ok: false });
  }
}
