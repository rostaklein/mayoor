import React from "react";
import { Button, message } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";
import { useTranslation } from "next-i18next";
import { useMutation } from "@apollo/client";

import {
  OrderStatus,
  ProductionLogType,
  UpdateOrderStatus,
  UpdateOrderStatusVariables,
} from "../../__generated__/types";

import { UPDATE_ORDER_STATUS } from "./queries";

interface Props {
  productionLogType: ProductionLogType;
  orderStatus: OrderStatus;
  orderId: string;
}

export const UpdateStatusButton: React.FC<Props> = ({
  productionLogType,
  orderId,
  orderStatus,
}) => {
  const { t } = useTranslation();

  const [updateOrderStatus] = useMutation<
    UpdateOrderStatus,
    UpdateOrderStatusVariables
  >(UPDATE_ORDER_STATUS);

  const getIsButtonDisabled = () => {
    if (
      productionLogType === ProductionLogType.PRINT &&
      orderStatus === OrderStatus.READY_TO_PRINT
    ) {
      return false;
    }
    if (
      productionLogType === ProductionLogType.PRODUCTION &&
      orderStatus === OrderStatus.WAITING_FOR_PRODUCTION
    ) {
      return false;
    }
    return true;
  };

  const getNextStatus = (): OrderStatus | undefined => {
    if (productionLogType === ProductionLogType.PRINT) {
      return OrderStatus.WAITING_FOR_PRODUCTION;
    }
    if (productionLogType === ProductionLogType.PRODUCTION) {
      return OrderStatus.TO_BE_SHIPPED;
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
