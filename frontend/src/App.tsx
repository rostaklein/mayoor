import React from 'react';
import styled from '@emotion/styled';
import { Button } from '@blueprintjs/core';

const MainWrapper = styled.div`
	max-width: 960px;
	padding: 30px 25px;
	margin: 0 auto;
`;

const App: React.FC = () => {
	return (
		<MainWrapper>
			<h1>Hello world!</h1>
			<Button>Oh, hello there</Button>
		</MainWrapper>
	);
};

export default App;
