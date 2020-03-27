/* eslint-disable  @typescript-eslint/camelcase */
import React, { useState } from 'react';
import { Row, Col, Button, Select, Input } from 'antd';
import { PrinterOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

import { GetOrder_getOrderByNumber_items } from '../../__generated__/types';

interface Props {
	item: GetOrder_getOrderByNumber_items;
	onProductionClick: (pieces: number, orderItemId: string) => void;
	productionButtonText: string;
}

export const ProductionRow: React.FC<Props> = ({
	item,
	onProductionClick,
	productionButtonText,
}) => {
	const { t } = useTranslation();
	const [pieces, setPieces] = useState<number>();

	const productionButtonClickHandler = () => {
		if (pieces) {
			onProductionClick(pieces, item.id);
		}
		setPieces(undefined);
	};
	return (
		<Row gutter={12} key={item.id} style={{ marginBottom: 10 }}>
			<Col sm={4}>{item.material?.name}</Col>
			<Col sm={4}>{item.name}</Col>
			<Col sm={2}>{item.width} m</Col>
			<Col sm={2}>{item.height} m</Col>
			<Col sm={2}>{item.pieces}</Col>
			<Col sm={2}>{item.printedPieces}</Col>
			<Col sm={2}>{item.producedPieces}</Col>
			<Col sm={6}>
				<Row gutter={12} justify="end">
					<Col sm={12}>
						<Input
							type="number"
							suffix={t('pcs')}
							value={pieces}
							min={1}
							max={item.pieces ?? 1}
							onChange={(e) => setPieces(Number(e.target.value))}
							onKeyDown={(e) => e.key === 'Enter' && productionButtonClickHandler()}
						/>
					</Col>
					<Col sm={12}>
						<Button
							icon={<PrinterOutlined />}
							onClick={productionButtonClickHandler}
							style={{ width: '100%' }}
						>
							{productionButtonText}
						</Button>
					</Col>
				</Row>
			</Col>
		</Row>
	);
};
