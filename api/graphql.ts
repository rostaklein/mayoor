import type { VercelRequest, VercelResponse } from "@vercel/node";
import { getApolloServerHandler } from "../backend/src/micro";

export default async (req: VercelRequest, res: VercelResponse) => {
  const apolloServerHandler = await getApolloServerHandler();

  if (req.method === "OPTIONS") {
    res.end();
    return;
  }

  return apolloServerHandler(req, res);
};
