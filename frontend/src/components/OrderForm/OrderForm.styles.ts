import styled from '@emotion/styled';

import { Colors } from '../../themeVariables';

export const StyledOrderNumberWrapper = styled.div`
	.ant-input-affix-wrapper,
	.ant-input {
		background-color: ${Colors.LIGHT_GRAY4};
	}
`;

export const OrderSummaryWrapper = styled.div`
	padding-left: 4px;
	padding-right: 4px;
	background-color: ${Colors.LIGHT_GRAY5};
	padding: 10px 15px;
	border-left: solid 5px ${Colors.PRIMARY};
`;
