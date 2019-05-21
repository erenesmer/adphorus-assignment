import React from 'react';
import styled from 'styled-components';

import TableHeader from './TableHeader.js';
import dataset from '../dataset.json';

const Container = styled.div`
	width: 90%;
	display: flex;
	flex: 1;
	flex-direction: column;
	align-self: center;
	align-content: center;
	margin: 100px 0px;
	border: 1px solid #fafafa;
`

class Table extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			data: []
		};

		this.parseData = this.parseData.bind(this);
	}

	componentDidMount() {
		console.log(dataset);
		this.parseData(dataset);
	}

	parseData(data) {
		// set childs of parents
		let parsedDataset = this.setChildsOfParent(data);

		// exclude non-parent items
		parsedDataset = this.excludeChilds(parsedDataset);

		this.setState({
			data: parsedDataset
		});
	}

	setChildsOfParent = data => {
		let childsOfParent = data;

		childsOfParent.map(iteratingData => {
			// If data has parent
			if (iteratingData.hasOwnProperty('parentID') && iteratingData.parentID !== iteratingData.ID) {
				const parentItemIndex = childsOfParent.findIndex(parsed => parsed.ID === iteratingData.parentID);

				// If parent item is found
				if (parentItemIndex >= 0) {
					if (childsOfParent[parentItemIndex].childs) {
						// If parent item has already childs
						childsOfParent[parentItemIndex].childs.push(iteratingData);
					} else {
						// If parent item has no childs before
						childsOfParent[parentItemIndex].childs = [iteratingData];
					}
				}
			}
		});
		return childsOfParent;
	}

	excludeChilds = data => {
		const excludedData = data.filter(iteratingData => {
			if (iteratingData.hasOwnProperty('parentID')) {
				if (iteratingData.parentID === iteratingData.ID) {
					return true;
				}

				if (this.isParentExists(iteratingData.ID, data)) {
					return false
				};
			}
			return true;
		});

		return excludedData;
	}

	isParentExists = (id, dataset) => {
		return dataset.some(data => data.ID === id) ? true : false;
	}

	removeItemFromDataset = itemPath => {
		let data = [...this.state.data];
		const indexOfParent = data.findIndex(child => child.ID === itemPath[0]);
		let item = data[indexOfParent]; // Get top item

		// Remove first item of itemPath
		itemPath.shift();

		if (itemPath.length > 0) {
			itemPath.map((searchingPath, index) => {
				const indexOfSearchingPath = item.childs.findIndex(child => child.ID === searchingPath);

				if (itemPath.length - 1 === index) {
					item.childs.splice(indexOfSearchingPath, 1)
				} else {
					item = item.childs[indexOfSearchingPath];
				}
			});
		} else {
			data.splice(indexOfParent, 1);
		}

		this.setState({
			data
		});
	}

	render() {
		const { data } = this.state;
		console.log(this.state);
		if (!data.length) { return (<Container><h2>Item Not Found</h2></Container>); }
		return (
			<Container>
				{data.length && data.map((item, index) => {
					return(
						<div>
							<TableHeader/>
							{item.ID}
							{item.Name}
							{item.City}
							{item.Phone}
						</div>
					)
				})}
			</Container>
		);
	};

}

export default Table;