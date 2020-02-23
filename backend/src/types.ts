import { objectType, inputObjectType } from 'nexus';

export const AuthPayload = objectType({
  name: 'AuthPayload',
  definition(t) {
    t.string('token');
    t.field('user', { type: 'User' });
  },
});

export const User = objectType({
  name: 'User',
  definition(t) {
    t.model.id();
    t.model.name();
    t.model.email();
  },
});

export const Address = objectType({
  name: 'Address',
  definition(t) {
    t.model.id();
    t.model.street();
    t.model.number();
    t.model.city();
    t.model.postNumber();
    t.model.isPrimary();
  },
});

export const Customer = objectType({
  name: 'Customer',
  definition(t) {
    t.model.id();
    t.model.name();
    t.model.email();
    t.model.phone();
    t.model.identificationNumber();
    t.model.taxIdentificationNumber();
    t.model.allowedBankPayments();
    t.model.personName();
    t.model.note();
    t.model.createdBy();
    t.model.address({ type: 'Address' });
  },
});

export const Order = objectType({
  name: 'Order',
  definition(t) {
    t.model.id();
    t.model.number();
    t.model.createdBy();
    t.model.createdAt();
    t.model.updatedAt();
    t.model.customer({ type: 'Customer' });
  },
});

export const AddressInput = inputObjectType({
  name: 'AddressInput',
  definition(t) {
    t.string('street');
    t.string('number');
    t.string('city');
    t.string('state');
    t.string('postNumber');
    t.boolean('isPrimary');
  },
});
