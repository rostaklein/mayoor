import { arg } from 'nexus';
import { mutationField, inputObjectType } from 'nexus/dist/core';
import { UserInputError, ApolloError } from 'apollo-server-express';
import { UpdateAddressInput } from '../../types';

export const UpdateCustomerInput = inputObjectType({
  name: 'UpdateCustomerInput',
  definition(t) {
    t.id('id');
    t.string('name');
    t.string('personName');
    t.string('phone');
    t.string('email');
    t.string('identificationNumber');
    t.string('taxIdentificationNumber');
    t.boolean('allowedBankPayments');
    t.string('note');
    t.field('addresses', { type: UpdateAddressInput, list: true });
  },
});

export const UpdateCustomer = mutationField('updateCustomer', {
  type: 'Customer',
  args: {
    input: arg({ type: UpdateCustomerInput, nullable: false }),
  },
  resolve: async (_, { input }, ctx) => {
    const customer = await ctx.prisma.customer.findOne({
      where: { id: input.id ?? undefined },
    });

    if (customer === null) {
      throw new ApolloError(
        `Customer with id ${input.id} not found`,
        'CUSTOMER_NOT_FOUND',
      );
    }

    const { addresses } = input;
    const primaryAddresses = addresses?.filter((address) => address.isPrimary);

    if (primaryAddresses?.length && primaryAddresses.length > 1) {
      throw new UserInputError('Only one address can be primary.');
    }

    addresses?.map(async ({ id, ...address }) => {
      await ctx.prisma.address.update({
        where: { id: id ?? undefined },
        data: { ...address, isPrimary: address.isPrimary ?? undefined },
      });
    });

    const { id, allowedBankPayments, ...otherArgs } = input;

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
