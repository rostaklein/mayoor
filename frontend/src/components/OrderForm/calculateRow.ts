import { TAX } from '../../config';

type Params = {
	width?: number;
	height?: number;
	pieces?: number;
	unitPrice?: number;
};

export const calculateRow = ({ width, height, pieces, unitPrice }: Params) => {
	if (
		width === undefined ||
		height === undefined ||
		pieces === undefined ||
		unitPrice === undefined
	) {
		throw new Error('All parameters need to be defined');
	}

	const size = width * height;
	const totalSize = Math.ceil(size * pieces * 10) / 10;
	const price = Math.ceil(totalSize * unitPrice);
	const tax = Math.ceil(price * TAX);

	return { price, tax };
};
