import { objectType, stringArg, queryField } from "nexus";
import { getInfoFromAres } from "./getInfoFromAres";

const CustomerHelperInfo = objectType({
  name: "CustomerHelperInfo",
  definition(t) {
    t.string("identificationNumber", { nullable: true });
    t.string("taxIdentificationNumber", { nullable: true });
    t.string("name", { nullable: true });
    t.string("street", { nullable: true });
    t.string("city", { nullable: true });
    t.string("postNumber", { nullable: true });
  },
});

export const GetCustomerHelperInfo = queryField("getCustomerHelperInfo", {
  type: CustomerHelperInfo,
  args: {
    partialIdentificationNumber: stringArg({ nullable: false }),
  },
  resolve: (_parent, args) => {
    return getInfoFromAres(args.partialIdentificationNumber);
  },
});
