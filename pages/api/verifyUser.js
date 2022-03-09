import { PrismaClient } from "@prisma/client";
import { compareHash } from "../../lib/hash_password_utils";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const prisma = new PrismaClient();
    let params = req.body;
    console.log("PARAMS: ", params);
    const email = params.email;
    const hash = params.hash;
    if (compareHash(email, hash)) {
      const userId = await prisma.hash.findFirst({ where: { hash: hash } });
      if (userId) {
        const dt = new Date();
        const datetime = new Date(
          dt.getFullYear(),
          dt.getMonth(),
          dt.getDay(),
          dt.getHours(),
          dt.getMinutes(),
          dt.getSeconds()
        );

        const user = await prisma.user.update({
          where: { id: userId.userId },
          data: { emailVerified: datetime },
        });

        if (user) {
          res
            .status(200)
            .json({ message: "VERIFIED USER", ok: true, unauthorized: false });
        } else {
          res.status(400).json({
            message: "ERROR VERIFYING USER",
            ok: false,
            unauthorized: false,
          });
        }
      } else {
        res.status(404).json({
          ok: false,
          message: "USER DOESN'T EXIST",
          unauthorized: false,
        });
      }
    } else {
      res.status(401).json({
        ok: false,
        message: "UnAuthorized Access",
        unauthorized: true,
      });
    }
  } else {
    res.status(405).json({
      ok: false,
      message: "METHOD NOT AVAILABLE",
      unauthorized: false,
    });
  }
}
