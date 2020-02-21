import styled from '@emotion/styled';
import { Form, Divider } from 'antd';

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
