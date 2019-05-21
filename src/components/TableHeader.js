import React from 'react';

class TableHeader extends React.Component {
	render() {
		return (
			<div>
				<span>ID</span>
				<span>Name</span>
				<span>City</span>
				<span>Phone</span>
				<span>Delete</span>
			</div>
		)
	}
}

export default TableHeader;