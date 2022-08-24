import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";

import LogoImage from "../../images/mayoor_logo.svg";
import { Logout } from "../Logout/Logout";
import { UserOverlay } from "../UserOverlay/UserOverlay";
import { MainMenu } from "../MainMenu/MainMenu";
import { LanguageSwitch } from "../LanguageSwitch/LanguageSwitch";
import { NewCustomer } from "../NewCustomer/NewCustomer";
import { ListCustomers } from "../ListCustomers/ListCustomers";
import { DetailCustomer } from "../DetailCustomer/DetailCustomer";
import { MaterialEdit } from "../Material/MaterialEdit";
import { NewOrder } from "../NewOrder/NewOrder";
import { ListOrders } from "../ListOrders/ListOrders";
import { DetailOrder } from "../DetailOrder/DetailOrder";
import { ListOrdersProduction } from "../ListOrdersProduction/ListOrdersProduction";
import { OrderStatus, ProductionLogType } from "../../__generated__/types";
import { DetailOrderProduction } from "../DetailOrderProduction/DetailOrderProduction";
import { UserEdit } from "../Users/UserEdit";

import * as S from "./MainWrapper.styles";

type RouteConfig = {
  path: string;
  title: string;
  Component?: React.ReactElement;
};

type Props = {
  children?: React.ReactNode;
};

export const MainWrapper: React.FC<Props> = ({ children }) => {
  const { t, i18n } = useTranslation();
  // const location = useLocation();

  const routes: RouteConfig[] = [
    { path: "/orders/inprogress", title: t("In Progress") },
    { path: "/orders/new", title: t("Add order"), Component: <NewOrder /> },
    {
      path: "/orders/list",
      title: t("List orders"),
      Component: <ListOrders />,
    },
    {
      path: "/orders/print",
      title: t("Orders to be printed"),
      Component: (
        <ListOrdersProduction
          status={OrderStatus.READY_TO_PRINT}
          title={t("To be printed")}
          linkSuffix="print"
        />
      ),
    },
    {
      path: "/orders/production",
      title: t("Waiting for production"),
      Component: (
        <ListOrdersProduction
          status={OrderStatus.WAITING_FOR_PRODUCTION}
          title={t("Waiting for production")}
          linkSuffix="production"
        />
      ),
    },
    {
      path: "/orders/:id/print",
      title: t("Order detail"),
      Component: (
        <DetailOrderProduction
          productionLogType={ProductionLogType.PRINT}
          productionButtonText={t("Printed")}
        />
      ),
    },
    {
      path: "/orders/:id/production",
      title: t("Order detail"),
      Component: (
        <DetailOrderProduction
          productionLogType={ProductionLogType.PRODUCTION}
          productionButtonText={t("Finished")}
        />
      ),
    },
    {
      path: "/orders/:id",
      title: t("Order detail"),
      Component: <DetailOrder />,
    },
    {
      path: "/customers/new",
      title: t("Add customer"),
      Component: <NewCustomer />,
    },
    {
      path: "/customers/list",
      title: t("Customers"),
      Component: <ListCustomers />,
    },
    {
      path: "/customers/:id",
      title: t("Customer detail"),
      Component: <DetailCustomer />,
    },
    { path: "/materials", title: t("Material"), Component: <MaterialEdit /> },
    {
      path: "/users",
      title: t("Users administration"),
      Component: <UserEdit />,
    },
  ];

  return (
    <S.BodyWrapper data-test-id="main-body-wrapper">
      <S.Aside>
        <S.LogoWrapper>
          <S.Logo src={LogoImage} />
        </S.LogoWrapper>
        <MainMenu />
      </S.Aside>
      <S.Main>
        <S.StyledNavbar>
          <UserOverlay />
          <LanguageSwitch />
          <Logout />
        </S.StyledNavbar>
        <S.Content>{children}</S.Content>
      </S.Main>
    </S.BodyWrapper>
  );
};
