import { PrismaClient } from '@prisma/client';
import { ContextParameters } from 'graphql-yoga/dist/types';
import { UserContext, getUserContext } from './userAuth';

const prisma = new PrismaClient();

export interface Context {
  prisma: PrismaClient;
  user: UserContext;
}

export function createContext(contextParameters: ContextParameters): Context {
  return { prisma, user: getUserContext(contextParameters) };
}
