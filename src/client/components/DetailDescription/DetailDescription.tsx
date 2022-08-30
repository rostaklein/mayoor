import React from "react";
import styled from "styled-components";
import { Descriptions } from "antd";
import { UserOutlined, CalendarOutlined } from "@ant-design/icons";
import { useTranslation } from "next-i18next";
import { useDateFormatter } from "../../hooks/useDateFormatter";

const StyledDescriptions = styled(Descriptions)`
  padding: 0 35px;
  .ant-descriptions-item-label,
  .ant-descriptions-item-content {
    font-size: 12px;
  }
  .anticon {
    margin-right: 3px;
  }
`;

type Props = {
  createdByName?: string | null;
  createdAt?: string;
  updatedAt?: string;
};

export const DetailDescription: React.FC<Props> = ({
  createdByName,
  createdAt,
  updatedAt,
}) => {
  const { t } = useTranslation();
  const { f } = useDateFormatter();
  return (
    <StyledDescriptions>
      <Descriptions.Item label={t("Created By")} key="createdBy">
        <UserOutlined />
        {createdByName}
      </Descriptions.Item>
      <Descriptions.Item label={t("Created At")} key="createdAt">
        {createdAt && (
          <>
            <CalendarOutlined /> {f(createdAt, "datetime")}
          </>
        )}
      </Descriptions.Item>
      <Descriptions.Item label={t("Last Updated At")} key="lastUpdatedAt">
        {updatedAt && (
          <>
            <CalendarOutlined /> {f(updatedAt, "datetime")}
          </>
        )}
      </Descriptions.Item>
    </StyledDescriptions>
  );
};
