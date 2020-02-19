import { stringArg, booleanArg, arg } from 'nexus';
import { mutationField } from 'nexus/dist/core';
import { AddressInput } from '../../types';
import { AddressCreateManyWithoutCustomerInput } from '@prisma/client';
import { UserInputError } from 'apollo-server-express';

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
    note: stringArg(),
    addresses: arg({ type: AddressInput, list: true }),
  },
  resolve: async (_, args, ctx) => {
    const user = await ctx.user.getCurrentUser();

    const { addresses, ...otherArgs } = args;
    const primaryAddresses = addresses?.filter(address => address.isPrimary);

    if (primaryAddresses?.length && primaryAddresses.length > 1) {
      throw new UserInputError('Only one address can be primary.');
    }

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
