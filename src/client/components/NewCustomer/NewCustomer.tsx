import React from "react";
import { useTranslation } from "react-i18next";
import { Button, message } from "antd";
import { useMutation } from "@apollo/client";

import {
  CreateCustomerMutation,
  CreateCustomerMutationVariables,
} from "../../__generated__/types";
import { UserFormValues, CustomerForm } from "../CustomerForm/CustomerForm";
import { PageTitle } from "../MainWrapper/MainWrapper.styles";

import { CREATE_CUSTOMER_MUTATION } from "./queries";

const initialValues: UserFormValues = {
  name: "",
  identificationNumber: "",
  taxIdentificationNumber: "",
  personName: "",
  phone: "",
  email: "",
  note: "",
  allowedBankPayments: false,
  addresses: [
    { isPrimary: true, street: "", city: "", postNumber: "" },
    { isPrimary: false, street: "", city: "", postNumber: "" },
  ],
};

export const NewCustomer: React.FC = () => {
  const { t } = useTranslation();

  const [createCustomer, { loading }] = useMutation<
    CreateCustomerMutation,
    CreateCustomerMutationVariables
  >(CREATE_CUSTOMER_MUTATION);

  const submitHandler = async (
    values: UserFormValues,
    resetForm: () => void
  ) => {
    try {
      await createCustomer({
        variables: { input: values },
      });
      message.success(t("customer_created"));
      resetForm();
    } catch (err) {
      console.error(err);
      message.error(t("customer_created_fail"));
    }
  };

  return (
    <>
      <PageTitle>{t("Add customer")}</PageTitle>
      <CustomerForm
        onSubmit={submitHandler}
        initialValues={initialValues}
        submitButton={
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            style={{ marginTop: 10 }}
            data-test-id="add-customer-submit-button"
          >
            {t("Add customer")}
          </Button>
        }
      />
    </>
  );
};
