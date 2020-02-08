import { PrismaClient } from '@prisma/client';
import { ContextParameters } from 'graphql-yoga/dist/types';
import { getUserContext } from './auth';

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

export function createContext(contextParameters: ContextParameters): Context {
  return { prisma, user: getUserContext(contextParameters) };
}
