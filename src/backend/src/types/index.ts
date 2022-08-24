import { objectType, inputObjectType, enumType } from "nexus";
import {
  Address,
  Customer,
  Material,
  User,
  UserRole as UserRoleNexus,
} from "nexus-prisma";

export * from "./order";

export const UserRole = enumType(UserRoleNexus);

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
    t.field("address", { type: AddressType });
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

// export const OrderStatus = enumType({
//   name: "OrderStatus",
//   members: [
//     "NEW",
//     "WAITING_FOR_CALCULATION",
//     "READY_TO_PRINT",
//     "WAITING_FOR_PRODUCTION",
//     "TO_BE_SHIPPED",
//     "DONE",
//   ],
// });

// export const OrderItem = objectType({
//   name: "OrderItem",
//   definition(t) {
//     t.model.id();
//     t.model.name();
//     t.model.material();
//     t.model.width();
//     t.model.height();
//     t.model.pieces();
//     t.field("printedPieces", {
//       type: "Int",
//       resolve: async (item, _, ctx) => {
//         const action: NexusGenEnums["ProductionLogType"] = "PRINT";
//         const productionLogs = await ctx.prisma.productionLog.findMany({
//           where: { AND: [{ orderItem: { id: item.id } }, { action }] },
//         });
//         return productionLogs.reduce((acc, curr) => {
//           return (acc += curr.pieces);
//         }, 0);
//       },
//     });
//     t.field("producedPieces", {
//       type: "Int",
//       resolve: async (item, _, ctx) => {
//         const action: NexusGenEnums["ProductionLogType"] = "PRODUCTION";
//         const productionLogs = await ctx.prisma.productionLog.findMany({
//           where: { AND: [{ orderItem: { id: item.id } }, { action }] },
//         });
//         return productionLogs.reduce((acc, curr) => {
//           return (acc += curr.pieces);
//         }, 0);
//       },
//     });
//     t.model.totalPrice();
//     t.model.totalTax();
//     t.model.createdBy();
//     t.model.createdAt();
//     t.model.updatedAt();
//     t.field("productionLog", {
//       type: "ProductionLog",
//       list: true,
//       resolve: (item, _, ctx) => {
//         return ctx.prisma.productionLog.findMany({
//           where: { orderItem: { id: item.id } },
//         });
//       },
//     });
//   },
// });

// export const AddressInput = inputObjectType({
//   name: "AddressInput",
//   definition(t) {
//     t.string("street");
//     t.string("number");
//     t.string("city");
//     t.string("state");
//     t.string("postNumber");
//     t.boolean("isPrimary");
//   },
// });

// export const UpdateAddressInput = inputObjectType({
//   name: "UpdateAddressInput",
//   definition(t) {
//     t.id("id");
//     t.string("street");
//     t.string("number");
//     t.string("city");
//     t.string("state");
//     t.string("postNumber");
//     t.boolean("isPrimary");
//   },
// });

// export const ProductionLogType = enumType({
//   name: "ProductionLogType",
//   members: ["PRINT", "PRODUCTION"],
// });

// export const ProductionLog = objectType({
//   name: "ProductionLog",
//   definition(t) {
//     t.model.id();
//     t.model.orderItem();
//     t.model.action();
//     t.model.pieces();
//     t.model.createdAt();
//     t.model.createdBy();
//   },
// });
