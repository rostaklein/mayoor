import styled from '@emotion/styled';
import { Divider, Form } from 'antd';

import { Colors } from '../../themeVariables';

export const StyledForm = styled.form`
	padding: 15px 25px;
`;

export const StyledDivider = styled(Divider)`
	&.ant-divider-with-text-left {
		font-size: 14px;
		margin: 8px 0;
	}
`;

export const StyledFormItem = styled(Form.Item)`
	margin-bottom: 5px;
	line-height: normal;
	.ant-form-item-control {
		line-height: normal;
		margin-bottom: 8px;
	}
`;

export const StyledLabel = styled.label`
	display: block;
	margin-bottom: 5px;
	font-weight: 600;
`;

export const StyledFormLabel = styled.label`
	font-weight: bold;
	text-transform: uppercase;
	color: ${Colors.GRAY4};
	margin-bottom: 4px;
	display: inline-block;
`;
