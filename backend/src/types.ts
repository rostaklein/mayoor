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
    t.model.role();
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
    t.model.createdAt();
    t.model.updatedAt();
    t.model.address({ type: 'Address', alias: 'addresses' });
  },
});

export const Material = objectType({
  name: 'Material',
  definition(t) {
    t.model.id();
    t.model.name();
    t.model.price();
    t.model.createdBy();
    t.model.createdAt();
    t.model.updatedAt();
  },
});

export const Order = objectType({
  name: 'Order',
  definition(t) {
    t.model.id();
    t.model.number();
    t.model.customer();
    t.model.items();
    t.model.totalPrice();
    t.model.totalTax();
    t.model.shippedAt();
    t.model.note();
    t.model.urgency();
    t.model.createdBy();
    t.model.createdAt();
    t.model.updatedAt();
  },
});

export const OrderItem = objectType({
  name: 'OrderItem',
  definition(t) {
    t.model.id();
    t.model.name();
    t.model.width();
    t.model.height();
    t.model.pieces();
    t.model.totalPrice();
    t.model.totalTax();
    t.model.createdBy();
    t.model.createdAt();
    t.model.updatedAt();
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

export const UpdateAddressInput = inputObjectType({
  name: 'UpdateAddressInput',
  definition(t) {
    t.id('id');
    t.string('street');
    t.string('number');
    t.string('city');
    t.string('state');
    t.string('postNumber');
    t.boolean('isPrimary');
  },
});
