import React, { useState } from "react";
import { useTranslation } from "next-i18next";
import { RightCircleOutlined } from "@ant-design/icons";
import { Button, Select, Col, Row } from "antd";
import { TFunction } from "i18next";
import { ColumnProps } from "antd/lib/table";

import { PageTitle } from "../MainWrapper/PageTitle";
import { PaginatedTable } from "../PaginatedTable/PaginatedTable";
import { DisplayTime } from "../DisplayTime/DisplayTime";
import { getOrderStatuses } from "../OrderForm/OrderStatusSelect";
import { StyledFormItem, StyledLabel } from "../FormItem/Form.styles";

import { ItemsInfoRow } from "./ItemsInfoRow";
import Link from "next/link";
import {
  OrderDataFragment,
  useGetAllOrdersQuery,
} from "./__generated__/queries.generated";
import { OrderStatus } from "../../generated/gql-types";

const getColumns = (t: TFunction): ColumnProps<OrderDataFragment>[] => [
  {
    title: t("Order nr"),
    dataIndex: "number",
    width: 80,
    render: (_, record) => {
      return <Link href={`/orders/${record.number}`}>{record.number}</Link>;
    },
  },
  {
    title: t("Status"),
    dataIndex: "status",
    width: 160,
    render: (_, record) => {
      const statuses = getOrderStatuses(t);
      return statuses[record.status];
    },
  },
  {
    title: t("Customer"),
    width: 150,
    ellipsis: true,
    dataIndex: "customer.name",
    render: (_, { customer }) =>
      customer && (
        <Link href={`/customers/${customer.id}`}>{customer.name}</Link>
      ),
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
    render: (_, record, i) => {
      return (
        <Link
          href={`/orders/${record.number}`}
          data-test-id={`order-list-go-to-button-${i}`}
        >
          <Button icon={<RightCircleOutlined />} type="link"></Button>
        </Link>
      );
    },
  },
];

type Props = {
  pageSize?: number;
  title?: string;
  customerId?: string;
};

const DEFAULT_PAGE_SIZE = 10;

export const ListOrders: React.FC<Props> = ({
  pageSize = DEFAULT_PAGE_SIZE,
  title,
  customerId,
}) => {
  const { t } = useTranslation();
  const [hasFilterActive, setHasFilterActive] = useState(false);

  const { data, loading, fetchMore, refetch } = useGetAllOrdersQuery({
    variables: { first: pageSize, customerId },
    fetchPolicy: "cache-and-network",
  });

  const paginationChangedHandler = (newPageNumber: number) => {
    fetchMore({
      variables: { first: pageSize, skip: (newPageNumber - 1) * pageSize },
      updateQuery: (_, { fetchMoreResult }) => {
        if (!fetchMoreResult) {
          throw new Error("Failed to load more");
        }
        return fetchMoreResult;
      },
    });
  };

  const handleFilterStatusChange = (status: OrderStatus | "") => {
    if (status === "") {
      setHasFilterActive(false);
      return refetch({ first: pageSize, status: undefined });
    }
    setHasFilterActive(true);
    refetch({ first: pageSize, status });
  };

  const items = data?.getAllOrders.items ?? [];

  const statuses = getOrderStatuses(t);

  return (
    <>
      <Row>
        <Col md={18}>
          <PageTitle doNotUseAsTitle={!!title}>
            {title || t("List orders")}
          </PageTitle>
        </Col>
        <Col xs={24} md={6}>
          <StyledFormItem style={{ marginTop: 10, marginRight: 25 }}>
            <StyledLabel>{t("Filter by status")}</StyledLabel>
            <Select
              style={{ width: "100%" }}
              defaultValue=""
              onChange={handleFilterStatusChange}
            >
              <Select.Option value="">
                {t("Without status filter")}
              </Select.Option>
              {Object.entries(statuses).map(([value, label]) => (
                <Select.Option key={value} value={value}>
                  {label}
                </Select.Option>
              ))}
            </Select>
          </StyledFormItem>
        </Col>
      </Row>
      <PaginatedTable<OrderDataFragment>
        columns={getColumns(t)}
        records={items}
        totalCount={data?.getAllOrders.totalCount ?? 0}
        onPaginationChange={paginationChangedHandler}
        loading={loading}
        pageSize={pageSize}
        translations={{
          emptyResult: hasFilterActive
            ? t("No orders found matching this filter.")
            : t("Order list is empty"),
          search: t("Search customers"),
        }}
      />
    </>
  );
};
