import { PrismaClient } from '@prisma/client';
import { MicroRequest } from 'apollo-server-micro/dist/types';
import { getUserContext } from './auth';

const prisma = new PrismaClient({ log: ['query', 'info', 'warn'] });

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

export function createContext(contextParameters: MicroRequest): Context {
  return { prisma, user: getUserContext(contextParameters) };
}
