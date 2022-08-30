import React from "react";
import { useTranslation } from "next-i18next";
import { TFunction } from "i18next";
import { Select } from "antd";
import { useField } from "formik";

import { StyledFormItem } from "../FormItem/Form.styles";
import { UserRole } from "../../generated/gql-types";

export const getUserRoleNames = (
  t: TFunction
): { [key in UserRole]: string } => ({
  FACTORY: t("Factory"),
  ADMINISTRATION: t("Administration"),
  EXECUTIVE: t("Executive"),
});

export const UserRoleSelect: React.FC = () => {
  const { t } = useTranslation();

  const [{ value }, { touched, error }, { setValue }] = useField("role");
  const errorMessage = touched && error;
  const status = errorMessage ? "error" : "";
  const userRoleNames = getUserRoleNames(t);

  return (
    <StyledFormItem validateStatus={status} help={errorMessage}>
      <Select
        filterOption={false}
        onChange={(value) => setValue(value)}
        placeholder={t("Order status")}
        showSearch
        value={value}
        allowClear
        notFoundContent={t("Not found")}
      >
        {Object.entries(userRoleNames).map(([key, label]) => (
          <Select.Option key={key} value={key}>
            {label}
          </Select.Option>
        ))}
      </Select>
    </StyledFormItem>
  );
};
