import { NextApiRequest, NextApiResponse } from "next";
import db from "../../lib/db";
import withHandler from "../../lib/withHandler";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { title, twitt } = req.body;

  if (req.method === "GET") {
    const twitts = await db.twitt.findMany({});
    res.json({
      ok: true,
      twitts,
    });
  }
  if (req.method === "POST") {
    const newTwitt = await db.twitt.create({
      data: {
        title,
        twitt,
        user:{
          connect:{
            id: id
          }
        }
      },
    });

    console.log(newTwitt);
    res.json({
      ok: true,
      newTwitt,
    });
  }
}

export default withHandler(["POST", "GET"], handler);
