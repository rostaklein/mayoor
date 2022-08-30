import React from "react";
import { useTranslation } from "next-i18next";
import { RightCircleOutlined } from "@ant-design/icons";
import { Button, Tooltip } from "antd";
import { TFunction } from "i18next";
import { ColumnProps } from "antd/lib/table";
import styled from "styled-components";

import { PageTitle } from "../MainWrapper/PageTitle";
import { PaginatedTable } from "../PaginatedTable/PaginatedTable";
import { DisplayTime } from "../DisplayTime/DisplayTime";
import { getUrgentOptions } from "../OrderForm/UrgentSlider";
import { ItemsInfoRow } from "../ListOrders/ItemsInfoRow";
import Link from "next/link";
import {
  GetAllOrdersQueryVariables,
  OrderDataFragment,
  useGetAllOrdersQuery,
} from "../ListOrders/__generated__/queries.generated";
import { OrderByArg, OrderStatus } from "../../generated/gql-types";

const PAGE_SIZE = 10;

const UrgentDot = styled.div<{ color: string | undefined }>`
  width: 10px;
  height: 10px;
  border-radius: 100%;
  background-color: ${({ color }) => color};
`;

const getColumns = (
  t: TFunction,
  linkSuffix: "production" | "print"
): ColumnProps<OrderDataFragment>[] => [
  {
    width: 25,
    ellipsis: true,
    dataIndex: "urgency",
    render: (_, record) => {
      const urgency = getUrgentOptions(t);
      const activeUrgentOption = urgency.find(
        (option) => option.value === record.urgency
      );
      return (
        <Tooltip title={activeUrgentOption?.label}>
          <UrgentDot color={activeUrgentOption?.color} />
        </Tooltip>
      );
    },
  },
  {
    title: t("Order nr"),
    dataIndex: "number",
    width: 80,
    render: (_, record) => {
      return (
        <Link href={`/orders/${record.number}/${linkSuffix}`}>
          {record.number}
        </Link>
      );
    },
  },
  {
    title: t("Items info"),
    ellipsis: true,
    dataIndex: "items",
    render: (_, { items, totalSize }) => (
      <ItemsInfoRow items={items} totalSize={totalSize} />
    ),
  },
  {
    title: t("Created at"),
    width: 200,
    ellipsis: true,
    dataIndex: "createdAt",
    render: (_, { createdAt }) => <DisplayTime date={createdAt} />,
  },
  {
    key: "actions",
    width: 40,
    render: (_, record) => {
      return (
        <Link href={`/orders/${record.number}/${linkSuffix}`}>
          <Button icon={<RightCircleOutlined />} type="link"></Button>
        </Link>
      );
    },
  },
];

export const ListOrdersProduction: React.FC<{
  status: OrderStatus.ReadyToPrint | OrderStatus.WaitingForProduction;
  title: string;
  linkSuffix: "production" | "print";
}> = ({ status, title, linkSuffix }) => {
  const { t } = useTranslation();

  const commonVariables: GetAllOrdersQueryVariables = {
    first: PAGE_SIZE,
    status,
    orderByUrgency: OrderByArg.Desc,
  };

  const { data, loading, fetchMore } = useGetAllOrdersQuery({
    variables: commonVariables,
    fetchPolicy: "network-only",
  });

  const paginationChangedHandler = (newPageNumber: number) => {
    fetchMore({
      variables: { ...commonVariables, skip: (newPageNumber - 1) * PAGE_SIZE },
      updateQuery: (_, { fetchMoreResult }) => {
        if (!fetchMoreResult) {
          throw new Error("Failed to load more");
        }
        return fetchMoreResult;
      },
    });
  };

  const items = data?.getAllOrders.items ?? [];

  return (
    <>
      <PageTitle>{title}</PageTitle>
      <PaginatedTable<OrderDataFragment>
        pageSize={PAGE_SIZE}
        columns={getColumns(t, linkSuffix)}
        records={items}
        totalCount={data?.getAllOrders.totalCount ?? 0}
        onPaginationChange={paginationChangedHandler}
        loading={loading}
        translations={{
          emptyResult: t("Order list is empty"),
          search: t("Search orders"),
        }}
      />
    </>
  );
};
