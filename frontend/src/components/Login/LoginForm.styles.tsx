import styled from '@emotion/styled';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';

export const LoginWrapper = styled.form`
	width: 240px;
	min-height: 180px;
	display: flex;
	flex-direction: column;
`;

export const FormItemStyled = styled(Form.Item)`
	margin-bottom: 5px;
`;

export const Logo = styled.img`
	width: 200px;
	margin: 30px auto;
`;

export const LanguageSwitchWrapper = styled.div`
	display: flex;
	justify-content: center;
	margin: 15px;
	button {
		color: gray;
	}
`;
