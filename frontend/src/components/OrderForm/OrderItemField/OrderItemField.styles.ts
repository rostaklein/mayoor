import styled from '@emotion/styled';
import { Row } from 'antd';

export const StyledItemNumber = styled.div`
	padding: 6px 4px;
	font-weight: 600;
	position: absolute;
	right: 100%;
`;

export const MaterialColumn = styled.div`
	position: relative;
`;

export const WiderInputWrapper = styled.div`
	.ant-input-affix-wrapper {
		padding: 4px 8px;
	}
	input {
		&::-webkit-outer-spin-button,
		&::-webkit-inner-spin-button {
			-webkit-appearance: none;
		}
		-moz-appearance: textfield;
	}
`;

export const HiddenDeleteButton = styled.div`
	position: absolute;
	top: 0;
	right: 0;
	transform: translateX(20px);
	opacity: 0;
	transition: all 0.2s;
`;

export const StyledOrderRow = styled(Row)`
	position: relative;
	&:hover,
	&:focus,
	&:active {
		${HiddenDeleteButton} {
			opacity: 1;
			transform: translateX(30px);
		}
	}
`;
