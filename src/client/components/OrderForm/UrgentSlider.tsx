import React, { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { Slider } from "antd";
import { useField } from "formik";
import { TFunction } from "i18next";
import styled from "styled-components";

import { StyledFormItem, StyledLabel } from "../FormItem/Form.styles";

type UrgentOptions = {
  value: number;
  label: string;
  color: string;
};

export const getUrgentOptions = (t: TFunction): UrgentOptions[] => {
  return [
    { value: 0, label: t("Not Urgent"), color: "#aaa" },
    { value: 1, label: t("Normal"), color: "#1abb9c" },
    { value: 2, label: t("Hurry"), color: "#ffec05" },
    { value: 3, label: t("Urgent"), color: "#ff991b" },
    { value: 4, label: t("Very Urgent"), color: "#ff1b1b" },
  ];
};

const StyledSliderWrapper = styled.div<{ color?: string }>`
  .ant-slider-handle {
    background-color: ${({ color }) => color};
    border-color: ${({ color }) => color};
  }
  .ant-slider:hover .ant-slider-handle:not(.ant-tooltip-open) {
    border-color: ${({ color }) => color};
  }
  label {
    font-size: 12px;
    white-space: nowrap;
  }
`;

export const UrgentSlider: React.FC = () => {
  const { t } = useTranslation();
  const [{ value }, { touched, error }, { setValue }] = useField("urgency");
  const errorMessage = touched && error;
  const status = errorMessage ? "error" : "";

  const urgentOptions = getUrgentOptions(t);
  const marks = urgentOptions.reduce<{ [key: number]: ReactNode | undefined }>(
    (acc, curr, i) => {
      acc[i] = value === i ? <label>{curr.label}</label> : undefined;
      return acc;
    },
    {}
  );

  const activeUrgentOption = urgentOptions.find(
    (option) => option.value === value
  );

  return (
    <StyledFormItem validateStatus={status} help={errorMessage}>
      <StyledLabel>{t("Urgency")}</StyledLabel>
      <StyledSliderWrapper color={activeUrgentOption?.color}>
        <Slider
          min={0}
          max={4}
          marks={marks}
          value={value}
          onChange={setValue}
          tooltipVisible={false}
        ></Slider>
      </StyledSliderWrapper>
    </StyledFormItem>
  );
};
