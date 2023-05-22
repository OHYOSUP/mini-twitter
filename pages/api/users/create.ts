import { NextApiRequest, NextApiResponse } from "next";
import db from "../../../lib/db";
import withHandler from "../../../lib/withHandler";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { email, password, name } = req.body;

  const user = await db.user.create({
    data: {
      email,
      password,
      name
    },
  });
  console.log("계정을 생성한다");
  console.log(user)

  res.json({
    ok: true
  })
}

export default withHandler(["POST"], handler);
