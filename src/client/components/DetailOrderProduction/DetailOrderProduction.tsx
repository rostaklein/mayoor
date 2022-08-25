import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuery, useMutation } from "@apollo/client";
import { Button, message, Row, Col, Skeleton, Input } from "antd";
import { SaveOutlined } from "@ant-design/icons";

import {
  GetOrder,
  GetOrderVariables,
  UpdateOrderNote,
  UpdateOrderNoteVariables,
  AddProductionLog,
  AddProductionLogVariables,
  ProductionLogType,
} from "../../__generated__/types";
import { PageTitle } from "../MainWrapper/PageTitle";
import { DetailDescription } from "../DetailDescription/DetailDescription";
import { GET_ORDER } from "../DetailOrder/queries";
import { StyledLabel, StyledFormItem } from "../FormItem/Form.styles";

import { OrderWrapper } from "./DetailOrderProduction.styles";
import { ADD_PRODUCTION_LOG_MUTATION, UPDATE_ORDER_NOTE } from "./queries";
import { ProductionRow } from "./ProductionRow";
import { UpdateStatusButton } from "./UpdateStatusButton";

type Props = {
  productionLogType: ProductionLogType;
  productionButtonText: string;
  orderNumber: number | null;
};

export const DetailOrderProduction: React.FC<Props> = ({
  productionLogType,
  productionButtonText,
  orderNumber,
}) => {
  const { t } = useTranslation();
  const [noteValue, setNoteValue] = useState<string | undefined | null>();

  const { data } = useQuery<GetOrder, GetOrderVariables>(GET_ORDER, {
    variables: { number: orderNumber },
    onCompleted: (data) => {
      setNoteValue(data.getOrderByNumber?.note);
    },
  });

  const [updateOrderNote] = useMutation<
    UpdateOrderNote,
    UpdateOrderNoteVariables
  >(UPDATE_ORDER_NOTE);
  const [addProductionLog] = useMutation<
    AddProductionLog,
    AddProductionLogVariables
  >(ADD_PRODUCTION_LOG_MUTATION);

  const updateNoteHandler = async () => {
    const id = data?.getOrderByNumber?.id;
    if (!id) {
      return;
    }
    try {
      await updateOrderNote({
        variables: {
          id,
          note: noteValue,
        },
      });
      message.success(t("note_updated"));
    } catch (err) {
      console.error(err);
      message.error(t("note_update_fail"));
    }
  };

  const productionButtonHandler = (pieces: number, orderItemId: string) => {
    addProductionLog({
      variables: { orderItemId, pieces, action: productionLogType },
    });
  };

  if (!data || !data.getOrderByNumber) {
    return (
      <PageTitle>
        <Skeleton active />
      </PageTitle>
    );
  }

  return (
    <>
      <PageTitle>
        {t("Order #{{number}}", {
          number: data?.getOrderByNumber?.number,
        })}
      </PageTitle>
      <DetailDescription
        createdAt={data?.getOrderByNumber?.createdAt}
        createdByName={data?.getOrderByNumber?.createdBy.name}
        updatedAt={data?.getOrderByNumber?.updatedAt}
      ></DetailDescription>
      <OrderWrapper>
        <Row gutter={12}>
          <Col sm={4}>
            <StyledLabel>{t("Material")}</StyledLabel>
          </Col>
          <Col sm={4}>
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
          <Col sm={2}>
            <StyledLabel>{t("Printed pcs")}</StyledLabel>
          </Col>
          <Col sm={2}>
            <StyledLabel>{t("Production done pcs")}</StyledLabel>
          </Col>
          <Col sm={5}></Col>
        </Row>
        {data.getOrderByNumber.items.map((item) => (
          <ProductionRow
            key={item.id}
            item={item}
            onProductionClick={productionButtonHandler}
            productionButtonText={productionButtonText}
          />
        ))}
        <Row gutter={32}>
          <Col sm={12}>
            <StyledFormItem>
              <StyledLabel>{t("Note")}</StyledLabel>
              <Input.TextArea
                rows={4}
                name="note"
                placeholder={t("note_placeholder")}
                onChange={(e) => setNoteValue(e.target.value)}
                value={noteValue || ""}
              />
              <Button icon={<SaveOutlined />} onClick={updateNoteHandler}>
                {t("Save note")}
              </Button>
            </StyledFormItem>
          </Col>
          <Col sm={12}>
            <Row justify="end" style={{ marginTop: 20 }}>
              <UpdateStatusButton
                orderId={data.getOrderByNumber.id}
                productionLogType={productionLogType}
                orderStatus={data.getOrderByNumber.status}
              />
            </Row>
          </Col>
        </Row>
      </OrderWrapper>
    </>
  );
};
