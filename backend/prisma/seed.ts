import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seed() {
  const createdAdminUser = await prisma.user.create({
    data: {
      email: 'user',
      password: '$2b$10$BxSwFfG7kUCgb9EO1TMiyOscC22GQ8RDe56LFYWqY1SOPvD6A.H.K', // decoded password: ok
      role: 'EXECUTIVE',
      name: 'John Doe',
    },
  });
  console.log('Prisma seed: Created admin user (all permissions)');
  console.log(createdAdminUser);

  const basicMaterial = await prisma.material.create({
    data: {
      name: 'Banner 510',
      price: 150,
      createdBy: {
        connect: {
          id: createdAdminUser.id,
        },
      },
    },
  });

  console.log('Prisma seed: Created basic material');
  console.log(basicMaterial);
}

seed().then(() => {
  process.exit();
});
