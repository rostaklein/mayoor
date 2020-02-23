import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useParams } from 'react-router-dom';
import { useQuery } from 'react-apollo';

import { GET_CUSTOMER } from './queries';

export const DetailCustomer: React.FC = () => {
	const routeParams = useParams<{ id: string }>();
	const translator = useTranslation();
	const a = useQuery(GET_CUSTOMER);

	return <div>{routeParams.id}</div>;
};
