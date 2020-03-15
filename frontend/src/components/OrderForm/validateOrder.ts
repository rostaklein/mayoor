import { TFunction } from 'i18next';
import * as Yup from 'yup';

const getNonNegativeRequiredNumberSchema = (t: TFunction) =>
	Yup.number()
		.min(0, t('invalid_negative_number'))
		.required(t('field_required'));

export const getOrderItemValidationSchema = (t: TFunction) => {
	return Yup.object().shape({
		name: Yup.string().required(t('field_required')),
		materialId: Yup.string().required(t('field_required')),
		width: getNonNegativeRequiredNumberSchema(t),
		height: getNonNegativeRequiredNumberSchema(t),
		pieces: Yup.number()
			.min(0, t('invalid_negative_number'))
			.integer(t('not_integer_number'))
			.required(t('field_required')),
		totalPrice: getNonNegativeRequiredNumberSchema(t),
		totalTax: getNonNegativeRequiredNumberSchema(t),
	});
};

export type ValidatedOrderItem = Yup.InferType<ReturnType<typeof getOrderItemValidationSchema>>;

export const getOrderValidationSchema = (t: TFunction) =>
	Yup.object().shape({
		number: Yup.number().required(t('missing_order_number')),
		customerId: Yup.string().required(t('field_required')),
		totalPrice: getNonNegativeRequiredNumberSchema(t),
		totalTax: getNonNegativeRequiredNumberSchema(t),
		items: Yup.array(getOrderItemValidationSchema(t)),
		note: Yup.string().notRequired(),
	});

export type ValidatedOrder = Yup.InferType<ReturnType<typeof getOrderValidationSchema>>;
