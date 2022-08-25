import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function seed() {
  const createdAdminUser = await prisma.user.create({
    data: {
      email: "admin",
      password: "$2b$10$LwzufdvFedsTXeHz122DxuqKv/X6GEs48dtErdW1FD0V0I/ZwUrKe", // decoded password: admin
      role: "EXECUTIVE", // highest permission role
      name: "John Doe",
      canBeEdited: false,
    },
  });

  const material = await prisma.material.create({
    data: {
      name: "Banner 510",
      price: 150,
      createdBy: {
        connect: {
          id: createdAdminUser.id,
        },
      },
    },
  });

  await Promise.all(
    ["John Black", "Jane Blue", "Robert Gillbert"].map(
      async (personName, i) => {
        await prisma.order.create({
          data: {
            number: i + 1,
            totalPrice: 890,
            totalTax: 120,
            status: "NEW",
            createdBy: {
              connect: {
                id: createdAdminUser.id,
              },
            },
            customer: {
              create: {
                name: "Company Inc.",
                identificationNumber: "1567984511",
                personName,
                createdBy: {
                  connect: { id: createdAdminUser.id },
                },
              },
            },
            items: {
              create: {
                material: {
                  connect: {
                    id: material.id,
                  },
                },
                width: 3,
                height: 1.5,
                totalTax: 50,
                totalPrice: 150,
                createdBy: {
                  connect: { id: createdAdminUser.id },
                },
              },
            },
          },
        });
      }
    )
  );

  console.log("Prisma seed - Created EXECUTIVE user (all permissions)");
  console.log(createdAdminUser);
}

seed();
