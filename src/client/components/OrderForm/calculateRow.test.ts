import { TAX } from '../../config';

import { calculateRow } from './calculateRow';

describe(calculateRow.name, () => {
	it('should not allow any parameter to be undefined', () => {
		expect(() =>
			calculateRow({
				width: undefined,
				height: undefined,
				pieces: undefined,
				unitPrice: undefined,
			}),
		).toThrowError('All parameters need to be defined');
	});

	it('should calculate the price correctly', () => {
		expect(
			calculateRow({
				width: 2,
				height: 1,
				pieces: 5,
				unitPrice: 150,
			}),
		).toEqual({ price: 1500, tax: 1500 * TAX, totalSize: 10 });
	});

	it('should round the price correctly', () => {
		expect(
			calculateRow({
				width: 2.145,
				height: 0.713,
				pieces: 2,
				unitPrice: 100,
			}),
		).toEqual({ price: 310, tax: Math.ceil(310 * TAX), totalSize: 3.1 });
	});
});
