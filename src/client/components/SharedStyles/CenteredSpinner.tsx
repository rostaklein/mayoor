import React from "react";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

import { CenteredWrapper } from "../CenteredWrapper/CenteredWrapper";

export const CenteredSpinner: React.FC = () => (
  <CenteredWrapper style={{ background: "transparent" }}>
    <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
  </CenteredWrapper>
);
