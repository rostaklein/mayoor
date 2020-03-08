import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seed() {
  const createdAdminUser = await prisma.user.create({
    data: {
      email: 'user',
      password: '$2b$10$BxSwFfG7kUCgb9EO1TMiyOscC22GQ8RDe56LFYWqY1SOPvD6A.H.K', // decoded password: ok
      role: 'ADMIN',
      name: 'John Doe',
    },
  });
  console.log('Prisma seed: Created admin user');
  console.log(createdAdminUser);
}

seed();
