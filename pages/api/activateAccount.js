import { sendEmail } from "../../lib/activationEmail";
import { PrismaClient } from "@prisma/client";

export default async function handler(req, res) {
  console.log("CALLING ACTIVATE: ");
  console.log(req.body);
  let params = req.body;
  let prisma = new PrismaClient();
  const user = await prisma.user.findUnique({ where: { email: params.email } });
  if (!user) {
    res.status(404).json({ message: "USER NOT FOUND", ok: false });
  }

  const hash = await prisma.hash.findFirst({ where: { userId: user.id } });
  console.log("HASH: ", hash);
  if (!hash) {
    res.status(404).json({
      message: "USER IS ALREADY VERIFIED OR DOESN'T EXIST",
      ok: false,
    });
  }

  const email_send = sendEmail(user.email, hash.hash);
  console.log("ES: ", email_send);
  if (email_send) {
    res.status(200).json({
      message: "PLEASE CHECK YOUR INBOX FOR A VERIFICATION EMAIL",
      ok: true,
    });
  } else {
    res.status(400).json({ message: "ERROR SENDING EMAIL", ok: true });
  }
}
