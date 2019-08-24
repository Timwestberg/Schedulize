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
	MDBCol
} from 'mdbreact';
import moment from 'moment';
import PrintProvider, { Print } from 'react-easy-print';
import { clearAllBodyScrollLocks } from 'body-scroll-lock';
import './print.css';
class ComponentToPrint extends Component {
	constructor(props) {
		super(props);
		const {
			printModal,
			markerType,
			id,
			apptDate,
			earlyArrival,
			startTime,
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
			repName,
			length,
			connection,
			receivedBy
		} = this.props;

		this.state = {
			update: false,
			notification: '',
			followUpModal: false,
			printModal: printModal,
			earlyArrival: earlyArrival,
			startTime: startTime,
			outlined: false,
			disabled: true,
			addBilling: false,
			statusReason: statusReason,
			markerType: markerType,
			id: id,
			dateAssigned: moment(dateAssigned).utc().format('L'),
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
			repName: repName,
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
					text: 'Completed/Show',
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
					text: 'Waiting for auth.',
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

	getSum(total, num) {
		return parseInt(total) + parseInt(num);
	}
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
	/**Toggle function for displaying the reason for the negative appointment status */
	toggleStatusReason = (status) => {
		switch (status) {
			case 'No show':
				return (
					<MDBCol size='12'>
						<MDBInput
							name='statusReason'
							label={<i className='labelHeadings'>Status Explanation</i>}
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
							label={<i className='labelHeadings'>Status Explanation</i>}
							name='statusReason'
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
							label={<i className='labelHeadings'>Status Explanation</i>}
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
							label={<i className='labelHeadings'>Status Explanation</i>}
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
							label={<i className='labelHeadings'>Status Explanation</i>}
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
	togglePhoneConferenceInfo = (type) => {
		const {
			recipient,
			connection,
			length,
			contractors,
			contractorPrice,
			appointmentPrice,
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
								{/* <h3>Phone Conference With:</h3><div></div> */}
								<MDBInput
									disabled={true}
									name='recipient'
									value={recipient}
									label={<i className='labelHeadings'>Phone Conference With</i>}
									icon=''
									onChange={this.handleInputChange}
								/>
							</MDBCol>
							<MDBCol sm='6'>
								<MDBInput
									disabled={true}
									checked={connection}
									id='connection'
									name='connection'
									type='checkbox'
									label={<i className='labelHeadings'>Connection</i>}
									icon=''
									onChange={this.handleInputChange}
								/>
							</MDBCol>
						</MDBRow>

						<MDBRow center>
							<MDBCol sm='12'>
								<MDBInput
									disabled={true}
									name='contractors'
									value={contractors}
									label={<i className='labelHeadings'>Interpreter</i>}
									icon=''
									onChange={this.handleInputChange}
								/>
							</MDBCol>
							<MDBCol sm='3' md='3'>
								<MDBInput
									disabled={true}
									name='length'
									value={length}
									label={<i className='labelHeadings'>length(Minutes)</i>}
									icon=''
									onChange={this.handleInputChange}
								/>
							</MDBCol>

							<MDBCol sm='1'>
								<MDBIcon icon='times' />
							</MDBCol>

							<MDBCol sm='3'>
								<MDBInput
									disabled={true}
									name='contractorPrice'
									labelClass='active'
									label={<i className='labelHeadings'>Contractor Price</i>}
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
									disabled='true'
									labelClass='active'
									name='total'
									value={'$' + this.addPhoneTotal(length, contractorPrice, connection)}
									label={<i className='labelHeadings'>Total</i>}
									icon=''
								/>
							</MDBCol>
						</MDBRow>
						<MDBRow center>
							<MDBCol sm='3' md='3'>
								<MDBInput
									disabled={true}
									name='length'
									value={length}
									label={<i className='labelHeadings'>length(Minutes)</i>}
									icon=''
									onChange={this.handleInputChange}
								/>
							</MDBCol>

							<MDBCol sm='1'>
								<MDBIcon size='sm' icon='times' />
							</MDBCol>

							<MDBCol sm='3'>
								<MDBInput
									disabled={true}
									name='appointmentPrice'
									labelClass='active'
									label={<i className='labelHeadings'>Appt. Price</i>}
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
									disabled='true'
									labelClass='active'
									name='total'
									value={'$' + this.addPhoneTotal(length, appointmentPrice, connection)}
									label={<i className='labelHeadings'>Total</i>}
									icon=''
								/>
							</MDBCol>
						</MDBRow>
					</div>
				);
			default:
				return (
					<div>
						<MDBRow>
							<MDBCol sm='8'>
								<MDBInput
									name='locationName'
									value={this.state.locationName}
									label={<i className='labelHeadings'>Location</i>}
									size='lg'
									disabled={true}
									type='text'
									onChange={this.handleInputChange}
								/>
							</MDBCol>

							<MDBCol sm='6'>
								<MDBInput
									name='address'
									label={<i className='labelHeadings'>Street Address</i>}
									size='lg'
									disabled={true}
									type='text'
									value={address}
									onChange={this.handleInputChange}
								/>
							</MDBCol>

							<MDBCol sm='3'>
								<MDBInput
									name='city'
									label={<i className='labelHeadings'>City</i>}
									disabled={true}
									size='lg'
									type='text'
									value={city}
									onChange={this.handleInputChange}
								/>
							</MDBCol>

							<MDBCol sm='1'>
								<MDBInput
									name='state'
									label={<i className='labelHeadings'>State</i>}
									disabled={true}
									size='lg'
									type='text'
									value={state}
									onChange={this.handleInputChange}
								/>
							</MDBCol>

							<MDBCol sm='2'>
								<MDBInput
									name='zipCode'
									label={<i className='labelHeadings'>Zip Code</i>}
									disabled={true}
									size='lg'
									type='number'
									value={postalCode}
									onChange={this.handleInputChange}
								/>
							</MDBCol>
						</MDBRow>
						<MDBRow>
							<MDBCol sm='3'>
								<MDBInput
									name='dateContractorAssigned'
									label={<i className='labelHeadings'>Date Assigned</i>}
									value={dateContractorAssigned}
									size='lg'
									disabled={true}
									onChange={this.handleInputChange}
								/>
							</MDBCol>
							<MDBCol sm='3'>
								<MDBInput
									name='contractors'
									label={<i className='labelHeadings'>Interpreter</i>}
									value={contractors}
									size='lg'
									disabled={true}
									onChange={this.handleInputChange}
								/>
							</MDBCol>

							<MDBCol sm='3'>
								<MDBInput
									name='conCert'
									label={<i className='labelHeadings'>Cert. Number</i>}
									value={conCert}
									size='lg'
									disabled={true}
									onChange={this.handleInputChange}
								/>
							</MDBCol>

							<MDBCol sm='3'>
								<MDBInput
									name='conPhone'
									label={<i className='labelHeadings'>Phone</i>}
									size='lg'
									disabled={true}
									value={conPhone}
									onChange={this.handleInputChange}
								/>
							</MDBCol>

							{/* <MDBCol sm='3'>
								<MDBInput
									size='lg'
									disabled={true}
									name='contractorPrice'
									label={
										<div>
												<i className="labelHeadings">Contractor Price</i>
										</div>
									}
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
									disabled={true}
									name='additionalCost'
									value={this.state.additionalCost}
									onChange={this.handleInputChange}
									type='text'
									label={
										<div>
												<i className="labelHeadings">Additional Cost</i>
										</div>
									}
								/>
							</MDBCol>

							<MDBCol sm='1'>
								<MDBIcon size='sm' icon='equals' />
							</MDBCol>

							<MDBCol sm='3'>
								<MDBInput
									size='lg'
									disabled={true}
									labelClass='active'
									name='total'
									value={'$' + this.getSum(contractorPrice, additionalCost)}
									label={
										<div>
												<i className="labelHeadings">Total</i>
										</div>
									}
									icon=''
								/>
							</MDBCol> */}
						</MDBRow>
						<MDBRow center>
							<MDBCol sm='3'>
								<MDBInput
									size='lg'
									disabled={true}
									name='appointmentPrice'
									labelClass='active'
									label={<i className='labelHeadings'>Appt. Price</i>}
									value={appointmentPrice}
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
									disabled={true}
									name='additionalCost'
									value={this.state.additionalCost}
									onChange={this.handleInputChange}
									type='text'
									labelClass='active'
									label={<i className='labelHeadings'>Additional Cost</i>}
								/>
							</MDBCol>

							<MDBCol sm='1'>
								<MDBIcon icon='equals' />
							</MDBCol>

							<MDBCol sm='3'>
								<MDBInput
									size='lg'
									disabled={true}
									labelClass='active'
									name='total'
									value={'$' + this.getSum(appointmentPrice, additionalCost)}
									label={<i className='labelHeadings'>Total</i>}
									icon=''
								/>
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
	/**Toggle function for changing Location Name title into input field */
	ArrivalTime = (earlyArrival) => {
		switch (earlyArrival) {
			case false:
				return (
					<MDBRow center>
						<MDBCol sm='4'>
							<MDBInput
								size='lg'
								label={<i className='labelHeadings'>Appointment Date</i>}
								name='apptDate'
								disable
								value={moment(this.state.apptDate).utc().format('ddd, ll')}
								outline={this.state.outlined}
								disabled={true}
								getValue={this.getApptDateValue}
							/>
						</MDBCol>
						<MDBCol sm='3'>
							<MDBInput
								size='lg'
								checked={this.state.earlyArrival}
								id='earlyArrival'
								name='earlyArrival'
								disable
								type='checkbox2'
								label={<i className='labelHeadings'>Arrival?</i>}
								type='checkbox'
								icon=''
								onChange={this.handleInputChange}
							/>
						</MDBCol>
						<MDBCol sm='3'>
							<MDBInput
								size='lg'
								disable
								label={<i className='labelHeadings'>Start Time</i>}
								name='apptTime'
								value={moment(this.state.apptTime, 'HH:mm').format('hh:mm a')}
								icon=''
								onChange={this.handleInputChange}
							/>
						</MDBCol>
						<MDBCol md='2'>
							<MDBInput
								size='lg'
								label={<i className='labelHeadings'>End Time</i>}
								name='endTime'
								disable
								value={moment(this.state.endTime, 'HH:mm').format('hh:mm a')}
								icon=''
								onChange={this.handleInputChange}
							/>
						</MDBCol>
					</MDBRow>
				);

			case true:
				return (
					<MDBRow center>
						<MDBCol sm='4'>
							<MDBInput
								size='lg'
								label={<i className='labelHeadings'>Appointment Date</i>}
								name='apptDate'
								disable
								value={moment(this.state.apptDate).utc().format('ddd, ll')}
								outline={this.state.outlined}
								disabled={true}
								getValue={this.getApptDateValue}
							/>
						</MDBCol>
						<MDBCol sm='2'>
							<MDBInput
								size='lg'
								checked={this.state.earlyArrival}
								id='earlyArrival'
								name='earlyArrival'
								disable
								type='checkbox2'
								label={<i className='labelHeadings'>Arrival?</i>}
								type='checkbox'
								icon=''
								onChange={this.handleInputChange}
							/>
						</MDBCol>
						<MDBCol md='2'>
							<MDBInput
								size='lg'
								name='apptTime'
								label={<i className='labelHeadings'>Arrival Time</i>}
								value={moment(this.state.apptTime, 'HH:mm').format('hh:mm a')}
								disable
								icon=''
								onChange={this.handleInputChange}
							/>
						</MDBCol>
						<MDBCol md='2'>
							<MDBInput
								size='lg'
								name='startTime'
								value={moment(this.state.startTime, 'HH:mm').format('hh:mm a')}
								disable
								label={<i className='labelHeadings'>Start Time</i>}
								icon=''
								onChange={this.handleInputChange}
							/>
						</MDBCol>

						<MDBCol md='2'>
							<MDBInput
								size='lg'
								label={<i className='labelHeadings'>End Time</i>}
								name='endTime'
								disable
								value={moment(this.state.endTime, 'HH:mm').format('hh:mm a')}
								icon=''
								onChange={this.handleInputChange}
							/>
						</MDBCol>
					</MDBRow>
				);
		}
	};
	render() {
		const {
			disabled,
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
			status,
			address,
			city,
			state,
			postalCode,
			repName,
			receivedBy
		} = this.state;
		console.log(this.state);
		return (
			// <PrintProvider>
			<MDBContainer id='printView'>
				{/* <PrintProvider> */}
				<MDBModal className='cascading-modal' isOpen={this.state.printModal} size='fluid'>
					<MDBModalHeader className='text-center stylish-color-dark text-white' titleClass='w-100' tag='h1'>
						<MDBRow>
							<MDBCol sm='8'>Print Preview</MDBCol>
							<MDBCol sm='4'>
								{/* To change the exit icon , edit below */}

								<MDBIcon far icon='times-circle' onClick={this.toggle} size='3x' className='exitIcon' />
								{/* <MDBIcon icon='times-circle' onClick={this.toggleClose} size='3x' className='exitIcon' /> */}
							</MDBCol>
						</MDBRow>
					</MDBModalHeader>

					{/** MODAL Body*/}

					<MDBModalBody>
						<PrintProvider>
							<Print name='foo'>
								<MDBContainer>
									<MDBRow center>
										<MDBCol md='3'>
											<br />
											<MDBInput
												size='lg'
												value={receivedBy}
												label={<i className='labelHeadings'>Received by</i>}
											/>
										</MDBCol>
										<MDBCol md='3'>
											<br />
											<MDBInput
												size='lg'
												value={repName}
												label={<i className='labelHeadings'>Rep Name</i>}
											/>
										</MDBCol>
										<MDBCol md='3'>
											<br />
											<MDBInput size='lg' value={status} label={<i className='labelHeadings'>Status</i>} />
										</MDBCol>
										<MDBCol md='3'>
											<br />
											<MDBInput
												size='lg'
												labelClass='active'
												type='text'
												name='dateAssigned'
												label={<i className='labelHeadings'>Date Received</i>}
												disabled={true}
												value={dateAssigned}
												onChange={this.handleInputChange}
											/>
										</MDBCol>
										{this.toggleStatusReason(status)}
									</MDBRow>

									{this.ArrivalTime(this.state.earlyArrival)}

									<MDBRow>
										<MDBCol sm='3'>
											<MDBInput
												size='lg'
												name='assigneeFirst'
												label={<i className='labelHeadings'>Assignee First</i>}
												disabled={true}
												type='text'
												value={assigneeFirst}
												onChange={this.handleInputChange}
											/>
										</MDBCol>

										<MDBCol sm='3'>
											<MDBInput
												size='lg'
												disabled={true}
												name='assigneeLast'
												label={<i className='labelHeadings'>Assignee Last</i>}
												type='text'
												value={assigneeLast}
												onChange={this.handleInputChange}
											/>
										</MDBCol>

										<MDBCol sm='3'>
											<MDBInput
												size='lg'
												disabled={true}
												name='assigneeCompany'
												label={<i className='labelHeadings'>Company Name</i>}
												type='text'
												value={assigneeCompany}
												onChange={this.handleInputChange}
											/>
										</MDBCol>

										<MDBCol sm='3'>
											<MDBInput
												disabled={true}
												name='assigneePhone'
												label={<i className='labelHeadings'>Assignee Phone</i>}
												size='lg'
												value={this.formatPhoneNumber(assigneePhone)}
												onChange={this.handleInputChange}
											/>
										</MDBCol>
									</MDBRow>

									<MDBRow>
										<MDBCol sm='3'>
											<MDBInput
												disabled={true}
												name='adjusterFirst'
												label={<i className='labelHeadings'>Adjuster First</i>}
												size='lg'
												value={adjusterFirst}
												onChange={this.handleInputChange}
											/>
										</MDBCol>

										<MDBCol sm='3'>
											<MDBInput
												disabled={true}
												name='adjusterLast'
												label={<i className='labelHeadings'>Adjuster Last</i>}
												size='lg'
												value={adjusterLast}
												onChange={this.handleInputChange}
											/>
										</MDBCol>

										<MDBCol sm='3'>
											<MDBInput
												disabled={true}
												name='adjusterCompany'
												label={<i className='labelHeadings'>Company Name</i>}
												size='lg'
												value={adjusterCompany}
												onChange={this.handleInputChange}
											/>
										</MDBCol>

										<MDBCol sm='3'>
											<MDBInput
												disabled={true}
												name='adjusterPhone'
												label={<i className='labelHeadings'>Adjuster Phone</i>}
												size='lg'
												type='text'
												value={this.formatPhoneNumber(adjusterPhone)}
												onChange={this.handleInputChange}
											/>
										</MDBCol>
									</MDBRow>

									<MDBRow center>
										<MDBCol sm='8'>
											<MDBInput
												disabled={true}
												outline={this.state.outlined}
												name='refName'
												label={<i className='labelHeadings'>Reference Name</i>}
												size='lg'
												type='text'
												value={this.state.refName}
												onChange={this.handleInputChange}
											/>
										</MDBCol>
										<MDBCol sm='4'>
											<MDBInput
												outline={this.state.outlined}
												name='refNumber'
												label={<i className='labelHeadings'>Claim Number</i>}
												size='lg'
												disabled={true}
												type='text'
												value={this.state.refNumber}
												onChange={this.handleInputChange}
											/>
										</MDBCol>
									</MDBRow>

									<MDBRow center>
										<MDBCol sm='2'>
											<MDBInput
												disabled={true}
												name='litigated'
												label={<i className='labelHeadings'>Litigated</i>}
												checked={litigated}
												type='checkbox'
												id='checkbox1'
												onChange={this.handleInputChange}
											/>
										</MDBCol>
										<MDBCol sm='2'>
											<MDBInput
												size='lg'
												disabled={true}
												label={<i className='labelHeadings'>DOI/DOL</i>}
												name='doi'
												value={this.state.doi}
												getValue={this.getDOIValue}
											/>
										</MDBCol>
										<MDBCol sm='2'>
											<MDBInput
												size='lg'
												disabled={true}
												name='dob'
												label={<i className='labelHeadings'>DOB</i>}
												value={this.state.dob}
												getValue={this.getDOBValue}
											/>
										</MDBCol>
										<MDBCol sm='3'>
											<MDBInput
												size='lg'
												searchId='assignmentType'
												label={<i className='labelHeadings'>Assignment Type</i>}
												value={assignmentType}
												disabled={true}
											/>
										</MDBCol>

										<MDBCol sm='3'>
											<MDBInput
												name='language'
												label={<i className='labelHeadings'>Language</i>}
												size='lg'
												disabled={true}
												type='text'
												value={language}
												onChange={this.handleInputChange}
											/>
										</MDBCol>
									</MDBRow>

									{this.togglePhoneConferenceInfo(assignmentType)}

									<MDBRow>
										<MDBCol size='3'>
											<MDBInput
												name='billingContactName'
												label={<i className='labelHeadings'>Contact</i>}
												size='lg'
												disabled={true}
												outline={this.state.outlined}
												onChange={this.handleInputChange}
												value={this.state.billingContactName}
												type='text'
											/>
										</MDBCol>

										<MDBCol size='5'>
											<MDBInput
												name='billingEmail'
												label={<i className='labelHeadings'>Email</i>}
												size='lg'
												disabled={true}
												outline={this.state.outlined}
												onChange={this.handleInputChange}
												value={this.state.billingEmail}
												type='text'
											/>
										</MDBCol>

										<MDBCol size='3'>
											<MDBInput
												name='billingPhone'
												label={<i className='labelHeadings'>Phone</i>}
												size='lg'
												disabled={true}
												outline={this.state.outlined}
												onChange={this.handleInputChange}
												value={this.formatPhoneNumber(this.state.billingPhone)}
												type='text'
											/>
										</MDBCol>
									</MDBRow>

									<MDBRow>
										<MDBCol sm='4'>
											<MDBInput
												name='billingAddress'
												label={<i className='labelHeadings'>Street Address</i>}
												disabled={true}
												outline={this.state.outlined}
												onChange={this.handleInputChange}
												size='lg'
												value={this.state.billingAddress}
												type='text'
											/>
										</MDBCol>

										<MDBCol sm='3'>
											<MDBInput
												name='billingCity'
												label={<i className='labelHeadings'>City</i>}
												size='lg'
												disabled={true}
												outline={this.state.outlined}
												onChange={this.handleInputChange}
												value={this.state.billingCity}
												type='text'
											/>
										</MDBCol>

										<MDBCol sm='2'>
											<MDBInput
												name='billingState'
												label={<i className='labelHeadings'>State</i>}
												size='lg'
												disabled={true}
												outline={this.state.outlined}
												onChange={this.handleInputChange}
												value={this.state.billingState}
												type='text'
											/>
										</MDBCol>
										<MDBCol sm='3'>
											<MDBInput
												name='billingZipCode'
												label={<i className='labelHeadings'>Zip Code</i>}
												size='lg'
												disabled={true}
												outline={this.state.outlined}
												onChange={this.handleInputChange}
												value={this.state.billingZipcode}
												type='text'
											/>
										</MDBCol>
										<MDBCol sm='10' md='12'>
											<MDBInput
												size='lg'
												disabled={true}
												name='notes'
												value={notes}
												type='textarea'
												label={<i className='labelHeadings'>Notes</i>}
												icon=''
												onChange={this.handleInputChange}
											/>
										</MDBCol>
									</MDBRow>
								</MDBContainer>
							</Print>
						</PrintProvider>
					</MDBModalBody>

					<MDBModalFooter>
						{/* Should Close or Save button be Displayed? */}
						{this.toggleCloseButton(disabled)}
					</MDBModalFooter>
				</MDBModal>
				{/* </PrintProvider> */}
			</MDBContainer>
			// </PrintProvider>
		);
	}
}

export default ComponentToPrint;
