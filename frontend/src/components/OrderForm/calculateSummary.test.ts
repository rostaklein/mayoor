import { calculateSummary } from './calculateSummary';

describe(calculateSummary.name, () => {
	it('calculates zeros when empty array of items provided', () => {
		const result = calculateSummary({ number: 123, items: [] });
		expect(result).toEqual({
			totalPrice: 0,
			totalTax: 0,
		});
	});
	it('summarizes all the items correctly', () => {
		const result = calculateSummary({
			number: 123,
			items: [
				{ totalTax: 120, totalPrice: 200 },
				{ totalTax: 50, totalPrice: 150 },
			],
		});
		expect(result).toEqual({
			totalPrice: 350,
			totalTax: 170,
		});
	});
});
