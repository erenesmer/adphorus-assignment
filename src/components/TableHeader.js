import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
	width: 100%;
	background-color: #edebed;
	display: flex;
	flex-direction: row;
	align-self: center;
	align-content: space - between;
	color: #000;
	height: 45px;
`

const Column = styled.div`
	display: flex;
	flex: 1;
	line-height: 25px;
	padding: 10px 20px;
`

class TableHeader extends React.Component {
	render() {
		return (
			<Container>
				<Column>ID</Column>
				<Column>Name</Column>
				<Column>City</Column>
				<Column>Phone</Column>
				<Column>Delete</Column>
			</Container>
		)
	}
}

export default TableHeader;