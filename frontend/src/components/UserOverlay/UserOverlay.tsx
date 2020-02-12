import React, { useState } from 'react';
import { Button, Dialog } from '@blueprintjs/core';
import styled from '@emotion/styled';

import { useAppState } from '../../appContext/context';

import { ChangePassword } from './ChangePassword';

const DialogContent = styled.div`
	padding: 15px 20px;
	h4 {
		margin-top: 0;
	}
`;

export const UserOverlay: React.FC = () => {
	const [isOpen, setIsOpen] = useState(false);
	const { currentUser } = useAppState();
	return (
		<>
			<Button minimal icon="user" text={currentUser?.name} onClick={() => setIsOpen(true)} />
			<Dialog isOpen={isOpen} onClose={() => setIsOpen(false)} title={currentUser?.name}>
				<DialogContent>
					<ChangePassword />
				</DialogContent>
			</Dialog>
		</>
	);
};
