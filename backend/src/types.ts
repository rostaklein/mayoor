import { objectType, inputObjectType } from 'nexus';

const AuthPayload = objectType({
  name: 'AuthPayload',
  definition(t) {
    t.string('token');
    t.field('user', { type: 'User' });
  },
});

const User = objectType({
  name: 'User',
  definition(t) {
    t.model.id();
    t.model.name();
    t.model.email();
  },
});

const Address = objectType({
  name: 'Address',
  definition(t) {
    t.model.id();
    t.model.street();
    t.model.number();
    t.model.city();
    t.model.postNumber();
  },
});

const Customer = objectType({
  name: 'Customer',
  definition(t) {
    t.model.id();
    t.model.name();
    t.model.email();
    t.model.phone();
    t.model.identificationNumber();
    t.model.taxIdentificationNumber();
    t.model.personName();
    t.model.address({ type: 'Address' });
  },
});

const Order = objectType({
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
  },
});

export const Types = {
  User,
  Order,
  Customer,
  Address,
  AuthPayload,
  AddressInput,
};
