import React from 'react';
import { useTranslation } from 'react-i18next';
import { FormGroup, InputGroup, Button } from '@blueprintjs/core';

import { Wrapper, Half, Row } from './NewCustomer.styles';

export const NewCustomer: React.FC = () => {
	const { t } = useTranslation();
	return (
		<Wrapper>
			<Half>
				<FormGroup label={t('Company name')}>
					<InputGroup placeholder={t('Company name')} />
				</FormGroup>
				<Row>
					<Half>
						<FormGroup label={t('Identification number')}>
							<InputGroup
								placeholder={t('Identification number')}
								leftIcon="annotation"
								rightElement={<Button icon="search" intent="primary" />}
							/>
						</FormGroup>
					</Half>
					<Half>
						<FormGroup label={t('Tax identification number')}>
							<InputGroup
								placeholder={t('Tax identification number')}
								leftIcon="bank-account"
							/>
						</FormGroup>
					</Half>
				</Row>
			</Half>
			<Half />
		</Wrapper>
	);
};
