import { objectType, stringArg, queryField, nonNull } from "nexus";
import { getInfoFromAres } from "./getInfoFromAres";

const CustomerHelperInfo = objectType({
  name: "CustomerHelperInfo",
  definition(t) {
    t.string("identificationNumber");
    t.string("taxIdentificationNumber");
    t.string("name");
    t.string("street");
    t.string("city");
    t.string("postNumber");
  },
});

export const GetCustomerHelperInfo = queryField("getCustomerHelperInfo", {
  type: CustomerHelperInfo,
  args: {
    partialIdentificationNumber: nonNull(stringArg()),
  },
  resolve: (_parent, args) => {
    return getInfoFromAres(args.partialIdentificationNumber);
  },
});
