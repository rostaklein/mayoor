import { validateOrder, validateOrderItems } from './validateOrder';
import { OrderFormValues, OrderFormItem } from './OrderForm';

const mockedTFunction = (t: string) => t;

describe('Order form validators', () => {
	describe(validateOrder.name, () => {
		const formValues: OrderFormValues = { customerId: undefined, number: '123', items: [] };

		it('should require order number', () => {
			const result = validateOrder({ ...formValues, number: null }, mockedTFunction);
			expect(result.number).toBe('missing_order_number');
		});
	});

	describe(validateOrderItems.name, () => {
		it('should require material id for order item', () => {
			const result = validateOrderItems([{ materialId: undefined }], mockedTFunction);
			expect(result[0].materialId).toBe('material_required');
		});
		it('should require width, height, totalPrice, totalTax', () => {
			const result = validateOrderItems(
				[
					{
						width: undefined,
						height: undefined,
						totalPrice: undefined,
						totalTax: undefined,
					},
				],
				mockedTFunction,
			);
			expect(result[0]).toMatchObject({
				width: 'field_required',
				height: 'field_required',
				totalPrice: 'field_required',
				totalTax: 'field_required',
			});
		});
		it('should return "not_number" when invalid number for width, height, totalPrice, totalTax', () => {
			const result = validateOrderItems(
				[
					({
						width: 'DefinitelyNotNumber',
						height: '1,25',
						totalPrice: 'null',
						totalTax: '1OO 000',
					} as unknown) as OrderFormItem,
				],
				mockedTFunction,
			);
			expect(result[0]).toMatchObject({
				width: 'not_number',
				height: 'not_number',
				totalPrice: 'not_number',
				totalTax: 'not_number',
			});
		});
		it('should return "not_integer" when not an integer for "pieces" field', () => {
			const result = validateOrderItems(
				[
					{
						pieces: 1.25,
					},
				],
				mockedTFunction,
			);
			expect(result[0]).toMatchObject({
				pieces: 'not_integer',
			});
		});
	});
});
