import { getSession } from "next-auth/react";

const handler = async (req, res) => {
  const session = await getSession({ req });
  if (session) {
    res.send(session);
  } else {
    res.send({
      error: "You must be sign in",
    });
  }
};

export default handler;
