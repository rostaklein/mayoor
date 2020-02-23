import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, message } from 'antd';
import { useMutation } from 'react-apollo';

import { CreateCustomerMutation, CreateCustomerMutationVariables } from '../../__generated__/types';
import { UserFormValues, CustomerForm } from '../CustomerForm/CustomerForm';

import { CREATE_CUSTOMER_MUTATION } from './queries';

const initialValues: UserFormValues = {
	name: '',
	identificationNumber: '',
	taxIdentificationNumber: '',
	personName: '',
	phone: '',
	email: '',
	note: '',
	allowedBankPayments: false,
	addresses: [
		{ isPrimary: true, street: '', city: '', postNumber: '' },
		{ isPrimary: false, street: '', city: '', postNumber: '' },
	],
};

export const NewCustomer: React.FC = () => {
	const { t } = useTranslation();

	const [createCustomer, { loading }] = useMutation<
		CreateCustomerMutation,
		CreateCustomerMutationVariables
	>(CREATE_CUSTOMER_MUTATION);

	const submitHandler = async (values: UserFormValues) => {
		try {
			await createCustomer({ variables: { input: values } });
			message.success(t('customer_created'));
		} catch (err) {
			console.error(err);
			message.error(t('customer_created_fail'));
		}
	};

	return (
		<CustomerForm
			onSubmit={submitHandler}
			initialValues={initialValues}
			submitButton={
				<Button
					type="primary"
					htmlType="submit"
					loading={loading}
					style={{ marginTop: 10 }}
				>
					{t('Add customer')}
				</Button>
			}
		/>
	);
};
