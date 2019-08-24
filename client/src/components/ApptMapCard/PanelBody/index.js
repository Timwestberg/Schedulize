import React, { Component, Fragment } from 'react';
import {
	MDBInput,
	MDBTabPane,
	MDBTabContent,
	MDBNav,
	MDBNavItem,
	MDBNavLink,
	MDBIcon,
	MDBRow,
	MDBContainer,
	MDBCol,
	MDBBtnFixed,
	MDBBtnFixedItem,
	MDBSelect,
	MDBCardTitle,
	MDBBtn,
	MDBBtnGroup,
	MDBTooltip,
	toast,
	ToastContainer
} from 'mdbreact';
import './style.css';
import moment from 'moment';
import API from '../../../utils/API';
// import { bindCallback } from 'rxjs';
class TabsPage extends Component {
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
			contractorPrice,
			additionalCost,
			status,
			billingContactName,
			billingPhone,
			billingEmail,
			billingLocation,
			billingAddress,
			billingCity,
			billingState,
			billingZipCode,
			repName,
			conPhone,
			conCert,
			contractors
		} = this.props;

		this.state = {
			notification: '',
			activeItemOuterTabs: '1',
			activeItemInnerPills: '1',
			buttonStyle: {
				transform: 'scaleY(1) scaleX(1) translateY(0) translateX(0)',
				opacity: '1',
				display: 'flex'
			},
			// buttonStyle: {
			// 	transform: 'scaleY(0.4) scaleX(0.4) translateY(40px) translateX(0)',
			// 	opacity: '0'
			// },
			modal: false,
			outlined: false,
			disabled: true,
			addBilling: false,
			markerType: markerType,
			id: id,
			repName: repName,
			dateAssigned: moment(dateAssigned).format('L'),
			apptDate: moment(apptDate).utc().format('L'),
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
			contractorPrice: contractorPrice,
			contractorMinimum: contractorMinimum,
			additionalCost: additionalCost,
			status: status,
			dateContractorAssigned: '',
			contractorPrice: '',
			contractorMinimum: '',
			conPhone: '',
			ConCert: '',
			contractors: '',
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
					text: 'Deposition',
					value: '4'
				},
				{
					text: 'Follow Up',
					value: '5'
				},
				{
					text: 'Phone Conference',
					value: '6'
				},
				{
					text: 'QME',
					value: '7'
				},
				{
					text: 'IEP',
					value: '8'
				},
				{
					text: 'Pyschological',
					value: '9'
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
	/** Function for handling the selection of how an appointment was received */
	handleReceivedBy = (value) => {
		this.setState({
			receivedBy: value
		});
	};

	/** Funcition for handling select change for assignment type input */
	handleStatusChange = (value) => {
		// console.log({ value });
		this.setState({
			status: value
		});
	};
	/** Function for handling selection of the language  */
	handleLangaugeChange = (value) => {
		this.setState({
			language: value
		});
	};
	/** Function for handling selection of the employee who took the work order from the client */
	handleRepSelect = (value) => {
		this.setState({
			repName: value
		});
	};
	/**Function to update the appointment information in the database */
	updateDB = () => {
		/**Bringin in state to reference easily within update function */
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
			contractorPrice,
			additionalCost,
			status,
			contractors,
			ConCert,
			conPhone,
			billingContactName,
			billingPhone,
			billingEmail,
			billingLocation,
			billingAddress,
			billingCity,
			billingState,
			billingZipCode,
			repName
		} = this.state;

		/**Function for updating the appointment form, need to reformat times when changing with moment */
		API.updateAppt(this.state.id, {
			apptDate: apptDate,
			apptTime: apptTime,
			endTime: endTime,
			repName: repName,
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
			id: id,
			billingContactName: billingContactName,
			billingPhone: billingPhone,
			billingEmail: billingEmail,
			billingLocation: billingLocation,
			billingAddress: billingAddress,
			billingCity: billingCity,
			billingState: billingState,
			billingZipCode: billingZipCode,
			dateAssigned: moment(dateAssigned).format('L'),
			dateContractorAssigned: dateContractorAssigned,
			conPhone: conPhone,
			ConCert: ConCert,
			contractors: contractors
		})
			.then(this.toggleEdit)
			.then((res) => {
				this.setState({ notification: '200' });
			})
			.catch((err) => {
				this.setState({ notification: '422' });
			});
	};

	AssignContractor = () => {
		const { price, minimumRequired, contractorName, contractorPhone, contractorCert } = this.props;
		console.log(moment().format('LLL'));
		let dateAssigned = moment().format('LLL');
		API.updateAppt(this.state.id, {
			contractorPrice: price,
			contractorMinimum: minimumRequired,
			conPhone: contractorPhone,
			ConCert: contractorCert,
			contractors: contractorName,
			status: 'Staffed',
			dateContractorAssigned: dateAssigned
		})
			.then((res) => {
				this.setState({ notification: 'assigned' });
			})
			.then(this.reLoad)
			.catch((err) => {
				this.setState({ notification: '422' });
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

	getApptDateValue = (value) => {
		this.setState({
			apptDate: value
		});
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

	getDOIValue = (value) => {
		this.setState({
			doi: value
		});
	};

	getDOBValue = (value) => {
		this.setState({
			dob: value
		});
	};

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
	onHover = () => {
		this.setState({
			buttonStyle: {
				transform: 'scaleY(1) scaleX(1) translateY(0) translateX(0)',
				opacity: '1'
			}
		});
	};

	onMouseLeave = () => {
		this.setState({
			buttonStyle: {
				transform: 'scaleY(0.4) scaleX(0.4) translateY(40px) translateX(0)',
				opacity: '0'
			}
		});
	};

	/**Function to delete the appointment from the database */
	DeleteAppt = () => {
		API.deleteAppt(this.state.id).then(console.log('Deleted')).then(this.reLoad);
	};

	/** Funcition for handling select change for assignment type input */
	handleAssignmentTypeChange = (value) => {
		this.setState({
			assignmentType: value
		});
	};

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
		}
	};

	/**Toggels function for displaying the "Edit" or "Cancel" Button */
	toggleEditButton = (disabled) => {
		switch (disabled) {
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

	/**Toggle function for changing Location Name title into input field */
	toggleLocationNameEdit = (disabled) => {
		switch (disabled) {
			case false:
				return (
					<MDBInput
						name='locationName'
						value={this.state.locationName}
						label='Location'
						size='sm'
						disabled={disabled}
						type='text'
						onChange={this.handleInputChange}
					/>
				);
			case true:
				return (
					<MDBCardTitle className='info-color-dark text-white z-depth-2 text-center rounded' tag='h2' size='12'>
						{this.state.locationName}
					</MDBCardTitle>
				);
		}
	};

	/**Toggle function for changing Date and Time input fields for editing */
	toggleDateTimeEdit = (disabled) => {
		switch (disabled) {
			case false:
				return (
					<MDBRow center>
						<MDBCol md='6'>
							<label tag='h6' className='black-text'>
								Previously: {this.state.dateAssigned}
							</label>
							<MDBInput
								type='date'
								labelClass='active'
								label='Date Assigned'
								name='dateAssigned'
								outline={this.state.outlined}
								disabled={this.state.disabled}
								getValue={this.getApptDateValue}
							/>
						</MDBCol>

						<MDBCol md='6'>
							<label tag='h6' className='black-text'>
								Previously: {this.state.apptDate}
							</label>
							<MDBInput
								labelClass='active'
								label='Appointment Date'
								type='date'
								name='apptDate'
								outline={this.state.outlined}
								disabled={this.state.disabled}
								getValue={this.getApptDateValue}
							/>
						</MDBCol>

						<MDBCol md='6'>
							<label tag='h6' className='black-text'>
								Previously: {moment(this.state.apptTime, 'HH:mm').format('hh:mm a')}
							</label>
							<MDBInput
								labelClass='active'
								label='Appointment Time'
								type='time'
								name='apptTime'
								outline={this.state.outlined}
								disabled={this.state.disabled}
								onChange={this.handleInputChange}
							/>
						</MDBCol>

						<MDBCol md='6'>
							<label tag='h6' className='black-text'>
								Previously: {moment(this.state.endTime, 'HH:mm').format('hh:mm a')}
							</label>
							<MDBInput
								labelClass='active'
								label='Appointment End Time'
								type='time'
								name='endTime'
								// label='End Time'
								outline={this.state.outlined}
								disabled={this.state.disabled}
								onChange={this.handleInputChange}
							/>
						</MDBCol>
					</MDBRow>
				);
			case true:
				return (
					<MDBRow center>
						<MDBCol md='6'>
							<MDBInput
								name='dateAssigned'
								label='Date Assigned'
								value={this.state.dateAssigned}
								outline={this.state.outlined}
								disabled={this.state.disabled}
								getValue={this.getApptDateValue}
							/>
						</MDBCol>

						<MDBCol md='6'>
							<MDBInput
								label='Appointment Date'
								name='apptDate'
								value={this.state.apptDate}
								outline={this.state.outlined}
								disabled={this.state.disabled}
								getValue={this.getApptDateValue}
							/>
						</MDBCol>

						<MDBCol md='6'>
							<MDBInput
								label='Start Time'
								name='apptTime'
								value={moment(this.state.apptTime, 'HH:mm').format('hh:mm a')}
								icon=''
								outline={this.state.outlined}
								disabled={this.state.disabled}
								onChange={this.handleInputChange}
							/>
						</MDBCol>

						<MDBCol md='6'>
							<MDBInput
								label='End Time'
								name='endTime'
								value={moment(this.state.endTime, 'HH:mm').format('hh:mm a')}
								icon=''
								outline={this.state.outlined}
								disabled={this.state.disabled}
								onChange={this.handleInputChange}
							/>
						</MDBCol>
					</MDBRow>
				);
		}
	};

	/**Toggle function for changing DOB and DOI into input fields for editing */
	toggleCaseInfo = (disabled) => {
		switch (disabled) {
			case false:
				return (
					<MDBRow center>
						<MDBCol md='6'>
							<MDBInput
								outline={this.state.outlined}
								name='refName'
								size='sm'
								label='Case Name'
								disabled={this.state.disabled}
								type='text'
								value={this.state.refName}
								onChange={this.handleInputChange}
							/>
						</MDBCol>
						<MDBCol md='6'>
							<MDBInput
								outline={this.state.outlined}
								name='refNumber'
								label='Claim Number'
								size='sm'
								disabled
								type='number'
								disabled={this.state.disabled}
								value={this.state.refNumber}
								onChange={this.handleInputChange}
							/>
						</MDBCol>
						<MDBCol md='6'>
							<label tag='h6' className='black-text'>
								Previously: {this.state.doi}
							</label>
							<MDBInput
								labelClass='active'
								label='Date of Injury/Loss'
								name='doi'
								type='date'
								disabled={this.state.disabled}
								outline={this.state.outlined}
								getValue={this.getDOIValue}
							/>
						</MDBCol>
						<MDBCol md='6'>
							<label tag='h6' className='black-text'>
								Previously: {this.state.dob}
							</label>
							<MDBInput
								name='dob'
								labelClass='active'
								label='Date of Birth'
								type='date'
								disabled={this.state.disabled}
								outline={this.state.outlined}
								getValue={this.getDOBValue}
							/>
						</MDBCol>
					</MDBRow>
				);
			case true:
				return (
					<MDBRow center>
						<MDBCol md='6'>
							<MDBInput
								outline={this.state.outlined}
								name='refName'
								label='Case Name'
								size='sm'
								disabled={this.state.disabled}
								type='text'
								value={this.state.refName}
								onChange={this.handleInputChange}
							/>
						</MDBCol>
						<MDBCol md='6'>
							<MDBInput
								outline={this.state.outlined}
								name='refNumber'
								label='Claim Number'
								size='sm'
								disabled={this.state.disabled}
								type='number'
								value={this.state.refNumber}
								onChange={this.handleInputChange}
							/>
						</MDBCol>
						<MDBCol md='6'>
							<MDBInput
								outline={this.state.outlined}
								disabled={this.state.disabled}
								label='Date of Injury/Loss:'
								name='doi'
								value={this.state.doi}
								getValue={this.getDOIValue}
							/>
						</MDBCol>
						<MDBCol md='6'>
							<MDBInput
								name='dob'
								label='Date of Birth:'
								value={this.state.dob}
								outline={this.state.outlined}
								disabled={this.state.disabled}
								getValue={this.getDOBValue}
							/>
						</MDBCol>
					</MDBRow>
				);
		}
	};

	/**Toggle function for displaying the "Editing" tag next to the window refname  */
	HeaderName = (disabled) => {
		switch (disabled) {
			case true:
				return this.state.refName + ' ' + 'Profile';
				break;
			case false:
				return this.state.refName + '(Editing)';
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
				break;
			case true:
				return (
					<div>
						<MDBCardTitle
							rounded
							className='info-color-dark text-white z-depth-2 text-center rounded'
							tag='h2'
							size='12'>
							Billing Information
						</MDBCardTitle>

						<MDBRow>
							<MDBCol size='12'>
								<MDBInput
									name='billingContactName'
									label='Contact'
									size='sm'
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
									size='sm'
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
									size='sm'
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
									size='sm'
									value={billingAddress}
									type='text'
								/>
							</MDBCol>

							<MDBCol size='4'>
								<MDBInput
									name='billingCity'
									label='City'
									size='sm'
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
									size='sm'
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
									size='sm'
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

	toggleOuterTabs = (tab) => () => {
		if (this.state.activeItemOuterTabs2 !== tab) {
			this.setState({
				activeItemOuterTabs: tab
			});
		}
	};

	toggleInnerPills = (tab) => () => {
		if (this.state.activeItemInnerPills !== tab) {
			this.setState({
				activeItemInnerPills: tab
			});
		}
	};
	/**Function for displaying the correct notfication flag  */
	notification = () => {
		const { notification } = this.state;
		if (notification === '200') {
			toast.success('Success message', {
				position: 'top-right'
			});
			this.setState({ notification: '' });
			console.log({ notification });
		}
		if (notification === 'assigned') {
			toast.success('Contractor Assigned!', {
				position: 'top-right'
			});
			this.setState({ notification: '' });
			console.log({ notification });
		}
		if (notification === '422') {
			toast.error('Error message');
			this.setState({ notification: '' });
			console.log({ notification });
			//   this.setState({ notification: "" });
		}
	};
	render() {
		const {
			disabled,
			outlined,
			assigneeFirst,
			assigneeLast,
			assigneeCompany,
			assigneePhone,
			adjusterFirst,
			adjusterLast,
			adjusterCompany,
			adjusterPhone,
			dateAssigned,
			litigated,
			notes,
			language,
			assignmentType,
			address,
			city,
			state,
			postalCode,
			appointmentPrice,
			ApptMinimum,
			status,
			additionalCost,
			repName
		} = this.state;

		const { price, minimumRequired, contractorName, contractorPhone, contractorCert } = this.props;
		const StreetAddress = address;
		const Saddress = StreetAddress.split(' ');
		const Scity = city.split(' ');
		const fullAddress =
			Saddress[0] + '+' + Saddress[1] + '+' + Saddress[2] + ',+' + Scity[0] + '+' + Scity[1] + ',+' + state;
		// console.log({ fullAddress });
		this.notification();
		return (
			<div>
				<MDBNav tabs className='nav-justified' id='md-tabs' color='indigo'>
					<MDBNavItem>
						<MDBNavLink
							to='#'
							className={this.state.activeItemOuterTabs === '1' ? 'active' : ''}
							onClick={this.toggleOuterTabs('1')}
							role='tab'>
							<MDBIcon icon='concierge-bell' /> Order
						</MDBNavLink>
					</MDBNavItem>

					<MDBNavItem>
						<MDBNavLink
							to='#'
							className={this.state.activeItemOuterTabs === '2' ? 'active' : ''}
							onClick={this.toggleOuterTabs('2')}
							role='tab'>
							<MDBIcon icon='donate' /> Billing
						</MDBNavLink>
					</MDBNavItem>
				</MDBNav>
				<MDBTabContent className='card' activeItem={this.state.activeItemOuterTabs}>
					<MDBTabPane tabId='1' role='tabpanel'>
						<MDBContainer>
							<MDBRow center>
								<MDBCol md='6'>
									<MDBInput
										size='lg'
										labelClass='active'
										type='text'
										name='dateAssigned'
										label='Date Assigned'
										value={dateAssigned}
										onChange={this.handleInputChange}
									/>
								</MDBCol>

								<MDBCol md='6'>
									<MDBSelect
										size='lg'
										options={this.state.optionsReps}
										value={repName}
										getTextContent={this.handleRepSelect}
										selected={repName}
									/>
									<label className='black-text'>Rep Name</label>
								</MDBCol>
								<MDBCol md='12'>
									<MDBSelect
										size='lg'
										options={this.state.optionsStatus}
										value={status}
										getTextContent={this.handleStatusChange}
										selected={status}
									/>
									<label className='black-text'>Appointment Status</label>
								</MDBCol>
							</MDBRow>
							<MDBCardTitle
								className='info-color-dark text-white z-depth-2 text-center rounded'
								tag='h2'
								size='12'>
								Case Information
							</MDBCardTitle>
							{/** Case Information */}
							{this.toggleCaseInfo(disabled)}
							<MDBCardTitle
								className='info-color-dark text-white z-depth-2 text-center rounded'
								tag='h2'
								size='12'>
								Appointment Details
							</MDBCardTitle>
							{/** Toggle input for dates and time from being editable to non editable  */}
							{this.toggleDateTimeEdit(disabled)}
							<MDBRow center>
								<MDBCol md='6'>
									<MDBInput
										outline={outlined}
										name='litigated'
										disabled={disabled}
										label='Litigated'
										checked={litigated}
										type='checkbox'
										id='checkbox1'
										onChange={this.handleInputChange}
									/>
								</MDBCol>

								<MDBCol md='6'>
									<MDBSelect
										search
										options={this.state.optionsLanguage}
										value={language}
										getTextContent={this.handleLangaugeChange}
										selected={language}
									/>
								</MDBCol>

								<MDBCol md='10'>
									<MDBSelect
										outline={outlined}
										searchId='assignmentType'
										label='Assignment Type'
										options={this.state.optionsApptType}
										value={assignmentType}
										disabled={disabled}
										getTextContent={this.handleAssignmentTypeChange}
										selected={assignmentType}
									/>
								</MDBCol>
							</MDBRow>
							{/** Toggle Edit input for Location name */}
							{this.toggleLocationNameEdit(disabled)}
							<MDBRow>
								<MDBCol size='12'>
									<MDBInput
										outline={outlined}
										name='address'
										label='Street Address'
										size='sm'
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
										size='sm'
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
										size='sm'
										type='text'
										value={state}
										onChange={this.handleInputChange}
									/>
								</MDBCol>

								<MDBCol size='4'>
									<MDBInput
										outline={outlined}
										name='zipCode'
										label='Zip Code'
										disabled={disabled}
										size='sm'
										type='number'
										value={postalCode}
										onChange={this.handleInputChange}
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
								<MDBCol md='6'>
									<MDBInput
										outline={outlined}
										name='assigneeFirst'
										label='First Name '
										size='sm'
										disabled={disabled}
										type='text'
										value={assigneeFirst}
										onChange={this.handleInputChange}
									/>
								</MDBCol>

								<MDBCol md='6'>
									<MDBInput
										outline={outlined}
										name='assigneeLast'
										label='Last Name'
										size='sm'
										disabled={disabled}
										type='text'
										value={assigneeLast}
										onChange={this.handleInputChange}
									/>
								</MDBCol>

								<MDBCol md='6'>
									<MDBInput
										outline={outlined}
										name='assigneeCompany'
										label='Company Name'
										size='sm'
										disabled={disabled}
										type='text'
										value={assigneeCompany}
										onChange={this.handleInputChange}
									/>
								</MDBCol>

								<MDBCol md='6'>
									<MDBInput
										outline={outlined}
										name='assigneePhone'
										label='Phone'
										size='sm'
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
								<MDBCol md='6'>
									<MDBInput
										outline={outlined}
										name='adjusterFirst'
										label='First Name '
										size='sm'
										disabled={disabled}
										value={adjusterFirst}
										onChange={this.handleInputChange}
									/>
								</MDBCol>

								<MDBCol md='6'>
									<MDBInput
										outline={outlined}
										name='adjusterLast'
										label='Last Name'
										size='sm'
										disabled={disabled}
										value={adjusterLast}
										onChange={this.handleInputChange}
									/>
								</MDBCol>

								<MDBCol md='6'>
									<MDBInput
										outline={outlined}
										name='adjusterCompany'
										label='Company Name'
										size='sm'
										disabled={disabled}
										value={adjusterCompany}
										onChange={this.handleInputChange}
									/>
								</MDBCol>

								<MDBCol md='6'>
									<MDBInput
										outline={outlined}
										name='adjusterPhone'
										label='Phone'
										size='sm'
										disabled={disabled}
										type='text'
										value={this.formatPhoneNumber(adjusterPhone)}
										onChange={this.handleInputChange}
									/>
								</MDBCol>
								<MDBRow center>
									<MDBCol sm='3'>
										<MDBInput
											labelClass='active'
											size='sm'
											name='appointmentPrice'
											label='Appt. Price'
											value={appointmentPrice}
											onChange={this.handleInputChange}
											type='number'
										/>
									</MDBCol>

									<MDBCol sm='3'>
										<MDBInput
											labelClass='active'
											size='sm'
											name='ApptMinimum'
											value={ApptMinimum}
											onChange={this.handleInputChange}
											type='number'
											label='Minimum'
										/>
									</MDBCol>

									<MDBCol sm='3'>
										<MDBInput
											labelClass='active'
											size='sm'
											value={additionalCost}
											name='additionalCost'
											label='Add. Cost'
											type='number'
											icon=''
											onChange={this.handleInputChange}
										/>
									</MDBCol>

									<MDBCol sm='3'>
										<MDBInput
											size='sm'
											labelClass='active'
											name='total'
											value={'$' + this.addTotal(appointmentPrice, ApptMinimum, additionalCost)}
											label='Total'
											icon=''
										/>
									</MDBCol>
								</MDBRow>
							</MDBRow>
							<MDBCardTitle
								className='info-color-dark text-white z-depth-2 text-center rounded'
								tag='h2'
								size='12'>
								Contractor Information
							</MDBCardTitle>
							<MDBRow center>
								<MDBCol sm='4'>
									<MDBInput
										name='contractors'
										outline={outlined}
										label='Contractor'
										value={contractorName}
										size='sm'
										disabled={disabled}
										onChange={this.handleInputChange}
									/>
								</MDBCol>

								<MDBCol sm='4'>
									<MDBInput
										name='conPhone'
										labelClass='active'
										outline={outlined}
										label='Phone Number'
										size='sm'
										value={this.formatPhoneNumber(contractorPhone)}
										disabled={disabled}
										onChange={this.handleInputChange}
									/>
								</MDBCol>

								<MDBCol sm='4'>
									<MDBInput
										name='conCert'
										labelClass='active'
										outline={outlined}
										label='Cert. number'
										value={contractorCert}
										size='sm'
										// disabled={disabled}
										onChange={this.handleInputChange}
									/>
								</MDBCol>
							</MDBRow>
							<MDBRow center>
								<MDBCol sm='6'>
									<MDBInput
										outline={outlined}
										disabled={disabled}
										name='contractorPrice'
										label='Contractor Price'
										value={price}
										onChange={this.handleInputChange}
										type='number'
									/>
								</MDBCol>

								<MDBCol sm='6'>
									<MDBInput
										outline={outlined}
										disabled={disabled}
										name='additionalCost'
										value={this.state.additionalCost}
										onChange={this.handleInputChange}
										type='text'
										label='Additional Cost'
									/>
								</MDBCol>
								<MDBCol lg='12'>
									<MDBInput
										outline={outlined}
										disabled={disabled}
										name='notes'
										value={notes}
										type='textarea'
										label='Notes'
										icon=''
										onChange={this.handleInputChange}
									/>
								</MDBCol>
							</MDBRow>
							<MDBCol>
								<MDBBtnFixed
									onClick={this.onMouseLeave}
									disabled
									className='rgba-purple-strong'
									id='fixed-action-btn'
									onMouseEnter={this.onHover}
									style={{ display: 'flex' }}
									size='lg'
									floating
									icon='toolbox'
									style={{
										position: ' none'
									}}>
									<MDBTooltip placement='top' tag='div' tooltipContent='Edit'>
										<MDBBtnFixedItem
											onClick={this.toggleEdit}
											buttonStyle={this.state.buttonStyle}
											className='black-text'
											className='rgba-red-strong'
											size='lg'
											icon='edit'
										/>
									</MDBTooltip>

									<MDBTooltip placement='top' tag='div' tooltipContent='Assign Contractor'>
										<MDBBtnFixedItem
											className='rgba-green-strong'
											onClick={this.AssignContractor}
											buttonStyle={this.state.buttonStyle}
											size='lg'
											icon='user-plus'
										/>
									</MDBTooltip>

									<MDBTooltip placement='top' tag='div' tooltipContent='Google Maps'>
										<MDBBtnFixedItem
											className='rgba-blue-strong'
											href={'https://www.google.com/maps/dir//' + fullAddress}
											target='_blank'
											buttonStyle={this.state.buttonStyle}
											size='lg'
											icon='car'
										/>
									</MDBTooltip>
								</MDBBtnFixed>
							</MDBCol>
							{/* <MDBRow>
								<MDBTooltip
									placement='top'
									componentClass='btn floating'
									tag='div'
									component='button'
									tooltipContent='Tooltip on top'>
									Tooltip on top
								</MDBTooltip>
							</MDBRow> */}
							<MDBRow>
								{/* Should Edit or cancel changes button be Displayed? */}
								{this.toggleEditButton(disabled)}
								{/* Should Close or Save button be Displayed? */}
								{this.toggleCloseButton(disabled)}
							</MDBRow>{' '}
							{/* </section> */}
						</MDBContainer>
					</MDBTabPane>
					<MDBTabPane tabId='2' role='tabpanel'>
						<MDBContainer>
							<MDBRow>{this.BillingInfo(true)}</MDBRow>
						</MDBContainer>
					</MDBTabPane>
				</MDBTabContent>
				<ToastContainer hideProgressBar={true} newestOnTop={true} autoClose={5000} />
			</div>
		);
	}
}

export default TabsPage;
