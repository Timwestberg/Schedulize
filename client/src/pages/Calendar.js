import React, { Fragment } from 'react';
import { MDBCard, MDBCardBody, MDBContainer, MDBRow, MDBCol, MDBIcon, MDBBtn } from 'mdbreact';
import Calendar from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import API from '../utils/API';
import ApptProfile from '../components/appointmentProfile/index';

const localizer = Calendar.momentLocalizer(moment);

class CalendarPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			appointments: this.props.appointments,
			modal: false
		};
		this.toggle = this.toggle.bind(this);
	}

	componentDidMount = () => {};

	/**Toggle function for opening and closing the Modal */
	toggle = () => {
		this.setState({
			modal: !this.state.modal
		});
	};

	appointmentColorbyStatus = (status) => {
		switch (status) {
			case 'New appt.':
				return ' black-text info-color lighten-5';

			case 'Staffed':
				return ' black-text green lighten-4';

			case 'Confirmed':
				return ' black-text green lighten-2';

			case 'Completed/Show':
				return ' black-text teal lighten-4';

			case 'Billed':
				return ' black-text light-blue lighten-4';

			case 'Set Up':
				return ' black-text indigo lighten-3';

			case 'Phone Conference':
				return ' black-text purple lighten-4';

			case 'Cancelled':
				return ' black-text red lighten-4';

			case 'No show':
				return ' black-text red lighten-5';

			case 'Rescheduled not notified':
				return ' black-text red lighten-5';

			case 'Double Booked':
				return ' black-text red lighten-5';

			case 'Waiting for auth.':
				return ' black-text warning-color';
			case 'Waiting for information':
				return ' danger-color white-text';
			case 'Waiting for confirmation':
				return 'secondary-color white-text';
			case 'Late Cancellation':
				return 'black-text amber lighten-5';

			default:
				return 'black-text amber lighten-5';
		}
	};

	formatPhoneNumber(phoneNumberString) {
		let cleaned = ('' + phoneNumberString).replace(/\D/g, '');
		let match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
		if (match) {
			let intlCode = match[1] ? '+1 ' : '';
			return [ intlCode, '(', match[2], ') ', match[3], '-', match[4] ].join('');
		}
		return null;
	}

	loadAppointments = () => {
		this.props.loadAppointments();
	};

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
	loadModal = (id) => () => {
		this.loadAppointment(id);
	};

	renderModal() {
		if (!this.state.modal) {
			return null;
		}
		const { appointment } = this.state;

		return (
			<ApptProfile
				repName={appointment.repName}
				earlyArrival={appointment.earlyArrival}
				startTime={appointment.startTime}
				statusReason={appointment.statusReason}
				recipient={appointment.recipient}
				length={appointment.Length}
				receivedBy={appointment.receivedBy}
				connection={appointment.connection}
				conCert={appointment.conCert}
				conPhone={appointment.conPhone}
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
				modal={this.state.modal}
				toggle={this.toggle}
				modalNumber={this.state.modalNumber}
				loadAppointments={this.props.loadAppointments}
			/>
		);
	}

	render() {
		const { appointments } = this.state;
		const appointmentData = [];

		var appts = appointments.sort(function(a, b) {
			const AapptDate = moment(a.apptDate).format('YYYY-MM-DD');
			const BapptDate = moment(b.apptDate).format('YYYY-MM-DD');
			const AapptTime = moment(a.apptTime, 'HH:mm').format('HH:mm');
			const BapptTime = moment(b.apptTime, 'HH:mm').format('HH:mm');
			const AdateTime = moment(AapptDate + 'T' + AapptTime).format();
			const BdateTime = moment(BapptDate + 'T' + BapptTime).format();

			const x = new Date(AdateTime),
				y = new Date(BdateTime);
			return x > y ? 1 : -1;
		});

		console.log({ appts });

		appts.forEach((appointment) => {
			const {
				apptDate,
				apptTime,
				endTime,
				assigneeFirst,
				assigneeLast,
				assigneePhone,
				assignmentType,
				refName,
				refNumber,
				adjusterFirst,
				adjusterLast,
				adjusterPhone,
				contractors,
				conPhone,
				conCert,
				status
			} = appointment;
			let m = moment(apptDate, 'YYYY-MM-DD');
			let year = m.format('YYYY');
			let month = m.format('M') - 1;
			let day = m.format('D');
			// let startHour = moment(apptTime).format("H");
			// let startMin = moment(apptTime).format("m");
			// let endHour = moment(endTime).format("H");
			// let endMin = moment(endTime).format("m");
			// start: new Date(AdateTime),
			// end: new Date(AdateTime),

			appointmentData.push({
				date: m,
				id: appointment._id,
				status: appointment.status,
				contractor: appointment.contractors,
				conPhone: conPhone,
				start: new Date(year, month, day),
				end: new Date(year, month, day),
				title: {
					// <MDBCard className={this.appointmentColorbyStatus(status)}>
					/* </MDBCard> */
					month: (
						<MDBCard className={this.appointmentColorbyStatus(status)}>
							<MDBContainer className='text-center'>
								<small>
									{refName}
									<br />
									Time: {moment(apptTime, 'HH:mm').format('LT')} - {moment(endTime, 'HH:mm').format('LT')}
								</small>
							</MDBContainer>
						</MDBCard>
					),
					week: (
						<MDBCard className={this.appointmentColorbyStatus(status)}>
							<MDBContainer>
								<MDBRow>
									<MDBCol middle>
										<small>
											Reference:
											<br />
											{refName}
										</small>
									</MDBCol>
									<MDBCol>
										<small>
											Time:
											<br />
											{moment(apptTime, 'HH:mm').format('LT')} - {moment(endTime, 'HH:mm').format('LT')}
										</small>
									</MDBCol>
									<MDBCol>
										<small>
											Contractor:
											<br />
											{contractors}
										</small>
									</MDBCol>
								</MDBRow>
							</MDBContainer>
						</MDBCard>
					),
					day: (
						<MDBCard className={this.appointmentColorbyStatus(status)}>
							<MDBContainer className='text-center'>
								<MDBRow>
									<MDBCol middle>
										<h4>Appointment:</h4>
										Status: {status}
										<br />
										Time: {moment(apptTime, 'HH:mm').format('LT')} - {moment(endTime, 'HH:mm').format('LT')}
										<br />
										Type: {assignmentType}
									</MDBCol>
									<MDBCol middle>
										<h4>Reference:</h4>
										Name: {refName}
										<br />
										Number: {refNumber}
									</MDBCol>
									<MDBCol middle>
										<h4>Assignee:</h4>
										Name: {assigneeFirst} {assigneeLast}
										<br />
										Phone: {this.formatPhoneNumber(assigneePhone)}
									</MDBCol>
									<MDBCol middle>
										<h4>Adjuster:</h4>
										Name: {adjusterFirst} {adjusterLast}
										<br />
										Phone: {this.formatPhoneNumber(adjusterPhone)}
									</MDBCol>
									<MDBCol middle>
										<h4>Contractor:</h4>
										Name: {contractors}
										<br />
										Cert. #: {conCert}
										<br />
										Phone: {this.formatPhoneNumber(conPhone)}
									</MDBCol>
								</MDBRow>
							</MDBContainer>
						</MDBCard>
					)
				}
			});
			// console.log({ year, month, day });
		});
		// console.log({ appts });
		// console.log({ appointmentData });

		function MonthEvent(event) {
			return (
				// <MDBCard className='text-center text-truncate black-text amber lighten-5'>
				//       <small>{event.title.month}</small>
				//       <br />
				//       <small>{event.desc}</small>
				//     </MDBCard>
				<Fragment>{event.title.month}</Fragment>
			);
		}

		function WeekEvent(event) {
			return <Fragment>{event.title.week}</Fragment>;
		}

		function DayEvent(event) {
			return <Fragment>{event.title.day}</Fragment>;
		}

		const components = {
			month: { event: MonthEvent },
			week: { event: WeekEvent },
			day: { event: DayEvent }
		};

		return (
			<MDBContainer fluid>
				<br />
				<br />
				<br />
				<MDBRow>
					<MDBCol size={2}>
						<MDBCard className='d-flex justify-content-around sticky-top'>
							<MDBCardBody className='text-center'>
								<h4>Legend:</h4>
								<MDBCard className='pt-1 pb-1 mb-2 info-color lighten-5'>New Appointment</MDBCard>
								<MDBCard className='pt-1 pb-1 mb-2 purple lighten-4'>Phone Conference</MDBCard>
								<MDBCard className='pt-1 pb-1 mb-2 green lighten-4'>Staffed</MDBCard>
								<MDBCard className='pt-1 pb-1 mb-2 green lighten-2'>Confirmed</MDBCard>
								<MDBCard className='pt-1 pb-1 mb-2 teal lighten-4'>Completed</MDBCard>
								<MDBCard className='pt-1 pb-1 mb-2 light-blue lighten-4'>Billed</MDBCard>
								<MDBCard className='pt-1 pb-1 mb-2 indigo lighten-3'>Set Up</MDBCard>
								<MDBCard className='pt-1 pb-1 mb-2 warning-color'>Waiting for Authorization</MDBCard>
								<MDBCard className='pt-1 pb-1 mb-2 danger-color text-white'>Waiting for information</MDBCard>
								<MDBCard className='pt-1 pb-1 mb-2 secondary-color text-white'>
									Waiting for confirmation
								</MDBCard>
								<MDBCard className='pt-1 pb-1 mb-2 red lighten-4'>Cancelled</MDBCard>
								<MDBCard className='pt-1 pb-1 mb-2 red lighten-4'>No Show</MDBCard>
								<MDBCard className='pt-1 pb-1 mb-2 red lighten-4'>Rescheduled not notified</MDBCard>
								<MDBCard className='pt-1 pb-1 mb-2 red lighten-4'>Double book</MDBCard>
							</MDBCardBody>
						</MDBCard>
					</MDBCol>
					<MDBCol>
						<MDBCard style={{ marginBottom: '1rem' }}>
							<MDBCardBody>
								<Calendar
									localizer={localizer}
									popup
									popupOffset={{ x: 100, y: 20 }}
									defaultView='week'
									views={[ 'month', 'week', 'day' ]}
									events={appointmentData}
									style={{ height: '100vh' }}
									components={components}
									onSelectEvent={(event) => this.loadAppointment(event.id)}
								/>
								{this.renderModal()}
							</MDBCardBody>
						</MDBCard>
					</MDBCol>
				</MDBRow>
			</MDBContainer>
		);
	}

	appointmentConfirmed = (status) => {
		switch (status) {
			case 'Confirmed':
				return (
					<div>
						<small>Int. Conf.</small> <MDBIcon icon='check' />
						<br />
						{/* <small>Fac. Confirmed</small> <MDBIcon icon='check' /> */}
					</div>
				);

			default:
				return <div />;
		}
	};

	facilityConfirmed = (facility) => {
		switch (facility) {
			case true:
				return (
					<div>
						<small>Fac./Attny. </small> <MDBIcon icon='check' />
						<br />
					</div>
				);

			default:
				return <div />;
		}
	};

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

	loadModal = (id) => () => {
		this.loadAppointment(id);
	};

	renderModal() {
		if (!this.state.modal) {
			return null;
		}
		const { appointment } = this.state;

		return (
			<ApptProfile
				facility={appointment.facility}
				recipient={appointment.recipient}
				length={appointment.Length}
				repName={appointment.repName}
				connection={appointment.connection}
				markerType={appointment.markerType}
				statusReason={appointment.statusReason}
				receivedBy={appointment.receivedBy}
				earlyArrival={appointment.earlyArrival}
				startTime={appointment.startTime}
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
				printModal={this.state.printModal}
				modal={this.state.modal}
				toggle={this.toggle}
				modalNumber={this.state.modalNumber}
				loadAppointments={this.props.loadAppointments}
			/>
		);
	}

	// sortFunction = (a, b) => {
	// 	var dateA = new Date(a.apptTime).getTime();
	// 	var dateB = new Date(b.apptTime).getTime();
	// 	return dateA > dateB ? 1 : -1;
	// };

	render() {
		const { appointments } = this.state;
		const appointmentData = [];

		var appts = appointments.sort(function(a, b) {
			const AapptDate = moment(a.apptDate).utc().format('YYYY-MM-DD');
			const BapptDate = moment(b.apptDate).utc().format('YYYY-MM-DD');
			const AapptTime = moment(a.apptTime, 'HH:mm').format('HH:mm');
			const BapptTime = moment(b.apptTime, 'HH:mm').format('HH:mm');
			const AdateTime = moment(AapptDate + 'T' + AapptTime).format();
			const BdateTime = moment(BapptDate + 'T' + BapptTime).format();

			const x = new Date(AdateTime),
				y = new Date(BdateTime);
			return x > y ? 1 : -1;
		});

		console.log({ appts });

		appts.forEach((appointment) => {
			const {
				apptDate,
				apptTime,
				endTime,
				assigneeFirst,
				assigneeLast,
				assigneePhone,
				assignmentType,
				refName,
				refNumber,
				adjusterFirst,
				adjusterLast,
				adjusterPhone,
				contractors,
				conPhone,
				conCert,
				status,
				facility
			} = appointment;
			let m = moment(apptDate, 'YYYY-MM-DD');
			let year = m.format('YYYY');
			let month = m.format('M') - 1;
			let day = m.format('D');
			// let startHour = moment(apptTime).format("H");
			// let startMin = moment(apptTime).format("m");
			// let endHour = moment(endTime).format("H");
			// let endMin = moment(endTime).format("m");
			// start: new Date(AdateTime),
			// end: new Date(AdateTime),

			appointmentData.push({
				date: m,
				id: appointment._id,
				status: appointment.status,
				contractor: appointment.contractors,
				conPhone: conPhone,
				start: new Date(year, month, day),
				end: new Date(year, month, day),
				title: {
					// <MDBCard className={this.appointmentColorbyStatus(status)}>
					/* </MDBCard> */
					month: (
						<MDBCard className={this.appointmentColorbyStatus(status)}>
							<MDBContainer className='text-center'>
								<MDBRow>
									<MDBCol className='d-inline-block text-truncate' style={{ maxWidth: '250px' }}>
										<small>
											{refName}
											<br />
											Time: {moment(apptTime, 'HH:mm').format('LT')} -{' '}
											{moment(endTime, 'HH:mm').format('LT')}
										</small>
									</MDBCol>
								</MDBRow>
							</MDBContainer>
						</MDBCard>
					),
					week: (
						<MDBCard className={this.appointmentColorbyStatus(status)}>
							<MDBContainer>
								<MDBRow>
									<MDBCol middle size={2}>
										<small>
											Reference:
											<br />
											{refName}
										</small>
									</MDBCol>
									<MDBCol>
										<small>
											Time:
											<br />
											{moment(apptTime, 'HH:mm').format('LT')} - {moment(endTime, 'HH:mm').format('LT')}
										</small>
									</MDBCol>
									<MDBCol>
										<small>
											Contractor:
											<br />
											{contractors}
										</small>
									</MDBCol>
								</MDBRow>
							</MDBContainer>
						</MDBCard>
					),
					day: (
						<MDBCard className={this.appointmentColorbyStatus(status)}>
							<MDBContainer className='text-center'>
								<MDBRow style={{ textSize: '3em' }}>
									<MDBCol lg={2} sm={6} className='border-bottom border-dark d-inline-block text-truncate'>
										<h6>Appointment</h6>
										Status:
										<br /> {status}
										<br />
										Time:
										<br /> {moment(apptTime, 'HH:mm').format('LT')} - {moment(endTime, 'HH:mm').format('LT')}
										<br />
										Type:<br /> {assignmentType}
									</MDBCol>
									<MDBCol
										lg={2}
										sm={6}
										style={{ maxWidth: '250px' }}
										className='border-bottom border-dark d-inline-block text-truncate'>
										<h6>Reference</h6>
										Name:
										<br /> {refName}
										<br />
										Number:
										<br /> {refNumber}
									</MDBCol>
									<MDBCol lg={2} sm={6} className='border-bottom border-dark'>
										<h6>Assignee</h6>
										Name:
										<br /> {assigneeFirst}
										<br /> {assigneeLast}
										<br />
										Phone:<br /> <br /> {this.formatPhoneNumber(assigneePhone)}
									</MDBCol>
									<MDBCol lg={2} sm={6} className='border-bottom border-dark'>
										<h6>Adjuster</h6>
										Name:
										<br /> {adjusterFirst}
										<br /> {adjusterLast}
										<br />
										Phone:
										<br /> {this.formatPhoneNumber(adjusterPhone)}
									</MDBCol>
									<MDBCol lg={2} sm={6} className='border-bottom border-dark'>
										<h6>Contractor</h6>
										Name:
										<br /> {contractors}
										<br />
										Cert. #:
										<br /> {conCert}
										<br />
										Phone:
										<br /> {conPhone}
									</MDBCol>
									<MDBCol middle size={2}>
										{this.appointmentConfirmed(status)}

										{this.facilityConfirmed(facility)}
									</MDBCol>
								</MDBRow>
							</MDBContainer>
						</MDBCard>
					)
				}
			});
			// console.log({ year, month, day });
		});
		// console.log({ appts });
		// console.log({ appointmentData });

		function MonthEvent(event) {
			return (
				// <MDBCard className='text-center text-truncate black-text amber lighten-5'>
				//       <small>{event.title.month}</small>
				//       <br />
				//       <small>{event.desc}</small>
				//     </MDBCard>
				<Fragment>{event.title.month}</Fragment>
			);
		}

		function WeekEvent(event) {
			return <Fragment>{event.title.week}</Fragment>;
		}

		function DayEvent(event) {
			return <Fragment>{event.title.day}</Fragment>;
		}

		const components = {
			month: { event: MonthEvent },
			week: { event: WeekEvent },
			day: { event: DayEvent }
		};

		return (
			<MDBContainer fluid>
				<br />
				<br />
				<br />
				<MDBRow>
					<MDBCol lg={3} md={12}>
						<MDBCard className='d-flex justify-content-around sticky-top'>
							<MDBBtn onClick={this.loadAppointments}>
								Refresh <MDBIcon icon='redo' />
							</MDBBtn>
							<MDBCardBody className='text-center'>
								<h6>Legend:</h6>
								<MDBCard className='pt-1 pb-1 mb-2 info-color lighten-5'>New Appointment</MDBCard>
								<MDBCard className='pt-1 pb-1 mb-2 purple lighten-4'>Phone Conference</MDBCard>
								<MDBCard className='pt-1 pb-1 mb-2 green lighten-4'>Staffed</MDBCard>
								<MDBCard className='pt-1 pb-1 mb-2 green lighten-2'>Confirmed</MDBCard>
								<MDBCard className='pt-1 pb-1 mb-2 teal lighten-4'>Completed</MDBCard>
								<MDBCard className='pt-1 pb-1 mb-2 light-blue lighten-4'>Billed</MDBCard>
								<MDBCard className='pt-1 pb-1 mb-2 indigo lighten-3'>Set Up</MDBCard>
								<MDBCard className='pt-1 pb-1 mb-2 warning-color'>Waiting for Authorization</MDBCard>
								<MDBCard className='pt-1 pb-1 mb-2 danger-color text-white'>Waiting for information</MDBCard>
								<MDBCard className='pt-1 pb-1 mb-2 secondary-color text-white'>
									Waiting for confirmation
								</MDBCard>
								<MDBCard className='pt-1 pb-1 mb-2 amber lighten-5'>Late Cancellation</MDBCard>
								<MDBCard className='pt-1 pb-1 mb-2 red lighten-4'>Cancelled</MDBCard>
								<MDBCard className='pt-1 pb-1 mb-2 red lighten-5'>No Show</MDBCard>
								<MDBCard className='pt-1 pb-1 mb-2 red lighten-5'>Rescheduled not notified</MDBCard>
								<MDBCard className='pt-1 pb-1 mb-2 red lighten-5'>Double Booked</MDBCard>
							</MDBCardBody>
						</MDBCard>
					</MDBCol>
					<MDBCol lg={9} md={12}>
						<MDBCard style={{ marginBottom: '1rem' }}>
							<MDBCardBody>
								<Calendar
									localizer={localizer}
									popup
									popupOffset={{ x: 100, y: 20 }}
									defaultView='day'
									views={[ 'month', 'week', 'day' ]}
									events={appointmentData}
									style={{ height: '100vh' }}
									components={components}
									onSelectEvent={(event) => this.loadAppointment(event.id)}
								/>
								{this.renderModal()}
							</MDBCardBody>
						</MDBCard>
					</MDBCol>
				</MDBRow>
			</MDBContainer>
		);
	}
}

export default CalendarPage;
