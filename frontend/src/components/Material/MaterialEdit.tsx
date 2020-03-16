/* eslint-disable  @typescript-eslint/camelcase */
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery, useMutation } from 'react-apollo';
import { DeleteOutlined, SaveOutlined } from '@ant-design/icons';
import { Row, Col, Button, Popconfirm, message } from 'antd';
import { Formik, FormikErrors } from 'formik';
import { TFunction } from 'i18next';

import { PageTitle } from '../MainWrapper/MainWrapper.styles';
import {
	GetAllMaterials,
	GetAllMaterials_getAllMaterials,
	UpdateMaterial,
	UpdateMaterialVariables,
	DeleteMaterial,
	DeleteMaterialVariables,
} from '../../__generated__/types';
import { StyledForm, StyledFormLabel, StyledLabel } from '../FormItem/Form.styles';
import { FormInput } from '../FormItem/FormInput';

import { GET_ALL_MATERIALS, UPDATE_MATERIAL, DELETE_MATERIAL } from './queries';
import { MaterialEditWrapper } from './MaterialEdit.styles';
import { MaterialCreate } from './MaterialCreate';

export const getFormikValidate = (t: TFunction) => (values: { name: string; price: number }) => {
	const errors: FormikErrors<{ name: string; price: number }> = {};
	if (!values.name) {
		errors.name = t('material_name_empty');
	}
	if (!values.price) {
		errors.price = t('material_price_empty');
	}
	return errors;
};

export const MaterialEdit: React.FC = () => {
	const { t } = useTranslation();
	const [currentlyLoading, setCurrentlyLoading] = useState<string | null>(null);

	const { data } = useQuery<GetAllMaterials>(GET_ALL_MATERIALS);

	const [updateMaterial] = useMutation<UpdateMaterial, UpdateMaterialVariables>(UPDATE_MATERIAL, {
		onCompleted: () => {
			message.success(t('Material updated'));
		},
	});
	const [deleteMaterial] = useMutation<DeleteMaterial, DeleteMaterialVariables>(DELETE_MATERIAL, {
		onCompleted: () => {
			message.success(t('Material deleted'));
		},
		update: (cache, { data }) => {
			const cached = cache.readQuery<GetAllMaterials>({ query: GET_ALL_MATERIALS });
			if (cached === null) {
				return;
			}
			const { getAllMaterials } = cached;
			cache.writeQuery<GetAllMaterials>({
				query: GET_ALL_MATERIALS,
				data: {
					getAllMaterials: getAllMaterials.filter(
						({ id }) => id !== data?.deleteMaterial.id,
					),
				},
			});
		},
	});

	return (
		<>
			<PageTitle>{t('Material')}</PageTitle>
			<StyledForm>
				<MaterialEditWrapper>
					<>
						<Row gutter={24}>
							<Col sm={14}>
								<StyledLabel>{t('Material name')}</StyledLabel>
							</Col>
							<Col sm={6}>
								<StyledLabel>{t('Price')}</StyledLabel>
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
								validate={getFormikValidate(t)}
							>
								{({ handleSubmit }) => (
									<Row gutter={18}>
										<Col sm={14}>
											<FormInput
												label={t('Material name')}
												name="name"
											></FormInput>
										</Col>
										<Col sm={5}>
											<FormInput label={t('Price')} name="price"></FormInput>
										</Col>
										<Col sm={3}>
											<Button
												onClick={() => handleSubmit()}
												loading={currentlyLoading === material.id}
												icon={<SaveOutlined />}
												style={{ width: '100%' }}
											>
												{t('Save')}
											</Button>
										</Col>
										<Col sm={1} style={{ textAlign: 'right' }}>
											<Popconfirm
												placement="topRight"
												onConfirm={async () =>
													await deleteMaterial({
														variables: { id: material.id },
													})
												}
												title={t(
													'Do you really want to remove this material?',
												)}
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
						<MaterialCreate />
					</>
				</MaterialEditWrapper>
			</StyledForm>
		</>
	);
};
