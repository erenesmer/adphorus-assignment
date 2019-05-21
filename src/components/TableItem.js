import React from 'react';
import styled from 'styled-components';

import { ReactComponent as CollapseIcon } from '../icons/collapse.svg';
import { ReactComponent as ExpandIcon } from '../icons/expand.svg';
import { ReactComponent as DeleteIcon } from '../icons/delete.svg';

const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-self: center;
	align-content: space-between;
	width: 100%;
	background-color: #fff;
	color: #000;
`

const ItemsRow = styled.div`
	display: flex;
	flex: 1;
	flex-directions: column;
	height: 47px;
	line-height: 47px;
	width: 100%;
	border-bottom: 1px solid #edebed;

		.idItem {
			width: auto;
			margin-left: ${props => props.marginProp ? props.marginProp : 0}
		}

		.center {
			justify-content: center;
		}
`

const Item = styled.div`
	display: flex;
	flex: 1;
	flex-directions: column;
	min-height: 24px;
	line-height: 24px;
	padding: 10px 20px;
`

const Actions = styled.div`
	color: #960000;
	cursor: pointer;
`

const Icon = styled.svg`
	fill: #000;
	width: 12px;
	height: 12px;
	cursor: pointer;
`

const ExpandDiv = styled.div`
	position: absolute;
	margin-top: 13px;
	margin-left: 4px;
`

class TableItem extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			collapsedItems: []
		};

		this.handler = this.handler.bind(this);
	}


	handler(value) {
		let { collapsedItems } = this.state;

		if (!collapsedItems.includes(value)) {
			collapsedItems.push(value);
		} else {
			collapsedItems = collapsedItems.filter(item => item !== value);
		}

		this.setState({
			collapsedItems
		});
	}

	expander = (collapsedItems, item) => {
		if (item.childs) {
			return (
				<ExpandDiv className="expander" onClick={() => this.handler(item.ID)}>
					{collapsedItems.includes(item.ID) ? <Icon><CollapseIcon /></Icon> : <Icon><ExpandIcon /></Icon>}
				</ExpandDiv>
			)
		} else {
			return null;
		};
	}

	render() {
		const { item, showChilds, parentPath, isChild, marginProp } = this.props;
		const { collapsedItems } = this.state;
		if (isChild && !showChilds) return null;
		if (!item) return (<div>yok </div>);
		return (
			<Container className="tableItem">
				{item.childs ?
					this.expander(collapsedItems, item)
					:
					null
				}
				<ItemsRow className="tableRow" marginProp={marginProp}>
					<Item className="idItem">{item.ID}</Item>
					<Item>{item.Name}</Item>
					<Item>{item.City}</Item>
					<Item>{item.Phone}</Item>
					<Item className="center">
						<Actions
							onClick={() => this.props.removeItemFromDataset(parentPath)}>
							<Icon><DeleteIcon /></Icon>
						</Actions>
					</Item>
				</ItemsRow>
				{item.childs && item.childs.map((childItem, it) => {
					return (
						<TableItem
							key={childItem.ID}
							item={childItem}
							parentPath={[...parentPath, childItem.ID]}
							showChilds={collapsedItems.includes(item.ID)}
							isChild={true}
							marginProp={parentPath.length * 20 + 'px'}
							removeItemFromDataset={this.props.removeItemFromDataset}
						/>
					);
				})}
			</Container>
		);
	}
}

export default TableItem;
