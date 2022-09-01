// import { rule, shield, or } from "graphql-shield";
// import { ApolloError } from "apollo-server-micro";
// import { IRuleFunction } from "graphql-shield/dist/types";

// import { Context } from "../context";
// import { NexusGenEnums } from "../generated/nexus";

// const getCheckUserRole =
//   (role: NexusGenEnums["UserRole"]): IRuleFunction =>
//   async (parent, args, context: Context) => {
//     const { id } = await context.user.getCurrentUser();
//     const user = await context.prisma.user.findUnique({ where: { id } });
//     return user?.role === role;
//   };

// const rules = {
//   notProtected: rule()(() => {
//     return true;
//   }),
//   isAuthenticatedUser: rule()(async (parent, args, context: Context) => {
//     try {
//       await context.user.getCurrentUser();
//       return true;
//     } catch (err) {
//       return false;
//     }
//   }),
//   isFactory: rule()(getCheckUserRole("FACTORY")),
//   isAdministration: rule()(getCheckUserRole("ADMINISTRATION")),
//   isExecutive: rule()(getCheckUserRole("EXECUTIVE")),
// };

// export const permissions = shield(
//   {
//     Query: {
//       "*": rules.isAuthenticatedUser,
//       getAllUsers: rules.isExecutive,
//     },
//     Mutation: {
//       "*": rules.isAuthenticatedUser,
//       addProductionLog: rules.isAuthenticatedUser,
//       changePassword: rules.isAuthenticatedUser,
//       createCustomer: or(rules.isAdministration, rules.isExecutive),
//       createMaterial: rules.isExecutive,
//       createOrder: or(rules.isAdministration, rules.isExecutive),
//       deleteCustomer: or(rules.isAdministration, rules.isExecutive),
//       deleteMaterial: rules.isExecutive,
//       deleteOrder: or(rules.isAdministration, rules.isExecutive),
//       login: rules.notProtected,
//       addUser: rules.isExecutive,
//       updateUser: rules.isExecutive,
//       deleteUser: rules.isExecutive,
//       updateCustomer: or(rules.isAdministration, rules.isExecutive),
//       updateMaterial: rules.isExecutive,
//       updateOrder: or(rules.isAdministration, rules.isExecutive),
//       updateOrderNote: rules.isAuthenticatedUser,
//       updateOrderStatus: rules.isAuthenticatedUser,
//     },
//   },
//   {
//     allowExternalErrors: true,
//     fallbackError: new ApolloError("Not Authorized!", "NOT_AUTHORIZED"),
//   }
// );
