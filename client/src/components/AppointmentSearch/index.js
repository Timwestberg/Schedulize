import React, { Component } from 'react';
import { MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBNavLink, MDBIcon } from 'mdbreact';
import Appointments from '../Tables/appointmentTable';
import API from '../../utils/API';
import './modal.css';
import moment from 'moment';
import ApptProfile from '../appointmentProfile/index';
import DuplicateAppt from '../Profiles/DuplicateAppt';
class ModalPage extends Component {
	state = {
		modal: false,
		appointments: [],
		appointmentsRows: []
	};

	componentDidMount() {
		this.loadAppointments();
	}

	/**
   * Using API to load information from MONGODB |
   * Appointment infromation |
   * Handles geocoding address*/
	loadAppointments = () => {
		API.getAppts()
			.then((res) => {
				this.setState({
					appointments: res.data
				});

				// console.log('Appt state:' + this.state.initialId);
			})
			.catch((err) => console.log(err));
	};

	toggle = () => {
		this.setState({
			modal: !this.state.modal
		});
	};
	render() {
		const { appointments } = this.state;
		const appointmentData = [];
		console.log({ appointments });
		appointments.forEach((appointment) => {
			appointmentData.push({
				profile: (
					<div>
						<ApptProfile
							markerType={appointment.markerType}
							dateAssigned={appointment.dateAssigned}
							apptDate={appointment.apptDate}
							apptTime={appointment.apptTime}
							endTime={appointment.endTime}
							assigneeFirst={appointment.assigneeFirst}
							assigneeLast={appointment.assigneeLast}
							assigneeCompany={appointment.assigneeCompany}
							assigneePhone={appointment.assigneePhone}
							adjusterFirst={appointment.adjusterFirst}
							adjusterLast={appointment.adjusterLast}
							adjusterPhone={appointment.adjusterPhone}
							adjusterCompany={appointment.adjusterCompany}
							refName={appointment.refName}
							refNumber={appointment.refNumber}
							doi={appointment.doi}
							dob={appointment.dob}
							litigated={appointment.litigated}
							notes={appointment.notes}
							language={appointment.language}
							assignmentType={appointment.assignmentType}
							locationName={appointment.locationName}
							address={appointment.address}
							city={appointment.city}
							state={appointment.state}
							postalCode={appointment.postalCode}
							name={appointment.refName}
							id={appointment._id}
							contractors={appointment.contractors}
							appointmentPrice={appointment.appointmentPrice}
							ApptMinimum={appointment.ApptMinimum}
							contractorMinimum={appointment.contractorMinimum}
							contractorPrice={appointment.contractorPrice}
							additionalCost={appointment.additionalCost}
							status={appointment.status}
							billingContactName={appointment.billingContactName}
							billingPhone={appointment.billingPhone}
							billingEmail={appointment.billingEmail}
							billingLocationName={appointment.billingLocationName}
							billingAddress={appointment.billingAddress}
							billingState={appointment.billingState}
							billingCity={appointment.billingCity}
							billingZipcode={appointment.billingZipcode}
						/>
						<DuplicateAppt
							markerType={appointment.markerType}
							assigneeFirst={appointment.assigneeFirst}
							assigneeLast={appointment.assigneeLast}
							assigneeCompany={appointment.assigneeCompany}
							assigneePhone={appointment.assigneePhone}
							adjusterFirst={appointment.adjusterFirst}
							adjusterLast={appointment.adjusterLast}
							adjusterPhone={appointment.adjusterPhone}
							adjusterCompany={appointment.adjusterCompany}
							refName={appointment.refName}
							refNumber={appointment.refNumber}
							doi={appointment.doi}
							dob={appointment.dob}
							litigated={appointment.litigated}
							notes={appointment.notes}
							language={appointment.language}
							locationName={appointment.locationName}
							address={appointment.address}
							city={appointment.city}
							state={appointment.state}
							postalCode={appointment.postalCode}
							name={appointment.refName}
							id={appointment._id}
							billingContactName={appointment.billingContactName}
							billingPhone={appointment.billingPhone}
							billingEmail={appointment.billingEmail}
							billingLocationName={appointment.billingLocationName}
							billingAddress={appointment.billingAddress}
							billingState={appointment.billingState}
							billingCity={appointment.billingCity}
							billingZipcode={appointment.billingZipcode}
						/>
					</div>
				),
				date: moment(appointment.apptDate).format('MMM Do YYYY'),
				time: moment(appointment.apptTime, 'HH:mm').format('hh:mm a'),
				caseName: `${appointment.refName}`,
				refNum: `${appointment.refNumber}`,
				language: `${appointment.language}`,
				locationName: `${appointment.locationName}`,
				address: `${appointment.address} ${appointment.city} ${appointment.state} ${appointment.postalCode}`,
				client: `${appointment.adjusterCompany}`,
				adjuster: `${appointment.adjusterFirst} ${appointment.adjusterLast}`,
				status: `${appointment.status}`
			});
		});

		return (
			<div>
				{/* BUTTON */}
				<MDBNavLink onClick={this.toggle} to={window.location.pathname}>
					<MDBIcon icon='archive' />
					<span className='d-none d-md-inline ml-1'>Appointments</span>
				</MDBNavLink>
				{/* MODAL */}
				<MDBModal className='cascading-modal' isOpen={this.state.modal} toggle={this.toggle} size='fluid'>
					<MDBModalHeader
						className='text-center blue-gradient text-white'
						titleClass='w-100'
						tag='h1'
						toggle={this.toggle}>
						Appointments
					</MDBModalHeader>
					<MDBModalBody>
						<Appointments appointments={appointmentData} />
					</MDBModalBody>
					<MDBModalFooter>
						<MDBBtn color='secondary' onClick={this.toggle}>
							Close
						</MDBBtn>
					</MDBModalFooter>
				</MDBModal>
			</div>
		);
	}
}
export default ModalPage;
