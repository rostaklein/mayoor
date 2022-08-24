import { arg, mutationField, inputObjectType } from "nexus";
import { AddressInput } from "../../types";
import { AddressCreateManyWithoutCustomerInput } from "@prisma/client";
import { UserInputError } from "apollo-server-micro";

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
    t.field("addresses", { type: AddressInput, list: true });
  },
});

export const CreateCustomer = mutationField("createCustomer", {
  type: "Customer",
  args: {
    input: arg({ type: CreateCustomerInput, nullable: false }),
  },
  resolve: async (_, { input }, ctx) => {
    const user = await ctx.user.getCurrentUser();

    const { addresses, allowedBankPayments, ...otherArgs } = input;
    const primaryAddresses = addresses?.filter((address) => address.isPrimary);

    if (primaryAddresses?.length && primaryAddresses.length > 1) {
      throw new UserInputError("Only one address can be primary.");
    }

    const newAddresses: AddressCreateManyWithoutCustomerInput = {
      create: addresses?.map((addressInput) => ({
        ...addressInput,
        isPrimary: addressInput.isPrimary ?? undefined,
        createdBy: { connect: { id: user.id } },
      })),
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
