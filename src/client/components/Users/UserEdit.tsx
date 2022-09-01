import React from "react";
import { useTranslation } from "next-i18next";
import { DeleteOutlined, SaveOutlined } from "@ant-design/icons";
import { Button, Col, Popconfirm, Row, message } from "antd";
import { Formik } from "formik";
import { TFunction } from "i18next";
import * as Yup from "yup";

import { PageTitle } from "../MainWrapper/PageTitle";
import { StyledForm, StyledLabel } from "../FormItem/Form.styles";
import { FormInput } from "../FormItem/FormInput";
import { MaterialEditWrapper } from "../Material/MaterialEdit.styles";

import { UserRoleSelect } from "./UserRoleSelect";
import { UserCreate } from "./UserCreate";
import {
  GetAllUsersDocument,
  UserDataFragment,
  useDeleteUserMutation,
  useGetAllUsersQuery,
  useUpdateUserMutation,
} from "./__generated__/queries.generated";

export const getUserValidationSchema = (t: TFunction) =>
  Yup.object().shape({
    email: Yup.string().required(t("field_required")),
    name: Yup.string().required(t("field_required")),
    role: Yup.string().required(t("field_required")),
  });

type FormikValues = UserDataFragment & { password?: string };

export const UserEdit: React.FC = () => {
  const { t } = useTranslation();

  const { data } = useGetAllUsersQuery();

  const [updateUser, { loading }] = useUpdateUserMutation({
    onCompleted: () => {
      message.success(t("User updated"));
    },
    onError: (err) => {
      message.error(t(err.message));
    },
  });
  const [deleteUser] = useDeleteUserMutation({
    onCompleted: () => {
      message.success(t("User deleted"));
    },
    refetchQueries: [
      {
        query: GetAllUsersDocument,
      },
    ],
  });

  return (
    <>
      <PageTitle>{t("Users")}</PageTitle>
      <StyledForm>
        <MaterialEditWrapper>
          <>
            <Row gutter={18}>
              <Col sm={4}>
                <StyledLabel>{t("Login email")}</StyledLabel>
              </Col>
              <Col sm={4}>
                <StyledLabel>{t("Change password")}</StyledLabel>
              </Col>
              <Col sm={6}>
                <StyledLabel>{t("User Name")}</StyledLabel>
              </Col>
              <Col sm={4}>
                <StyledLabel>{t("Role")}</StyledLabel>
              </Col>
              <Col sm={4}></Col>
            </Row>
            {data?.getAllUsers?.map((user) => (
              <Formik<FormikValues>
                key={user.id}
                initialValues={{ ...user, password: undefined }}
                onSubmit={async (values) => {
                  await updateUser({
                    variables: {
                      id: user.id,
                      input: {
                        email: values.email,
                        name: values.name,
                        role: values.role,
                        password: values.password || undefined,
                      },
                    },
                  });
                }}
                validationSchema={getUserValidationSchema(t)}
              >
                {({ handleSubmit }) => (
                  <Row gutter={18}>
                    <Col sm={4}>
                      <FormInput
                        label={t("Login email")}
                        name="email"
                      ></FormInput>
                    </Col>
                    <Col sm={4}>
                      <FormInput
                        label={t("New Password")}
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
                        onClick={() => handleSubmit()}
                        loading={loading}
                        icon={<SaveOutlined />}
                        style={{ width: "100%" }}
                      >
                        {t("Save")}
                      </Button>
                    </Col>
                    <Col sm={1} style={{ textAlign: "right" }}>
                      <Popconfirm
                        placement="topRight"
                        onConfirm={() =>
                          deleteUser({ variables: { id: user.id } })
                        }
                        title={t("Do you really want to remove this user?")}
                      >
                        <Button
                          shape="circle"
                          icon={<DeleteOutlined />}
                        ></Button>
                      </Popconfirm>
                    </Col>
                  </Row>
                )}
              </Formik>
            ))}
            <UserCreate />
          </>
        </MaterialEditWrapper>
      </StyledForm>
    </>
  );
};
