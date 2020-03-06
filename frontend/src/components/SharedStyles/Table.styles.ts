import styled from '@emotion/styled';
import { Input } from 'antd';

import { Colors } from '../../themeVariables';

export const StyledTableWrapper = styled.div`
	padding: 0 25px;
	.ant-table-thead > tr > th {
		background-color: ${Colors.LIGHT_GRAY5};
	}
`;

export const StyledSearch = styled(Input.Search)`
	margin-bottom: 15px;
`;
