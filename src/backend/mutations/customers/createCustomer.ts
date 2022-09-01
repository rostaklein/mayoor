import { arg, mutationField, inputObjectType, nonNull } from "nexus";
import { UserInputError } from "apollo-server-micro";
import { Prisma } from "@prisma/client";

import { AddressInput } from "@backend/types";

export const CreateCustomerInput = inputObjectType({
  name: "CreateCustomerInput",
  definition(t) {
    t.string("name");
    t.string("personName");
    t.string("phone");
    t.string("email");
    t.string("identificationNumber");
    t.string("taxIdentificationNumber");
    t.boolean("allowedBankPayments");
    t.string("note");
    t.list.field("addresses", { type: AddressInput });
  },
});

export const CreateCustomer = mutationField("createCustomer", {
  type: "Customer",
  args: {
    input: nonNull(arg({ type: CreateCustomerInput })),
  },
  resolve: async (_, { input }, ctx) => {
    const user = await ctx.user.getCurrentUser();

    const { addresses, allowedBankPayments, ...otherArgs } = input;
    const primaryAddresses = addresses?.filter((address) => address.isPrimary);

    if (primaryAddresses?.length && primaryAddresses.length > 1) {
      throw new UserInputError("Only one address can be primary.");
    }

    const newAddresses: Prisma.AddressCreateNestedManyWithoutCustomerInput = {
      createMany: {
        data: addresses?.map((addressInput) => ({
          ...addressInput,
          isPrimary: addressInput.isPrimary ?? undefined,
          createdByUserId: user.id,
        })),
      },
    };

    return ctx.prisma.customer.create({
      data: {
        ...otherArgs,
        allowedBankPayments: allowedBankPayments ?? undefined,
        address: newAddresses,
        createdBy: {
          connect: {
            id: user.id,
          },
        },
      },
    });
  },
});
