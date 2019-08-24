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
	ToastContainer,
	toast
} from 'mdbreact';
import API from '../../utils/API';
import './style.css';
import moment from 'moment';
class ApptForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			apptNotification: '',
			addBilling: false,
			apptDate: '',
			earlyArrival: false,
			startTime: '',
			apptTime: '',
			endTime: '',
			repName: '',
			receivedBy: '',
			assigneeFirst: '',
			assigneeLast: '',
			assigneeCompany: '',
			assigneePhone: '',
			adjusterFirst: '',
			adjusterLast: '',
			adjusterCompany: '',
			adjusterPhone: '',
			refName: '',
			refNumber: '',
			doi: null,
			dob: null,
			litigated: false,
			notes: '',
			language: '',
			assignmentType: '',
			locationName: '',
			address: '',
			city: '',
			state: '',
			postalCode: '',
			dateContractorAssigned: '',
			appointmentPrice: '',
			additionalCost: '',
			contractorPrice: '',
			contractorMinimum: '',
			contractorCert: '',
			ApptMinimum: '',
			status: '',
			billingContactName: '',
			billingPhone: '',
			billingEmail: '',
			billingLocation: '',
			billingAddress: '',
			billingCity: '',
			billingState: '',
			billingZipCode: '',
			dateAssigned: moment().format('L'),
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
					value: '31'
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
					text: 'Cambodian',
					value: '4'
				},
				{
					text: 'Chinese-Mandarin',
					value: '5'
				},
				{
					text: 'Chinese-Cantonese',
					value: '6'
				},

				{
					text: 'Eastern Armenian',
					value: '7'
				},
				{
					text: 'Egyptian Spoken Arabic',
					value: '8'
				},
				{
					text: 'Farsi',
					value: '9'
				},
				{
					text: 'French',
					value: '10'
				},
				{
					text: 'German',
					value: '11'
				},
				{
					text: 'Hindu',
					value: '12'
				},
				{
					text: 'Indonesian',
					value: '13'
				},
				{
					text: 'Illocono',
					value: '14'
				},
				{
					text: 'Italian',
					value: '15'
				},
				{
					text: 'Japanese',
					value: '16'
				},
				{
					text: 'Korean',
					value: '17'
				},
				{
					text: 'Persian',
					value: '18'
				},
				{
					text: 'Polish',
					value: '19'
				},
				{
					text: 'Portuguese',
					value: '20'
				},
				{
					text: 'Punjabi',
					value: '21'
				},

				{
					text: 'Russian',
					value: '22'
				},
				{
					text: 'Sinhalese (Srilanka)',
					value: '23'
				},
				{
					text: 'Spanish',
					value: '24'
				},
				{
					text: 'Tagalog',
					value: '25'
				},
				{
					text: 'Tamil',
					value: '26'
				},
				{
					text: 'Turkish',
					value: '27'
				},
				{
					text: 'Ukrainian',
					value: '28'
				},
				{
					text: 'Urdu',
					value: '29'
				},
				{
					text: 'Vietnamese',
					value: '30'
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
					checked: true,
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
					text: 'Completed/Show',
					value: '4'
				},
				{
					text: 'Set Up',
					value: '5'
				},
				{
					text: 'Phone Conference',
					value: '6'
				},
				{
					text: 'No Show',
					value: '7'
				},
				{
					text: 'Cancelled',
					value: '8'
				},
				{
					text: 'Double Booked',
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
					text: 'Waiting for Authorization',
					value: '12'
				},
				{
					text: 'Waiting for information',
					value: '13'
				},
				{
					text: 'Waiting for confirmation',
					value: '14'
				}
			]
		};
		this.handleInputChange = this.handleInputChange.bind(this);
	}
	/**Reload Appointments after some change has been made */

	reLoad = () => {
		this.props.loadAppointments();
	};

	notify(type) {
		return () => {
			console.log('being notified!');
			switch (type) {
				case 'info':
					toast.info('Info message', {
						autoClose: 3000
					});
					break;
				case 'success':
					toast.success('Success message', {
						position: 'top-right'
					});
					break;
				case 'warning':
					toast.warn('Warning message');
					break;
				case 'error':
					toast.error('My name is Inigo Montoya. You killed my father. Prepare to die!', {
						position: 'top-right',
						autoClose: 5000,
						closeButton: false
					});
					break;
			}
		};
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

	/** Funcition for handling select change for assignment type input */
	handleAssignmentTypeChange = (value) => {
		this.setState({
			assignmentType: value
		});
	};

	/** Function for handling selection of the employee who took the work order from the client */
	handleRepSelect = (value) => {
		this.setState({
			repName: value
		});
	};

	/** Function for handling the selection of how an appointment was received */
	handleReceivedBy = (value) => {
		this.setState({
			receivedBy: value
		});
	};

	/** Function for handling selection of the language  */
	handleLangaugeChange = (value) => {
		this.setState({
			language: value
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
			repName,
			receivedBy,
			earlyArrival,
			startTime
		} = this.state;

		API.saveAppt({
			apptDate: moment(apptDate).utc().format('L'),
			apptTime: apptTime,
			earlyArrival: earlyArrival,
			startTime: startTime,
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
			locationName: locationName,
			address: address,
			city: city,
			state: state,
			postalCode: postalCode,
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
			dateAssigned: dateAssigned
		})
			.then((res) => {
				this.apptNotification('200');
				this.setState({
					apptDate: null,
					apptTime: null,
					earlyArrival: false,
					startTime: '',
					repName: ' ',
					receivedBy: '',
					assigneeFirst: ' ',
					assigneeLast: ' ',
					assigneeCompany: ' ',
					assigneePhone: null,
					adjusterFirst: ' ',
					adjusterLast: ' ',
					adjusterCompany: ' ',
					adjusterPhone: ' ',
					refName: ' ',
					refNumber: ' ',
					doi: null,
					dob: null,
					litigated: false,
					notes: ' ',
					language: ' ',
					assignmentType: ' ',
					locationName: ' ',
					address: ' ',
					city: ' ',
					state: ' ',
					postalCode: ' ',
					appointmentPrice: ' ',
					ApptMinimum: ' ',
					contractorPrice: ' ',
					ContractorMinimum: ' ',
					additionalCost: ' ',
					status: ' ',
					billingContactName: ' ',
					billingPhone: ' ',
					billingEmail: ' ',
					billingLocation: ' ',
					billingAddress: ' ',
					billingCity: ' ',
					billingState: ' ',
					billingZipCode: ' ',
					dateAssigned: ' ',
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
							checked: true,
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
				});

				setTimeout(() => window.location.reload(), 1000);

				console.log(this.state);
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
				break;
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
									type='number'
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

	/**Function for toggling early arrival time  */
	ArrivalTime = (earlyArrival) => {
		switch (earlyArrival) {
			case false:
				return (
					<MDBRow center>
						<MDBCol md='6'>
							<label>Appointment Date</label>
							<MDBInput
								size='lg'
								type='date'
								name='apptDate'
								value={this.state.apptDate}
								getValue={this.getApptDateValue}
							/>
						</MDBCol>
						<MDBCol sm='3'>
							<MDBInput
								size='lg'
								checked={this.state.earlyArrival}
								id='earlyArrival'
								name='earlyArrival'
								type='checkbox2'
								label='Arrival ?'
								type='checkbox'
								icon=''
								onChange={this.handleInputChange}
							/>
						</MDBCol>
						<MDBCol sm='3'>
							<label>Start Time</label>
							<MDBInput
								size='lg'
								type='time'
								name='apptTime'
								value={this.state.apptTime}
								icon=''
								onChange={this.handleInputChange}
							/>
						</MDBCol>
					</MDBRow>
				);

			case true:
				return (
					<MDBRow center>
						<MDBCol md='6'>
							<label>Appointment Date</label>
							<MDBInput
								size='lg'
								type='date'
								name='apptDate'
								value={this.state.apptDate}
								getValue={this.getApptDateValue}
							/>
						</MDBCol>
						<MDBCol sm='2'>
							<MDBInput
								size='lg'
								checked={this.state.earlyArrival}
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
							<label>Arrival</label>
							<MDBInput
								size='lg'
								type='time'
								name='apptTime'
								value={this.state.apptTime}
								icon=''
								onChange={this.handleInputChange}
							/>
						</MDBCol>
						<MDBCol md='2'>
							<label>Start Time</label>
							<MDBInput
								size='lg'
								type='time'
								name='startTime'
								value={this.state.startTime}
								icon=''
								onChange={this.handleInputChange}
							/>
						</MDBCol>
					</MDBRow>
				);
		}
	};

	/**Function for displaying the correct notfication flag  */
	apptNotification = (apptNotification) => {
		if (apptNotification === '200') {
			toast.success('Appointment Saved!', {
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
			locationName,
			address,
			city,
			state,
			postalCode,
			appointmentPrice,
			ApptMinimum,
			additionalCost,
			status,
			dateAssigned,
			repName,
			receivedBy
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
							<label>Received by</label>
						</MDBCol>

						<MDBCol md='3'>
							<MDBSelect
								size='lg'
								options={this.state.optionsReps}
								value={repName}
								getTextContent={this.handleRepSelect}
								selected={'Select Rep'}
							/>
							<label>Rep Name</label>
						</MDBCol>
						<MDBCol md='3'>
							<MDBSelect
								size='lg'
								options={this.state.optionsStatus}
								value={status}
								getTextContent={this.handleStatusChange}
								selected={'Choose Status'}
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
					</MDBRow>

					{this.ArrivalTime(this.state.earlyArrival)}

					<MDBRow>
						<MDBCol lg='3' md='6'>
							<MDBInput
								name='assigneeFirst'
								value={assigneeFirst}
								label='Assignee First Name'
								icon=''
								size='lg'
								onChange={this.handleInputChange}
							/>
						</MDBCol>
						<MDBCol lg='3' md='6'>
							<MDBInput
								name='assigneeLast'
								value={assigneeLast}
								label='Assignee Last Name'
								icon=''
								size='lg'
								onChange={this.handleInputChange}
							/>
						</MDBCol>
						<MDBCol lg='3' md='6'>
							<MDBInput
								size='lg'
								name='assigneeCompany'
								value={assigneeCompany}
								label='Assignee Company'
								icon=''
								onChange={this.handleInputChange}
							/>
						</MDBCol>
						<MDBCol lg='3' md='6'>
							<MDBInput
								size='lg'
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
								size='lg'
								name='adjusterFirst'
								value={adjusterFirst}
								label='Adjuster First Name'
								icon=''
								onChange={this.handleInputChange}
							/>
						</MDBCol>

						<MDBCol lg='3' md='6'>
							<MDBInput
								size='lg'
								name='adjusterLast'
								value={adjusterLast}
								label='Adjuster Last Name'
								icon=''
								onChange={this.handleInputChange}
							/>
						</MDBCol>

						<MDBCol lg='3' md='6'>
							<MDBInput
								size='lg'
								color='primary'
								name='adjusterCompany'
								value={adjusterCompany}
								label='Adjuster Company'
								icon=''
								onChange={this.handleInputChange}
							/>
						</MDBCol>

						<MDBCol lg='3' md='6'>
							<MDBInput
								size='lg'
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
								size='lg'
								name='refName'
								value={refName}
								label='Reference Name'
								icon=''
								onChange={this.handleInputChange}
							/>
						</MDBCol>
						<MDBCol lg='6' md='6'>
							<MDBInput
								size='lg'
								name='refNumber'
								value={refNumber}
								label='Reference Number'
								icon=''
								onChange={this.handleInputChange}
							/>
						</MDBCol>
						<MDBCol lg='6' md='6'>
							<label>Date of Injury/Loss:</label>
							<MDBInput size='lg' name='doi' value={doi} type='date' getValue={this.getDOIValue} />
						</MDBCol>
						<MDBCol lg='6' md='6'>
							<label>Date of Birth:</label>
							<MDBInput size='lg' name='dob' value={dob} type='date' getValue={this.getDOBValue} />
						</MDBCol>
						<MDBCol lg='4' md='6' className='offset-lg-4'>
							<MDBInput
								size='lg'
								checked={litigated}
								id='litigated'
								name='litigated'
								type='checkbox'
								label='Litigated'
								icon=''
								onChange={this.handleInputChange}
							/>
						</MDBCol>
					</MDBRow>
					<MDBRow center>
						<MDBCol lg='10' md='12'>
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
						<MDBCol lg='6' md='6'>
							<MDBSelect
								size='lg'
								search
								options={this.state.optionsLanguage}
								value={language}
								getTextContent={this.handleLangaugeChange}
								selected={'Choose Language'}
							/>
							<label>Language</label>
						</MDBCol>

						<MDBCol lg='6' md='6'>
							<MDBSelect
								options={this.state.optionsApptType}
								value={assignmentType}
								search
								getTextContent={this.handleAssignmentTypeChange}
								selected={'Choose Type'}
							/>
							<label>Assignment Type</label>
						</MDBCol>
					</MDBRow>
					<MDBRow>
						<MDBCol lg='6' md='6'>
							<MDBInput
								size='lg'
								name='locationName'
								value={locationName}
								label='Location Name'
								icon=''
								onChange={this.handleInputChange}
							/>
						</MDBCol>
						<MDBCol lg='6' md='6'>
							<MDBInput
								size='lg'
								name='address'
								value={address}
								label='Address'
								icon=''
								onChange={this.handleInputChange}
							/>
						</MDBCol>
					</MDBRow>
					<MDBRow center>
						<MDBCol lg='4' md='6'>
							<MDBInput
								size='lg'
								name='city'
								value={city}
								label='City'
								icon=''
								onChange={this.handleInputChange}
							/>
						</MDBCol>
						<MDBCol lg='4' md='6'>
							<MDBInput
								size='lg'
								name='state'
								value={state}
								label='State'
								icon=''
								onChange={this.handleInputChange}
							/>
						</MDBCol>
						<MDBCol lg='4' md='6'>
							<MDBInput
								size='lg'
								name='postalCode'
								value={postalCode}
								label='Postal Code'
								icon=''
								onChange={this.handleInputChange}
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
					</MDBRow>

					<MDBRow>{this.BillingInfo(addBilling)}</MDBRow>

					<MDBRow center>
						<MDBBtn type='submit'>Submit</MDBBtn>
					</MDBRow>
				</form>
				<ToastContainer hideProgressBar={true} newestOnTop={true} autoClose={5000} />
			</MDBContainer>
		);
	}
}

export default ApptForm;
