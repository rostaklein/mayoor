import styled from '@emotion/styled';
import { Form, Divider } from 'antd';

import { Colors } from '../../themeVariables';

export const StyledForm = styled(Form)`
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
`;

export const StyledFormLabel = styled.label`
	font-weight: bold;
	text-transform: uppercase;
	color: ${Colors.GRAY4};
	margin-bottom: 4px;
	display: inline-block;
`;
