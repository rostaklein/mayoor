import { arg, mutationField, inputObjectType, nonNull } from "nexus";
import { UserInputError, ApolloError } from "apollo-server-micro";

import { UpdateAddressInput } from "@backend/types";

export const UpdateCustomerInput = inputObjectType({
  name: "UpdateCustomerInput",
  definition(t) {
    t.id("id");
    t.string("name");
    t.string("personName");
    t.string("phone");
    t.string("email");
    t.string("identificationNumber");
    t.string("taxIdentificationNumber");
    t.boolean("allowedBankPayments");
    t.string("note");
    t.list.field("addresses", { type: UpdateAddressInput });
  },
});

export const UpdateCustomer = mutationField("updateCustomer", {
  type: "Customer",
  args: {
    input: nonNull(arg({ type: UpdateCustomerInput })),
  },
  resolve: async (_, { input }, ctx) => {
    const customer = await ctx.prisma.customer.findUnique({
      where: { id: input.id },
    });

    if (customer === null) {
      throw new ApolloError(
        `Customer with id ${input.id} not found`,
        "CUSTOMER_NOT_FOUND"
      );
    }

    const { id, allowedBankPayments, addresses, ...otherArgs } = input;
    const primaryAddresses = addresses?.filter((address) => address.isPrimary);

    if (primaryAddresses?.length && primaryAddresses.length > 1) {
      throw new UserInputError("Only one address can be primary.");
    }

    for (const { id: addressId, ...address } of addresses) {
      await ctx.prisma.address.update({
        data: address,
        where: {
          id: addressId,
        },
      });
    }

    return await ctx.prisma.customer.update({
      where: {
        id: id ?? undefined,
      },
      data: {
        ...otherArgs,
        allowedBankPayments: allowedBankPayments ?? undefined,
      },
    });
  },
});
