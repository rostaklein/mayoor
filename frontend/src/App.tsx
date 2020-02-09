import React from 'react';
import styled from '@emotion/styled';

const MainWrapper = styled.div`
	max-width: 960px;
	padding: 30px 25px;
	margin: 0 auto;
`;

const App: React.FC = () => {
	return (
		<MainWrapper>
			<h1>Hello world!</h1>
		</MainWrapper>
	);
};

export default App;
