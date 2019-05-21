import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Table from '../components/Table';
import TableHeader from '../components/TableHeader';
import TableItem from '../components/TableItem';

configure({ adapter: new Adapter() });

const exDataItem = {
	"ID": 2,
	"Phone": "(979) 486-1932",
	"City": "Chełm",
	"Name": "Scarlet"
};

describe('Table Component Render', () => {
	it('Should render Table', () => {
		const component = shallow(<Table />);
		expect(component.find('.table').length).toBe(1);
	});

	it('Should render Header of Table', () => {
		const component = shallow(<TableHeader />);
		expect(component.find('.tableHeader').length).toBe(1);
	});

	it('Should render Single Table Item', () => {
		const component = shallow(<TableItem item={exDataItem}/>);
		expect(component.find('.tableItem').length).toBe(1);
	});

});
