import React from "react";
import { useTranslation } from "next-i18next";
import { SaveOutlined } from "@ant-design/icons";
import { Row, Col, Button, message } from "antd";
import { Formik } from "formik";
import { TFunction } from "i18next";
import * as Yup from "yup";

import { StyledLabel, StyledDivider } from "../FormItem/Form.styles";
import { FormInput } from "../FormItem/FormInput";

import { UserRoleSelect } from "./UserRoleSelect";
import {
  GetAllUsersDocument,
  useCreateUserMutation,
} from "./__generated__/queries.generated";

import { UserRole } from "@client/generated/gql-types";

export const getUserValidationSchema = (t: TFunction) =>
  Yup.object().shape({
    email: Yup.string().required(t("field_required")),
    password: Yup.string().required(t("field_required")),
    name: Yup.string().required(t("field_required")),
    role: Yup.string().required(t("field_required")),
  });

type FormValue = {
  email: string;
  password: string;
  name: string;
  role: UserRole;
};

export const UserCreate: React.FC = () => {
  const { t } = useTranslation();

  const [createUser] = useCreateUserMutation({
    onCompleted: () => {
      message.success(t("User created"));
    },
    refetchQueries: [{ query: GetAllUsersDocument }],
  });

  return (
    <>
      <StyledDivider orientation="left">{t("Add new user")}</StyledDivider>
      <Row gutter={18}>
        <Col sm={4}>
          <StyledLabel>{t("Login email")}</StyledLabel>
        </Col>
        <Col sm={4}>
          <StyledLabel>{t("Password")}</StyledLabel>
        </Col>
        <Col sm={6}>
          <StyledLabel>{t("User Name")}</StyledLabel>
        </Col>
        <Col sm={4}>
          <StyledLabel>{t("Role")}</StyledLabel>
        </Col>
        <Col sm={4}></Col>
      </Row>
      <Formik<FormValue>
        initialValues={{
          name: "",
          password: "",
          email: "",
          role: UserRole.Factory,
        }}
        onSubmit={async (values) =>
          await createUser({
            variables: {
              input: {
                email: values.email,
                name: values.name,
                password: values.password,
                role: values.role,
              },
            },
          })
        }
        validationSchema={getUserValidationSchema(t)}
      >
        {({ handleSubmit }) => (
          <Row gutter={18}>
            <Col sm={4}>
              <FormInput label={t("Login email")} name="email"></FormInput>
            </Col>
            <Col sm={4}>
              <FormInput
                label={t("Password")}
                name="password"
                type="password"
              ></FormInput>
            </Col>
            <Col sm={6}>
              <FormInput label={t("User Name")} name="name"></FormInput>
            </Col>
            <Col sm={4}>
              <UserRoleSelect />
            </Col>
            <Col sm={3}>
              <Button
                icon={<SaveOutlined />}
                onClick={() => handleSubmit()}
                style={{ width: "100%" }}
                type="primary"
              >
                {t("Add")}
              </Button>
            </Col>
          </Row>
        )}
      </Formik>
    </>
  );
};
