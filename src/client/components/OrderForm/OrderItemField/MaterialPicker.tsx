import React, { useState } from "react";
import { useTranslation } from "next-i18next";
import { Select } from "antd";
import { useQuery } from "@apollo/client";
import { useField } from "formik";

import { StyledFormItem } from "../../FormItem/Form.styles";
import {
  GetAllMaterials,
  GetAllMaterials_getAllMaterials,
} from "../../../__generated__/types";
import { GET_ALL_MATERIALS } from "../../Material/queries";

export const MaterialPicker: React.FC<{ name: string }> = ({ name }) => {
  const { t } = useTranslation();
  const [filteredItems, setFilteredItems] = useState<
    GetAllMaterials_getAllMaterials[]
  >([]);
  const [{ value }, { touched, error }, { setValue }] = useField(name);
  const errorMessage = touched && error;
  const status = errorMessage ? "error" : "";

  const { data, loading } = useQuery<GetAllMaterials>(GET_ALL_MATERIALS, {
    onCompleted: (data) => {
      if (value === null) {
        setValue(data.getAllMaterials[0].id);
      }
    },
  });

  const materials = data?.getAllMaterials ?? [];

  const searchHandler = (search: string) => {
    setFilteredItems(
      materials.filter(({ name }) =>
        name.toLowerCase().includes(search.toLowerCase())
      )
    );
  };

  const hasFilteredItems = filteredItems.length > 0;
  return (
    <StyledFormItem validateStatus={status} help={errorMessage}>
      <Select
        filterOption={false}
        onChange={(value) => setValue(value)}
        placeholder={t("Select material")}
        showSearch
        onSearch={searchHandler}
        value={value}
        loading={loading}
        allowClear
        notFoundContent={t("No material found")}
        data-test-id={name}
      >
        {(hasFilteredItems ? filteredItems : materials).map((material) => (
          <Select.Option key={material.id} value={material.id}>
            {material.name}
          </Select.Option>
        ))}
      </Select>
    </StyledFormItem>
  );
};
