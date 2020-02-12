import React from 'react';
import { Button, ControlGroup, Popover, Icon } from '@blueprintjs/core';
import { useTranslation } from 'react-i18next';

export const LanguageSwitch: React.FC = () => {
	const { i18n } = useTranslation();

	const handleLanguageChange = (language: string) => {
		localStorage.setItem('default-language', language);
		i18n.changeLanguage(language);
	};
	return (
		<Popover
			content={
				<ControlGroup vertical={false}>
					{[
						{ code: 'en', languageName: 'English' },
						{ code: 'cs', languageName: 'Čeština' },
					].map(({ code, languageName }) => (
						<Button
							key={code}
							onClick={() => handleLanguageChange(code)}
							disabled={i18n.language === code}
							small
						>
							{languageName}
						</Button>
					))}
				</ControlGroup>
			}
			position="bottom"
			target={<Icon icon="globe" color="gray" />}
		/>
	);
};
