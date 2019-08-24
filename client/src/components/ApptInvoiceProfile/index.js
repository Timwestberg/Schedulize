import React, { Component } from 'react';
import {
	MDBBtn,
	MDBModal,
	MDBModalBody,
	MDBModalHeader,
	MDBModalFooter,
	MDBInput,
	MDBIcon,
	MDBRow,
	MDBContainer,
	MDBCol,
	MDBCardTitle,
	MDBSelect,
	toast,
	ToastContainer
} from 'mdbreact';
import API from '../../utils/API';
import moment from 'moment';
import PrintProvider, { Print, NoPrint } from 'react-easy-print';
import ApptProfile from '../appointmentProfile/index';
// import PrintView from '../Profiles/PrintView';
import { clearAllBodyScrollLocks } from 'body-scroll-lock';
// import './style.css';s
class ModalProfile extends Component {
	constructor(props) {
		super(props);
		const {
			markerType,
			id,
			apptDate,
			apptTime,
			endTime,
			assigneeFirst,
			assigneeLast,
			assigneeCompany,
			assigneePhone,
			adjusterFirst,
			adjusterLast,
			adjusterCompany,
			adjusterPhone,
			dateAssigned,
			dateContractorAssigned,
			refName,
			refNumber,
			doi,
			dob,
			litigated,
			notes,
			language,
			assignmentType,
			locationName,
			address,
			city,
			state,
			postalCode,
			appointmentPrice,
			ApptMinimum,
			contractorMinimum,
			conCert,
			conID,
			conPhone,
			contractorPrice,
			additionalCost,
			status,
			contractors,
			billingContactName,
			billingPhone,
			billingEmail,
			billingLocation,
			billingAddress,
			billingCity,
			billingState,
			billingZipCode,
			statusReason,
			recipient,
			length,
			connection,
			billingStatus
		} = this.props;
		this.state = {
			update: false,
			notification: '',
			ApptModal: false,
			invoiceModal: false,
			modal: this.props.modal,
			outlined: false,
			disabled: false,
			addBilling: false,
			markerType: markerType,
			billingStatus: billingStatus,
			id: id,
			dateAssigned: moment(dateAssigned).utc().format('dddd MMM Do YYYY'),
			apptDate: apptDate,
			apptTime: apptTime,
			endTime: endTime,
			assigneeFirst: assigneeFirst,
			assigneeLast: assigneeLast,
			assigneeCompany: assigneeCompany,
			assigneePhone: assigneePhone,
			adjusterFirst: adjusterFirst,
			adjusterLast: adjusterLast,
			adjusterPhone: adjusterPhone,
			adjusterCompany: adjusterCompany,
			refName: refName,
			refNumber: refNumber,
			doi: moment(doi).format('L'),
			dob: moment(dob).format('L'),
			litigated: litigated,
			notes: notes,
			language: language,
			assignmentType: assignmentType,
			locationName: locationName,
			address: address,
			city: city,
			state: state,
			zipCode: postalCode,
			billingContactName: billingContactName,
			billingEmail: billingEmail,
			billingPhone: billingPhone,
			billingLocationName: billingLocation,
			billingAddress: billingAddress,
			billingState: billingState,
			billingCity: billingCity,
			billingZipcode: billingZipCode,
			appointmentPrice: appointmentPrice,
			ApptMinimum: ApptMinimum,
			conCert: conCert,
			conPhone: conPhone,
			contractorPrice: contractorPrice,
			contractorMinimum: contractorMinimum,
			additionalCost: additionalCost,
			status: status,
			contractors: contractors,
			dateContractorAssigned: dateContractorAssigned,
			statusReason: statusReason,
			recipient: recipient,
			length: length,
			connection: connection,
			optionsBilling: [
				{
					text: 'Billed',
					value: '1'
				},
				{
					text: 'To be Billed',
					value: '2'
				},
				{
					text: 'Waiting for information',
					value: '3'
				},
				{
					text: 'No show',
					value: '4'
				},
				{
					text: 'Cancelled',
					value: '5'
				},
				{
					text: 'Double booked',
					value: '6'
				},
				{
					text: 'Late cancellation',
					value: '7'
				},
				{
					text: 'Rescheduled not notified',
					value: '8'
				},
				{
					text: 'Office mistake',
					value: '9'
				}
			],
			optionsLanguage: [
				{
					text: 'Other',
					value: '34'
				},
				{
					text: 'Arabic',
					value: '1'
				},
				{
					text: 'Armenian',
					value: '2'
				},
				{
					text: 'Bengali ',
					value: '3'
				},
				{
					text: 'Burmese',
					value: '4'
				},
				{
					text: 'Cambodian',
					value: '5'
				},
				{
					text: 'Chinese-Mandarin',
					value: '6'
				},
				{
					text: 'Chinese-Cantonese',
					value: '7'
				},

				{
					text: 'Eastern Armenian',
					value: '8'
				},
				{
					text: 'Egyptian Spoken Arabic',
					value: '9'
				},
				{
					text: 'Farsi',
					value: '10'
				},
				{
					text: 'French',
					value: '11'
				},
				{
					text: 'German',
					value: '12'
				},
				{
					text: 'Hindu',
					value: '13'
				},
				{
					text: 'Indonesian',
					value: '14'
				},
				{
					text: 'Illocono',
					value: '15'
				},
				{
					text: 'Italian',
					value: '16'
				},
				{
					text: 'Japanese',
					value: '17'
				},
				{
					text: 'Korean',
					value: '18'
				},
				{
					text: 'Laotian',
					value: '19'
				},
				{
					text: 'Persian',
					value: '20'
				},
				{
					text: 'Polish',
					value: '21'
				},
				{
					text: 'Portuguese',
					value: '22'
				},
				{
					text: 'Punjabi',
					value: '23'
				},

				{
					text: 'Russian',
					value: '24'
				},
				{
					text: 'Sinhalese (Srilanka)',
					value: '25'
				},
				{
					text: 'Spanish',
					value: '26'
				},

				{
					text: 'Tagolog',
					value: '27'
				},
				{
					text: 'Tamil',
					value: '28'
				},
				{
					text: 'Thai',
					value: '29'
				},
				{
					text: 'Turkish',
					value: '30'
				},
				{
					text: 'Ukrainian',
					value: '31'
				},
				{
					text: 'Urdu',
					value: '32'
				},
				{
					text: 'Vietnamese',
					value: '33'
				}
			],
			optionsApptType: [
				{
					text: 'AME',
					value: '1'
				},
				{
					text: 'Chiropractic',
					value: '2'
				},
				{
					text: 'Deposition & Prep',
					value: '3'
				},
				{
					text: 'Deposition Only',
					value: '4'
				},
				{
					text: 'EUO',
					value: '5'
				},

				{
					text: 'Follow Up',
					value: '6'
				},
				{
					text: 'IEP',
					value: '7'
				},
				{
					text: 'IME',
					value: '8'
				},
				{
					text: 'Legal',
					value: '9'
				},

				{
					text: 'Medical-Certified',
					value: '10'
				},
				{
					text: 'Medical',
					value: '11'
				},

				{
					text: 'Phone Conference',
					value: '12'
				},
				{
					text: 'Deposition(Prep Only)',
					value: '13'
				},
				{
					text: 'PQME',
					value: '14'
				},
				{
					text: 'Physical Therapy',
					value: '15'
				},
				{
					text: 'Pre-op',
					value: '14'
				},
				{
					text: 'Post-op',
					value: '16'
				},
				{
					text: 'Pyschological',
					value: '17'
				},
				{
					text: 'QME',
					value: '18'
				},
				{
					text: 'Re-Evaluation',
					value: '19'
				},
				{
					text: 'Statement(Claimant)',
					value: '20'
				},
				{
					text: 'Statement(Insured)',
					value: '21'
				},
				{
					text: 'Statement(Witness)',
					value: '22'
				},
				{
					text: 'Statement(Other)-see notes',
					value: '23'
				},
				{
					text: 'Surgery',
					value: '24'
				},
				{
					text: 'Other',
					value: '25'
				}
			],
			optionsStatus: [
				{
					text: 'New appt.',
					value: '1'
				},
				{
					text: 'Staffed',
					value: '2'
				},
				{
					text: 'Confirmed',
					value: '3'
				},
				{
					text: 'Completed/Show',
					value: '4'
				},
				{
					text: 'Set up',
					value: '5'
				},
				{
					text: 'Phone conference',
					value: '6'
				},
				{
					text: 'No show',
					value: '7'
				},
				{
					text: 'Cancelled',
					value: '8'
				},
				{
					text: 'Double booked',
					value: '9'
				},
				{
					text: 'Late cancellation',
					value: '10'
				},
				{
					text: 'Rescheduled not notified',
					value: '11'
				},
				{
					text: 'Office mistake',
					value: '12'
				},
				{
					text: 'Waiting for auth.',
					value: '13'
				},
				{
					text: 'Waiting for info',
					value: '14'
				},
				{
					text: 'Waiting for confirmation',
					value: '15'
				}
			]
		};
		this.handleInputChange = this.handleInputChange.bind(this);
	}

	/**Reload Appointments after some change has been made */

	reLoad = () => {
		this.props.loadAppointments();
	};
	toggleClose = () => {
		this.props.toggle();
		// this.props.toggle();
	};

	/** Function for handling selection of the language  */
	handleLangaugeChange = (value) => {
		this.setState({
			language: value
		});
	};
	/**Function to update the appointment information in the database */
	updateDB = () => {
		/**Bringin in state to reference easily within update function */
		const {
			id,
			apptDate,
			apptTime,
			endTime,
			contractors,
			conPhone,
			contractorMinimum,
			contractorPrice,
			additionalCost,
			refName,
			litigated,
			notes,
			language,
			assignmentType,
			appointmentPrice,
			ApptMinimum,
			status,
			statusReason,
			recipient,
			length,
			connection,
			billingStatus,
			conID
		} = this.state;

		/**Function for updating the appointment form, need to reformat times when changing with moment */
		API.updateAppt(this.state.id, {
			apptDate: apptDate,
			apptTime: apptTime,
			endTime: endTime,
			billingStatus: billingStatus,
			refName: refName,
			litigated: litigated,
			notes: notes,
			language: language,
			assignmentType: assignmentType,
			appointmentPrice: appointmentPrice,
			ApptMinimum: ApptMinimum,
			contractorMinimum: contractorMinimum,
			contractorPrice: contractorPrice,
			additionalCost: additionalCost,
			status: status,
			statusReason: statusReason,
			id: id,
			contractors: contractors,
			contractorPrice: contractorPrice,
			contractorMinimum: contractorMinimum,
			conPhone: conPhone,
			recipient: recipient,
			Length: length,
			connection: connection
		})
			.then((res) => {
				this.setState({
					notification: '200',
					update: true
				});
			})
			.then(() => this.loadToBeBilled())
			.then(() => this.loadBilled())
			.then(this.toggleClose)
			.catch((err) => {
				this.setState({ notification: '422' });
			});
	};

	/**Function to update the date of the appointment in the state the database */
	getApptDateValue = (value) => {
		this.setState({
			apptDate: value
		});
	};

	loadToBeBilled = () => {
		this.props.loadToBeBilled();
	};

	loadBilled = () => {
		// console.log(id);
		this.props.loadBilled();
	};
	/**Toggle function for status reason, if one of the below status's are chosen the status reason input will appear */
	toggleStatusReason = (status) => {
		switch (status) {
			case 'No Show':
				return (
					<MDBCol size='12'>
						<MDBInput
							name='statusReason'
							label='Status Explanation'
							size='lg'
							onChange={this.handleInputChange}
							value={this.state.statusReason}
							type='text'
						/>
					</MDBCol>
				);

			case 'Double Booked':
				return (
					<MDBCol size='12'>
						<MDBInput
							name='statusReason'
							label='Status Explanation'
							size='lg'
							onChange={this.handleInputChange}
							value={this.state.statusReason}
							type='text'
						/>
					</MDBCol>
				);
			case 'Rescheduled not notified':
				return (
					<MDBCol size='12'>
						<MDBInput
							name='statusReason'
							label='Status Explanation'
							size='lg'
							onChange={this.handleInputChange}
							value={this.state.statusReason}
							type='text'
						/>
					</MDBCol>
				);
			case 'Cancelled':
				return (
					<MDBCol size='12'>
						<MDBInput
							name='statusReason'
							label='Status Explanation'
							size='lg'
							onChange={this.handleInputChange}
							value={this.state.statusReason}
							type='text'
						/>
					</MDBCol>
				);

			case 'Late cancellation':
				return (
					<MDBCol size='12'>
						<MDBInput
							name='statusReason'
							label='Status Explanation'
							size='lg'
							onChange={this.handleInputChange}
							value={this.state.statusReason}
							type='text'
						/>
					</MDBCol>
				);
			case 'Office Mistake':
				return (
					<MDBCol size='12'>
						<MDBInput
							name='statusReason'
							label='Status Explanation'
							size='lg'
							onChange={this.handleInputChange}
							value={this.state.statusReason}
							type='text'
						/>
					</MDBCol>
				);
			case 'Double Booked':
				return (
					<MDBCol size='12'>
						<MDBInput
							name='statusReason'
							label='Status Explanation'
							size='lg'
							onChange={this.handleInputChange}
							value={this.state.statusReason}
							type='text'
						/>
					</MDBCol>
				);
			default:
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
					ApptModal: !this.state.ApptModal
				});
			})
			.catch((err) => console.log(err));
	};

	/**Loads Modal with specific data set , locates using the  MongDB id  */
	loadModal = (id) => () => {
		this.loadAppointment(id);
	};
	/**Loads appropriate form with specific dataset information pulled from loadModal function */
	renderModal() {
		if (!this.state.ApptModal) {
			return null;
		}
		const { appointment } = this.state;

		return (
			<ApptProfile
				recipient={appointment.recipient}
				facility={appointment.facility}
				length={appointment.Length}
				earlyArrival={appointment.earlyArrival}
				startTime={appointment.startTime}
				repName={appointment.repName}
				receivedBy={appointment.receivedBy}
				statusReason={appointment.statusReason}
				connection={appointment.connection}
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
				modal={this.state.modal}
				toggle={this.toggle}
				modalNumber={this.state.modalNumber}
				loadAppointments={this.props.loadAppointments}
			/>
		);
	}

	/**Function to update the date the appointment was ordered by the client */
	getDateAssignedValue = (value) => {
		this.setState({
			dateAssigned: value
		});
	};

	/**Function to update the date of Injury in the state the database */
	getDOIValue = (value) => {
		this.setState({
			doi: value
		});
	};

	/**Function to update the date of birth in the state the database */
	getDOBValue = (value) => {
		this.setState({
			dob: value
		});
	};

	/**Function to delete the appointment from the database */
	DeleteAppt = () => {
		API.deleteAppt(this.state.id).then(this.props.toggle).then(this.reLoad);
	};

	/** Funcition for handling select change for assignment type input */
	handleAssignmentTypeChange = (value) => {
		this.setState({
			assignmentType: value
		});
	};
	/**Function for formating a phone number even with a country code Format: (888)999-1111 */
	formatPhoneNumber(phoneNumberString) {
		let cleaned = ('' + phoneNumberString).replace(/\D/g, '');
		let match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
		if (match) {
			let intlCode = match[1] ? '+1 ' : '';
			return [ intlCode, '(', match[2], ') ', match[3], '-', match[4] ].join('');
		}
		return null;
	}

	// Handles the update field function
	handleInputChange(event) {
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;
		// console.log(this.state)
		this.setState({
			[name]: value
		});
		console.log(this.state);
	}

	targetElement = null;
	componentDidMount() {
		// 2. Get a target element that you want to persist scrolling for (such as a modal/lightbox/flyout/nav).
		this.targetElement = document.querySelector('#modal');
	}
	componentWillUnmount() {
		// 5. Useful if we have called disableBodyScroll for multiple target elements,
		// and we just want a kill-switch to undo all that.
		// OR useful for if the `hideTargetElement()` function got circumvented eg. visitor
		// clicks a link which takes him/her to a different page within the app.
		clearAllBodyScrollLocks();
	}

	/**Toggle function for opening and closing the Modal */
	toggle = () => {
		this.setState({
			modal: !this.state.modal
		});
	};

	/**Toggle function for  enabling the inputs so info may be updated in the state */
	toggleConnection = () => {
		console.log(this.state);
		this.setState({
			connection: !this.state.connection
		});
	};

	/**Toggle function for  enabling the inputs so info may be updated in the state */
	toggleBilling = () => {
		this.setState({
			addBilling: !this.state.addBilling
		});
	};
	/**Toggle function for  enabling the inputs so info may be updated in the state */
	toggleBillingStatus = (value) => {
		this.setState({
			billingStatus: value
		});
	};

	/** Funcition for handling select change for assignment type input */
	handleStatusChange = (value) => {
		this.setState({
			status: value
		});
	};

	/**Toggle function for displaying the "Close" or "Save" Button */
	toggleCloseButton = (disabled) => {
		// console.log({ disabled });
		switch (disabled) {
			case false:
				return (
					<MDBBtn color='blue-grey' onClick={this.toggleEdit}>
						Cancel
					</MDBBtn>
				);

			case true:
				return (
					<MDBBtn color='primary' onClick={this.toggle}>
						Close
					</MDBBtn>
				);
			default:
				return (
					<MDBBtn color='primary' onClick={this.toggle}>
						Close
					</MDBBtn>
				);
		}
	};

	/**Toggels function for displaying the "Edit" or "Cancel" Button */
	toggleEditButton = (disabled) => {
		switch (disabled) {
			case true:
				return (
					<MDBBtn color='success' className='black-text' onClick={this.toggleEdit}>
						<MDBIcon icon='pencil-alt' /> Edit
					</MDBBtn>
				);
				break;
			case false:
				return (
					<div>
						<MDBBtn onClick={this.updateDB} color='primary'>
							Save
						</MDBBtn>

						<MDBBtn color='danger' onClick={this.DeleteAppt}>
							Delete
						</MDBBtn>
					</div>
				);
		}
	};

	/**Toggle function for changing Date and Time input fields for editing */
	toggleDateTimeEdit = (disabled) => {
		switch (disabled) {
			case false:
				return (
					<MDBRow center>
						<MDBCol lg='4' md='6'>
							<label>Previously: {moment(this.state.apptDate, 'HH:mm').format('hh:mm a')}</label>
							<MDBInput
								size='lg'
								labelClass='active'
								label='Appointment Date'
								type='date'
								name='apptDate'
								getValue={this.getApptDateValue}
							/>
						</MDBCol>

						<MDBCol lg='4' md='6'>
							<label>Previously: {moment(this.state.apptTime, 'HH:mm').format('hh:mm a')}</label>
							<MDBInput
								size='lg'
								labelClass='active'
								label='Appointment Time'
								type='time'
								name='apptTime'
								onChange={this.handleInputChange}
							/>
						</MDBCol>

						<MDBCol lg='4' md='6'>
							<label>Previously: {moment(this.state.endTime, 'HH:mm').format('hh:mm a')}</label>
							<MDBInput
								size='lg'
								labelClass='active'
								label='Appointment End Time'
								type='time'
								name='endTime'
								onChange={this.handleInputChange}
							/>
						</MDBCol>
					</MDBRow>
				);
			case true:
				return (
					<MDBRow center>
						<MDBCol lg='4' md='6'>
							<MDBInput
								size='lg'
								label='Appointment Date'
								name='apptDate'
								value={this.state.apptDate}
								getValue={this.getApptDateValue}
							/>
						</MDBCol>

						<MDBCol lg='4' md='6'>
							<MDBInput
								size='lg'
								label='Start Time'
								name='apptTime'
								value={moment(this.state.apptTime, 'HH:mm').format('hh:mm a')}
								icon=''
								onChange={this.handleInputChange}
							/>
						</MDBCol>

						<MDBCol lg='4' md='6'>
							<MDBInput
								size='lg'
								label='End Time'
								name='endTime'
								value={moment(this.state.endTime, 'HH:mm').format('hh:mm a')}
								icon=''
								onChange={this.handleInputChange}
							/>
						</MDBCol>
					</MDBRow>
				);
		}
	};

	/**Toggle function for changing DOB and DOI into input fields for editing */
	/**Toggle function for changing DOB and DOI into input fields for editing */
	toggleCaseInfo = (disabled) => {
		const { refName, refNumber, doi, dob, outlined } = this.state;
		switch (disabled) {
			case false:
				return (
					<MDBRow center>
						<MDBCol lg='3' md='6'>
							<MDBInput
								name='refName'
								size='lg'
								label='Case Name'
								disabled={false}
								type='text'
								value={refName}
								onChange={this.handleInputChange}
							/>
						</MDBCol>
						<MDBCol lg='3' md='6'>
							<MDBInput
								name='refNumber'
								label='Claim Number'
								size='lg'
								disabled
								type='text'
								disabled={false}
								value={refNumber}
								onChange={this.handleInputChange}
							/>
						</MDBCol>
					</MDBRow>
				);
			case true:
				return (
					<MDBRow center>
						<MDBCol lg='3' md='6'>
							<MDBInput
								name='refName'
								label='Case Name'
								size='lg'
								disabled={false}
								type='text'
								value={refName}
								onChange={this.handleInputChange}
							/>
						</MDBCol>
						<MDBCol lg='3' md='6'>
							<MDBInput
								name='refNumber'
								label='Claim Number'
								size='lg'
								disabled={false}
								type='text'
								value={refNumber}
								onChange={this.handleInputChange}
							/>
						</MDBCol>
						<MDBCol lg='3' md='6'>
							<MDBInput
								size='lg'
								label='Date of Injury/Loss:'
								name='doi'
								value={doi}
								getValue={this.getDOIValue}
							/>
						</MDBCol>
						<MDBCol lg='3' md='6'>
							<MDBInput name='dob' size='lg' label='Date of Birth:' value={dob} getValue={this.getDOBValue} />
						</MDBCol>
					</MDBRow>
				);
		}
	};

	/**Toggle function for displaying the "Editing" tag next to the window refname  */
	HeaderName = (disabled) => {
		switch (disabled) {
			case true:
				return this.state.refName;
				break;
			case false:
				return this.state.refName + ' (Editing)';
		}
	};
	/**Add final total for Phone conference with optional fees  */
	addTotal = (price, ApptMinimum, additionalCost) => {
		let a = price;
		let b = ApptMinimum;
		let c = additionalCost;
		let d = a * b;

		let e = d + parseFloat(c);
		let f = e.toFixed(2);

		return f;
	};

	/**Add the sum of two integers */
	getSum(total, num) {
		let a = parseFloat(total) + parseFloat(num);
		return a.toFixed(2);
	}
	/**Function to add Phone billing cost together, takes into account for additionalCost */
	addPhoneTotal = (length, price) => {
		console.log(this.state.connection);
		switch (this.state.connection) {
			case true || 'true':
				let a = price;
				let b = length;
				let c = 0.1;
				let connectionFee = b * c;
				let d = a * b;
				let e = d + connectionFee;

				return e;

			case false || 'false':
				let f = price;
				let g = length;
				let h = f * g;
				return h;
		}
	};

	/**Toggle function for changing Location Name title into input field */
	BillingInfo = (AddBilling) => {
		switch (AddBilling) {
			case false:
				return (
					<h4 className='BillingArea' onClick={this.toggleBilling}>
						<MDBIcon icon='angle-down' /> Open Additional Billing
					</h4>
				);

			case true:
				return (
					<div>
						<MDBRow>
							<MDBCardTitle
								rounded
								className='info-color-dark text-white z-depth-2 text-center rounded'
								tag='h2'
								size='12'>
								Billing Information
							</MDBCardTitle>
						</MDBRow>

						<MDBRow>
							<MDBCol size='12'>
								<MDBInput
									name='billingContactName'
									label='Contact'
									size='lg'
									onChange={this.handleInputChange}
									value={this.state.billingContactName}
									type='text'
								/>
							</MDBCol>

							<MDBCol size='6'>
								<MDBInput
									name='billingEmail'
									label='Email'
									size='lg'
									onChange={this.handleInputChange}
									value={this.state.billingEmail}
									type='text'
								/>
							</MDBCol>

							<MDBCol size='6'>
								<MDBInput
									name='billingPhone'
									label='Phone'
									size='lg'
									onChange={this.handleInputChange}
									value={this.formatPhoneNumber(this.state.billingPhone)}
									type='text'
								/>
							</MDBCol>
						</MDBRow>

						<MDBRow>
							<MDBCol size='12'>
								<MDBInput
									name='billingAddress'
									label='Street Address'
									onChange={this.handleInputChange}
									size='lg'
									value={this.state.billingAddress}
									type='text'
								/>
							</MDBCol>

							<MDBCol size='4'>
								<MDBInput
									name='billingCity'
									label='City'
									size='lg'
									onChange={this.handleInputChange}
									value={this.state.billingCity}
									type='text'
								/>
							</MDBCol>

							<MDBCol size='4'>
								<MDBInput
									name='billingState'
									label='State'
									size='lg'
									onChange={this.handleInputChange}
									value={this.state.billingState}
									type='text'
								/>
							</MDBCol>
							<MDBCol size='4'>
								<MDBInput
									name='billingZipCode'
									label='Zip Code'
									size='lg'
									onChange={this.handleInputChange}
									value={this.state.billingZipcode}
									type='text'
								/>
							</MDBCol>

							<h4 className='BillingArea' onClick={this.toggleBilling}>
								<MDBIcon icon='angle-up' /> Close Additional Billing
							</h4>
						</MDBRow>
					</div>
				);
		}
	};

	/**Function for displaying the correct notfication flag  */
	notification = () => {
		const { notification } = this.state;
		if (notification === '200') {
			toast.success('Appointment Saved!', {
				position: 'top-right'
			});
			this.setState({ notification: '' });
		}
		if (notification === '422') {
			toast.error('Error saving, Check inputs');
			this.setState({ notification: '' });
		}
	};

	/**Toggle Phone Conference section for appointment profile switches out the addres portion */
	togglePhoneConferenceInfo = (type) => {
		const {
			recipient,
			connection,
			length,
			contractors,
			contractorPrice,
			appointmentPrice,
			additionalCost,
			ApptMinimum,
			notes,
			conPhone,
			status,
			optionsBilling,
			optionsStatus,
			billingStatus
		} = this.state;
		switch (type) {
			case 'Phone Conference':
				return (
					<div>
						<MDBRow center>
							<MDBCol md='6'>
								<MDBInput
									size='lg'
									name='recipient'
									value={recipient}
									label='Phone Conference With'
									icon=''
									onChange={this.handleInputChange}
								/>
							</MDBCol>
							<MDBCol sm='5'>
								<MDBInput
									name='connection'
									label='Connection'
									checked={connection}
									type='checkbox'
									id='checkbox1'
									onClick={this.handleInputChange}
								/>
							</MDBCol>
						</MDBRow>

						<MDBRow center>
							<MDBCol md='6'>
								<MDBInput
									size='lg'
									name='contractors'
									value={contractors}
									label='Contractor'
									icon=''
									onChange={this.handleInputChange}
								/>
							</MDBCol>
							<MDBCol md='6'>
								<MDBInput
									name='conPhone'
									label='Phone'
									size='lg'
									value={this.formatPhoneNumber(conPhone)}
									onChange={this.handleInputChange}
								/>
							</MDBCol>
							<MDBCol lg='3' md='3'>
								<MDBInput
									size='lg'
									name='length'
									value={length}
									label='length(Minutes)'
									icon=''
									onChange={this.handleInputChange}
								/>
							</MDBCol>

							<MDBCol sm='1'>
								<MDBIcon icon='times' />
							</MDBCol>

							<MDBCol sm='3'>
								<MDBInput
									size='lg'
									name='contractorPrice'
									value={contractorPrice}
									label=' Contractor Price'
									icon=''
									onChange={this.handleInputChange}
								/>
							</MDBCol>

							<MDBCol sm='1'>
								<MDBIcon size='sm' icon='equals' />
							</MDBCol>

							<MDBCol sm='3'>
								<MDBInput
									size='lg'
									disabled='true'
									labelClass='active'
									name='total'
									value={'$' + this.addPhoneTotal(length, contractorPrice, connection)}
									label='Total'
									icon=''
								/>
							</MDBCol>
						</MDBRow>
						<MDBRow center>
							<MDBCol lg='3' md='3'>
								<MDBInput
									size='lg'
									name='length'
									value={length}
									label='length(Minutes)'
									icon=''
									onChange={this.handleInputChange}
								/>
							</MDBCol>

							<MDBCol sm='1'>
								<MDBIcon size='sm' icon='times' />
							</MDBCol>

							<MDBCol sm='3'>
								<MDBInput
									size='lg'
									name='appointmentPrice'
									label='Appointment Price'
									value={appointmentPrice}
									onChange={this.handleInputChange}
									type='number'
								/>
							</MDBCol>

							<MDBCol sm='1'>
								<MDBIcon size='sm' icon='equals' />
							</MDBCol>

							<MDBCol sm='3'>
								<MDBInput
									size='lg'
									disabled='true'
									labelClass='active'
									name='total'
									value={'$' + this.addPhoneTotal(length, appointmentPrice, connection)}
									label='Total'
									icon=''
								/>
							</MDBCol>
						</MDBRow>

						<MDBRow>
							<MDBCol sm='12'>
								<MDBInput
									size='lg'
									name='additionalCost'
									value={this.state.additionalCost}
									onChange={this.handleInputChange}
									type='number'
									label='Additional Cost'
								/>
							</MDBCol>
							<MDBCol md='12'>
								<MDBInput
									size='lg'
									name='notes'
									value={notes}
									type='textarea'
									label='Notes'
									icon=''
									onChange={this.handleInputChange}
								/>
							</MDBCol>
							<MDBCol md='6'>
								<MDBSelect
									options={this.state.optionsStatus}
									value={status}
									getTextContent={this.handleStatusChange}
									selected={status}
								/>
								<label>Appointment Status</label>
							</MDBCol>

							<MDBCol md='6'>
								<MDBSelect
									size='lg'
									options={this.state.optionsBilling}
									value={billingStatus}
									getTextContent={this.toggleBillingStatus}
									selected={billingStatus}
								/>
								<label>Billing Status</label>
							</MDBCol>
							{this.toggleStatusReason(status)}
						</MDBRow>
					</div>
				);
			default:
				return (
					<div>
						<MDBRow center>
							<MDBCol md='5'>
								<MDBInput
									name='contractors'
									label='Contractor Assigned'
									value={contractors}
									size='lg'
									onChange={this.handleInputChange}
								/>
							</MDBCol>

							<MDBCol md='6'>
								<MDBInput
									name='conPhone'
									label='Phone'
									size='lg'
									value={this.formatPhoneNumber(conPhone)}
									onChange={this.handleInputChange}
								/>
							</MDBCol>
						</MDBRow>
						<MDBRow center>
							<MDBCol sm='3'>
								<MDBInput
									size='lg'
									name='contractorPrice'
									label='Contractor Price'
									value={contractorPrice}
									onChange={this.handleInputChange}
									type='number'
								/>
							</MDBCol>
							<MDBCol sm='1'>
								<MDBIcon icon='plus' />
							</MDBCol>
							<MDBCol sm='3'>
								<MDBInput
									size='lg'
									name='additionalCost'
									value={this.state.additionalCost}
									onChange={this.handleInputChange}
									type='number'
									label='Additional Cost'
								/>
							</MDBCol>

							<MDBCol sm='1'>
								<MDBIcon size='sm' icon='equals' />
							</MDBCol>

							<MDBCol sm='3'>
								<MDBInput
									size='lg'
									labelClass='active'
									name='total'
									value={'$' + this.getSum(contractorPrice, additionalCost)}
									label='Total'
									icon=''
								/>
							</MDBCol>
						</MDBRow>

						<MDBRow center>
							<MDBCol sm='2'>
								<MDBInput
									size='lg'
									name='appointmentPrice'
									label='Appointment Price'
									value={appointmentPrice}
									onChange={this.handleInputChange}
									type='number'
								/>
							</MDBCol>
							<MDBCol sm='1'>
								<MDBIcon icon='times' />
							</MDBCol>
							<MDBCol sm='2'>
								<MDBInput
									size='lg'
									name='ApptMinimum'
									value={ApptMinimum}
									onChange={this.handleInputChange}
									type='number'
									label='Minimum Time'
								/>
							</MDBCol>

							<MDBCol sm='1'>
								<MDBIcon icon='plus' />
							</MDBCol>

							<MDBCol sm='2'>
								<MDBInput
									size='lg'
									value={additionalCost}
									name='additionalCost'
									label='Additional Cost'
									type='number'
									icon=''
									onChange={this.handleInputChange}
								/>
							</MDBCol>

							<MDBCol sm='1'>
								<MDBIcon icon='equals' />
							</MDBCol>

							<MDBCol sm='2'>
								<MDBInput
									size='lg'
									labelClass='active'
									name='total'
									value={'$' + this.addTotal(appointmentPrice, ApptMinimum, additionalCost)}
									label='Total'
									icon=''
								/>
							</MDBCol>

							<MDBCol md='12'>
								<MDBInput
									size='lg'
									name='notes'
									value={notes}
									type='textarea'
									label='Notes'
									icon=''
									onChange={this.handleInputChange}
								/>
							</MDBCol>
							<MDBCol md='6'>
								<MDBSelect
									size='lg'
									options={optionsStatus}
									value={status}
									getTextContent={this.handleStatusChange}
									selected={status}
								/>

								<label>Appointment Status</label>
							</MDBCol>
							<MDBCol md='6'>
								<MDBSelect
									size='lg'
									options={this.state.optionsBilling}
									value={billingStatus}
									getTextContent={this.toggleBillingStatus}
									selected={billingStatus}
								/>
								<label>Billing Status</label>
							</MDBCol>
							{this.toggleStatusReason(status)}
						</MDBRow>
					</div>
				);
		}
	};

	render() {
		const { apptDate, language, assignmentType, contractors, id, disabled } = this.state;
		this.notification();
		return (
			<MDBContainer>
				{/* MODAL OPEN BUTTON */}

				{/* MODAL */}
				<MDBModal
					className='cascading-modal'
					isOpen={this.state.modal}
					toggle={this.toggle}
					frame
					position='top'
					size='fluid'>
					<MDBModalHeader
						className='text-center stylish-color-dark text-white'
						titleClass='w-100'
						tag='h1'
						toggle={this.toggle}>
						{contractors + ' ' + apptDate}{' '}
						<MDBBtn outline onClick={this.loadModal(id)} color='warning'>
							Appointment
						</MDBBtn>
					</MDBModalHeader>

					{/** MODAL Body*/}
					<PrintProvider>
						<NoPrint>
							<MDBModalBody>
								<MDBContainer>
									<MDBRow center>
										<MDBCol lg='4'>
											<MDBInput
												size='lg'
												label='Appointment Date'
												name='apptDate'
												value={moment(this.state.apptDate).utc().format('L')}
												getValue={this.getApptDateValue}
											/>
										</MDBCol>

										<MDBCol lg='4'>
											<MDBInput
												size='lg'
												label='Start Time'
												name='apptTime'
												value={moment(this.state.apptTime, 'HH:mm').format('hh:mm a')}
												icon=''
												onChange={this.handleInputChange}
											/>
										</MDBCol>

										<MDBCol lg='4'>
											<MDBInput
												size='lg'
												label='End Time'
												name='endTime'
												value={moment(this.state.endTime, 'HH:mm').format('hh:mm a')}
												icon=''
												onChange={this.handleInputChange}
											/>
										</MDBCol>

										<MDBCol md='12'>
											<MDBInput
												name='refName'
												label='Case Name'
												size='lg'
												type='text'
												value={this.state.refName}
												onChange={this.handleInputChange}
											/>
										</MDBCol>
										<MDBCol md='6'>
											<label>Claim Number</label>
											<MDBInput
												name='refNumber'
												size='lg'
												type='text'
												value={this.state.refNumber}
												onChange={this.handleInputChange}
											/>
										</MDBCol>

										<MDBCol sm='3'>
											<label>Appt. Type</label>
											<MDBSelect
												searchId='assignmentType'
												label='Assignment Type'
												search
												size='lg'
												options={this.state.optionsApptType}
												value={assignmentType}
												disabled={disabled}
												getTextContent={this.handleAssignmentTypeChange}
												selected={assignmentType}
											/>
										</MDBCol>

										<MDBCol sm='3'>
											<label>Language</label>
											<MDBSelect
												search
												options={this.state.optionsLanguage}
												value={language}
												getTextContent={this.handleLangaugeChange}
												selected={language}
											/>
										</MDBCol>
									</MDBRow>

									<MDBCardTitle
										className='info-color-dark text-white z-depth-2 text-center rounded'
										tag='h2'
										size='12'>
										Assignee Information
									</MDBCardTitle>
									<MDBRow>
										<MDBCol lg='3' md='6'>
											<MDBInput
												name='assigneeFirst'
												label='First Name '
												size='lg'
												disabled={false}
												type='text'
												value={this.state.assigneeFirst}
												onChange={this.handleInputChange}
											/>
										</MDBCol>

										<MDBCol lg='3' md='6'>
											<MDBInput
												name='assigneeLast'
												label='Last Name'
												size='lg'
												disabled={false}
												type='text'
												value={this.state.assigneeLast}
												onChange={this.handleInputChange}
											/>
										</MDBCol>

										<MDBCol lg='3' md='6'>
											<MDBInput
												name='assigneeCompany'
												label='Company Name'
												size='lg'
												disabled={false}
												type='text'
												value={this.state.assigneeCompany}
												onChange={this.handleInputChange}
											/>
										</MDBCol>

										<MDBCol lg='3' md='6'>
											<MDBInput
												name='assigneePhone'
												label='Phone'
												size='lg'
												disabled={false}
												value={this.formatPhoneNumber(this.state.assigneePhone)}
												onChange={this.handleInputChange}
											/>
										</MDBCol>
									</MDBRow>
									<MDBCardTitle
										className='info-color-dark text-white z-depth-2 text-center rounded'
										tag='h2'
										size='12'>
										Adjuster Information
									</MDBCardTitle>

									<MDBRow>
										<MDBCol lg='3' md='6'>
											<MDBInput
												name='adjusterFirst'
												label='First Name '
												size='lg'
												disabled={false}
												value={this.state.adjusterFirst}
												onChange={this.handleInputChange}
											/>
										</MDBCol>

										<MDBCol lg='3' md='6'>
											<MDBInput
												name='adjusterLast'
												label='Last Name'
												size='lg'
												disabled={false}
												value={this.state.adjusterLast}
												onChange={this.handleInputChange}
											/>
										</MDBCol>

										<MDBCol lg='3' md='6'>
											<MDBInput
												name='adjusterCompany'
												label='Company Name'
												size='lg'
												disabled={false}
												value={this.state.adjusterCompany}
												onChange={this.handleInputChange}
											/>
										</MDBCol>

										<MDBCol lg='3' md='6'>
											<MDBInput
												name='adjusterPhone'
												label='Phone'
												size='lg'
												disabled={false}
												type='text'
												value={this.formatPhoneNumber(this.state.adjusterPhone)}
												onChange={this.handleInputChange}
											/>
										</MDBCol>
									</MDBRow>
									<MDBCardTitle
										className='info-color-dark text-white z-depth-2 text-center rounded'
										tag='h2'
										size='12'>
										Contractor Information
									</MDBCardTitle>
									<MDBRow> {this.togglePhoneConferenceInfo(assignmentType)} </MDBRow>
								</MDBContainer>
							</MDBModalBody>
						</NoPrint>
					</PrintProvider>
					<MDBModalFooter>
						<MDBBtn onClick={this.updateDB} color='green'>
							Finish
						</MDBBtn>

						<MDBBtn color='red' onClick={this.toggle}>
							Close
						</MDBBtn>
					</MDBModalFooter>
				</MDBModal>
				{this.renderModal()}
				<ToastContainer hideProgressBar={true} newestOnTop={true} autoClose={5000} />
			</MDBContainer>
		);
	}
}
export default ModalProfile;
