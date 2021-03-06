import React from 'react';
import {
	MDBContainer,
	MDBRow,
	MDBCol,
	MDBInput,
	MDBSelect,
	MDBBtn,
	MDBCardTitle,
	MDBIcon,
	// ToastContainer,
	toast
} from 'mdbreact';
import API from '../../utils/API';
import './style.css';
import moment from 'moment';
class ApptForm extends React.Component {
	constructor(props) {
		super(props);
		const {
			assigneeFirst,
			assigneeLast,
			assigneeCompany,
			assigneePhone,
			adjusterFirst,
			adjusterLast,
			adjusterCompany,
			adjusterPhone,
			refName,
			refNumber,
			doi,
			dob,
			litigated,
			notes,
			language,
			assignmentType,
			billingContactName,
			billingPhone,
			billingEmail,
			billingLocation,
			billingAddress,
			billingCity,
			billingState,
			billingZipCode
		} = this.props;
		this.state = {
			apptNotification: '',
			addBilling: false,
			apptDate: '',
			apptTime: '',
			endTime: '',
			repName: '',
			receivedBy: '',
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
			appointmentPrice: '',
			additionalCost: '',
			ApptMinimum: '',
			recipient: '',
			Length: '',
			connection: false,
			contractors: '',
			dateContractorAssigned: '',
			contractorPrice: '',
			contractorMinimum: '',
			contractorCert: '',
			status: '',
			billingContactName: billingContactName,
			billingEmail: billingEmail,
			billingPhone: billingPhone,
			billingLocationName: billingLocation,
			billingAddress: billingAddress,
			billingState: billingState,
			billingCity: billingCity,
			billingZipcode: billingZipCode,
			dateAssigned: moment().format('L'),
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
					checked: true,
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
					checked: true,
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
			]
		};
		this.handleInputChange = this.handleInputChange.bind(this);
	}
	/**Reload Appointments after some change has been made */
	reLoad = () => {
		this.props.loadAppointments();
	};
	/** Function for handling selection of the language  */
	handleLangaugeChange = (value) => {
		this.setState({
			language: value
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
		// console.log(this.state);
	}

	/** Funcition for handling select change for assignment type input */
	handleAssignmentTypeChange = (value) => {
		this.setState({
			assignmentType: value
		});
	};

	/** Funcition for handling select change for assignment type input */
	handleStatusChange = (value) => {
		this.setState({
			status: value
		});
	};

	/**Function to update the date of the appointment in the state the database */
	getApptDateValue = (value) => {
		this.setState({
			apptDate: value
		});
	};

	/**Function to update the date of birth in the state the database */
	getDOBValue = (value) => {
		this.setState({
			dob: value
		});
	};
	/** Funcition for handling select change for assignment type input */
	handleRepSelect = (value) => {
		this.setState({
			repName: value
		});
	};

	/** Function for handling selection of the employee who took the work order from the client */
	handleReceivedBy = (value) => {
		this.setState({
			receivedBy: value
		});
	};
	/**Function to update the date of the appointment in the state the database */
	getApptDateValue = (value) => {
		this.setState({
			apptDate: value
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

	/**Fuction to assisting formating phone numbers without having to compromise validation on server side */
	formatPhoneNumber(phoneNumberString) {
		let cleaned = ('' + phoneNumberString).replace(/\D/g, '');
		let match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
		if (match) {
			let intlCode = match[1] ? '+1 ' : '';
			return [ intlCode, '(', match[2], ') ', match[3], '-', match[4] ].join('');
		}
		return null;
	}
	/**Function to add the billing cost together, takes into account for additionalCost */
	addTotal = (length, price) => {
		if (this.state.connection === true) {
			let a = price;
			let b = length;
			let c = 0.1;
			let connectionFee = b * c;
			// console.log({ connectionFee });
			let d = a * b;
			let e = d + connectionFee;

			return e;
		} else if (this.state.connection === false) {
			let a = price;
			let b = length;
			let c = a * b;
			return c;
		}
	};
	/**function to determine which notification is called when application has had changes or added into system */
	apptFormSubmit = (event) => {
		event.preventDefault();

		const {
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
			dateAssigned,
			refName,
			refNumber,
			doi,
			dob,
			litigated,
			notes,
			language,
			assignmentType,
			appointmentPrice,
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
			ApptMinimum,
			contractorMinimum,
			recipient,
			Length,
			connection,
			repName,
			receivedBy
		} = this.state;

		API.saveAppt({
			apptDate: apptDate,
			apptTime: apptTime,
			endTime: endTime,
			repName: repName,
			receivedBy: receivedBy,
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
			appointmentPrice: appointmentPrice,
			contractorPrice: contractorPrice,
			contractorMinimum: contractorMinimum,
			ApptMinimum: ApptMinimum,
			additionalCost: additionalCost,
			status: status,
			billingContactName: billingContactName,
			billingPhone: billingPhone,
			billingEmail: billingEmail,
			billingLocation: billingLocation,
			billingAddress: billingAddress,
			billingCity: billingCity,
			billingState: billingState,
			billingZipCode: billingZipCode,
			contractors: contractors,
			recipient: recipient,
			Length: Length,
			connection: connection,
			dateAssigned: dateAssigned
		})
			.then((res) => {
				this.apptNotification('200');
				this.setState({
					apptDate: null,
					apptTime: null,
					repName: '',
					receivedBy: '',
					language: '',
					contractors: '',
					recipient: '',
					Length: '',
					connection: false,
					appointmentPrice: '',
					ApptMinimum: '',
					contractorPrice: '',
					ContractorMinimum: '',
					additionalCost: '',
					status: ''
				});
			})
			.catch((err) => {
				this.apptNotification('422');
				console.log(err);
			});
	};

	/**Toggle function for  enabling the inputs so info may be updated in the state */
	toggleBilling = () => {
		this.setState({
			addBilling: !this.state.addBilling
		});
	};

	/**Toggle function for opening the additional information section , Where outside billing info may be added*/
	BillingInfo = (AddBilling) => {
		switch (AddBilling) {
			case false:
				return (
					<h4 center className='BillingArea' onClick={this.toggleBilling}>
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
									size='sm'
									onChange={this.handleInputChange}
									value={this.state.billingContactName}
									type='text'
								/>
							</MDBCol>

							<MDBCol size='6'>
								<MDBInput
									name='billingEmail'
									label='Email'
									size='sm'
									onChange={this.handleInputChange}
									value={this.state.billingEmail}
									type='text'
								/>
							</MDBCol>

							<MDBCol size='6'>
								<MDBInput
									name='billingPhone'
									label='Phone'
									size='sm'
									onChange={this.handleInputChange}
									value={this.formatPhoneNumber(this.state.billingPhone)}
									type='number'
								/>
							</MDBCol>
						</MDBRow>

						<MDBRow>
							<MDBCol size='12'>
								<MDBInput
									name='billingAddress'
									label='Street Address'
									onChange={this.handleInputChange}
									size='sm'
									value={this.state.billingAddress}
									type='text'
								/>
							</MDBCol>

							<MDBCol size='4'>
								<MDBInput
									name='billingCity'
									label='City'
									size='sm'
									onChange={this.handleInputChange}
									value={this.state.billingCity}
									type='text'
								/>
							</MDBCol>

							<MDBCol size='4'>
								<MDBInput
									name='billingState'
									label='State'
									size='sm'
									onChange={this.handleInputChange}
									value={this.state.billingState}
									type='text'
								/>
							</MDBCol>
							<MDBCol size='4'>
								<MDBInput
									name='billingZipCode'
									label='Zip Code'
									size='sm'
									onChange={this.handleInputChange}
									value={this.state.billingZipcode}
									type='number'
								/>
							</MDBCol>

							<h4 className='BillingArea' onClick={this.toggleBilling}>
								<MDBIcon icon='angle-up' /> Close Additional Billing
							</h4>
						</MDBRow>
					</div>
				);
			default:
				return (
					<h4 center className='BillingArea' onClick={this.toggleBilling}>
						<MDBIcon icon='angle-down' /> Open Additional Billing
					</h4>
				);
		}
	};

	/**Function for displaying the correct notfication flag  */
	apptNotification = (apptNotification) => {
		if (apptNotification === '200') {
			toast.success('Phone Conference Saved!', {
				position: 'top-right'
			});
		}
		if (apptNotification === '422') {
			toast.error('Error saving, Please re-Enter phone numbers and check your appointment date and time');
		}
	};

	render() {
		const {
			addBilling,
			apptDate,
			apptTime,
			repName,
			receivedBy,
			assigneeFirst,
			assigneeLast,
			assigneeCompany,
			assigneePhone,
			adjusterFirst,
			adjusterLast,
			adjusterCompany,
			adjusterPhone,
			refName,
			refNumber,
			doi,
			dob,
			notes,
			language,
			assignmentType,
			appointmentPrice,
			contractorPrice,
			additionalCost,
			status,
			dateAssigned,
			contractors,
			recipient,
			Length,
			connection
		} = this.state;
		return (
			<MDBContainer>
				<form onSubmit={this.apptFormSubmit}>
					<MDBRow center>
						<MDBCol md='3'>
							<MDBSelect
								size='lg'
								options={this.state.optionsReceivedBy}
								value={receivedBy}
								getTextContent={this.handleReceivedBy}
								selected={'Select Option'}
							/>
							<label>Rec. by</label>
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
							<label>Status</label>
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
					</MDBRow>
					<MDBRow center>
						<MDBCol md='6'>
							<label>
								<h6>Appointment Date</h6>
							</label>
							<MDBInput type='date' name='apptDate' value={apptDate} getValue={this.getApptDateValue} />
						</MDBCol>
						<MDBCol md='6'>
							<label>
								<h6>Appointment Start Time</h6>
							</label>
							<MDBInput type='time' name='apptTime' value={apptTime} icon='' onChange={this.handleInputChange} />
						</MDBCol>
					</MDBRow>
					<MDBRow>
						<MDBCol lg='3' md='6'>
							<MDBInput
								name='assigneeFirst'
								value={assigneeFirst}
								label='Assignee First Name'
								icon=''
								onChange={this.handleInputChange}
							/>
						</MDBCol>
						<MDBCol lg='3' md='6'>
							<MDBInput
								name='assigneeLast'
								value={assigneeLast}
								label='Assignee Last Name'
								icon=''
								onChange={this.handleInputChange}
							/>
						</MDBCol>
						<MDBCol lg='3' md='6'>
							<MDBInput
								name='assigneeCompany'
								value={assigneeCompany}
								label='Assignee Company'
								icon=''
								onChange={this.handleInputChange}
							/>
						</MDBCol>
						<MDBCol lg='3' md='6'>
							<MDBInput
								name='assigneePhone'
								value={this.formatPhoneNumber(assigneePhone)}
								label='Assignee Phone #'
								icon=''
								onChange={this.handleInputChange}
							/>
						</MDBCol>
					</MDBRow>
					<MDBRow>
						<MDBCol lg='3' md='6'>
							<MDBInput
								name='adjusterFirst'
								value={adjusterFirst}
								label='Adjuster First Name'
								icon=''
								onChange={this.handleInputChange}
							/>
						</MDBCol>

						<MDBCol lg='3' md='6'>
							<MDBInput
								name='adjusterLast'
								value={adjusterLast}
								label='Adjuster Last Name'
								icon=''
								onChange={this.handleInputChange}
							/>
						</MDBCol>

						<MDBCol lg='3' md='6'>
							<MDBInput
								// color='primary'
								name='adjusterCompany'
								value={adjusterCompany}
								label='Adjuster Company'
								icon=''
								onChange={this.handleInputChange}
							/>
						</MDBCol>

						<MDBCol lg='3' md='6'>
							<MDBInput
								name='adjusterPhone'
								value={this.formatPhoneNumber(adjusterPhone)}
								label='Adjuster Phone #'
								icon=''
								onChange={this.handleInputChange}
							/>
						</MDBCol>
					</MDBRow>
					<MDBRow>
						<MDBCol lg='6' md='6'>
							<MDBInput
								name='refName'
								value={refName}
								label='Reference Name'
								icon=''
								onChange={this.handleInputChange}
							/>
						</MDBCol>
						<MDBCol lg='6' md='6'>
							<MDBInput
								name='refNumber'
								value={refNumber}
								label='Reference Number'
								icon=''
								onChange={this.handleInputChange}
							/>
						</MDBCol>
						<MDBCol lg='6' md='6'>
							<label>
								<h6>Date of Injury/Loss:</h6>
							</label>
							<MDBInput name='doi' value={doi} type='date' getValue={this.getDOIValue} />
						</MDBCol>
						<MDBCol lg='6' md='6'>
							<label>
								<h6>Date of Birth:</h6>
							</label>
							<MDBInput name='dob' value={dob} type='date' getValue={this.getDOBValue} />
						</MDBCol>
					</MDBRow>
					<MDBRow center>
						<MDBCol lg='10' md='12'>
							<MDBInput
								name='notes'
								value={notes}
								type='textarea'
								label='Notes'
								icon=''
								onChange={this.handleInputChange}
							/>
						</MDBCol>
						<MDBCol lg='6' md='6'>
							<MDBSelect
								search
								options={this.state.optionsLanguage}
								value={language}
								getTextContent={this.handleLangaugeChange}
								selected={'Choose Language'}
							/>
						</MDBCol>

						<MDBCol lg='6' md='6'>
							<MDBSelect
								options={this.state.optionsApptType}
								value={assignmentType}
								search
								getTextContent={this.handleAssignmentTypeChange}
								selected={assignmentType}
							/>

							<label>
								<h6>Assignment Type</h6>
							</label>
						</MDBCol>
					</MDBRow>
					<MDBRow>
						<MDBCol lg='6' md='6'>
							<MDBInput
								name='recipient'
								value={recipient}
								label='Phone Conference With'
								icon=''
								onChange={this.handleInputChange}
							/>
						</MDBCol>
						<MDBCol sm='6'>
							<MDBInput
								checked={connection}
								id='connection'
								name='connection'
								type='checkbox'
								label='Connection'
								icon=''
								onChange={this.handleInputChange}
							/>
						</MDBCol>
					</MDBRow>

					<MDBRow center>
						<MDBCol lg='12'>
							<MDBInput
								name='contractors'
								value={contractors}
								label='Contractor'
								icon=''
								onChange={this.handleInputChange}
							/>
						</MDBCol>
						<MDBCol lg='3' md='3'>
							<MDBInput
								name='Length'
								value={Length}
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
								labelClass='active'
								name='total'
								value={'$' + this.addTotal(Length, contractorPrice)}
								label='Total'
								icon=''
							/>
						</MDBCol>
					</MDBRow>
					<MDBRow center>
						<MDBCol lg='3' md='3'>
							<MDBInput
								name='Length'
								value={Length}
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
								labelClass='active'
								name='total'
								value={'$' + this.addTotal(Length, appointmentPrice)}
								label='Total'
								icon=''
							/>
						</MDBCol>
					</MDBRow>

					<MDBRow>
						<MDBCol sm='12'>
							<MDBInput
								value={additionalCost}
								name='additionalCost'
								label='Additional Cost'
								icon=''
								onChange={this.handleInputChange}
							/>
						</MDBCol>

						{this.BillingInfo(addBilling)}
					</MDBRow>

					<MDBRow center>
						<MDBBtn type='submit'>Submit</MDBBtn>
					</MDBRow>
				</form>
			</MDBContainer>
		);
	}
}

export default ApptForm;
