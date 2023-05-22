import { NextApiRequest, NextApiResponse } from "next";
import db from "../../../lib/db";
import withHandler from "../../../lib/withHandler";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { email, password, name } = req.body;

  const user = await db.user.findUnique({
    where: {
      email,
    },
  });

  console.log(user);
  if (user) {
    res.json({
      ok: true,
    });
  } else {
    res.json({
      ok: false,
      error: "이메일 또는 비밀번호를 확인하세요",
    });
  }
}

export default withHandler(["POST"], handler);
