import React from 'react';
import { MDBDataTable, MDBContainer } from 'mdbreact';
import './table.css';
const mapContractorTable = (props) => {
	const { contractors } = props;

	const data = {
		columns: [
			{
				label: 'Name',
				field: 'name',
				sort: 'asc',
				width: 150
			},
			{
				label: 'Lang.',
				field: 'language',
				sort: 'asc',
				width: 100
			},
			{
				label: 'Phone',
				field: 'phone',
				sort: 'asc',
				width: 150
			},
			{
				label: 'Email',
				field: 'email',
				sort: 'asc',
				width: 200
			}
		],
		rows: contractors
	};

	return (
		<MDBDataTable
			dark
			theadTextWhite
			tbodyTextWhite
			tbodyColor='unique-color'
			bordered
			btn
			striped
			small
			data={data}
			paging={false}
			responsive
		/>
	);
};

export default mapContractorTable;
