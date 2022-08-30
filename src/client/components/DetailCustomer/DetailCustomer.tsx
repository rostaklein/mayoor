import React, { useEffect } from "react";
import { useTranslation } from "next-i18next";
import { Button, message, Skeleton, Row, Col, Popconfirm } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

import { UserFormValues, CustomerForm } from "../CustomerForm/CustomerForm";
import { PageTitle } from "../MainWrapper/PageTitle";
import { DetailDescription } from "../DetailDescription/DetailDescription";
import { OrderActionsWrapper } from "../SharedStyles/OrderActions";
import { ListOrders } from "../ListOrders/ListOrders";

import { useRouter } from "next/router";
import {
  useDeleteCustomerMutation,
  useGetCustomerQuery,
  useUpdateCustomerMutation,
} from "./__generated__/queries.generated";

export const DetailCustomer: React.FC<{ customerId: string }> = ({
  customerId,
}) => {
  const { push } = useRouter();
  const { t } = useTranslation();
  const { data } = useGetCustomerQuery({
    variables: { id: customerId },
  });

  const [updateCustomer, { loading }] = useUpdateCustomerMutation();
  const [deleteCustomer, { loading: deleteLoading }] =
    useDeleteCustomerMutation();

  useEffect(() => {
    document.title = `${data?.getCustomer?.name} | mayoor`;
  }, [data?.getCustomer]);

  const submitHandler = async (values: UserFormValues) => {
    try {
      const {
        name,
        identificationNumber,
        taxIdentificationNumber,
        personName,
        email,
        phone,
        note,
        allowedBankPayments,
        addresses,
      } = values;

      await updateCustomer({
        variables: {
          input: {
            id: customerId,
            name,
            identificationNumber,
            taxIdentificationNumber,
            personName,
            email,
            phone,
            note,
            allowedBankPayments,
            addresses: data?.getCustomer?.addresses.map((addr, i) => {
              const { street, city, postNumber, isPrimary } = addresses[i];
              return { id: addr.id, street, city, postNumber, isPrimary };
            }),
          },
        },
      });
      message.success(t("customer_updated"));
    } catch (err) {
      console.error(err);
      message.error(t("customer_update_fail"));
    }
  };

  const handleCustomerDelete = async () => {
    const id = data?.getCustomer?.id;
    if (!id) {
      return;
    }
    try {
      await deleteCustomer({ variables: { id } });
      message.info(t("customer_deleted"));
      push(`/customers/list`);
    } catch (err) {
      console.error(err);
      message.error(t("customer_delete_fail"));
    }
  };

  if (!data || !data.getCustomer) {
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
          <PageTitle>{data.getCustomer.name}</PageTitle>
        </Col>
        <Col sm={12}>
          <Row justify="end">
            <OrderActionsWrapper>
              <Popconfirm
                title={t("Are you sure want to remove this customer?")}
                onConfirm={handleCustomerDelete}
                placement="topRight"
                okText={t("Delete")}
                okType="danger"
              >
                <Button
                  icon={<DeleteOutlined />}
                  loading={deleteLoading}
                  data-test-id="customer-delete-button"
                >
                  {t("Delete")}
                </Button>
              </Popconfirm>
            </OrderActionsWrapper>
          </Row>
        </Col>
      </Row>
      <DetailDescription
        createdAt={data.getCustomer.createdAt}
        createdByName={data.getCustomer.createdBy.name}
        updatedAt={data.getCustomer.updatedAt}
      ></DetailDescription>
      <CustomerForm
        onSubmit={submitHandler}
        submitButton={
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            style={{ marginTop: 10 }}
            data-test-id="save-customer"
          >
            {t("Save customer")}
          </Button>
        }
        initialValues={data.getCustomer}
      />
      <ListOrders
        title={t("Customers orders")}
        pageSize={5}
        customerId={customerId}
      />
    </>
  );
};
