import { OrderFormValues } from '../OrderForm/OrderForm';
import { GetOrder } from '../../__generated__/types';

export const mapToOrderFormValues = (data?: GetOrder): OrderFormValues | undefined => {
	const order = data?.getOrder;

	if (!order) {
		return;
	}

	const { items, customer, ...rest } = order;
	return {
		customerId: customer?.id,
		items: items.map((item) => ({
			id: item.id,
			materialId: item.material?.id,
			name: item.name ?? undefined,
			width: item.width ?? undefined,
			height: item.height ?? undefined,
			pieces: item.pieces ?? undefined,
			totalPrice: item.totalPrice ?? undefined,
			totalTax: item.totalTax ?? undefined,
		})),
		...rest,
		note: rest.note ?? undefined,
	};
};
