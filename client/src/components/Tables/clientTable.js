import React from 'react';
import { MDBDataTable, MDBContainer } from 'mdbreact';
import './table.css';

const ClientTable = (props) => {
	const { clients } = props;

	const data = {
		columns: [
			{
				label: 'Name',
				field: 'name',
				sort: 'asc',
				width: 150
			},
			{
				label: 'Company Name',
				field: 'company',
				sort: 'asc',
				width: 200
			},
			{
				label: 'Position',
				field: 'position',
				sort: 'asc',
				width: 270
			},
			{
				label: 'Phone',
				field: 'phone',
				sort: 'asc',
				width: 100
			},
			{
				label: 'Email',
				field: 'email',
				sort: 'asc',
				width: 150
			}
		],
		rows: clients
	};

	return (
		<div id='profile-v1'>
			<MDBContainer fluid>
				<MDBDataTable
					dark
					theadTextWhite
					tbodyTextWhite
					tbodyColor='unique-color'
					bordered
					striped
					data={data}
					btn
					exportToCSV
					responsive
				/>
			</MDBContainer>
		</div>
	);
};

export default ClientTable;
