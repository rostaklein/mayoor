import React from 'react';
import { Button } from '@blueprintjs/core';

import { useAppDispatch } from '../../appContext/context';

export const Logout: React.FC = () => {
	const dispatch = useAppDispatch();

	const onLogoutClick = () => {
		localStorage.removeItem('auth-token');
		dispatch({ type: 'SET_CURRENT_USER', user: null });
	};
	return <Button onClick={onLogoutClick}>Log Out</Button>;
};
