import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export async function getStaticTranslations(req) {
  console.log({ req });
  return {
    props: {
      ...(await serverSideTranslations(req.locale, ["common"], null)),
      // Will be passed to the page component as props
    },
  };
}
