import { NextApiRequest, NextApiResponse } from "next";

type method = "POST" | "GET" | "DELETE" | "PUT"

export default function withHandler(
  method: method[],
  handler: (req: NextApiRequest, res: NextApiResponse) => void
) {
  return async function (req: NextApiRequest, res: NextApiResponse) {
    if (method !== method) {
      return res.status(404).end();
    }
    try {
      await handler(req, res);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  };
}
