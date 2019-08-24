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
import FollowUp from '../Profiles/DuplicateAppt';
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';

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
			connection
		} = this.props;

		this.state = {
			update: false,
			notification: '',
			followUpModal: false,
			printModal: false,
			outlined: false,
			disabled: true,
			addBilling: false,
			markerType: markerType,
			id: id,
			dateAssigned: dateAssigned,
			apptDate: apptDate,
			apptTime: moment(apptTime, 'HH:mm').format('hh:mm a'),
			endTime: moment(endTime, 'HH:mm').format('hh:mm a'),
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
			doi: moment(doi).format('dddd MMM Do YYYY'),
			dob: moment(dob).format('dddd MMM Do YYYY'),
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
			optionsApptType: [
				{
					text: 'Statement',
					value: '1'
				},
				{
					text: 'Medical-Certified',
					value: '2'
				},
				{
					text: 'Medical',
					value: '3'
				},
				{
					text: 'Legal',
					value: '4'
				},
				{
					text: 'Follow Up',
					value: '5'
				},
				{
					text: 'Phone Conference',
					value: '6'
				}
			],
			optionsStatus: [
				{
					text: 'New Appointment',
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
					text: 'Completed',
					value: '4'
				},
				{
					text: 'Billed',
					value: '5'
				},
				{
					text: 'Set Up',
					value: '6'
				},
				{
					text: 'Phone Conference',
					value: '7'
				},
				{
					text: 'No Show',
					value: '8'
				},
				{
					text: 'Cancelled',
					value: '9'
				},
				{
					text: 'Double Booked',
					value: '10'
				},
				{
					text: 'Rescheduled not notified',
					value: '11'
				},
				{
					text: 'Waiting for Authorization',
					value: '12'
				}
			]
		};
		this.handleInputChange = this.handleInputChange.bind(this);
	}
	reLoad = () => {
		this.props.loadAppointments();
	};
	toggleClose = () => {
		this.props.toggle();
	};
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
			connection
		} = this.state;

		/**Function for updating the appointment form, need to reformat times when changing with moment */
		API.updateAppt(this.state.id, {
			apptDate: moment(apptDate, 'dddd MMM Do YYYY').format(),
			apptTime: apptTime,
			endTime: endTime,
			assigneeFirst: assigneeFirst,
			assigneeLast: assigneeLast,
			assigneeCompany: assigneeCompany,
			assigneePhone: assigneePhone,
			adjusterFirst: adjusterFirst,
			adjusterLast: adjusterLast,
			adjusterCompany: adjusterCompany,
			adjusterPhone: adjusterPhone,
			refName: refName,
			refNumber: refNumber,
			doi: moment(doi, 'dddd MMM Do YYYY').format(),
			dob: moment(dob, 'dddd MMM Do YYYY').format(),
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
			ConCert: conCert,
			recipient: recipient,
			Length: length,
			connection: connection,
			dateAssigned: moment(dateAssigned, 'dddd MMM Do YYYY').format(),
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

	/**Function to update the date of the appointment in the state the database */
	getApptDateValue = (value) => {
		this.setState({
			apptDate: value
		});
	};

	/**Function to update the date of the appointment in the state the database */
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

	// /**Toggle function for opening and closing the Modal */
	// toggle = () => {
	// 	this.setState({
	// 		modal: !this.state.modal
	// 	});
	// };

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

	addTotal = (price, minimum) => {
		let a = price;
		let b = minimum;
		let c = a * b;
		return c;
	};

	addPhoneTotal = (length, price, connection) => {
		if (connection === true) {
			let a = price;
			let b = length;
			let c = 0.1;
			let connectionFee = b * c;
			console.log({ connectionFee });
			let d = a * b;
			let e = d + connectionFee;

			return e;
		} else if (connection === false) {
			let a = price;
			let b = length;
			let c = a * b;
			return c;
		}
	};

	notification = () => {
		const { notification } = this.state;
		if (this.state.notification === '200') {
			toast.success('Success message', {
				position: 'top-right'
			});
			this.setState({ notification: '' });
			console.log({ notification });
		}
		if (this.state.notification === '422') {
			toast.error('Error message');
			this.setState({ notification: '' });
			console.log({ notification });
			//   this.setState({ notification: "" });
		}
	};

	togglePhoneConferenceInfo = (type) => {
		const {
			recipient,
			connection,
			length,
			contractors,
			contractorMinimum,
			contractorPrice,
			appointmentPrice,
			ApptMinimum,
			outlined,
			disabled,
			additionalCost,
			dateContractorAssigned,
			conCert,
			conPhone,
			address,
			city,
			state,
			postalCode
		} = this.state;
		switch (type) {
			case 'Phone Conference':
				return (
					<div>
						<MDBRow>
							<MDBCol sm='6'>
								<h5>Phone Conference With:</h5> <h6>{recipient}</h6>
							</MDBCol>
							<MDBCol sm='6'>
								<MDBInput
									disabled={true}
									checked={connection}
									id='connection'
									name='connection'
									type='checkbox'
									label={<h5>Connection</h5>}
									icon=''
									onChange={this.handleInputChange}
								/>
							</MDBCol>
						</MDBRow>
						<br />
						<MDBRow center>
							<MDBCol sm='3'>
								<h5>Interpreter:</h5> <h6>{contractors}</h6>
							</MDBCol>
							<MDBCol sm='3'>
								<h5>length(Minutes):</h5> <h6>{length}</h6>
							</MDBCol>

							<MDBCol sm='3'>
								<h5>Contractor Price:</h5> <h6>{contractorPrice}</h6>
							</MDBCol>

							<MDBCol sm='3'>
								<h5>Total:</h5> <h6>{'$' + this.addPhoneTotal(length, contractorPrice, connection)}</h6>
							</MDBCol>
						</MDBRow>
						<br />
						<MDBRow center>
							<MDBCol sm='4'>
								<h5>length(Minutes):</h5> <h6>{length}</h6>
							</MDBCol>

							<MDBCol sm='4'>
								<h5>Appointment Price:</h5> <h6>{appointmentPrice}</h6>
							</MDBCol>

							<MDBCol sm='4'>
								<h5>Total:</h5> <h6>{'$' + this.addPhoneTotal(length, appointmentPrice, connection)}</h6>
							</MDBCol>
						</MDBRow>

						<MDBRow>
							<MDBCol sm='12'>
								<h5>Additional Cost:</h5> <h6>{additionalCost}</h6>
								{/* <MDBInput
									value={additionalCost}
									name='additionalCost'
									label='Additional Cost'
									icon=''
									onChange={this.handleInputChange}
								/> */}
							</MDBCol>
						</MDBRow>
					</div>
				);
			default:
				return (
					<div>
						<MDBRow>
							<MDBCol sm='3'>
								<h5>Date Assigned:</h5> <h6>{moment(dateContractorAssigned).format('LLL')}</h6>
							</MDBCol>
							<MDBCol sm='3'>
								<h5>Interpreter Assigned:</h5> <h6>{contractors}</h6>
							</MDBCol>

							<MDBCol sm='3'>
								<h5>Certification Number:</h5> <h6>{conCert}</h6>
							</MDBCol>

							<MDBCol sm='3'>
								<h5>Phone:</h5> <h6>{this.formatPhoneNumber(conPhone)}</h6>
							</MDBCol>
						</MDBRow>
						<br />
						<MDBRow center>
							<MDBCol sm='3'>
								<h5>Contractor Price:</h5> <h6>{contractorPrice}</h6>
							</MDBCol>

							<MDBCol sm='3'>
								<h5>length(Hours):</h5> <h6>{contractorMinimum}</h6>
							</MDBCol>

							<MDBCol sm='3'>
								<h5>Total:</h5> <h6>{'$' + this.addTotal(contractorPrice, contractorMinimum)}</h6>
							</MDBCol>
						</MDBRow>
						<br />
						<MDBRow>
							<MDBCol sm='3'>
								<h5>Location:</h5> <h6>{this.state.locationName}</h6>
							</MDBCol>
							<MDBCol sm='3'>
								<h5>Street Address:</h5> <h6>{address}</h6>
							</MDBCol>

							<MDBCol sm='2'>
								<h5>City:</h5> <h6>{city}</h6>
							</MDBCol>

							<MDBCol sm='2'>
								<h5>State:</h5> <h6>{state}</h6>
							</MDBCol>

							<MDBCol sm='2'>
								<h5>Zip Code:</h5> <h6>{postalCode}</h6>
							</MDBCol>
						</MDBRow>

						<MDBRow center>
							<MDBCol sm='3'>
								<h5>Appointment Price:</h5> <h6>{appointmentPrice}</h6>
							</MDBCol>

							<MDBCol sm='3'>
								<h5>length(Hours):</h5> <h6>{ApptMinimum}</h6>
							</MDBCol>

							<MDBCol sm='3'>
								<h5>Total:</h5> <h6>{'$' + this.addTotal(appointmentPrice, ApptMinimum)}</h6>
							</MDBCol>

							<MDBCol sm='12'>
								<h5>Additional Cost:</h5> <h6>{additionalCost}</h6>
							</MDBCol>
						</MDBRow>
					</div>
				);
		}
	};
	toggle = () => {
		this.setState({
			printModal: !this.state.printModal
		});
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
			app
		} = this.state;
		this.notification();

		return (
			<MDBContainer>
				{/* MODAL OPEN BUTTON */}
				<MDBBtn outline onClick={this.toggle} to={window.location.pathname} color='warning'>
					Print
				</MDBBtn>
				<MDBModal className='cascading-modal' isOpen={this.state.printModal} toggle={this.toggle} size='lg'>
					<MDBModalHeader
						className='text-center stylish-color-dark text-white'
						titleClass='w-100'
						tag='h1'
						toggle={this.toggle}>
						<MDBRow>
							<MDBCol size='8'>{this.state.refName}</MDBCol>
						</MDBRow>
					</MDBModalHeader>

					{/** MODAL Body*/}
					<PrintProvider>
						<Print single name='foo'>
							<MDBModalBody>
								<MDBContainer>
									<MDBRow center>
										<MDBCol>
											<h5>Date Assigned:</h5> <h6>{dateAssigned}</h6>
										</MDBCol>
										<MDBCol>
											<h5>Appointment Status:</h5> <h6>{status}</h6>
										</MDBCol>
										<MDBCol size='12'>
											<h5>Status Explanation:</h5> <h6>{this.state.statusReason}</h6>
											<br />
										</MDBCol>
									</MDBRow>
									<MDBRow center>
										<MDBCol sm='4'>
											<h5>Appointment Date:</h5> <h6>{this.state.apptDate}</h6>
										</MDBCol>

										<MDBCol sm='4'>
											<h5>Start Time:</h5> <h6>{moment(this.state.apptTime, 'HH:mm').format('hh:mm a')}</h6>
										</MDBCol>

										<MDBCol sm='4'>
											<h5>End Time:</h5> <h6>{moment(this.state.endTime, 'HH:mm').format('hh:mm a')}</h6>
										</MDBCol>
									</MDBRow>
									<br />
									<MDBRow>
										<MDBCol sm='3'>
											<h5>Assignee First Name:</h5> <h6>{assigneeFirst}</h6>
										</MDBCol>

										<MDBCol sm='3'>
											<h5>Assignee Last Name:</h5> <h6>{assigneeLast}</h6>
										</MDBCol>

										<MDBCol sm='3'>
											<h5>Company Name:</h5> <h6>{assigneeCompany}</h6>
										</MDBCol>

										<MDBCol sm='3'>
											<h5>Assignee Phone:</h5> <h6>{this.formatPhoneNumber(assigneePhone)}</h6>
										</MDBCol>
									</MDBRow>
									<br />
									<MDBRow>
										<MDBCol sm='3'>
											<h5>Adjuster First Name:</h5> <h6>{adjusterFirst}</h6>
										</MDBCol>

										<MDBCol sm='3'>
											<h5>Adjuster Last Name:</h5> <h6>{adjusterLast}</h6>
										</MDBCol>

										<MDBCol sm='3'>
											<h5>Company Name:</h5> <h6>{adjusterCompany}</h6>
										</MDBCol>

										<MDBCol sm='3'>
											<h5>Adjuster Phone:</h5> <h6>{this.formatPhoneNumber(adjusterPhone)}</h6>
										</MDBCol>
									</MDBRow>
									<br />
									<MDBRow center>
										<MDBCol sm='3'>
											<h5>Case Name:</h5> <h6>{this.state.refName}</h6>
										</MDBCol>
										<MDBCol sm='3'>
											<h5>Claim Number:</h5> <h6>{this.state.refNumber}</h6>
										</MDBCol>
										<MDBCol sm='3'>
											<h5>Date of Injury/Loss:</h5> <h6>{this.state.doi}</h6>
										</MDBCol>
										<MDBCol sm='3'>
											<h5>Date of Birth:</h5> <h6>{this.state.dob}</h6>
										</MDBCol>
									</MDBRow>
									<br />
									<MDBRow center>
										<MDBCol sm='4'>
											<MDBInput
												disabled={true}
												name='litigated'
												disabled={true}
												label={<h5>Litigated</h5>}
												checked={litigated}
												type='checkbox'
												id='checkbox1'
												onChange={this.handleInputChange}
											/>
										</MDBCol>

										<MDBCol sm='4'>
											<h5>Assignment Type:</h5> <h6>{assignmentType}</h6>
										</MDBCol>

										<MDBCol sm='4'>
											<h5>Language:</h5> <h6>{language}</h6>
										</MDBCol>
										<MDBCol sm='10' md='12'>
											<MDBInput
												disabled={true}
												name='notes'
												value={notes}
												type='textarea'
												label='Notes'
												icon=''
												onChange={this.handleInputChange}
											/>
										</MDBCol>
									</MDBRow>

									{this.togglePhoneConferenceInfo(assignmentType)}

									<MDBRow>
										<MDBCol size='4'>
											<h5>Contact:</h5> <h6>{this.state.billingContactName}</h6>
										</MDBCol>

										<MDBCol size='4'>
											<h5>Contact Email:</h5> <h6>{this.state.billingEmail}</h6>
										</MDBCol>

										<MDBCol size='4'>
											<h5>Phone:</h5> <h6>{this.formatPhoneNumber(this.state.billingPhone)}</h6>
										</MDBCol>
									</MDBRow>

									<MDBRow>
										<MDBCol sm='3'>
											<h5>Street Address:</h5> <h6>{this.state.billingAddress}</h6>
										</MDBCol>

										<MDBCol sm='3'>
											<h5>City:</h5> <h6>{this.state.billingCity}</h6>
										</MDBCol>

										<MDBCol sm='3'>
											<h5>State:</h5> <h6>{this.state.billingState}</h6>
										</MDBCol>
										<MDBCol sm='3'>
											<h5>Zip Code:</h5> <h6>{this.state.billingZipcode}</h6>
										</MDBCol>
									</MDBRow>
								</MDBContainer>
							</MDBModalBody>
						</Print>
					</PrintProvider>
					<MDBModalFooter>
						{/* Should Close or Save button be Displayed? */}
						{this.toggleCloseButton(disabled)}
					</MDBModalFooter>
				</MDBModal>
			</MDBContainer>
		);
	}
}
export default ModalProfile;
