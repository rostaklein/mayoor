import { PrismaClient } from '@prisma/client';
import { getUserContext } from './auth';
import { ExpressContext } from 'apollo-server-express/dist/ApolloServer';

const prisma = new PrismaClient();

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

export function createContext(contextParameters: ExpressContext): Context {
  return { prisma, user: getUserContext(contextParameters) };
}
