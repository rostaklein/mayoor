import * as jwt from "jsonwebtoken";
import { VercelRequest } from "@vercel/node";
import { ApolloError } from "apollo-server-micro";

import { UserContext, UserDetails } from "./context";

export const issueToken = (userDetails: UserDetails): string => {
  if (!process.env.CLIENT_SECRET) {
    throw new Error("No client secret provided in ENV.");
  }
  return jwt.sign(userDetails, process.env.CLIENT_SECRET, {
    expiresIn: 43200, // expires in 12 hours
  });
};

const getCurrentUserByToken = (token: string | undefined) =>
  new Promise<UserDetails>((resolve, reject) => {
    if (!process.env.CLIENT_SECRET) {
      throw new ApolloError("No client secret provided in ENV.");
    }
    if (!token) {
      throw new ApolloError("No token provided", "UNAUTHORIZED");
    }
    jwt.verify(token, process.env.CLIENT_SECRET, (err, decoded) => {
      if (err || !decoded) {
        return reject(
          new ApolloError(
            err?.message ?? "Something wrong happened",
            "UNAUTHORIZED"
          )
        );
      }

      const userDetails = decoded as UserDetails;
      resolve(userDetails);
    });
  });

export const getUserContext = (req: VercelRequest): UserContext => {
  const token = req.headers?.authorization?.replace("Bearer ", "");

  return { getCurrentUser: () => getCurrentUserByToken(token) };
};
