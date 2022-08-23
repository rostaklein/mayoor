import React from "react";
import { useTranslation } from "react-i18next";
import { Button, message } from "antd";
import { useQuery, useMutation } from "@apollo/client";
import { ArrowRightOutlined } from "@ant-design/icons";

import { PageTitle } from "../MainWrapper/MainWrapper.styles";
import {
  OrderForm,
  OrderFormValues,
  OrderFormItem,
} from "../OrderForm/OrderForm";
import {
  GetHighestOrderNumber,
  CreateOrder,
  CreateOrderVariables,
  OrderStatus,
} from "../../__generated__/types";
import { ValidatedOrder } from "../OrderForm/validateOrder";

import { GET_HIGHEST_ORDER_NUMBER, CREATE_ORDER } from "./queries";
import { useRouter } from "next/router";

export const dummyMaterialItem: OrderFormItem = {
  materialId: undefined,
  name: "test",
  pieces: 1,
  width: 2,
  height: 1,
  totalPrice: 100,
  totalTax: 20,
};

const getInitialValues = (orderNumber: number | null): OrderFormValues => ({
  number: orderNumber,
  urgency: 1,
  status: OrderStatus.NEW,
  customerId: undefined,
  totalPrice: 200,
  totalTax: 20,
  note: "",
  items: [dummyMaterialItem],
});

export const NewOrder: React.FC = () => {
  const { t } = useTranslation();
  const { push } = useRouter();

  const highestOrderNumberQuery = useQuery<GetHighestOrderNumber>(
    GET_HIGHEST_ORDER_NUMBER
  );
  const [createOrder, { loading }] = useMutation<
    CreateOrder,
    CreateOrderVariables
  >(CREATE_ORDER, {
    onError: (err) => {
      if (err.graphQLErrors[0].extensions?.code === "ORDER_NUMBER_EXISTS") {
        message.error(t("order_number_exists"));
      }
    },
    onCompleted: (data) => {
      message.success(
        <>
          {t("Order number {{number}} created", {
            number: data.createOrder.number,
          })}{" "}
          <Button
            type="link"
            icon={<ArrowRightOutlined />}
            onClick={() => push(`/orders/${data.createOrder.number}`)}
          ></Button>
        </>
      );
    },
  });

  const submitHandler = async (rawValues: OrderFormValues) => {
    const { number, ...rest } = rawValues as ValidatedOrder; // gets triggered only when form is valid
    await createOrder({
      variables: {
        number,
        input: rest,
      },
    });
    highestOrderNumberQuery.refetch();
  };

  const newOrderNumber = highestOrderNumberQuery.data
    ? (highestOrderNumberQuery.data.getHighestOrderNumber || 0) + 1
    : null;

  return (
    <>
      <PageTitle>{t("Add order")}</PageTitle>
      <OrderForm
        initialValues={getInitialValues(newOrderNumber)}
        onSubmit={submitHandler}
        extraCustomer={null}
        isNumberEditable={true}
        submitButton={
          <Button
            type="primary"
            htmlType="submit"
            style={{ marginTop: 10 }}
            loading={loading}
            data-test-id="add-order-submit-button"
          >
            {t("Add order")}
          </Button>
        }
      />
    </>
  );
};
