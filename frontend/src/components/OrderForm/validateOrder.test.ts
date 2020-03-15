import { validateYupSchema, yupToFormErrors } from 'formik';

import { getOrderValidationSchema } from './validateOrder';
import { OrderFormValues, OrderFormItem } from './OrderForm';

const mockedTFunction = (t: string) => t;

const getFormikErrors = async (formValues: any) => {
	try {
		await validateYupSchema(formValues, getOrderValidationSchema(mockedTFunction));
	} catch (err) {
		return yupToFormErrors<OrderFormValues>(err);
	}
};

describe('Order validation schema', () => {
	it('should not allow empty customerId or order number', async () => {
		const result = await getFormikErrors({ customerId: undefined, number: undefined });
		expect(result).toMatchObject({
			customerId: 'field_required',
			number: 'missing_order_number',
		});
	});

	it('order items should require materialId, width, height, totalPrice, totalTax', async () => {
		const result = await getFormikErrors({ items: [{}] });
		expect(result?.items![0]).toMatchObject({
			materialId: 'field_required',
			width: 'field_required',
			height: 'field_required',
			totalPrice: 'field_required',
			totalTax: 'field_required',
		});
	});

	it('should not allow negative values for width, height, pieces, totalPrice, totalTax', async () => {
		const result = await getFormikErrors({
			items: [{ width: -15, height: -1, pieces: -5, totalPrice: -2, totalTax: -5 }],
		});
		expect(result?.items![0]).toMatchObject({
			width: 'invalid_negative_number',
			height: 'invalid_negative_number',
			totalPrice: 'invalid_negative_number',
			totalTax: 'invalid_negative_number',
			pieces: 'invalid_negative_number',
		});
	});

	it('should not allow float numbers for "pieces"', async () => {
		const result = await getFormikErrors({
			items: [{ pieces: 2.5 }],
		});
		expect(result?.items![0]).toMatchObject({
			pieces: 'not_integer_number',
		});
	});

	it('should return "undefined" when all order item values are valid', async () => {
		const result = await getFormikErrors({
			items: [
				{
					materialId: 'id',
					name: 'test name',
					width: 2,
					height: 1,
					pieces: 5,
					totalPrice: 200,
					totalTax: 50,
				},
			],
		});
		expect(result?.items).toBeUndefined();
	});
});
