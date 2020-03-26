import React from 'react';
import { Row, Col, Button } from 'antd';
import { Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-apollo';

import { StyledLabel, StyledDivider } from '../FormItem/Form.styles';
import {
	GetAllMaterials,
	CreateMaterial,
	CreateMaterialVariables,
} from '../../__generated__/types';
import { FormInput } from '../FormItem/FormInput';

import { CREATE_MATERIAL, GET_ALL_MATERIALS } from './queries';
import { getFormikValidate } from './MaterialEdit';

export const MaterialCreate: React.FC = () => {
	const { t } = useTranslation();

	const [createMaterial, { loading }] = useMutation<CreateMaterial, CreateMaterialVariables>(
		CREATE_MATERIAL,
		{
			update: (cache, { data }) => {
				const cached = cache.readQuery<GetAllMaterials>({ query: GET_ALL_MATERIALS });
				if (cached === null || !data) {
					return;
				}
				const { getAllMaterials } = cached;
				cache.writeQuery<GetAllMaterials>({
					query: GET_ALL_MATERIALS,
					data: {
						getAllMaterials: [...getAllMaterials, data.createMaterial],
					},
				});
			},
		},
	);

	return (
		<>
			<StyledDivider orientation="left">{t('Add new material')}</StyledDivider>
			<Row gutter={24}>
				<Col sm={14}>
					<StyledLabel>{t('Material name')}</StyledLabel>
				</Col>
				<Col sm={6}>
					<StyledLabel>{t('Price')}</StyledLabel>
				</Col>
				<Col sm={4}></Col>
			</Row>
			<Formik<{ name: string; price: number }>
				initialValues={{
					name: '',
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
							<FormInput label={t('Material name')} name="name"></FormInput>
						</Col>
						<Col sm={5}>
							<FormInput label={t('Price')} name="price"></FormInput>
						</Col>
						<Col sm={5}>
							<Button
								type="primary"
								onClick={() => handleSubmit()}
								loading={loading}
								style={{ width: '100%' }}
							>
								{t('Add')}
							</Button>
						</Col>
					</Row>
				)}
			</Formik>
		</>
	);
};
