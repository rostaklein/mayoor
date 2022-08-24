import { useTranslation } from 'react-i18next';

export const useDateFormatter = () => {
	const { i18n } = useTranslation();

	const dateFormatter = (date: string, style: 'datetime' | 'time' | 'date'): string => {
		if (style === 'datetime') {
			return new Date(date).toLocaleDateString(i18n.language, {
				year: 'numeric',
				month: 'long',
				day: 'numeric',
				hour: 'numeric',
				minute: 'numeric',
			});
		}
		if (style === 'time') {
			return new Date(date).toLocaleDateString(i18n.language, {
				hour: 'numeric',
				minute: 'numeric',
			});
		}
		return new Date(date).toLocaleDateString(i18n.language, {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
		});
	};

	return { f: dateFormatter };
};
