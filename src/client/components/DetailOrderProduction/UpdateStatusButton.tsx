import React from "react";
import { Button, message } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";
import { useTranslation } from "next-i18next";

import { useUpdateOrderStatusMutation } from "./__generated__/queries.generated";

import { OrderStatus, ProductionLogAction } from "@client/generated/gql-types";

interface Props {
  productionLogType: ProductionLogAction;
  orderStatus: OrderStatus;
  orderId: string;
}

export const UpdateStatusButton: React.FC<Props> = ({
  productionLogType,
  orderId,
  orderStatus,
}) => {
  const { t } = useTranslation();

  const [updateOrderStatus] = useUpdateOrderStatusMutation();

  const getIsButtonDisabled = () => {
    if (
      productionLogType === ProductionLogAction.Print &&
      orderStatus === OrderStatus.ReadyToPrint
    ) {
      return false;
    }
    if (
      productionLogType === ProductionLogAction.Production &&
      orderStatus === OrderStatus.WaitingForProduction
    ) {
      return false;
    }
    return true;
  };

  const getNextStatus = (): OrderStatus | undefined => {
    if (productionLogType === ProductionLogAction.Print) {
      return OrderStatus.WaitingForProduction;
    }
    if (productionLogType === ProductionLogAction.Production) {
      return OrderStatus.ToBeShipped;
    }
  };

  const markAsDoneHandler = async () => {
    const status = getNextStatus();
    if (!status) {
      return;
    }

    try {
      await updateOrderStatus({
        variables: {
          id: orderId,
          status,
        },
      });
      message.success(t("order_updated"));
    } catch (err) {
      console.error(err);
      message.error(t("order_update_failed"));
    }
  };

  return (
    <Button
      type="primary"
      icon={<CheckCircleOutlined />}
      onClick={markAsDoneHandler}
      disabled={getIsButtonDisabled()}
    >
      {t("Mark order as done")}
    </Button>
  );
};
