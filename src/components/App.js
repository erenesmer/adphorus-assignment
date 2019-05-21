import React from 'react';
import styled from 'styled-components';

import Table from './Table';

const Container = styled.div`
	border: 5px solid;
	display: flex;
	align-items: center;
	align-self: center;
	align-content: center;
	flex-flow: column;
`

function App() {
	return (
		<Container className="appContainer">
			<Table />
		</Container>
	);
}

export default App;
