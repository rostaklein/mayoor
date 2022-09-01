import React from "react";
import { Row, Col, Button } from "antd";
import { Formik } from "formik";
import { useTranslation } from "next-i18next";

import { StyledLabel, StyledDivider } from "../FormItem/Form.styles";
import { FormInput } from "../FormItem/FormInput";

import { getFormikValidate } from "./MaterialEdit";
import {
  GetAllMaterialsDocument,
  useCreateMaterialMutation,
} from "./__generated__/queries.generated";

export const MaterialCreate: React.FC = () => {
  const { t } = useTranslation();

  const [createMaterial, { loading }] = useCreateMaterialMutation({
    refetchQueries: [{ query: GetAllMaterialsDocument }],
  });

  return (
    <>
      <StyledDivider orientation="left">{t("Add new material")}</StyledDivider>
      <Row gutter={24}>
        <Col sm={14}>
          <StyledLabel>{t("Material name")}</StyledLabel>
        </Col>
        <Col sm={6}>
          <StyledLabel>{t("Price")}</StyledLabel>
        </Col>
        <Col sm={4}></Col>
      </Row>
      <Formik<{ name: string; price: number }>
        initialValues={{
          name: "",
          price: 0,
        }}
        onSubmit={async (values) => {
          await createMaterial({
            variables: {
              name: values.name,
              price: Number(values.price),
            },
          });
        }}
        validate={getFormikValidate(t)}
      >
        {({ handleSubmit }) => (
          <Row gutter={18}>
            <Col sm={14}>
              <FormInput label={t("Material name")} name="name"></FormInput>
            </Col>
            <Col sm={5}>
              <FormInput label={t("Price")} name="price"></FormInput>
            </Col>
            <Col sm={5}>
              <Button
                type="primary"
                onClick={() => handleSubmit()}
                loading={loading}
                style={{ width: "100%" }}
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
