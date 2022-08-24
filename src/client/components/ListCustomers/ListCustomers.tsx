/* eslint-disable  @typescript-eslint/camelcase */
import React from "react";
import { useTranslation } from "react-i18next";
import { RightCircleOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useQuery } from "@apollo/client";
import { TFunction } from "i18next";
import { ColumnProps } from "antd/lib/table";

import {
  GetAllCustomers,
  GetAllCustomersVariables,
  GetAllCustomers_getAllCustomers_items,
} from "../../__generated__/types";
import { PageTitle } from "../MainWrapper/MainWrapper.styles";
import { PaginatedTable } from "../PaginatedTable/PaginatedTable";

import { GET_ALL_CUSTOMERS_QUERY } from "./queries";
import Link from "next/link";

const PAGE_SIZE = 10;

const getColumns = (
  t: TFunction
): ColumnProps<GetAllCustomers_getAllCustomers_items>[] => [
  {
    title: t("Company name"),
    ellipsis: true,
    dataIndex: "name",
    render: (_, record) => {
      return <Link href={`/customers/${record.id}`}>{record.name}</Link>;
    },
  },
  {
    title: t("Identification number"),
    width: 150,
    ellipsis: true,
    dataIndex: "identificationNumber",
  },
  {
    title: t("Contact person name"),
    width: 250,
    ellipsis: true,
    dataIndex: "personName",
  },
  {
    title: t("Email"),
    width: 150,
    ellipsis: true,
    dataIndex: "email",
  },
  {
    title: t("Phone"),
    width: 150,
    ellipsis: true,
    dataIndex: "phone",
  },
  {
    key: "actions",
    width: 50,
    render: (_, record) => {
      return (
        <Link href={`/customers/${record.id}`}>
          <Button icon={<RightCircleOutlined />} type="link"></Button>
        </Link>
      );
    },
  },
];

export const ListCustomers: React.FC = () => {
  const { t } = useTranslation();

  const { data, loading, fetchMore, refetch } = useQuery<
    GetAllCustomers,
    GetAllCustomersVariables
  >(GET_ALL_CUSTOMERS_QUERY, {
    variables: { first: PAGE_SIZE },
    fetchPolicy: "network-only",
  });

  const searchHandler = (searchValue: string) => {
    refetch({ first: PAGE_SIZE, search: searchValue });
  };

  const paginationChangedHandler = (newPageNumber: number) => {
    fetchMore({
      variables: { first: PAGE_SIZE, skip: (newPageNumber - 1) * PAGE_SIZE },
      updateQuery: (_, { fetchMoreResult }) => {
        if (!fetchMoreResult) {
          throw new Error("Failed to load more");
        }
        return fetchMoreResult;
      },
    });
  };

  const items = data?.getAllCustomers.items ?? [];

  return (
    <>
      <PageTitle>{t("Customers")}</PageTitle>
      <PaginatedTable<GetAllCustomers_getAllCustomers_items>
        pageSize={PAGE_SIZE}
        columns={getColumns(t)}
        records={items}
        totalCount={data?.getAllCustomers.totalCount ?? 0}
        onPaginationChange={paginationChangedHandler}
        onSearch={searchHandler}
        loading={loading}
        translations={{
          emptyResult: t("Customers list is empty"),
          search: t("Search customers"),
        }}
      />
    </>
  );
};
