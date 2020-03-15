import { FormikErrors } from 'formik';
import { TFunction } from 'i18next';

import { OrderFormValues, OrderFormItem } from './OrderForm';

export const validateOrderItems = (
	items: OrderFormItem[],
	t: TFunction,
): FormikErrors<OrderFormItem>[] => {
	const numberValidator = (value?: number) => {
		if (value == undefined) {
			return t('field_required');
		}
		if (Number.isNaN(Number(value))) {
			return t('not_number');
		}
	};

	const integerValidator = (value?: number) => {
		const numberError = numberValidator(value);

		const isInteger = Number.isInteger(Number(value));

		return numberError || isInteger ? undefined : t('not_integer');
	};

	return items.map((item) => {
		const materialId = !item.materialId ? t('material_required') : undefined;
		return {
			materialId,
			width: numberValidator(item.width),
			height: numberValidator(item.height),
			totalPrice: numberValidator(item.totalPrice),
			totalTax: numberValidator(item.totalTax),
			pieces: integerValidator(item.pieces),
		};
	});
};

export const validateOrder = (values: OrderFormValues, t: TFunction) => {
	const errors: FormikErrors<OrderFormValues> = {};
	if (!values.number) {
		errors.number = t('missing_order_number');
	}
	errors.items = validateOrderItems(values.items, t);
	return errors;
};
