/* eslint-disable  @typescript-eslint/camelcase */
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery, useMutation } from 'react-apollo';
import { Row, Col, Button, Spin } from 'antd';
import { Formik, FormikErrors } from 'formik';

import { PageTitle } from '../MainWrapper/MainWrapper.styles';
import {
	GetAllMaterials,
	GetAllMaterials_getAllMaterials,
	UpdateMaterial,
	UpdateMaterialVariables,
} from '../../__generated__/types';
import { StyledForm, StyledFormLabel } from '../FormItem/Form.styles';
import { FormInput } from '../FormItem/FormInput';

import { GET_ALL_MATERIALS, UPDATE_MATERIAL } from './queries';
import { MaterialEditWrapper } from './MaterialEdit.styles';

export const MaterialEdit: React.FC = () => {
	const { t } = useTranslation();
	const [currentlyLoading, setCurrentlyLoading] = useState<string | null>(null);

	const { data } = useQuery<GetAllMaterials>(GET_ALL_MATERIALS);

	const [updateMaterial] = useMutation<UpdateMaterial, UpdateMaterialVariables>(UPDATE_MATERIAL);

	return (
		<>
			<PageTitle>{t('Material')}</PageTitle>
			<StyledForm>
				<MaterialEditWrapper>
					<Row gutter={24}>
						<Col sm={14}>
							<StyledFormLabel>{t('Material name')}</StyledFormLabel>
						</Col>
						<Col sm={6}>
							<StyledFormLabel>{t('Price')}</StyledFormLabel>
						</Col>
						<Col sm={4}></Col>
					</Row>
					{data?.getAllMaterials.map((material) => (
						<Formik<GetAllMaterials_getAllMaterials>
							key={material.id}
							initialValues={material}
							onSubmit={async (values) => {
								setCurrentlyLoading(material.id);
								await updateMaterial({
									variables: {
										id: material.id,
										name: values.name,
										price: Number(values.price),
									},
								});
								setCurrentlyLoading(null);
							}}
							validate={(values) => {
								const errors: FormikErrors<GetAllMaterials_getAllMaterials> = {};
								if (!values.name) {
									errors.name = t('material_name_empty');
								}
								if (!values.price) {
									errors.price = t('material_price_empty');
								}
								return errors;
							}}
						>
							{({ handleSubmit, status }) => (
								<Row gutter={24}>
									<Col sm={14}>
										<FormInput
											label={t('Material name')}
											name="name"
										></FormInput>
									</Col>
									<Col sm={6}>
										<FormInput label={t('Price')} name="price"></FormInput>
									</Col>
									<Col sm={4}>
										<Button
											type="primary"
											onClick={() => handleSubmit()}
											loading={currentlyLoading === material.id}
										>
											{t('Save')}
											{status}
										</Button>
									</Col>
								</Row>
							)}
						</Formik>
					))}
				</MaterialEditWrapper>
			</StyledForm>
		</>
	);
};
