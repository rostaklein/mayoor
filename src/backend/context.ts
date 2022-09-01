import { PrismaClient } from "@prisma/client";
import { VercelRequest } from "@vercel/node";

import { getUserContext } from "./auth";

const prisma = new PrismaClient({ log: ["query", "info", "warn"] });

export type UserDetails = {
  id: string;
  email: string;
};

export type UserContext = {
  getCurrentUser: () => Promise<UserDetails>;
};
export interface Context {
  prisma: PrismaClient;
  user: UserContext;
}

export function createContext({ req }: { req: VercelRequest }): Context {
  return { prisma, user: getUserContext(req) };
}
