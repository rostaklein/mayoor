import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Button, InputGroup } from '@blueprintjs/core';

const StyledInputGroup = styled(InputGroup)``;

const CenteredWrapper = styled.div`
	padding: 30px 25px;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const LoginWrapper = styled.div`
	width: 320px;
	display: flex;
	flex-direction: column;
	${StyledInputGroup} {
		margin-bottom: 10px;
	}
`;

export const LoginForm: React.FC = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const onUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setUsername(event.target.value);
	};
	const onPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(event.target.value);
	};
	return (
		<CenteredWrapper>
			<LoginWrapper>
				<StyledInputGroup
					leftIcon="user"
					placeholder={'Username'}
					large
					fill
					onChange={onUsernameChange}
				/>
				<StyledInputGroup
					leftIcon="lock"
					placeholder={'Password'}
					large
					fill
					type="password"
					onChange={onPasswordChange}
				/>
				<Button intent="primary" icon={'log-in'} type="submit" fill large>
					Log In
				</Button>
			</LoginWrapper>
		</CenteredWrapper>
	);
};
