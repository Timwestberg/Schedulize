import React from 'react';
import { MDBDataTable, MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdbreact';
import { func } from 'prop-types';

const PayrollTable = (props) => {
	const { appointments } = props;

	const data = {
		columns: [
			{
				label: 'Date',
				field: 'date',
				sort: 'asc',
				width: 200
			},
			// {
			// 	label: 'End Time',
			// 	field: 'endTime',
			// 	sort: 'asc',
			// 	width: 150
			// },
			{
				label: 'Case Name',
				field: 'caseName',
				sort: 'asc',
				width: 100
			},
			{
				label: 'Language',
				field: 'language',
				sort: 'asc',
				width: 100
			},
			{
				label: 'Contractor',
				field: 'Contractor',
				sort: 'asc',
				width: 100
			},
			{
				label: 'Status',
				field: 'status',
				sort: 'asc',
				width: 150
			},

			{
				label: 'Price',
				field: 'price',
				sort: 'asc',
				width: 150
			}
		],
		rows: appointments
	};
	/**Function to update the date of the appointment in the state the database */
	function getApptFirstValue(value) {
		props.getFirstDate(value);
	}
	/**Function to update the date of the appointment in the state the database */
	function getApptSecondValue(value) {
		props.getSecondDate(value);
	}
	/**Function to update the date of the appointment in the state the database */
	function loadDateRange(value) {
		props.loadDateRange(value);
	}

	return (
		<div id='profile-v1'>
			<MDBContainer fluid>
				<MDBRow center>
					<MDBCol size={3}>
						<MDBInput
							size='sm'
							labelClass='active'
							label='First Date'
							type='date'
							name='FirstDate'
							getValue={getApptFirstValue}
						/>
					</MDBCol>

					<h1>-</h1>

					<MDBCol size={3}>
						<MDBInput
							size='sm'
							labelClass='active'
							label='Second Date'
							type='date'
							name='SecondDate'
							getValue={getApptSecondValue}
						/>
					</MDBCol>
					<MDBCol size={1}>
						<MDBBtn onClick={loadDateRange} size='sm' color='light-green'>
							Search Range
						</MDBBtn>
					</MDBCol>
				</MDBRow>
				<MDBDataTable
					dark
					theadTextWhite
					tbodyTextWhite
					tbodyColor='unique-color'
					bordered
					striped
					data={data}
					btn
					responsive
					exportToCSV
				/>
				<ul className='list-unstyled text-right'>
					<li>
						<strong>TOTAL:</strong>
						<span className='float-right ml-3'>${props.Total}</span>
					</li>
				</ul>
			</MDBContainer>
		</div>
	);
};

export default PayrollTable;
