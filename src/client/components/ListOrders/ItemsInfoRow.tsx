import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

import { GetAllOrders_getAllOrders_items_items as Item } from "../../__generated__/types";
import { Colors } from "../../themeVariables";

const Divider = styled.span`
  color: ${Colors.LIGHT_GRAY1};
  margin: 0 5px;
`;

interface Props {
  items: Item[];
  totalSize: number;
}

export const ItemsInfoRow: React.FC<Props> = ({ items, totalSize }) => {
  const { t } = useTranslation();
  const allMaterialNames = items.map((item) => item.material?.name);
  const distinctMaterials = [...new Set(allMaterialNames)].filter(
    (item) => item
  );
  const totalItems = items.reduce((acc, curr) => {
    acc += curr.pieces ?? 0;
    return acc;
  }, 0);

  return (
    <>
      {t("{{count}} pcs.", { count: totalItems })}
      <Divider>|</Divider>
      {totalSize} m<sup>2</sup>
      <Divider>|</Divider>
      {distinctMaterials.length > 0 && distinctMaterials.join(", ")}
    </>
  );
};
