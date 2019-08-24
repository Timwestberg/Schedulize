import React, { Component } from 'react';
import Payroll from '../components/Tables/payrollTable';
import API from '../utils/API';
import PrintProvider, { Print, NoPrint } from 'react-easy-print';
import ApptInvoiceProfile from '../components/ApptInvoiceProfile/index';
import {
	MDBContainer,
	MDBRow,
	MDBCol,
	MDBBtn,
	MDBTabPane,
	MDBTabContent,
	MDBNav,
	MDBNavItem,
	MDBNavLink,
	MDBIcon
} from 'mdbreact';
import moment from 'moment';
class TabsPage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			activeItem: '1',
			appointments: this.props.appointments,
			modal1: false,
			modal2: false,
			invoiceModal: false,
			client: [],
			toBeBilled: [],
			Billed: [],
			prices: [],
			firstDate: '',
			secondDate: '',
			TotalBilled: 0,
			TotalToBeBilled: 0
		};

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
	toggleClientClose = () => {
		this.setState({
			modal1: !this.state.modal1
		});
		this.props.loadClients();
	};

	/**Toggle function for opening and closing the Modal */
	toggleContractorClose = () => {
		this.setState({
			modal2: !this.state.modal2
		});
		this.props.loadContractors();
	};
	loadClient = (id) => () => {
		this.loadClientModal(id);
	};

	loadContractor = (id) => () => {
		this.loadContractorModal(id);
	};
	/**
   * Using API to load information from MONGODB |
   * Appointment infromation |
   * Handles geocoding address*/
	loadClientModal = (id) => {
		API.getClient(id)
			.then((res) => {
				this.setState({
					client: res.data,
					modal1: !this.state.modal1
				});
			})
			.catch((err) => console.log(err));
	};

	/**Toggle functoin for changing Location Name title into input field */
	// toggleConPrint = (modal) => {
	// 	switch (modal) {
	// 		case false:
	// 			return (
	// 				<Print single name='foo'>
	// 					<Payroll appointments={this.state.billed} />
	// 				</Print>
	// 			);
	// 		case true:
	// 			return <Contractors contractors={this.state.contractorData} />;
	// 	}
	// };

	/**
   * Using API to load information from MONGODB |
   * Appointment infromation |
   * Handles geocoding address*/
	loadContractorModal = (id) => {
		API.getContractor(id)
			.then((res) => {
				this.setState({
					contractor: res.data,
					modal2: !this.state.modal2
				});
			})
			.catch((err) => console.log(err));
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

	toggle = (tab) => () => {
		if (this.state.activeItem !== tab) {
			this.setState({
				activeItem: tab
			});
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
		const { toBeBilled, Total, firstDate, secondDate, Billed, activeItem } = this.state;
		const FirstDate = moment(firstDate).format('YYYY-MM-DD');
		const SecondDate = moment(secondDate).format('YYYY-MM-DD');
		switch (activeItem) {
			case '1':
				const dateRangeToBeBilled = toBeBilled.filter(function(appointment) {
					const AapptDate = appointment.date;
					// console.log({ AapptDate });
					if (moment(AapptDate).isBetween(FirstDate, SecondDate) == true) {
						return appointment;
					}
				});
				const prices = [];

				dateRangeToBeBilled.forEach((appointment) => {
					// Functions to handle calculating the total price of the table
					const price = appointment.price;
					console.log({ price });
					prices.push(price);
					const b = prices.map(Number);
					const TotalPrice = b.reduce(this.getSum);
					// console.log({ TotalPrice });
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
					const TotalBilledPrice = billed.reduce(this.getSum);
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
	/**function for converting the boolean to a string answer for table */
	ChangeCertBooleanToString = (certified) => {
		switch (certified) {
			case true:
				return 'Yes';

			case false:
				return 'No';

			default:
				return 'No';
		}
	};

	// // with initial value to avoid when the array is reload

	// addTotal = () => {
	// 	const sum = this.state.prices.reduce(this.add, 0);

	// 	this.setState({
	// 		Total: sum
	// 	});
	// 	// console.log(sum);
	// };
	// add(accumulator, a) {
	// 	return accumulator + a;
	// }
	/**Load contractor information to place in data array, must load data this way to avoid duplicating when using the print function, this also seems the best way to spot function from running everytime table is rerendered */
	loadBilled = () => {
		// const { appointments } = this.state;
		const billed = this.props.appointments.filter(function(appointment) {
			return (
				appointment.billingStatus == 'Billed' ||
				appointment.billingStatus == 'Late cancellation' ||
				appointment.billingStatus == 'No show' ||
				appointment.billingStatus == 'Office mistake' ||
				appointment.billingStatus == 'Rescheduled not notified' ||
				appointment.billingStatus == 'Double booked'
			);
		});

		let apptBilled = billed.sort(function(a, b) {
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
		const prices = [];
		apptBilled.forEach((appointment) => {
			// console.log(appointment.status);
			const apptDate = moment(appointment.apptDate).format('YYYY-MM-DD');
			const apptTime = moment(appointment.apptTime, 'HH:mm').format('HH:mm');
			const formatApptTime = moment(appointment.apptTime, 'HH:mm').format('hh:mm a');
			const endTime = moment(appointment.endTime, 'HH:mm').format('HH:mm');
			const formatendTime = moment(appointment.endTime, 'HH:mm').format('hh:mm a');
			const finalTime = endTime + ' ' + '(' + formatendTime + ')';
			const dateTime = moment(apptDate).format('L') + ' ' + apptTime + ' ' + '(' + formatApptTime + ')';

			// Functions to handle calculating the total price of the table
			const price = <div>{appointment.contractorPrice}</div>;
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
	};
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
	getSum(total, num) {
		return parseInt(total) + parseInt(num);
	}
	/**Load client information to place in data array, must load data this way to avoid duplicating when using the print function, this also seems the best way to spot function from running everytime table is rerendered */
	loadToBeBilled = () => {
		const completed = this.props.appointments.filter(function(appointment) {
			return (
				(appointment.status == 'Completed/Show' && appointment.billingStatus == 'To be Billed') ||
				(appointment.status == 'Completed/Show' && appointment.billingStatus == 'Waiting for information') ||
				(appointment.status == 'No Show' && appointment.billingStatus == 'To be Billed') ||
				(appointment.status == 'No Show' && appointment.billingStatus == 'Waiting for information') ||
				(appointment.status == 'Phone conference' && appointment.billingStatus == 'To be Billed') ||
				(appointment.status == 'Phone Conference' && appointment.billingStatus == 'Waiting for information') ||
				(appointment.status == 'Double Booked' && appointment.billingStatus == 'To be Billed') ||
				(appointment.status == 'Double booked' && appointment.billingStatus == 'Waiting for information') ||
				(appointment.status == 'Rescheduled not notified' && appointment.billingStatus == 'To be Billed') ||
				(appointment.status == 'Rescheduled not notified' &&
					appointment.billingStatus == 'Waiting for information') ||
				(appointment.status == 'Late cancellation' && appointment.billingStatus == 'To be Billed') ||
				(appointment.status == 'Late cancellation' && appointment.billingStatus == 'Waiting for information')
			);
		});

		let apptToBill = completed.sort(function(a, b) {
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
		const prices = [];

		apptToBill.forEach((appointment) => {
			const apptDate = moment(appointment.apptDate).format('YYYY-MM-DD');
			const apptTime = moment(appointment.apptTime, 'HH:mm').format('HH:mm');
			const formatApptTime = moment(appointment.apptTime, 'HH:mm').format('hh:mm a');
			const endTime = moment(appointment.endTime, 'HH:mm').format('HH:mm');
			const formatendTime = moment(appointment.endTime, 'HH:mm').format('hh:mm a');
			const finalTime = endTime + ' ' + '(' + formatendTime + ')';
			const dateTime = moment(apptDate).format('L') + ' ' + apptTime + ' ' + '(' + formatApptTime + ')';

			// Functions to handle calculating the total price of the table
			const price = <div>{this.getSum(appointment.contractorPrice, appointment.additionalCost)}</div>;
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
				caseName: `${appointment.refName}`,
				language: appointment.language,
				contractor: appointment.contractors,
				status: `${appointment.status}`,
				price: this.getSum(appointment.contractorPrice, appointment.additionalCost),
				clickEvent: this.loadModal(appointment._id)
			});
		});
	};
	/**Toggle function for opening and closing the Modal */
	toggleInvoice = () => {
		this.setState({
			invoiceModal: !this.state.invoiceModal
		});
	};

	renderModal() {
		if (!this.state.invoiceModal) {
			return null;
		}
		const { recipient, Length, connection } = this.state.appointment;
		const { appointment } = this.state;

		return (
			<div>
				<ApptInvoiceProfile
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
					// modalId='apptModal'
					modal={this.state.invoiceModal}
					toggle={this.toggleInvoice}
					modalNumber={this.state.modalNumber}
					loadAppointments={this.props.loadAppointments}
				/>
			</div>
		);
	}

	render() {
		return (
			<MDBContainer className='mt-4' fluid>
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
									<i className='fas fa-file-invoice' /> To be Billed
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
				{this.renderModal()}
			</MDBContainer>
		);
	}
}

export default TabsPage;
