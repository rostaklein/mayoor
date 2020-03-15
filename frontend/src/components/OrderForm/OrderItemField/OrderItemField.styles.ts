import styled from '@emotion/styled';

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
