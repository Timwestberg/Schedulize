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
// Form to create a follow up appointment
import FollowUp from '../Profiles/DuplicateAppt';
// Print Preview window where employee can print appointment
import PrintView from '../Profiles/PrintView';
import { clearAllBodyScrollLocks } from 'body-scroll-lock';
import './style.css';
class ModalProfile extends Component {
	constructor(props) {
		super(props);
		const {
			markerType,
			id,
			apptDate,
			apptTime,
			earlyArrival,
			startTime,
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
			repName,
			receivedBy,
			facility
		} = this.props;

		this.state = {
			update: false,
			notification: '',
			followUpModal: false,
			printModal: false,
			modal: false,
			outlined: false,
			disabled: true,
			addBilling: false,
			facility: facility,
			markerType: markerType,
			PrintViewData: [],
			id: id,
			dateAssigned: dateAssigned,
			apptDate: moment(apptDate).utc().format('L'),
			apptTime: apptTime,
			earlyArrival: earlyArrival,
			startTime: startTime,
			endTime: endTime,
			repName: repName,
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
			postalCode: postalCode,
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
			receivedBy: receivedBy,
			optionsReceivedBy: [
				{
					text: 'Phone',
					value: '1'
				},
				{
					text: 'Email',
					value: '2'
				},
				{
					text: 'Mail',
					value: '3'
				},
				{
					text: 'Contractor',
					value: '4'
				}
			],

			optionsReps: [
				{
					text: 'Employee 1',
					value: '1'
				},
				{
					text: 'Employee 2',
					value: '2'
				},
				{
					text: 'Employee 3',
					value: '3'
				},
				{
					text: 'Employee 4',
					value: '4'
				},
				{
					text: 'Employee 5',
					value: '5'
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
			],
			confirmDelete: false
		};
		this.handleInputChange = this.handleInputChange.bind(this);
	}

	/**Reload Appointments after some change has been made */

	reLoad = (id) => {
		this.props.loadAppointments(id);
	};

	/**If an update has been made then reload the appointments , if no change occurs do not reload data */
	toggleClose = () => {
		// const update = this.state.update;
		// if (update === true) {
		// 	return this.reLoad();
		// } else if (update === false) {
		// 	return this.props.toggle();
		// }
		this.props.toggle();
	};

	/** Function for handling the selection of how an appointment was received */
	handleReceivedBy = (value) => {
		this.setState({
			receivedBy: value
		});
	};

	/** Function for handling selection of the employee who took the work order from the client */
	handleRepSelect = (value) => {
		this.setState({
			repName: value
		});
	};

	/** Function for handling selection of the language  */
	handleLangaugeChange = (value) => {
		this.setState({
			language: value
		});
	};

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
		API.deleteAppt(this.state.id)
			.then(this.props.toggle)
			.then(this.reLoad(this.state.id))
			.then(this.notification('delete'));
	};

	/** Function for handling select change for assignment type input */
	handleAssignmentTypeChange = (value) => {
		this.setState({
			assignmentType: value
		});
	};

	/**Function to update the date of the appointment in the state the database */
	getApptDateValue = (value) => {
		this.setState({
			apptDate: value
		});
	};

	/** Handles the update field function*/

	handleInputChange(event) {
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;

		this.setState({
			[name]: value
		});
	}

	/**Toggle function for  enabling the inputs so info may be updated in the state */
	toggleEdit = () => {
		this.setState({
			disabled: !this.state.disabled,
			outlined: !this.state.outlined
		});
	};

	/**Toggle function for  enabling the inputs so info may be updated in the state */
	toggleBilling = () => {
		this.setState({
			addBilling: !this.state.addBilling
		});
	};

	/** Function for handling select change for assignment status input */
	handleStatusChange = (value) => {
		this.setState({
			status: value
		});
	};

	/**Toggle to confirm whether the appointment should be deleted or not , opens modal with additional dialogue */
	toggleConfirm = () => {
		this.setState({
			confirmDelete: !this.state.confirmDelete
		});
	};
	/**Toggle function for displaying the "Editing" tag next to the window refname  */
	HeaderName = (disabled) => {
		const { refName } = this.state;
		switch (disabled) {
			case true:
				return refName;
				break;
			case false:
				return refName + ' (Editing)';
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

	/**Add the total of a phone conference with optional fees */
	addPhoneTotal = (length, price) => {
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

			default:
				let i = price;
				let j = length;
				let k = i * j;
				return k;
		}
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
	/**Function to update the appointment information in the database */
	updateDB = () => {
		/**Bringin in state to reference easily within update function */
		const {
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
			contractors,
			conPhone,
			conCert,
			contractorMinimum,
			contractorPrice,
			additionalCost,
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
			status,
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
			repName,
			receivedBy,
			facility,
			earlyArrival,
			startTime
		} = this.state;

		/**Function for updating the appointment form, need to reformat times when changing with moment */
		API.updateAppt(this.state.id, {
			apptDate: apptDate,
			apptTime: apptTime,
			earlyArrival: earlyArrival,
			startTime: startTime,
			endTime: endTime,
			repName: repName,
			assigneeFirst: assigneeFirst,
			assigneeLast: assigneeLast,
			facility: facility,
			assigneeCompany: assigneeCompany,
			assigneePhone: assigneePhone,
			adjusterFirst: adjusterFirst,
			adjusterLast: adjusterLast,
			adjusterCompany: adjusterCompany,
			adjusterPhone: adjusterPhone,
			refName: refName,
			refNumber: refNumber,
			doi: doi,
			dob: dob,
			litigated: litigated,
			notes: notes,
			language: language,
			assignmentType: assignmentType,
			locationName: locationName,
			address: address,
			city: city,
			state: state,
			postalCode: postalCode,
			appointmentPrice: appointmentPrice,
			ApptMinimum: ApptMinimum,
			contractorMinimum: contractorMinimum,
			contractorPrice: contractorPrice,
			additionalCost: additionalCost,
			status: status,
			statusReason: statusReason,
			id: id,
			billingContactName: billingContactName,
			billingPhone: billingPhone,
			billingEmail: billingEmail,
			billingLocation: billingLocation,
			billingAddress: billingAddress,
			billingCity: billingCity,
			billingState: billingState,
			billingZipCode: billingZipCode,
			contractors: contractors,
			contractorPrice: contractorPrice,
			contractorMinimum: contractorMinimum,
			conPhone: conPhone,
			conCert: conCert,
			recipient: recipient,
			Length: length,
			connection: connection,
			dateAssigned: dateAssigned,
			receivedBy: receivedBy,
			dateContractorAssigned: dateContractorAssigned
		})
			.then(this.toggleEdit)
			.then((res) => {
				this.setState({
					notification: '200',
					update: true
				});
			})
			.catch((err) => {
				this.setState({ notification: '422' });
			});
	};

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
		if (notification === 'delete') {
			toast.error('Appointment Deleted');
			this.setState({ notification: '' });
		}
	};

	/**Loads Modal with specific data set , locates using the  MongDB id  */
	loadModal = (id) => () => {
		this.loadAppointment(id);
	};

	/**
   * Using API to load information from MONGODB |
   * Appointment infromation */
	loadAppointment = (id) => {
		API.getAppt(id)
			.then((res) => {
				this.setState({
					PrintViewData: res.data,
					printModal: !this.state.printModal
				});
			})
			.catch((err) => console.log(err));
	};

	/**Loads appropriate form with specific dataset information pulled from loadModal function */
	renderModal() {
		if (!this.state.printModal) {
			return null;
		}
		const { PrintViewData } = this.state;

		return (
			<div>
				<PrintView
					recipient={PrintViewData.recipient}
					length={PrintViewData.Length}
					earlyArrival={PrintViewData.earlyArrival}
					startTime={PrintViewData.startTime}
					repName={PrintViewData.repName}
					connection={PrintViewData.connection}
					markerType={PrintViewData.markerType}
					dateAssigned={PrintViewData.dateAssigned}
					apptDate={PrintViewData.apptDate}
					apptTime={PrintViewData.apptTime}
					endTime={PrintViewData.endTime}
					assigneeFirst={PrintViewData.assigneeFirst}
					assigneeLast={PrintViewData.assigneeLast}
					assigneeCompany={PrintViewData.assigneeCompany}
					assigneePhone={PrintViewData.assigneePhone}
					adjusterFirst={PrintViewData.adjusterFirst}
					adjusterLast={PrintViewData.adjusterLast}
					adjusterPhone={PrintViewData.adjusterPhone}
					adjusterCompany={PrintViewData.adjusterCompany}
					refName={PrintViewData.refName}
					refNumber={PrintViewData.refNumber}
					doi={PrintViewData.doi}
					dob={PrintViewData.dob}
					litigated={PrintViewData.litigated}
					notes={PrintViewData.notes}
					language={PrintViewData.language}
					assignmentType={PrintViewData.assignmentType}
					locationName={PrintViewData.locationName}
					address={PrintViewData.address}
					city={PrintViewData.city}
					state={PrintViewData.state}
					postalCode={PrintViewData.postalCode}
					name={PrintViewData.refName}
					id={PrintViewData._id}
					statusReason={PrintViewData.statusReason}
					contractors={PrintViewData.contractors}
					appointmentPrice={PrintViewData.appointmentPrice}
					ApptMinimum={PrintViewData.ApptMinimum}
					contractorMinimum={PrintViewData.contractorMinimum}
					contractorPrice={PrintViewData.contractorPrice}
					additionalCost={PrintViewData.additionalCost}
					status={PrintViewData.status}
					billingContactName={PrintViewData.billingContactName}
					billingPhone={PrintViewData.billingPhone}
					billingEmail={PrintViewData.billingEmail}
					billingLocationName={PrintViewData.billingLocationName}
					billingAddress={PrintViewData.billingAddress}
					billingState={PrintViewData.billingState}
					billingCity={PrintViewData.billingCity}
					billingZipcode={PrintViewData.billingZipcode}
					conPhone={PrintViewData.conPhone}
					receivedBy={PrintViewData.receivedBy}
					conCert={PrintViewData.conCert}
					dateContractorAssigned={PrintViewData.dateContractorAssigned}
					modalId='apptModal'
					printModal={this.state.printModal}
					loadAppointments={this.props.loadAppointments}
				/>
			</div>
		);
	}

	/**Toggle function for status reason, if one of the below status's are chosen the status reason input will appear */
	toggleStatusReason = (status) => {
		switch (status) {
			case 'No show':
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

			case 'Double booked':
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
			case 'Office mistake':
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
	/**Toggle function for displaying the "Close" or "Save" Button */
	toggleCloseButton = (disabled) => {
		switch (disabled) {
			case false:
				return (
					<MDBBtn color='blue-grey' onClick={this.toggleEdit}>
						Cancel
					</MDBBtn>
				);

			case true:
				return (
					<MDBBtn color='primary' onClick={this.toggleClose}>
						Close
					</MDBBtn>
				);
			default:
				return (
					<MDBBtn color='primary' onClick={this.toggleClose}>
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

						<MDBBtn color='danger' onClick={this.toggleConfirm}>
							Delete
						</MDBBtn>
					</div>
				);
		}
	};

	/**Toggle function for changing Location Name title into input field */
	toggleLocationNameEdit = (disabled) => {
		const { locationName, facility } = this.state;
		switch (disabled) {
			case false:
				return (
					<MDBRow>
						<MDBCol sm='11'>
							<MDBInput
								name='locationName'
								value={locationName}
								label='Location'
								size='lg'
								disabled={disabled}
								type='text'
								onChange={this.handleInputChange}
							/>
						</MDBCol>
						<MDBCol sm='1'>
							<MDBInput
								size='lg'
								disabled={disabled}
								checked={facility}
								id='facility'
								name='facility'
								type='checkbox'
								label='Facility/Attny Confirmed'
								icon=''
								onClick={this.handleInputChange}
							/>
						</MDBCol>
					</MDBRow>
				);
			case true:
				return (
					<MDBRow>
						<MDBCol sm='11'>
							<MDBCardTitle
								className='info-color-dark text-white z-depth-2 text-center rounded'
								tag='h2'
								size='12'>
								{locationName}
							</MDBCardTitle>
						</MDBCol>
						<MDBCol sm='1'>
							<MDBInput
								size='lg'
								disabled={disabled}
								checked={facility}
								id='facility'
								name='facility'
								type='checkbox'
								label='Facility/Attny Confirmed'
								icon=''
								onClick={this.handleInputChange}
							/>
						</MDBCol>
					</MDBRow>
				);
		}
	};

	/**Toggle function for changing Date and Time input fields for editing */
	toggleDateTimeEdit = (disabled) => {
		const { apptDate, apptTime, endTime, outlined } = this.state;
		switch (disabled) {
			case false:
				return (
					<MDBRow center>
						<MDBCol md='3'>
							<label>Previously: {apptDate}</label>
							<MDBInput
								size='lg'
								labelClass='active'
								label='Appointment Date'
								type='date'
								name='apptDate'
								outline={outlined}
								disabled={disabled}
								getValue={this.getApptDateValue}
							/>
						</MDBCol>
						<MDBCol sm='6' md='3'>
							<MDBInput
								size='lg'
								checked={this.state.earlyArrival}
								outline={outlined}
								disabled={disabled}
								id='earlyArrival'
								name='earlyArrival'
								type='checkbox2'
								label='Arrival?'
								type='checkbox'
								icon=''
								onChange={this.handleInputChange}
							/>
						</MDBCol>
						<MDBCol md='2'>
							<MDBInput
								size='lg'
								labelClass='active'
								label='Arrival Time'
								type='time'
								name='apptTime'
								value={this.state.apptTime.toUpperCase()}
								outline={outlined}
								disabled={disabled}
								onChange={this.handleInputChange}
							/>
						</MDBCol>

						{this.ArrivalTimeEdit(this.state.earlyArrival)}

						<MDBCol sm='2'>
							<MDBInput
								size='lg'
								labelClass='active'
								label='End Time'
								type='time'
								name='endTime'
								value={this.state.endTime.toUpperCase()}
								outline={outlined}
								disabled={disabled}
								onChange={this.handleInputChange}
							/>
						</MDBCol>
					</MDBRow>
				);
			case true:
				return (
					<MDBRow center>
						<MDBCol sm='6' md='3'>
							<MDBInput
								size='lg'
								label='Appointment Date'
								name='apptDate'
								value={apptDate}
								outline={outlined}
								disabled={disabled}
								getValue={this.getApptDateValue}
							/>
						</MDBCol>
						<MDBCol md='3'>
							<MDBInput
								size='lg'
								checked={this.state.earlyArrival}
								outline={outlined}
								disabled={disabled}
								id='earlyArrival'
								name='earlyArrival'
								type='checkbox2'
								label='Arrival?'
								type='checkbox'
								icon=''
								onChange={this.handleInputChange}
							/>
						</MDBCol>

						<MDBCol md='2'>
							<MDBInput
								size='lg'
								label='Arrival Time'
								name='apptTime'
								value={moment(apptTime, 'HH:mm').format('hh:mm a')}
								icon=''
								outline={outlined}
								disabled={disabled}
								onChange={this.handleInputChange}
							/>
						</MDBCol>

						{this.ArrivalDisabled(this.state.earlyArrival)}

						<MDBCol md='2'>
							<MDBInput
								size='lg'
								label='End Time'
								name='endTime'
								value={moment(endTime, 'HH:mm').format('hh:mm a')}
								icon=''
								outline={outlined}
								disabled={disabled}
								onChange={this.handleInputChange}
							/>
						</MDBCol>
					</MDBRow>
				);
		}
	};

	/**Toggle function for changing DOB and DOI into input fields for editing */
	toggleCaseInfo = (disabled) => {
		const { refName, refNumber, doi, dob, outlined } = this.state;
		switch (disabled) {
			case false:
				return (
					<MDBRow center>
						<MDBCol lg='3' md='6'>
							<label>Case Name:</label>
							<MDBInput
								outline={outlined}
								name='refName'
								size='lg'
								label='Case Name'
								disabled={disabled}
								type='text'
								value={refName}
								onChange={this.handleInputChange}
							/>
						</MDBCol>
						<MDBCol lg='3' md='6'>
							<label>Claim Number</label>
							<MDBInput
								outline={outlined}
								name='refNumber'
								label='Claim Number'
								size='lg'
								disabled
								type='text'
								disabled={disabled}
								value={refNumber}
								onChange={this.handleInputChange}
							/>
						</MDBCol>
						<MDBCol lg='3' md='6'>
							<label>Previously: {doi}</label>
							<MDBInput
								size='lg'
								labelClass='active'
								label='Date of Injury/Loss'
								name='doi'
								type='date'
								disabled={disabled}
								outline={outlined}
								getValue={this.getDOIValue}
							/>
						</MDBCol>
						<MDBCol lg='3' md='6'>
							<label>Previously: {dob}</label>
							<MDBInput
								size='lg'
								name='dob'
								labelClass='active'
								label='Date of Birth'
								type='date'
								disabled={disabled}
								outline={outlined}
								getValue={this.getDOBValue}
							/>
						</MDBCol>
					</MDBRow>
				);
			case true:
				return (
					<MDBRow center>
						<MDBCol lg='3' md='6'>
							<MDBInput
								outline={outlined}
								name='refName'
								label='Case Name'
								size='lg'
								disabled={disabled}
								type='text'
								value={refName}
								onChange={this.handleInputChange}
							/>
						</MDBCol>
						<MDBCol lg='3' md='6'>
							<MDBInput
								outline={outlined}
								name='refNumber'
								label='Claim Number'
								size='lg'
								disabled={disabled}
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
	/**Function for toggling early arrival time  */
	ArrivalDisabled = (earlyArrival) => {
		switch (earlyArrival) {
			case true:
				return (
					<MDBCol md='2'>
						<MDBInput
							size='lg'
							labelClass='active'
							type='time'
							name='startTime'
							label='Start Time'
							value={this.state.startTime}
							outline={this.state.outlined}
							disabled={this.state.disabled}
							onChange={this.handleInputChange}
						/>
					</MDBCol>
					// <MDBCol md='2'>

					// 	<MDBInput
					// 		size='lg'
					// 		labelClass='active'
					// 		outline={this.state.outlined}
					// 		disabled={this.state.disabled}
					// 		type='time'
					// 		name='startTime'
					// 		label='Start Time'
					// 		value={this.state.startTime}
					// 		icon=''
					// 		onChange={this.handleInputChange}
					// 	/>
					// </MDBCol>
				);
			case false:
				return '';
		}
	};

	/**Function for toggling early arrival time  */
	ArrivalTimeEdit = (earlyArrival) => {
		switch (earlyArrival) {
			case true:
				return (
					<MDBCol md='2'>
						<MDBInput
							size='lg'
							labelClass='active'
							outline={this.state.outlined}
							disabled={this.state.disabled}
							type='time'
							name='startTime'
							label='Start Time'
							value={this.state.startTime}
							icon=''
							onChange={this.handleInputChange}
						/>
					</MDBCol>
				);
			case false:
				return '';
		}
	};

	/**Toggle function for opening the additional information section , Where outside billing info may be added*/
	BillingInfo = (AddBilling) => {
		const {
			billingContactName,
			billingEmail,
			billingPhone,
			billingAddress,
			billingCity,
			billingState,
			billingZipcode
		} = this.state;
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
									disabled={this.state.disabled}
									outline={this.state.outlined}
									onChange={this.handleInputChange}
									value={billingContactName}
									type='text'
								/>
							</MDBCol>

							<MDBCol size='6'>
								<MDBInput
									name='billingEmail'
									label='Email'
									size='lg'
									disabled={this.state.disabled}
									outline={this.state.outlined}
									onChange={this.handleInputChange}
									value={billingEmail}
									type='text'
								/>
							</MDBCol>

							<MDBCol size='6'>
								<MDBInput
									name='billingPhone'
									label='Phone'
									size='lg'
									disabled={this.state.disabled}
									outline={this.state.outlined}
									onChange={this.handleInputChange}
									value={this.formatPhoneNumber(billingPhone)}
									type='text'
								/>
							</MDBCol>
						</MDBRow>

						<MDBRow>
							<MDBCol size='12'>
								<MDBInput
									name='billingAddress'
									label='Street Address'
									disabled={this.state.disabled}
									outline={this.state.outlined}
									onChange={this.handleInputChange}
									size='lg'
									value={billingAddress}
									type='text'
								/>
							</MDBCol>

							<MDBCol size='4'>
								<MDBInput
									name='billingCity'
									label='City'
									size='lg'
									disabled={this.state.disabled}
									outline={this.state.outlined}
									onChange={this.handleInputChange}
									value={billingCity}
									type='text'
								/>
							</MDBCol>

							<MDBCol size='4'>
								<MDBInput
									name='billingState'
									label='State'
									size='lg'
									disabled={this.state.disabled}
									outline={this.state.outlined}
									onChange={this.handleInputChange}
									value={billingState}
									type='text'
								/>
							</MDBCol>
							<MDBCol size='4'>
								<MDBInput
									name='billingZipCode'
									label='Zip Code'
									size='lg'
									disabled={this.state.disabled}
									outline={this.state.outlined}
									onChange={this.handleInputChange}
									value={billingZipcode}
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

	/**Toggle Phone Conference section for appointment profile switches out the addres portion */
	togglePhoneConferenceInfo = (type) => {
		const {
			recipient,
			connection,
			length,
			contractors,
			notes,
			contractorPrice,
			appointmentPrice,
			outlined,
			disabled,
			additionalCost,
			dateContractorAssigned,
			conCert,
			conPhone,
			address,
			ApptMinimum,
			city,
			state,
			postalCode
		} = this.state;
		switch (type) {
			case 'Phone Conference':
				return (
					<div>
						<MDBRow>
							<MDBCol lg='6' md='6'>
								<MDBInput
									size='lg'
									outline={outlined}
									disabled={disabled}
									name='recipient'
									value={recipient}
									label='Phone Conference With'
									icon=''
									onChange={this.handleInputChange}
								/>
							</MDBCol>
							<MDBCol sm='6'>
								<MDBInput
									size='lg'
									disabled={disabled}
									checked={connection}
									id='connection'
									name='connection'
									type='checkbox'
									label='Connection'
									icon=''
									onClick={this.handleInputChange}
								/>
							</MDBCol>
						</MDBRow>

						<MDBRow center>
							<MDBCol lg='12'>
								<MDBInput
									size='lg'
									outline={outlined}
									disabled={disabled}
									name='contractors'
									value={contractors}
									label='Contractor'
									icon=''
									onChange={this.handleInputChange}
								/>
							</MDBCol>
							<MDBCol lg='3' md='3'>
								<MDBInput
									size='lg'
									outline={outlined}
									disabled={disabled}
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
									outline={outlined}
									disabled={disabled}
									name='contractorPrice'
									label='Contractor Price'
									value={contractorPrice}
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
									value={'$' + this.addPhoneTotal(length, contractorPrice)}
									label='Total'
									icon=''
								/>
							</MDBCol>
						</MDBRow>
						<MDBRow center>
							<MDBCol lg='3' md='3'>
								<MDBInput
									size='lg'
									outline={outlined}
									disabled={disabled}
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
									outline={outlined}
									disabled={disabled}
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
							<MDBCol lg='10' md='12'>
								<MDBInput
									outline={outlined}
									disabled={disabled}
									size='lg'
									name='notes'
									value={notes}
									type='textarea'
									label='Notes'
									icon=''
									onChange={this.handleInputChange}
								/>
							</MDBCol>
						</MDBRow>

						<MDBRow>
							<MDBCol sm='12'>
								<MDBInput
									size='lg'
									value={additionalCost}
									name='additionalCost'
									label='Additional Cost'
									icon=''
									onChange={this.handleInputChange}
								/>
							</MDBCol>
						</MDBRow>
					</div>
				);
			default:
				return (
					<div>
						<MDBRow>
							<MDBCol md='6' lg='4'>
								<MDBInput
									name='dateContractorAssigned'
									outline={outlined}
									label='Date Contractor Assigned'
									value={dateContractorAssigned}
									size='lg'
									disabled={disabled}
									onChange={this.handleInputChange}
								/>
							</MDBCol>
							<MDBCol md='6' lg='3'>
								<MDBInput
									name='contractors'
									outline={outlined}
									label='Contractor Assigned'
									value={contractors}
									size='lg'
									disabled={disabled}
									onChange={this.handleInputChange}
								/>
							</MDBCol>

							<MDBCol md='6' lg='2'>
								<MDBInput
									name='conCert'
									outline={outlined}
									label='Cert. Number'
									value={conCert}
									size='lg'
									disabled={disabled}
									onChange={this.handleInputChange}
								/>
							</MDBCol>

							<MDBCol md='6' lg='3'>
								<MDBInput
									outline={outlined}
									name='conPhone'
									label='Phone'
									size='lg'
									disabled={disabled}
									value={conPhone}
									onChange={this.handleInputChange}
								/>
							</MDBCol>

							<MDBCol sm='3'>
								<MDBInput
									size='lg'
									outline={outlined}
									disabled={disabled}
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
									type='text'
									label='Additional Cost'
								/>
							</MDBCol>

							<MDBCol sm='1'>
								<MDBIcon size='sm' icon='equals' />
							</MDBCol>

							<MDBCol sm='3'>
								<MDBInput
									size='lg'
									outline={outlined}
									disabled={disabled}
									labelClass='active'
									name='total'
									value={'$' + this.getSum(contractorPrice, additionalCost)}
									label='Total'
									icon=''
								/>
							</MDBCol>
						</MDBRow>

						{/** Toggle Edit input for Location name */}
						{this.toggleLocationNameEdit(this.state.disabled)}

						<MDBRow>
							<MDBCol size='12'>
								<MDBInput
									outline={outlined}
									name='address'
									label='Street Address'
									size='lg'
									disabled={disabled}
									type='text'
									value={address}
									onChange={this.handleInputChange}
								/>
							</MDBCol>

							<MDBCol size='4'>
								<MDBInput
									outline={outlined}
									name='city'
									label='City'
									disabled={disabled}
									size='lg'
									type='text'
									value={city}
									onChange={this.handleInputChange}
								/>
							</MDBCol>

							<MDBCol size='4'>
								<MDBInput
									outline={outlined}
									name='state'
									label='State'
									disabled={disabled}
									size='lg'
									type='text'
									value={state}
									onChange={this.handleInputChange}
								/>
							</MDBCol>

							<MDBCol size='4'>
								<MDBInput
									outline={outlined}
									name='postalCode'
									label='Zip Code'
									disabled={disabled}
									size='lg'
									type='number'
									value={postalCode}
									onChange={this.handleInputChange}
								/>
							</MDBCol>
						</MDBRow>

						<MDBRow center>
							<MDBCol sm='2'>
								<MDBInput
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
									value={additionalCost}
									name='additionalCost'
									label='Additional Cost'
									icon=''
									onChange={this.handleInputChange}
								/>
							</MDBCol>

							<MDBCol sm='1'>
								<MDBIcon icon='equals' />
							</MDBCol>

							<MDBCol sm='2'>
								<MDBInput
									labelClass='active'
									name='total'
									value={'$' + this.addTotal(appointmentPrice, ApptMinimum, additionalCost)}
									label='Total'
									icon=''
								/>
							</MDBCol>

							<MDBCol lg='10' md='12'>
								<MDBInput
									outline={outlined}
									disabled={disabled}
									size='lg'
									name='notes'
									value={notes}
									type='textarea'
									label='Notes'
									icon=''
									onChange={this.handleInputChange}
								/>
							</MDBCol>
						</MDBRow>
					</div>
				);
		}
	};

	render() {
		const {
			disabled,
			outlined,
			addBilling,
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
			recipient,
			connection,
			length,
			repName,
			receivedBy
		} = this.state;
		this.notification();
		return (
			<MDBContainer>
				{/* MODAL OPEN BUTTON */}

				{/* MODAL */}
				<MDBModal className='cascading-modal' isOpen={this.props.modal} size='fluid'>
					<MDBModalHeader className='text-center stylish-color-dark text-white' titleClass='w-100' tag='h1'>
						<MDBRow>
							<MDBCol sm='6' md='3' lg>
								{this.HeaderName(disabled)}
							</MDBCol>
							<MDBCol sm='6' md='3'>
								<FollowUp
									markerType={markerType}
									dateAssigned={dateAssigned}
									apptDate={apptDate}
									apptTime={apptTime}
									endTime={endTime}
									assigneeFirst={assigneeFirst}
									assigneeLast={assigneeLast}
									assigneeCompany={assigneeCompany}
									assigneePhone={assigneePhone}
									adjusterFirst={adjusterFirst}
									adjusterLast={adjusterLast}
									adjusterPhone={adjusterPhone}
									adjusterCompany={adjusterCompany}
									refName={refName}
									refNumber={refNumber}
									doi={doi}
									dob={dob}
									litigated={litigated}
									notes={notes}
									language={language}
									assignmentType={assignmentType}
									locationName={locationName}
									address={address}
									city={city}
									state={state}
									postalCode={postalCode}
									name={refName}
									id={id}
									contractors={contractors}
									appointmentPrice={appointmentPrice}
									ApptMinimum={ApptMinimum}
									contractorMinimum={contractorMinimum}
									contractorPrice={contractorPrice}
									additionalCost={additionalCost}
									status={status}
									billingContactName={billingContactName}
									billingPhone={billingPhone}
									billingEmail={billingEmail}
									billingLocationName={billingLocation}
									billingAddress={billingAddress}
									billingState={billingState}
									billingCity={billingCity}
									billingZipcode={billingZipCode}
									recipient={recipient}
									length={length}
									connection={connection}
								/>
							</MDBCol>

							<MDBCol sm='6' md='3'>
								<MDBBtn outline onClick={this.loadModal(this.state.id)} color='warning'>
									Print
								</MDBBtn>
							</MDBCol>

							<MDBCol sm='6' md='3'>
								{/* To change the exit icon , edit below */}

								<MDBIcon far icon='times-circle' onClick={this.toggleClose} size='3x' className='exitIcon' />
								{/* <MDBIcon icon='times-circle' onClick={this.toggleClose} size='3x' className='exitIcon' /> */}
							</MDBCol>
						</MDBRow>
					</MDBModalHeader>

					<MDBModalBody>
						<MDBContainer>
							<MDBRow center>
								<MDBCol md='3'>
									<MDBSelect
										size='lg'
										options={this.state.optionsReceivedBy}
										value={receivedBy}
										getTextContent={this.handleReceivedBy}
										selected={receivedBy}
									/>
									<label>Received by</label>
								</MDBCol>

								<MDBCol md='3'>
									<MDBSelect
										size='lg'
										options={this.state.optionsReps}
										value={repName}
										getTextContent={this.handleRepSelect}
										selected={repName}
									/>
									<label>Rep Name</label>
								</MDBCol>
								<MDBCol md='3'>
									<MDBSelect
										size='lg'
										options={this.state.optionsStatus}
										value={status}
										getTextContent={this.handleStatusChange}
										selected={status}
									/>
									<label>Appt. Status</label>
								</MDBCol>

								<MDBCol md='3'>
									<MDBInput
										size='lg'
										labelClass='active'
										type='text'
										name='dateAssigned'
										label='Date Received'
										value={dateAssigned}
										onChange={this.handleInputChange}
									/>
								</MDBCol>
								{this.toggleStatusReason(status)}
							</MDBRow>

							<MDBCardTitle
								className='info-color-dark text-white z-depth-2 text-center rounded'
								tag='h2'
								size='12'>
								Appointment Details
							</MDBCardTitle>

							{/** Toggle input for dates and time from being editable to non editable  */}
							{this.toggleDateTimeEdit(disabled)}
							{/** Case Information */}
							{this.toggleCaseInfo(disabled)}
							<MDBRow center>
								<MDBCol sm='4'>
									<MDBInput
										outline={outlined}
										name='litigated'
										disabled={disabled}
										label='Litigated'
										checked={litigated}
										size='lg'
										type='checkbox'
										id='checkbox1'
										onClick={this.handleInputChange}
									/>
								</MDBCol>

								<MDBCol sm='4'>
									<label>Appt. Type</label>
									<MDBSelect
										outline={outlined}
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

								<MDBCol sm='4'>
									<label>Language</label>
									<MDBSelect
										size='lg'
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
										outline={outlined}
										name='assigneeFirst'
										label='First Name '
										size='lg'
										disabled={disabled}
										type='text'
										value={assigneeFirst}
										onChange={this.handleInputChange}
									/>
								</MDBCol>

								<MDBCol lg='3' md='6'>
									<MDBInput
										outline={outlined}
										name='assigneeLast'
										label='Last Name'
										size='lg'
										disabled={disabled}
										type='text'
										value={assigneeLast}
										onChange={this.handleInputChange}
									/>
								</MDBCol>

								<MDBCol lg='3' md='6'>
									<MDBInput
										outline={outlined}
										name='assigneeCompany'
										label='Company Name'
										size='lg'
										disabled={disabled}
										type='text'
										value={assigneeCompany}
										onChange={this.handleInputChange}
									/>
								</MDBCol>

								<MDBCol lg='3' md='6'>
									<MDBInput
										outline={outlined}
										name='assigneePhone'
										label='Phone'
										size='lg'
										disabled={disabled}
										value={this.formatPhoneNumber(assigneePhone)}
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
										outline={outlined}
										name='adjusterFirst'
										label='First Name '
										size='lg'
										disabled={disabled}
										value={adjusterFirst}
										onChange={this.handleInputChange}
									/>
								</MDBCol>

								<MDBCol lg='3' md='6'>
									<MDBInput
										outline={outlined}
										name='adjusterLast'
										label='Last Name'
										size='lg'
										disabled={disabled}
										value={adjusterLast}
										onChange={this.handleInputChange}
									/>
								</MDBCol>

								<MDBCol lg='3' md='6'>
									<MDBInput
										outline={outlined}
										name='adjusterCompany'
										label='Company Name'
										size='lg'
										disabled={disabled}
										value={adjusterCompany}
										onChange={this.handleInputChange}
									/>
								</MDBCol>

								<MDBCol lg='3' md='6'>
									<MDBInput
										outline={outlined}
										name='adjusterPhone'
										label='Phone'
										size='lg'
										disabled={disabled}
										type='text'
										value={this.formatPhoneNumber(adjusterPhone)}
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

							{this.renderModal()}
							{this.togglePhoneConferenceInfo(assignmentType)}

							{/** Billing information Drop down */}
							{this.BillingInfo(addBilling)}
						</MDBContainer>
					</MDBModalBody>

					<MDBModalFooter>
						{/* Should Edit or cancel changes button be Displayed? */}
						{this.toggleEditButton(disabled)}

						{/* Should Close or Save button be Displayed? */}
						{this.toggleCloseButton(disabled)}
					</MDBModalFooter>
				</MDBModal>

				{/**Modal pop up when ever the delete button is pressed a confirmation window pops up to confirm the deletion from the database */}
				<MDBModal
					modalStyle='danger'
					className='text-white'
					size='lg'
					centered
					backdrop={false}
					isOpen={this.state.confirmDelete}
					toggle={this.toggleConfirm}>
					<MDBModalHeader className='text-center' titleClass='w-200' tag='p' toggle={this.toggleConfirm}>
						Are you sure you would like to <b className='black-text'>Delete</b> this Appointment?
					</MDBModalHeader>
					<MDBModalBody className='text-center'>
						Only Proceed if this is a duplicate, if it is being cancelled on time please use the status
						"Cancelled" instead.
					</MDBModalBody>
					<MDBModalFooter className='justify-content-center'>
						<MDBBtn color='danger' onClick={this.DeleteAppt}>
							Delete
						</MDBBtn>
						<MDBBtn color='grey' onClick={this.toggleConfirm}>
							Cancel
						</MDBBtn>
					</MDBModalFooter>
				</MDBModal>
				<ToastContainer hideProgressBar={true} newestOnTop={true} autoClose={5000} />
			</MDBContainer>
		);
	}
}
export default ModalProfile;
