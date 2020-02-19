import { stringArg, booleanArg, arg } from 'nexus';
import { mutationField } from 'nexus/dist/core';
import { AddressInput } from '../../types';
import { AddressCreateManyWithoutCustomerInput } from '@prisma/client';

export const CreateCustomer = mutationField('createCustomer', {
  type: 'Customer',
  args: {
    name: stringArg(),
    personName: stringArg(),
    phone: stringArg(),
    email: stringArg(),
    identificationNumber: stringArg(),
    taxIdentificationNumber: stringArg(),
    allowedBankPayments: booleanArg(),
    addresses: arg({ type: AddressInput, list: true }),
  },
  resolve: async (_, args, ctx) => {
    const user = await ctx.user.getCurrentUser();

    const { addresses, ...otherArgs } = args;

    const newAddresses: AddressCreateManyWithoutCustomerInput = {
      create: addresses?.map(addressInput => ({
        ...addressInput,
        createdBy: { connect: { id: user.id } },
      })),
    };

    return ctx.prisma.customer.create({
      data: {
        ...otherArgs,
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
