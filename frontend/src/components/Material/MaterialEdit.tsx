/* eslint-disable  @typescript-eslint/camelcase */
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-apollo';
import { Table } from 'antd';

import { PageTitle } from '../MainWrapper/MainWrapper.styles';
import { GetAllMaterials, GetAllCustomersVariables } from '../../__generated__/types';
import { StyledTableWrapper } from '../SharedStyles/Table.styles';
import { useDateFormatter } from '../../locales/useDateFormatter';
import { StyledForm } from '../SharedStyles/Form.styles';

import { GET_ALL_MATERIALS } from './queries';

export const MaterialEdit: React.FC = () => {
	const { t } = useTranslation();
	const { f } = useDateFormatter();
	const [currentlyEditedId, setCurrentlyEditedId] = useState<string | null>(null);

	const { data, loading } = useQuery<GetAllMaterials, GetAllCustomersVariables>(
		GET_ALL_MATERIALS,
	);

	return (
		<>
			<PageTitle>{t('Material')}</PageTitle>
			{currentlyEditedId}
			<StyledForm>
				{data?.getAllMaterials.map((material) => (
					<div>{JSON.stringify(material)}</div>
				))}
			</StyledForm>
		</>
	);
};
