import React from 'react';
import { MDBDataTable, MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, MDBIcon } from 'mdbreact';

const AppointmentTable = (props) => {
	const { appointments } = props;

	const data = {
		columns: [
			{
				label: 'Date',
				field: 'date',
				sort: 'asc',
				width: 200
			},
			{
				label: 'Case Name',
				field: 'caseName',
				sort: 'asc',
				width: 100
			},
			{
				label: 'Claim #',
				field: 'refNum',
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
				label: 'Type',
				field: 'type',
				sort: 'asc',
				width: 100
			},
			{
				label: 'Address',
				field: 'address',
				sort: 'asc',
				width: 150
			},
			{
				label: 'Contractor',
				field: 'contractor',
				sort: 'asc',
				width: 100
			},
			{
				label: 'Adjuster',
				field: 'adjuster',
				sort: 'asc',
				width: 150
			},
			{
				label: 'Status',
				field: 'status',
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
	function loadAppointments() {
		props.loadAppointments();
	}
	return (
		<div id='profile-v1'>
			<MDBContainer fluid>
				<MDBRow center>
					<MDBCol sm='4' md={2}>
						<MDBBtn onClick={loadAppointments}>
							Refresh <MDBIcon icon='redo' />
						</MDBBtn>
					</MDBCol>
					<MDBCol sm='4' md={3}>
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

					<MDBCol sm='4' md={3}>
						<MDBInput
							size='sm'
							labelClass='active'
							label='Second Date'
							type='date'
							name='SecondDate'
							getValue={getApptSecondValue}
						/>
					</MDBCol>
					<MDBCol sm='12' md={2}>
						<MDBBtn onClick={loadDateRange} color='light-green'>
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
					search
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

export default AppointmentTable;
