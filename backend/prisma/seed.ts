import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seed() {
  const createdAdminUser = await prisma.user.create({
    data: {
      email: 'admin',
      password: '$2b$10$LwzufdvFedsTXeHz122DxuqKv/X6GEs48dtErdW1FD0V0I/ZwUrKe', // decoded password: admin
      role: 'EXECUTIVE', // highest permission role
      name: 'John Doe',
    },
  });
  console.log('Prisma seed: Created EXECUTIVE user (all permissions)');
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
  prisma.disconnect();
});
