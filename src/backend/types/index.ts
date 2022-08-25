import { objectType, inputObjectType, enumType, extendInputType } from "nexus";
import {
  Address,
  Customer,
  Material,
  User,
  UserRole as UserRoleNexus,
  OrderStatus as OrderStatusNexus,
  ProductionLogAction as ProductionLogActionNexus,
  ProductionLog,
  OrderItem,
} from "nexus-prisma";

export * from "./order";

export const UserRole = enumType(UserRoleNexus);
export const OrderStatus = enumType(OrderStatusNexus);
export const ProductionLogActionEnum = enumType(ProductionLogActionNexus);

export const AuthPayload = objectType({
  name: "AuthPayload",
  definition(t) {
    t.string("token");
    t.field("user", { type: "User" });
  },
});

export const UserType = objectType({
  name: User.$name,
  description: User.$description,
  definition(t) {
    t.field(User.id);
    t.field(User.name);
    t.field(User.email);
    t.field(User.role);
    t.field(User.canBeEdited);
  },
});

export const AddressType = objectType({
  name: Address.$name,
  description: Address.$description,
  definition(t) {
    t.field(Address.id);
    t.field(Address.street);
    t.field(Address.number);
    t.field(Address.city);
    t.field(Address.postNumber);
    t.field(Address.isPrimary);
  },
});

export const CustomerType = objectType({
  name: Customer.$name,
  description: Customer.$description,
  definition(t) {
    t.field(Customer.id);
    t.field(Customer.name);
    t.field(Customer.email);
    t.field(Customer.phone);
    t.field(Customer.identificationNumber);
    t.field(Customer.taxIdentificationNumber);
    t.field(Customer.allowedBankPayments);
    t.field(Customer.personName);
    t.field(Customer.note);
    t.field(Customer.createdBy);
    t.field(Customer.createdAt);
    t.field(Customer.updatedAt);
    t.list.nonNull.field("addresses", {
      type: "Address",
      resolve: async (customer, _, ctx) => {
        return (
          (await ctx.prisma.address.findMany({
            where: {
              customerId: customer.id,
            },
            orderBy: {
              isPrimary: "desc",
            },
          })) ?? []
        );
      },
    });
  },
});

export const MaterialType = objectType({
  name: Material.$name,
  description: Material.$description,
  definition(t) {
    t.field(Material.id);
    t.field(Material.name);
    t.field(Material.price);
    t.field(Material.createdBy);
    t.field(Material.createdAt);
    t.field(Material.updatedAt);
  },
});

export const OrderItemType = objectType({
  name: OrderItem.$name,
  description: OrderItem.$description,
  definition(t) {
    t.field(OrderItem.id);
    t.field(OrderItem.name);
    t.field(OrderItem.material);
    t.field(OrderItem.width);
    t.field(OrderItem.height);
    t.field(OrderItem.pieces);
    t.field("printedPieces", {
      type: "Int",
      resolve: async (item, _, ctx) => {
        const action = "PRINT";
        const productionLogs = await ctx.prisma.productionLog.findMany({
          where: { AND: [{ orderItem: { id: item.id } }, { action }] },
        });
        return productionLogs.reduce((acc, curr) => {
          return (acc += curr.pieces);
        }, 0);
      },
    });
    t.field("producedPieces", {
      type: "Int",
      resolve: async (item, _, ctx) => {
        const action = "PRODUCTION";
        const productionLogs = await ctx.prisma.productionLog.findMany({
          where: { AND: [{ orderItem: { id: item.id } }, { action }] },
        });
        return productionLogs.reduce((acc, curr) => {
          return (acc += curr.pieces);
        }, 0);
      },
    });
    t.field(OrderItem.totalPrice);
    t.field(OrderItem.totalTax);
    t.field(OrderItem.createdBy);
    t.field(OrderItem.createdAt);
    t.field(OrderItem.updatedAt);
    t.field(OrderItem.productionLogs);
  },
});

export const AddressInput = inputObjectType({
  name: "AddressInput",
  definition(t) {
    t.string("street");
    t.string("number");
    t.string("city");
    t.string("state");
    t.string("postNumber");
    t.boolean("isPrimary");
  },
});

export const UpdateAddressInput = inputObjectType({
  name: "UpdateAddressInput",
  definition(t) {
    t.id("id");
    t.string("street");
    t.string("number");
    t.string("city");
    t.string("state");
    t.string("postNumber");
    t.boolean("isPrimary");
  },
});

export const ProductionLogType = objectType({
  name: "ProductionLog",
  definition(t) {
    t.field(ProductionLog.id);
    t.field(ProductionLog.orderItem);
    t.field(ProductionLog.action);
    t.field(ProductionLog.pieces);
    t.field(ProductionLog.createdAt);
    t.field(ProductionLog.createdBy);
  },
});
