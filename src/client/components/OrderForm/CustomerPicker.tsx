import React from "react";
import { useTranslation } from "next-i18next";
import { Select } from "antd";
import { UserOutlined } from "@ant-design/icons";
import styled from "styled-components";
import debounce from "lodash/debounce";
import { useField } from "formik";

import { StyledFormItem, StyledLabel } from "../FormItem/Form.styles";

import { useFindCustomerQuery } from "./__generated__/queries.generated";

const StyledSubName = styled.span`
  &:before {
    content: " | ";
  }
  font-size: 12px;
  opacity: 0.5;
`;

export type CustomerOption = {
  id: string;
  name?: string | null;
  identificationNumber?: string | null;
};

export const CustomerPicker: React.FC<{
  extraCustomer: CustomerOption | null;
}> = ({ extraCustomer }) => {
  const { t } = useTranslation();
  const [{ value }, { touched, error }, { setValue }] = useField("customerId");
  const errorMessage = touched && error;
  const status = errorMessage ? "error" : "";

  const { data, loading, refetch } = useFindCustomerQuery({
    fetchPolicy: "network-only",
  });

  const searchHandler = (search: string) => {
    refetch({ search });
  };

  const debouncedSearchHandler = debounce(searchHandler, 500);

  const customers = data?.getAllCustomers?.items ?? [];

  const renderCustomerOption = (customer: CustomerOption) => {
    return (
      <Select.Option key={customer.id} value={customer.id}>
        <UserOutlined style={{ marginRight: 5 }}></UserOutlined>
        <span>{customer.name}</span>{" "}
        {customer.identificationNumber && (
          <StyledSubName>{customer.identificationNumber}</StyledSubName>
        )}
      </Select.Option>
    );
  };

  return (
    <StyledFormItem validateStatus={status} help={errorMessage}>
      <StyledLabel>{t("Customer")}</StyledLabel>
      <Select
        filterOption={false}
        onChange={(value) => setValue(value)}
        placeholder={t("Select a customer")}
        onSearch={debouncedSearchHandler}
        showSearch
        value={value}
        loading={loading}
        allowClear
        notFoundContent={t("Not found")}
        data-test-id="customer-picker"
      >
        {extraCustomer && renderCustomerOption(extraCustomer)}
        {customers.map(renderCustomerOption)}
      </Select>
    </StyledFormItem>
  );
};
