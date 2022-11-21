import React, { useEffect } from "react";
import { useTranslation } from "next-i18next";
import { Button, message, Row, Col, Popconfirm, Skeleton } from "antd";
import {
  DeleteOutlined,
  BgColorsOutlined,
  HighlightOutlined,
} from "@ant-design/icons";
import ButtonGroup from "antd/lib/button/button-group";
import { useRouter } from "next/router";
import Link from "next/link";

import { PageTitle } from "../MainWrapper/PageTitle";
import { OrderForm, OrderFormValues } from "../OrderForm/OrderForm";
import { CenteredSpinner } from "../SharedStyles/CenteredSpinner";
import { DetailDescription } from "../DetailDescription/DetailDescription";
import { OrderActionsWrapper } from "../SharedStyles/OrderActions";
import { ValidatedOrder } from "../OrderForm/validateOrder";

import { mapToOrderFormValues } from "./mapToOrderFormValues";
import {
  useDeleteOrderMutation,
  useGetOrderQuery,
  useUpdateOrderMutation,
} from "./__generated__/queries.generated";

export const DetailOrder: React.FC<{ orderNumber: number }> = ({
  orderNumber,
}) => {
  const { push } = useRouter();
  const { t } = useTranslation();

  const { data } = useGetOrderQuery({
    variables: { number: orderNumber },
  });

  const orderTitle = t("Order #{{number}} {{customerName}}", {
    number: data?.getOrderByNumber?.number,
    customerName: data?.getOrderByNumber?.customer?.name,
  });

  useEffect(() => {
    document.title = `${orderTitle} | mayoor`;
  }, [orderTitle]);

  const initialValues = mapToOrderFormValues(data);

  const [updateOrder, { loading }] = useUpdateOrderMutation();
  const [deleteOrder, { loading: deleteLoading }] = useDeleteOrderMutation();

  const submitHandler = async (orderValues: OrderFormValues) => {
    const { number, __typename, createdAt, updatedAt, createdBy, id, ...rest } =
      orderValues as unknown as ValidatedOrder; // gets triggered only when form is valid

    if (!id) {
      return;
    }
    try {
      await updateOrder({
        variables: {
          id,
          input: rest,
        },
      });
      message.success(t("order_updated"));
    } catch (err) {
      console.error(err);
      message.error(t("order_update_fail"));
    }
  };

  const handleOrderDelete = async () => {
    const id = data?.getOrderByNumber?.id;
    if (!id) {
      return;
    }
    try {
      await deleteOrder({ variables: { id } });
      message.info(t("order_deleted"));
      push(`/orders/list`);
    } catch (err) {
      console.error(err);
      message.error(t("order_delete_fail"));
    }
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
      <Row>
        <Col sm={12}>
          <PageTitle>{orderTitle}</PageTitle>
        </Col>
        <Col sm={12}>
          <Row justify="end">
            <OrderActionsWrapper>
              <ButtonGroup>
                <Link href={`/orders/${data.getOrderByNumber.number}/print`}>
                  <Button icon={<BgColorsOutlined />}>{t("Print view")}</Button>
                </Link>
                <Link
                  href={`/orders/${data.getOrderByNumber.number}/production`}
                >
                  <Button icon={<HighlightOutlined />}>
                    {t("Production view")}
                  </Button>
                </Link>
                <Popconfirm
                  title={t("Are you sure want to remove this order?")}
                  onConfirm={handleOrderDelete}
                  placement="topRight"
                  okText={t("Delete")}
                  okType="danger"
                >
                  <Button
                    icon={<DeleteOutlined />}
                    loading={deleteLoading}
                    data-test-id="order-delete-button"
                  >
                    {t("Delete")}
                  </Button>
                </Popconfirm>
              </ButtonGroup>
            </OrderActionsWrapper>
          </Row>
        </Col>
      </Row>
      <DetailDescription
        createdAt={data?.getOrderByNumber?.createdAt}
        createdByName={data?.getOrderByNumber?.createdBy.name}
        updatedAt={data?.getOrderByNumber?.updatedAt}
      ></DetailDescription>
      {initialValues ? (
        <OrderForm
          initialValues={initialValues}
          onSubmit={submitHandler}
          extraCustomer={data?.getOrderByNumber?.customer ?? null}
          isNumberEditable={false}
          submitButton={
            <Button
              type="primary"
              htmlType="submit"
              style={{ marginTop: 10 }}
              loading={loading}
              data-test-id="save-order-submit-button"
            >
              {t("Save order")}
            </Button>
          }
        />
      ) : (
        <CenteredSpinner />
      )}
    </>
  );
};
