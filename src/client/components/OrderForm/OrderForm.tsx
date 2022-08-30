import React from "react";
import { useTranslation } from "next-i18next";
import { Formik, FieldArray } from "formik";
import { Row, Col, Button, Input } from "antd";
import {
  NumberOutlined,
  PlusCircleOutlined,
  CalculatorOutlined,
} from "@ant-design/icons";

import {
  StyledForm,
  StyledLabel,
  StyledDivider,
  StyledFormItem,
} from "../FormItem/Form.styles";
import { FormInput } from "../FormItem/FormInput";
import { dummyMaterialItem } from "../NewOrder/NewOrder";
import { CURRENCY_SUFFIX } from "../../config";
import { useCurrencyFormatter } from "../../hooks/useCurrencyFormatter";

import { CustomerPicker, CustomerOption } from "./CustomerPicker";
import { OrderItemField } from "./OrderItemField/OrderItemField";
import { getOrderValidationSchema } from "./validateOrder";
import {
  StyledOrderNumberWrapper,
  OrderSummaryWrapper,
} from "./OrderForm.styles";
import {
  calculateSummary,
  getTotalPriceIncludingTax,
} from "./calculateSummary";
import { OrderStatusSelect } from "./OrderStatusSelect";
import { UrgentSlider } from "./UrgentSlider";
import { OrderStatus } from "../../generated/gql-types";

export type OrderFormItem = {
  id?: string;
  name?: string;
  materialId?: string;
  width?: number;
  height?: number;
  pieces?: number;
  totalPrice?: number;
  totalTax?: number;
};

export type OrderFormValues = {
  number: number | null;
  urgency: number;
  status?: OrderStatus;
  customerId?: string;
  totalPrice?: number;
  totalTax?: number;
  note?: string;
  items: OrderFormItem[];
};

type Props = {
  initialValues: OrderFormValues;
  onSubmit: (values: OrderFormValues, resetForm: () => void) => Promise<void>;
  submitButton: React.ReactNode;
  isNumberEditable: boolean;
  extraCustomer: CustomerOption | null;
};

export const OrderForm: React.FC<Props> = (props) => {
  const { t } = useTranslation();
  const { currencyFormatter } = useCurrencyFormatter();

  return (
    <Formik<OrderFormValues>
      initialValues={props.initialValues}
      onSubmit={async (values, { resetForm }) => {
        await props.onSubmit(values, resetForm);
      }}
      validationSchema={getOrderValidationSchema(t)}
      enableReinitialize
    >
      {({ handleSubmit, values, handleChange, setFieldValue }) => (
        <StyledForm onSubmit={handleSubmit}>
          <Row gutter={8}>
            <Col lg={4}>
              <StyledOrderNumberWrapper>
                <FormInput
                  name="number"
                  label={t("Order number")}
                  icon={<NumberOutlined />}
                  withLabel
                  type="number"
                  disabled={!props.isNumberEditable}
                />
              </StyledOrderNumberWrapper>
            </Col>
            <Col lg={7}>
              <CustomerPicker extraCustomer={props.extraCustomer} />
            </Col>
            <Col lg={6}>
              <OrderStatusSelect />
            </Col>
          </Row>
          <StyledDivider />
          <Row gutter={6}>
            <Col sm={4}>
              <StyledLabel>{t("Material")}</StyledLabel>
            </Col>
            <Col sm={7}>
              <StyledLabel>{t("Name")}</StyledLabel>
            </Col>
            <Col sm={2}>
              <StyledLabel>{t("Width")}</StyledLabel>
            </Col>
            <Col sm={2}>
              <StyledLabel>{t("Height")}</StyledLabel>
            </Col>
            <Col sm={2}>
              <StyledLabel>{t("Pieces")}</StyledLabel>
            </Col>
            <Col sm={1}></Col>
            <Col sm={3}>
              <StyledLabel>{t("Price")}</StyledLabel>
            </Col>
            <Col sm={3}>
              <StyledLabel>{t("Tax")}</StyledLabel>
            </Col>
          </Row>
          <FieldArray
            name="items"
            render={(arrayHelpers) => (
              <>
                {values.items.length > 0 &&
                  values.items.map((item, index) => (
                    <OrderItemField
                      key={item.id || index}
                      index={index}
                      arrayHelpers={arrayHelpers}
                    />
                  ))}
                <Row>
                  <Col>
                    <Button
                      icon={<PlusCircleOutlined />}
                      onClick={() => arrayHelpers.push(dummyMaterialItem)}
                    >
                      {t("Add item")}
                    </Button>
                  </Col>
                  <Col style={{ textAlign: "right" }}>
                    <Button
                      icon={<CalculatorOutlined />}
                      onClick={() => {
                        const { totalPrice, totalTax } =
                          calculateSummary(values);
                        setFieldValue("totalPrice", totalPrice);
                        setFieldValue("totalTax", totalTax);
                      }}
                      style={{ marginLeft: 10 }}
                      data-test-id="order-sum-items-button"
                    >
                      {t("Sum items")}
                    </Button>
                  </Col>
                </Row>
              </>
            )}
          />
          <Row gutter={8} style={{ marginTop: 15 }}>
            <Col sm={10}>
              <StyledFormItem>
                <StyledLabel>{t("Note")}</StyledLabel>
                <Input.TextArea
                  rows={4}
                  name="note"
                  placeholder={t("note_placeholder")}
                  onChange={handleChange}
                  data-test-id="order-form-note"
                  value={values.note || ""}
                />
              </StyledFormItem>
            </Col>
            <Col sm={8}>
              <Row>
                <Col sm={18} offset={3}>
                  <UrgentSlider />
                </Col>
              </Row>
            </Col>
            <Col sm={6}>
              <OrderSummaryWrapper>
                <FormInput
                  name="totalPrice"
                  label={t("Total price")}
                  type="number"
                  suffix={CURRENCY_SUFFIX}
                  withLabel
                />
                <FormInput
                  name="totalTax"
                  label={t("Total tax")}
                  type="number"
                  suffix={CURRENCY_SUFFIX}
                  withLabel
                />
                {!!getTotalPriceIncludingTax(values) && (
                  <div>
                    <StyledLabel>{t("Total price including tax")}</StyledLabel>
                    <span>
                      {currencyFormatter(
                        getTotalPriceIncludingTax(values) || 0
                      )}
                    </span>
                  </div>
                )}
              </OrderSummaryWrapper>
            </Col>
          </Row>
          {props.submitButton}
        </StyledForm>
      )}
    </Formik>
  );
};
