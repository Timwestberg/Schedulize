import React, { Component } from 'react';
import {
	MDBBtn,
	MDBModal,
	MDBModalBody,
	MDBModalHeader,
	MDBTabPane,
	MDBTabContent,
	MDBNav,
	MDBNavItem,
	MDBNavLink,
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
import './style.css';
import API from '../utils/API';
import Payroll from '../components/Tables/payrollTable';
import PrintProvider, { Print } from 'react-easy-print';
import ApptInvoiceProfile from '../components/ApptInvoiceProfile';
import moment from 'moment';
class ModalProfile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			appointments: this.props.appointments,
			appointments2: [],
			modalNumber: '',
			invoiceModal: false,
			Billed: [],
			toBeBilled: [],
			TotalBilled: 0,
			TotalToBeBilled: 0,
			activeItem: '1',
			firstDate: '',
			secondDate: '',
			update: false,
			notification: '',
			modal: this.props.modal,
			disabled: true,
			outlined: false,
			conFirst: this.props.conFirst,
			conLast: this.props.conLast,
			conPhone: this.props.conPhone,
			secondary: this.props.secondary,
			email: this.props.email,
			language: this.props.language,
			certification: this.props.certification,
			certificationNumber: this.props.certificationNumber,
			notes: this.props.notes,
			type: this.props.type,
			standing: this.props.standing,
			pricing: this.props.pricing,
			minimum: this.props.minimum,
			locationName: this.props.locationName,
			address: this.props.address,
			city: this.props.city,
			state: this.props.state,
			zipCode: this.props.zipCode,
			w9: this.props.w9,
			id: this.props.id,
			optionsLanguage: [
				{
					text: 'Other',
					value: '30'
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
					text: 'Spanish',
					value: '23'
				},
				{
					text: 'Tagolog',
					value: '24'
				},
				{
					text: 'Tamil',
					value: '25'
				},
				{
					text: 'Turkish',
					value: '26'
				},
				{
					text: 'Ukrainian',
					value: '27'
				},
				{
					text: 'Urdu',
					value: '28'
				},
				{
					text: 'Vietnamese',
					value: '29'
				}
			],
			optionsStanding: [
				{
					text: 'Preffered',
					value: '1'
				},
				{
					text: 'Good',
					value: '2'
				},
				{
					text: 'New',
					value: '3'
				},
				{
					text: 'Do not Use',
					value: '4'
				}
			],
			optionsType: [
				{
					text: 'Statments',
					value: '1'
				},
				{
					text: 'Qualified Medical',
					value: '2'
				},
				{
					text: 'Certified Medical',
					value: '3'
				},
				{
					text: 'Certified Court',
					value: '4'
				}
			]
		};
		this.loadToBeBilled = this.loadToBeBilled.bind(this);
		this.loadBilled = this.loadBilled.bind(this);
		this.loadAppointments = this.loadAppointments.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
		this.loadDateRange = this.loadDateRange.bind(this);
		this.getFirstDate = this.getFirstDate.bind(this);
		this.getSecondDate = this.getSecondDate.bind(this);
		this.toggleInvoice = this.toggleInvoice.bind(this);
	}

	componentDidMount() {
		this.loadToBeBilled();
		this.loadBilled();
	}
	/**Toggle function for opening and closing the Modal */
	toggleInvoice = () => {
		this.setState({
			invoiceModal: !this.state.invoiceModal
		});
	};
	/**Reload Contractors after some change has been made */

	// reLoad = () => {
	// 	this;
	// };

	/**Add the sum of two integers */
	getSum(total, num) {
		let a = parseFloat(total) + parseFloat(num);
		return a.toFixed(2);
	}

	/**If an update has been made then reload the Contractors , if no change occurs do not reload data */
	toggleClose = () => {
		const update = this.state.update;
		if (update === true) {
			return this.reLoad();
		} else if (update === false) {
			return this.props.toggle();
		}
	};

	loadBilled = () => {
		const { conFirst, conLast } = this.state;
		const name = conFirst + ' ' + conLast;
		API.getAppts()
			.then((res) => {
				this.setState({
					Billed: []
				});
				const billed = res.data.filter(function(appointment) {
					return (
						(appointment.billingStatus == 'Billed' && appointment.contractors == name) ||
						(appointment.billingStatus == 'Office mistake' && appointment.contractors == name) ||
						(appointment.billingStatus == 'Late cancellation' && appointment.contractors == name) ||
						(appointment.billingStatus == 'Rescheduled not notified' && appointment.contractors == name) ||
						(appointment.billingStatus == 'Double booked' && appointment.contractors == name)
					);
				});

				return billed;
			})
			.then((res) => {
				let apptBilled = res.sort(function(a, b) {
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

				return apptBilled;
			})
			.then((res) => {
				const prices = [];
				res.forEach((appointment) => {
					// console.log(appointment.status);
					const apptDate = moment(appointment.apptDate).utc().format('YYYY-MM-DD');
					const apptTime = moment(appointment.apptTime, 'HH:mm').format('HH:mm');
					const formatApptTime = moment(appointment.apptTime, 'HH:mm').format('hh:mm a');
					const endTime = moment(appointment.endTime, 'HH:mm').format('HH:mm');
					const formatendTime = moment(appointment.endTime, 'HH:mm').format('hh:mm a');
					const finalTime = endTime + ' ' + '(' + formatendTime + ')';
					const dateTime = moment(apptDate).format('L') + ' ' + apptTime + ' ' + '(' + formatApptTime + ')';

					// Functions to handle calculating the total price of the table
					const price = appointment.contractorPrice;
					prices.push(price);
					const b = prices.map(Number);
					const TotalPrice = b.reduce(this.getSum);
					console.log({ TotalPrice });
					this.setState({
						TotalBilled: TotalPrice
					});
					this.state.Billed.push({
						date: dateTime,
						// endtime: finalTime,
						caseName: `${appointment.refName}`,
						language: `${appointment.language}`,
						contractor: `${appointment.contractors}`,
						status: `${appointment.status}`,
						price: `${appointment.contractorPrice}`,
						clickEvent: this.loadModal(appointment._id)
					});
				});
			});
	};
	loadAppointments = () => {
		API.getAppts()
			.then((res) => {
				this.setState({
					appointments2: res.data
				});
			})
			.catch((err) => console.log(err));
	};

	loadToBeBilled = () => {
		console.log('to be Billed');
		const { conFirst, conLast } = this.state;
		const name = conFirst + ' ' + conLast;
		API.getAppts()
			.then((res) => {
				this.setState({
					toBeBilled: []
				});
				const completed = res.data.filter(function(appointment) {
					return (
						(appointment.status == 'Completed/Show' &&
						appointment.billingStatus == 'To be Billed' && // and
							appointment.contractors == name) ||
						(appointment.status == 'Completed/Show' &&
						appointment.billingStatus == 'Waiting for information' && // and
							appointment.contractors == name) ||
						(appointment.status == 'No show' &&
						appointment.billingStatus == 'To be Billed' && // and
							appointment.contractors == name) ||
						(appointment.status == 'No show' &&
						appointment.billingStatus == 'Waiting for information' && // and
							appointment.contractors == name) ||
						(appointment.status == 'Phone conference' &&
						appointment.billingStatus == 'To be Billed' && // and
							appointment.contractors == name) ||
						(appointment.status == 'Phone Conference' &&
						appointment.billingStatus == 'Waiting for information' && // and
							appointment.contractors == name) ||
						(appointment.status == 'Double Booked' &&
						appointment.billingStatus == 'To be Billed' && // and
							appointment.contractors == name) ||
						(appointment.status == 'Double booked' &&
						appointment.billingStatus == 'Waiting for information' && // and
							appointment.contractors == name) ||
						(appointment.status == 'Rescheduled not notified' &&
						appointment.billingStatus == 'To be Billed' && // and
							appointment.contractors == name) ||
						(appointment.status == 'Rescheduled not notified' &&
						appointment.billingStatus == 'Waiting for information' && // and
							appointment.contractors == name) ||
						(appointment.status == 'Late cancellation' &&
						appointment.billingStatus == 'To be Billed' && // and
							appointment.contractors == name) ||
						(appointment.status == 'Late cancellation' &&
						appointment.billingStatus == 'Waiting for information' && // and
							appointment.contractors == name)
					);
				});
				return completed;
			})
			.then((res) => {
				let apptToBill = res.sort(function(a, b) {
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

				return apptToBill;
			})
			.then((res) => {
				const prices = [];
				res.forEach((appointment) => {
					const apptDate = moment(appointment.apptDate).utc().format('YYYY-MM-DD');
					const apptTime = moment(appointment.apptTime, 'HH:mm').format('HH:mm');
					const formatApptTime = moment(appointment.apptTime, 'HH:mm').format('hh:mm a');
					const endTime = moment(appointment.endTime, 'HH:mm').format('HH:mm');
					const formatendTime = moment(appointment.endTime, 'HH:mm').format('hh:mm a');
					const finalTime = endTime + ' ' + '(' + formatendTime + ')';
					const dateTime = moment(apptDate).format('L') + ' ' + apptTime + ' ' + '(' + formatApptTime + ')';

					// Functions to handle calculating the total price of the table
					const price = this.getSum(appointment.contractorPrice, appointment.additionalCost);
					prices.push(price);
					const b = prices.map(Number);
					const TotalPrice = b.reduce(this.getSum);
					console.log({ TotalPrice });
					this.setState({
						TotalToBeBilled: TotalPrice
					});
					this.state.toBeBilled.push({
						date: dateTime,
						// endtime: finalTime,
						caseName: `${appointment.refName.charAt(0).toUpperCase() + appointment.refName.slice(1)}`,
						language: appointment.language,
						contractor: appointment.contractors,
						status: `${appointment.status}`,
						price: this.getSum(appointment.contractorPrice, appointment.additionalCost),
						clickEvent: this.loadModal(appointment._id)
					});
				});
			})
			.catch((err) => console.log(err));
	};
	/**Toggle function for opening and closing the Modal */
	toggleInvoice = () => {
		this.setState({
			invoiceModal: !this.state.invoiceModal
		});
	};
	/**Loads appropriate form with specific dataset information pulled from loadModal function */
	renderModal() {
		if (!this.state.invoiceModal) {
			return null;
		}
		const { recipient, Length, connection } = this.state.appointment;
		const { appointment } = this.state;

		return (
			<div>
				<ApptInvoiceProfile
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
					billingStatus={appointment.billingStatus}
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
					// modalId='apptModal'
					modal={this.state.invoiceModal}
					toggle={this.toggleInvoice}
					modalNumber={this.state.modalNumber}
					loadAppointments={this.props.loadAppointments}
					loadAppointmentsReload={this.loadAppointments}
					loadContractor={this.props.loadContractor}
					toggleContractorClose={this.props.toggleContractorClose}
					loadBilled={this.loadBilled}
					loadToBeBilled={this.loadToBeBilled}
					conID={this.props.id}
				/>
			</div>
		);
	}

	/**Loads Modal with specific data set , locates using the  MongDB id  */
	loadModal = (id) => () => {
		this.loadAppointment(id);
	};
	loadAppointment = (id) => {
		API.getAppt(id)
			.then((res) => {
				this.setState({
					appointment: res.data,
					invoiceModal: !this.state.invoiceModal
				});
			})
			.catch((err) => console.log(err));
	};
	/** Function for handling selection of the language  */
	handleLangaugeChange = (value) => {
		this.setState({
			language: value
		});
	};

	/**Add final total for Phone conference with optional fees  */
	addTotal = (price, ContractorMinimum) => {
		let a = price;
		let b = ContractorMinimum;
		let c = parseFloat(a) * parseFloat(b);
		return c;
	};

	/** Function for handling select change for Contractor type input */
	handleCertTypeChange = (value) => {
		this.setState({
			type: value
		});
	};

	/** Function for handling select change for contractor standing input */
	handleStandingChange = (value) => {
		this.setState({
			standing: value
		});
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
		const { toBeBilled, Total, firstDate, secondDate, Billed, activeItem } = this.state;
		const FirstDate = moment(firstDate).format('YYYY-MM-DD');
		const SecondDate = moment(secondDate).format('YYYY-MM-DD');
		switch (activeItem) {
			case '1':
				// const FirstDate = moment(firstDate).format('YYYY-MM-DD');
				// const SecondDate = moment(secondDate).format('YYYY-MM-DD');
				const dateRangeToBeBilled = toBeBilled.filter(function(appointment) {
					const AapptDate = appointment.date;
					console.log({ AapptDate });
					if (moment(AapptDate).isBetween(FirstDate, SecondDate) == true) {
						return appointment;
					}
				});
				const prices = [];

				dateRangeToBeBilled.forEach((appointment) => {
					// Functions to handle calculating the total price of the table
					const price = appointment.price;
					prices.push(price);
					const b = prices.map(Number);
					const TotalPrice = b.reduce(this.getSum);
					console.log({ TotalPrice });
					this.setState({
						TotalToBeBilled: TotalPrice
					});
				});

				let apptToBill = dateRangeToBeBilled.sort(function(a, b) {
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
					toBeBilled: apptToBill
				});
			case '2':
				// const FirstDate = moment(firstDate).format('YYYY-MM-DD');
				// const SecondDate = moment(secondDate).format('YYYY-MM-DD');
				const dateRangeBilled = Billed.filter(function(appointment) {
					const AapptDate = appointment.date;
					console.log({ AapptDate });
					if (moment(AapptDate).isBetween(FirstDate, SecondDate) == true) {
						return appointment;
					}
				});
				const pricesBilled = [];

				dateRangeBilled.forEach((appointment) => {
					// Functions to handle calculating the total price of the table
					const price = appointment.price;
					pricesBilled.push(price);
					const billed = pricesBilled.map(Number);
					const TotalBilledPrice = billed.reduce(this.getSum, 0);
					console.log({ TotalBilledPrice });
					this.setState({
						TotalBilled: TotalBilledPrice
					});
				});
				let apptBilled = dateRangeBilled.sort(function(a, b) {
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
					Billed: apptBilled
				});
		}
	};

	/**Function to update the Contractor information in the database */
	updateDB = () => {
		API.updateContractor(this.state.id, {
			contractorFirst: this.state.conFirst,
			contractorLast: this.state.conLast,
			contractorPhone: this.state.conPhone,
			contractorOtherPhone: this.state.secondary,
			contractorEmail: this.state.email,
			contractorLanguage: this.state.language,
			certification: this.state.certification,
			certificationNumber: this.state.certificationNumber,
			pricing: this.state.pricing,
			totalPrice: this.addTotal(this.state.pricing, this.state.minimum),
			minimum: this.state.minimum,
			notes: this.state.notes,
			type: this.state.type,
			standing: this.state.standing,
			locationName: this.state.locationName,
			address: this.state.address,
			city: this.state.city,
			state: this.state.state,
			postalCode: this.state.zipCode,
			w9: this.state.w9
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

	/**Function to delete the Contractor from the database */
	DeleteContractor = () => {
		API.deleteContractor(this.state.id).then(this.props.toggle).then(this.reLoad);
	};

	// Handles the update field function
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
	/**Toggle function for displaying the "Close" or "Save" Button */
	toggleCloseButton = (disabled) => {
		// console.log({ disabled });
		switch (disabled) {
			case false:
				return (
					<MDBBtn className='float-right black-text' color='blue-grey' size='md' onClick={this.toggleEdit}>
						Cancel
					</MDBBtn>
				);

			case true:
				return (
					<MDBBtn className='float-right black-text' color='primary' onClick={this.toggleClose}>
						Close
					</MDBBtn>
				);
			default:
				return (
					<MDBBtn className='float-right black-text' color='primary' onClick={this.toggleClose}>
						Close
					</MDBBtn>
				);
		}
	};

	/**Toggle function for displaying the "Edit" or "Cancel" Button */
	toggleEditButton = (disabled) => {
		switch (disabled) {
			case true:
				return (
					<MDBBtn color='success' className='float-right black-text' onClick={this.toggleEdit}>
						<MDBIcon icon='pencil-alt' /> Edit
					</MDBBtn>
				);
				break;

			case false:
				return (
					<div>
						<MDBBtn className='float-right black-text' onClick={this.updateDB} size='md' color='primary'>
							Save
						</MDBBtn>

						<MDBBtn className='float-right black-text' color='danger' size='md' onClick={this.DeleteContractor}>
							Delete
						</MDBBtn>
					</div>
				);
		}
	};
	toggle = (tab) => () => {
		if (this.state.activeItem !== tab) {
			this.setState({
				activeItem: tab
			});
		}
	};

	/**Toggle function for changing Location Name title into input field */
	toggleLocationNameEdit = (disabled) => {
		switch (disabled) {
			case false:
				return (
					<MDBInput
						outline={this.state.outlined}
						name='locationName'
						value={this.state.locationName}
						label='Location'
						size='sm'
						disabled={disabled}
						type='text'
						onChange={this.handleInputChange}
					/>
				);
				break;
			case true:
				return (
					<MDBCardTitle className='info-color-dark text-white z-depth-2 text-center rounded' tag='h2' size='12'>
						{this.state.locationName}
					</MDBCardTitle>
				);
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

	/**Toggle function for displaying the "Editing" tag next to the window refname  */
	HeaderName = (disabled) => {
		switch (disabled) {
			case true:
				return this.state.conFirst + ' ' + this.state.conLast + ' Profile';
				break;
			case false:
				return this.state.conFirst + ' ' + this.state.conLast + ' (Editing)';
		}
	};

	/**Function for displaying the correct notfication flag  */
	notification = () => {
		const { notification } = this.state;
		if (notification === '200') {
			toast.success('Contractor Updated', {
				position: 'top-right'
			});
			this.setState({ notification: '' });
			console.log({ notification });
		}
		if (notification === '422') {
			toast.error('Error');
			this.setState({ notification: '' });
			console.log({ notification });
			//   this.setState({ notification: "" });
		}
	};

	render() {
		const {
			disabled,
			outlined,
			conFirst,
			conLast,
			conPhone,
			secondary,
			email,
			language,
			certification,
			certificationNumber,
			pricing,
			minimum,
			type,
			standing,
			locationName,
			address,
			city,
			state,
			zipCode,
			w9,
			notes
		} = this.state;
		this.notification();
		return (
			<MDBContainer>
				{/* MODAL */}
				{/* <MDBModal
					className='cascading-modal'
					isOpen={this.state.modal}
					backdrop={false}
					toggle={this.toggleClose}
					size='fluid'>
					<MDBModalHeader
						className='text-center stylish-color-dark text-white'
						titleClass='w-100'
						tag='h1'
						toggle={this.toggleClose}>
						{this.HeaderName(disabled)}
					</MDBModalHeader> */}
				{/* <PrintProvider>
						<Print single name='foo'>
							<MDBModalBody> */}
				<MDBContainer>
					<MDBCardTitle className='z-depth-2 text-center info-color-dark rounded text-white' tag='h2' size='12'>
						Contractor Details
					</MDBCardTitle>
					{/**General information about contractor  */}
					<MDBRow center>
						<MDBCol lg='6' md='6'>
							<MDBInput
								outline={outlined}
								name='conFirst'
								value={conFirst}
								label='First'
								disabled={disabled}
								size='sm'
								type='text'
								onChange={this.handleInputChange}
							/>
						</MDBCol>

						<MDBCol lg='6' md='6'>
							<MDBInput
								outline={outlined}
								name='conLast'
								value={conLast}
								label='Last'
								disabled={disabled}
								size='sm'
								type='text'
								onChange={this.handleInputChange}
							/>
						</MDBCol>

						<MDBCol md='6'>
							<MDBInput
								outline={outlined}
								name='conPhone'
								value={this.formatPhoneNumber(conPhone)}
								label='Phone'
								disabled={disabled}
								size='sm'
								onChange={this.handleInputChange}
							/>
						</MDBCol>

						<MDBCol md='6'>
							<MDBInput
								outline={outlined}
								name='secondary'
								disabled={disabled}
								label='Secondary'
								value={this.formatPhoneNumber(secondary)}
								type='text'
								onChange={this.handleInputChange}
							/>
						</MDBCol>

						<MDBCol md='6'>
							<MDBInput
								name='email'
								outline={outlined}
								value={email}
								disabled={disabled}
								label='Email'
								type='email'
								onChange={this.handleInputChange}
							/>
						</MDBCol>

						<MDBCol md='6'>
							<MDBSelect
								outline={outlined}
								name='type'
								multiple
								value={type}
								label='Type'
								options={this.state.optionsType}
								selected={type}
								disabled={disabled}
								getTextContent={this.handleCertTypeChange}
							/>
						</MDBCol>

						<MDBCol md='6'>
							<MDBInput
								outline={outlined}
								name='certification'
								disabled={disabled}
								label='Certified'
								checked={certification}
								type='checkbox'
								id='checkbox1'
								onChange={this.handleInputChange}
							/>
						</MDBCol>

						<MDBCol md='6'>
							<MDBInput
								name='certificationNumber'
								outline={outlined}
								value={certificationNumber}
								label='Certification Number'
								disabled={disabled}
								size='sm'
								type='text'
								onChange={this.handleInputChange}
							/>
						</MDBCol>

						<MDBCol lg='6' md='6'>
							<MDBSelect
								search
								options={this.state.optionsLanguage}
								value={language}
								getTextContent={this.handleLangaugeChange}
								selected={language}
							/>
						</MDBCol>

						<MDBCol lg='6' md='6'>
							<MDBSelect
								outline={outlined}
								name='standing'
								value={standing}
								label='Standing'
								options={this.state.optionsStanding}
								selected={standing}
								disabled={disabled}
								getTextContent={this.handleStandingChange}
							/>
						</MDBCol>

						<MDBCol lg='10' md='12'>
							<MDBInput
								outline={outlined}
								name='notes'
								label='Notes'
								value={notes}
								disabled={disabled}
								size='sm'
								type='textarea'
								rows='2'
								icon='pencil-alt'
								onChange={this.handleInputChange}
							/>
						</MDBCol>
					</MDBRow>
					<MDBRow>
						<MDBCol md='12'>
							<br />
							<br />
							<MDBNav tabs className='nav-justified blue-gradient'>
								<MDBNavItem>
									<MDBNavLink
										to='#'
										className={this.state.activeItem === '1' ? 'active' : ''}
										onClick={this.toggle('1')}
										role='tab'>
										<i class='fas fa-file-invoice' /> To be Billed
									</MDBNavLink>
								</MDBNavItem>
								<MDBNavItem>
									<MDBNavLink
										to='#'
										className={this.state.activeItem === '2' ? 'active' : ''}
										onClick={this.toggle('2')}
										role='tab'>
										<i class='fas fa-file-invoice-dollar' /> Billed
									</MDBNavLink>
								</MDBNavItem>
							</MDBNav>
							<MDBTabContent className='card' activeItem={this.state.activeItem}>
								<MDBTabPane tabId='1' role='tabpanel'>
									<Payroll
										loadDateRange={this.loadDateRange}
										getFirstDate={this.getFirstDate}
										getSecondDate={this.getSecondDate}
										appointments={this.state.toBeBilled}
										Total={this.state.TotalToBeBilled}
									/>
								</MDBTabPane>
								<MDBTabPane tabId='2' role='tabpanel'>
									<Payroll
										loadDateRange={this.loadDateRange}
										getFirstDate={this.getFirstDate}
										getSecondDate={this.getSecondDate}
										appointments={this.state.Billed}
										Total={this.state.TotalBilled}
									/>
								</MDBTabPane>
							</MDBTabContent>
						</MDBCol>
					</MDBRow>
					<br />
					<MDBCardTitle className='z-depth-2 text-center info-color-dark rounded text-white' tag='h2' size='12'>
						Billing Information
					</MDBCardTitle>
					<MDBRow center>
						<MDBCol size='4'>
							<MDBInput
								outline={outlined}
								name='w9'
								disabled={disabled}
								label='W-9'
								checked={w9}
								type='checkbox'
								id='checkbox2'
								onChange={this.handleInputChange}
							/>
						</MDBCol>
					</MDBRow>
					<MDBRow center>
						<MDBCol sm='3'>
							<MDBInput
								outline={outlined}
								disabled={disabled}
								name='pricing'
								label='Price'
								value={pricing}
								onChange={this.handleInputChange}
								type='number'
							/>
						</MDBCol>
						<MDBCol sm='1'>
							<MDBIcon icon='times' />
						</MDBCol>
						<MDBCol sm='3'>
							<MDBInput
								outline={outlined}
								disabled={disabled}
								name='minimum'
								value={minimum}
								onChange={this.handleInputChange}
								type='number'
								label='Minimum time'
							/>
						</MDBCol>

						<MDBCol sm='1'>
							<MDBIcon icon='equals' />
						</MDBCol>

						<MDBCol sm='3'>
							<MDBInput
								labelClass='active'
								name='total'
								value={this.addTotal(this.state.pricing, this.state.minimum)}
								label='Total'
								icon=''
							/>
						</MDBCol>
					</MDBRow>
					{this.toggleLocationNameEdit(disabled)}
					{/** Billing location for contractor */}
					<MDBRow>
						<MDBCol size='12'>
							<MDBInput
								outline={outlined}
								name='address'
								value={address}
								label='Street Address'
								size='sm'
								disabled={disabled}
								type='text'
								onChange={this.handleInputChange}
							/>
						</MDBCol>

						<MDBCol size='4'>
							<MDBInput
								outline={outlined}
								name='city'
								value={city}
								label='City'
								disabled={disabled}
								size='sm'
								type='text'
								onChange={this.handleInputChange}
							/>
						</MDBCol>

						<MDBCol size='4'>
							<MDBInput
								outline={outlined}
								name='state'
								value={state}
								label='State'
								disabled={disabled}
								size='sm'
								type='text'
							/>
						</MDBCol>

						<MDBCol size='4'>
							<MDBInput
								outline={outlined}
								name='zipCode'
								value={zipCode}
								label='Zip Code'
								disabled={disabled}
								size='sm'
								type='text'
								onChange={this.handleInputChange}
							/>
						</MDBCol>
					</MDBRow>
					<MDBRow>
						<MDBCol className='float-right'>
							{/* Should Edit or cancel changes button be Displayed? */}
							{this.toggleEditButton(disabled)}
							{/* Should Close or Save button be Displayed? */}
							{this.toggleCloseButton(disabled)}
						</MDBCol>
					</MDBRow>
				</MDBContainer>

				{/* </Print>
					</PrintProvider> */}
				{this.renderModal()}

				<ToastContainer hideProgressBar={true} newestOnTop={true} autoClose={5000} />
			</MDBContainer>
		);
	}
}

export default ModalProfile;

/**Completed by  {Tim Westberg, Paul Tamayo}, before making changes to this code please contact TimWestberg@formaulgen.com  */
