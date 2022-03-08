import { getSession } from "next-auth/react";

export default async (req, res) => {
  const session = await getSession({ req });
  console.log(req.body);
  if (session) {
    console.log("SESSION", JSON.stringify(session, null, 2));
  } else {
    res.status(401);
  }
  res.end();
};
