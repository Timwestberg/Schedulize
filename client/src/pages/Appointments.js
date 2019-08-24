import React, { Component } from 'react';
import { MDBContainer, MDBCard, MDBCardBody, MDBIcon } from 'mdbreact';
import Appointments from '../components/Tables/appointmentTable';
import moment from 'moment';
import ApptProfile from '../components/appointmentProfile/index';
import API from '../utils/API';
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
// import PrintProvider, { Print } from 'react-easy-print';
class Address extends Component {
	constructor(props) {
		super(props);

		this.state = {
			appointments: this.props.appointments,
			modal: false,
			modalNumber: '',
			appointment: [],
			appointmentData: [],
			firstDate: '',
			secondDate: ''
		};
		this.toggle = this.toggle.bind(this);
		this.loadDateRange = this.loadDateRange.bind(this);
		this.getFirstDate = this.getFirstDate.bind(this);
		this.getSecondDate = this.getSecondDate.bind(this);
	}

	targetElement = null;
	componentDidMount() {
		this.loadApptData();

		// 2. Get a target element that you want to persist scrolling for (such as a modal/lightbox/flyout/nav).
		this.targetElement = document.querySelector('#apptModal');
	}
	componentWillUnmount() {
		// 5. Useful if we have called disableBodyScroll for multiple target elements,
		// and we just want a kill-switch to undo all that.
		// OR useful for if the `hideTargetElement()` function got circumvented eg. visitor
		// clicks a link which takes him/her to a different page within the app.
		clearAllBodyScrollLocks();
	}
	reLoad = () => {
		this.props.loadAppointments();
	};

	/**Toggle function for opening and closing the Modal */
	toggle = (id) => {
		if (this.state.modal === false) {
			this.setState({
				modal: true
			});
			//   this.showTargetElement();
			disableBodyScroll(this.targetElement);
		}
		if (this.state.modal === true) {
			this.setState({
				modal: false
			});

			//   this.hideTargetElement();
			enableBodyScroll(this.targetElement);
		}
	};

	loadModal = (id) => () => {
		this.loadAppointment(id);
	};

	renderModal() {
		if (!this.state.modal) {
			return null;
		}
		const { recipient, Length, connection } = this.state.appointment;
		const { appointment } = this.state;

		return (
			<div>
				<ApptProfile
					recipient={recipient}
					facility={appointment.facility}
					length={Length}
					earlyArrival={appointment.earlyArrival}
					startTime={appointment.startTime}
					repName={appointment.repName}
					receivedBy={appointment.receivedBy}
					statusReason={appointment.statusReason}
					connection={connection}
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
					conPhone={appointment.conPhone}
					conCert={appointment.conCert}
					dateContractorAssigned={appointment.dateContractorAssigned}
					modalId='apptModal'
					modal={this.state.modal}
					toggle={this.toggle}
					modalNumber={this.state.modalNumber}
					loadAppointments={this.props.loadAppointments}
				/>
			</div>
		);
	}

	/**
   * Using API to load information from MONGODB |
   * Appointment infromation |
   * Handles geocoding address*/
	loadAppointment = (id) => {
		API.getAppt(id)
			.then((res) => {
				this.setState({
					appointment: res.data,
					modal: !this.state.modal
				});
			})
			.catch((err) => console.log(err));
	};

	appointmentColorbyStatus = (status) => {
		switch (status) {
			case 'New Appointment':
				return ' black-text info-color lighten-5';

			case 'Staffed':
				return ' black-text green lighten-5';

			case 'Confirmed':
				return ' black-text green lighten-2';

			case 'Completed':
				return ' black-text teal lighten-5';

			case 'Billed':
				return ' black-text light-blue lighten-5';

			case 'Set Up':
				return ' black-text purple lighten-5';

			case 'Phone Conference':
				return ' black-text purple lighten-5';

			case 'Cancelled':
				return ' black-text red lighten-4';

			case 'No Show':
				return ' black-text red lighten-4';

			case 'Rescheduled not notified':
				return ' black-text red lighten-4';

			case 'Double Booked':
				return ' black-text red lighten-4';

			case 'Waiting for Authorization':
				return ' black-text warning-color';
			case 'Waiting for information':
				return ' danger-color white-text';
			case 'Waiting for confirmation':
				return 'secondary-color white-text';

			default:
				return ' black-text amber lighten-5';
		}
	};
	/**function for converting the boolean to a string answer for table */
	ChangeFacilityConfirmed = (status) => {
		switch (status) {
			case true:
				return <MDBIcon small icon='building' />;

			default:
				// return <MDBIcon far small icon='times-circle' />;
				return '';
		}
	};

	/**function for converting the boolean to a string answer for table */
	ChangeContractorConfirmed = (status) => {
		switch (status) {
			case 'Confirmed':
				return <MDBIcon small icon='user-check' />;

			default:
				// return <MDBIcon small icon='user-times' />;
				return '';
		}
	};
	/**Load contractor information to place in data array, must load data this way to avoid duplicating when using the print function, this also seems the best way to spot function from running everytime table is rerendered */
	loadApptData = () => {
		const { appointments } = this.state;

		appointments.forEach((appointment) => {
			const apptDate = moment(appointment.apptDate).utc().format('YYYY-MM-DD');
			const apptTime = moment(appointment.apptTime, 'HH:mm').format('HH:mm');
			const formatApptTime = moment(appointment.apptTime, 'HH:mm').format('hh:mm a');
			const endTime = moment(appointment.endTime, 'HH:mm').format('HH:mm');
			const formatendTime = moment(appointment.endTime, 'HH:mm').format('hh:mm a');
			const facilityConfirmed = <div>{this.ChangeFacilityConfirmed(appointment.facility)}</div>;
			const ContractorConfirmed = this.ChangeContractorConfirmed(appointment.status);
			const finalTime = endTime + ' ' + '(' + formatendTime + ')';
			const dateTime = moment(apptDate).format('L') + ' ' + apptTime + ' ' + ' ' + '(' + formatApptTime + ')';
			this.state.appointmentData.push({
				date: dateTime,
				caseName: appointment.refName.charAt(0).toUpperCase() + appointment.refName.slice(1),
				refNum: `${appointment.refNumber}`,
				language: appointment.language.charAt(0).toUpperCase() + appointment.language.slice(1),
				type: appointment.assignmentType.charAt(0).toUpperCase() + appointment.assignmentType.slice(1),
				address: ` ${appointment.locationName} ${appointment.address} ${appointment.city} ${appointment.state} ${appointment.postalCode}`,
				Contractor: `${appointment.contractors} ${appointment.conPhone}`,
				adjuster: `${appointment.adjusterFirst} ${appointment.adjusterLast} ${appointment.adjusterCompany}`,
				status: (
					<div>
						{ContractorConfirmed} <br />
						{appointment.status}
						<br />
						{facilityConfirmed}
					</div>
				),
				clickEvent: this.loadModal(appointment._id)
			});
		});
	};
	/**<div className={this.appointmentColorbyStatus(appointment.status)}>{appointment.status}</div>, */
	/**Toggle functoin for changing Location Name title into input field */
	toggleApptPrint = (modal) => {
		switch (modal) {
			case false:
				return (
					// <Print single name='foo'>
					<Appointments
						loadDateRange={this.loadDateRange}
						getFirstDate={this.getFirstDate}
						getSecondDate={this.getSecondDate}
						appointments={this.state.appointmentData}
						loadAppointments={this.props.loadAppointments}
					/>
					// </Print>
				);
			case true:
				return (
					<Appointments
						loadDateRange={this.loadDateRange}
						getFirstDate={this.getFirstDate}
						getSecondDate={this.getSecondDate}
						appointments={this.state.appointmentData}
						loadAppointments={this.reLoad}
					/>
				);
		}
	};
	/**Function to update the first select for the date range*/
	getFirstDate = (value) => {
		this.setState({
			firstDate: value
		});
		console.log(value);
	};
	/**Function to update the second select for the date range*/
	getSecondDate = (value) => {
		this.setState({
			secondDate: value
		});
		console.log(value);
	};

	/**Load selected date range  */
	loadDateRange = () => {
		const { appointmentData, firstDate, secondDate } = this.state;
		const FirstDate = moment(firstDate).format('YYYY-MM-DD');
		const SecondDate = moment(secondDate).format('YYYY-MM-DD');

		// const FirstDate = moment(firstDate).format('YYYY-MM-DD');
		// const SecondDate = moment(secondDate).format('YYYY-MM-DD');
		const dateRange = appointmentData.filter(function(appointment) {
			const AapptDate = appointment.date;
			console.log({ AapptDate });
			if (moment(AapptDate).isBetween(FirstDate, SecondDate) == true) {
				return appointment;
			}
		});
		// this.addTotal();
		// console.log(FirstDate);
		// console.log(SecondDate);
		// console.log({ dateRange });
		let apptToBill = dateRange.sort(function(a, b) {
			const AapptDate = moment(a.apptDate).utc().format('YYYY-MM-DD');
			const BapptDate = moment(b.apptDate).utc().format('YYYY-MM-DD');
			const AapptTime = moment(a.apptTime, 'HH:mm').format('hh:mm:ss');
			const BapptTime = moment(b.apptTime, 'HH:mm').format('hh:mm:ss');
			const AdateTime = moment(AapptDate + 'T' + AapptTime).format();
			const BdateTime = moment(BapptDate + 'T' + BapptTime).format();

			const x = new Date(AdateTime),
				y = new Date(BdateTime);
			return x > y ? 1 : -1;
		});
		this.setState({
			appointmentData: apptToBill
		});
	};
	render() {
		const { modal } = this.state;

		return (
			<MDBContainer fluid>
				<br />
				<br />
				<br />
				{/* <br /> */}
				{/* <PrintProvider> */}
				<MDBCard className='text-center mb-4 dark-grey'>
					<MDBCardBody>
						{
							/* {this.toggleApptPrint(modal)} */
							<Appointments
								loadDateRange={this.loadDateRange}
								getFirstDate={this.getFirstDate}
								getSecondDate={this.getSecondDate}
								appointments={this.state.appointmentData}
								loadAppointments={this.props.loadAppointments}
							/>
						}
						{this.renderModal()}
					</MDBCardBody>
				</MDBCard>
				{/* </PrintProvider> */}
			</MDBContainer>
		);
	}
}

export default Address;
