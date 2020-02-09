import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Button, InputGroup } from '@blueprintjs/core';
import { useMutation } from 'react-apollo';

import {
	LoginMutation as LoginMutationType,
	LoginMutationVariables,
} from '../../__generated__/types';

import { LoginMutation } from './queries';

const StyledInputGroup = styled(InputGroup)``;

const CenteredWrapper = styled.div`
	padding: 30px 25px;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const LoginWrapper = styled.form`
	width: 240px;
	display: flex;
	flex-direction: column;
	${StyledInputGroup} {
		margin-bottom: 10px;
	}
`;

export const LoginForm: React.FC = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const [login] = useMutation<LoginMutationType, LoginMutationVariables>(LoginMutation);
	const onUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setUsername(event.target.value);
	};
	const onPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(event.target.value);
	};

	const submitHandler = async () => {
		try {
			const result = await login({ variables: { email: username, password } });
			console.log(result.data?.login);
		} catch (err) {
			console.error(err);
		}
	};

	const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		submitHandler();
	};

	return (
		<CenteredWrapper>
			<LoginWrapper onSubmit={onFormSubmit}>
				<StyledInputGroup
					leftIcon="user"
					placeholder={'Username'}
					fill
					onChange={onUsernameChange}
				/>
				<StyledInputGroup
					leftIcon="lock"
					placeholder={'Password'}
					fill
					type="password"
					onChange={onPasswordChange}
				/>
				<Button intent="primary" icon={'log-in'} type="submit" fill>
					Log In
				</Button>
			</LoginWrapper>
		</CenteredWrapper>
	);
};
