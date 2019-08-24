// import React, { Fragment, Component } from 'react';
// import { MDBCollapse, MDBCard, MDBCollapseHeader } from 'mdbreact';
// import TabOptions from '../PanelBody/index';
// import style from './style.css';
// import moment from 'moment';
// import { red } from '@material-ui/core/colors';

// class CollapsePage extends Component {
// 	constructor(props) {
// 		super(props);
// 		this.state = {
// 			collapseID: this.props.collapseID,
// 			selectedContractor: this.props.selectedContractor,
// 			NewAppointments: []
// 		};
// 	}

// 	/**Function to open/collapse the accodion depending on which  one is already opened | used appointment Id as collapse id to handle having a long list of new appointments  */
// 	toggleCollapse = (collapseID) => () => {
// 		this.props.toggleAccordian(collapseID);
// 	};

// 	componentDidMount() {
// 		this.seperateNewAppts();
// 	}

// 	accordianColor = (status) => {
// 		switch (status) {
// 			case 'New Appointment':
// 				return 'w-100 info-color';
// 			case 'Waiting for information':
// 				return 'w-100 danger-color';
// 			case 'Waiting for Authorization':
// 				return 'w-100 warning-color';
// 		}
// 	};

// 	seperateNewAppts = () => {
// 		const newAppointments = this.props.appointments.filter(function(appointment) {
// 			return (
// 				appointment.status == 'New Appointment' ||
// 				appointment.status == 'Waiting for information' ||
// 				appointment.status == 'Waiting for Authorization'
// 			);
// 		});

// 		const newAppts = newAppointments.sort(function(a, b) {
// 			const AapptDate = moment(a.apptDate).utc().format('YYYY-MM-DD');
// 			const BapptDate = moment(b.apptDate).utc().format('YYYY-MM-DD');
// 			const AapptTime = moment(a.apptTime, 'HH:mm').format('hh:mm:ss');
// 			const BapptTime = moment(b.apptTime, 'HH:mm').format('hh:mm:ss');
// 			const AdateTime = moment(AapptDate + 'T' + AapptTime).format();
// 			const BdateTime = moment(BapptDate + 'T' + BapptTime).format();

// 			const x = new Date(AdateTime),
// 				y = new Date(BdateTime);
// 			return x > y ? 1 : -1;
// 		});
// 		this.setState({
// 			NewAppointments: newAppts
// 		});
// 	};

// 	render() {
// 		const contractorName = this.props.contractorName;
// 		const phone = this.props.phone;
// 		const contractorCert = this.props.contractorCert;
// 		const price = this.props.price;
// 		const minimumRequired = this.props.minimumRequired;
// 		const collapseID = this.props.collapseID;
// 		// console.log({ collapseID });
// 		// console.log(this.props.toggleAccordian);

// 		return (
// 			<Fragment>
// 				{this.state.NewAppointments.map((appointment, idx) => (
// 					<MDBCard className='mt-3'>
// 						{/** Have to format the date and times using 'moment' , when coming into the application */}
// 						<MDBCollapseHeader
// 							className={this.accordianColor(appointment.status)}
// 							onClick={this.toggleCollapse(appointment._id)}>
// 							{moment(appointment.apptDate).utc().format('dddd MMM Do YYYY')} |{' '}
// 							{moment(appointment.apptTime, 'HH:mm').format('hh:mm a')} | {appointment.refName} |{' '}
// 							{appointment.city}
// 							<i
// 								className={collapseID === appointment._id ? 'fa fa-angle-down rotate-icon' : 'fa fa-angle-down'}
// 							/>
// 						</MDBCollapseHeader>

// 						<MDBCollapse id={appointment._id} isOpen={collapseID}>
// 							{/** Side nav panel for holding the tab view for appointments | Pass down props from here  */}
// 							<TabOptions
// 								markerType={appointment.markerType}
// 								loadAppointments={this.props.loadAppointments}
// 								dateAssigned={appointment.dateAssigned}
// 								apptDate={appointment.apptDate}
// 								apptTime={appointment.apptTime}
// 								endTime={appointment.endTime}
// 								assigneeFirst={appointment.assigneeFirst}
// 								assigneeLast={appointment.assigneeLast}
// 								assigneeCompany={appointment.assigneeCompany}
// 								assigneePhone={appointment.assigneePhone}
// 								adjusterFirst={appointment.adjusterFirst}
// 								adjusterLast={appointment.adjusterLast}
// 								adjusterPhone={appointment.adjusterPhone}
// 								adjusterCompany={appointment.adjusterCompany}
// 								refName={appointment.refName}
// 								refNumber={appointment.refNumber}
// 								doi={appointment.doi}
// 								dob={appointment.dob}
// 								litigated={appointment.litigated}
// 								notes={appointment.notes}
// 								language={appointment.language}
// 								assignmentType={appointment.assignmentType}
// 								locationName={appointment.locationName}
// 								address={appointment.address}
// 								city={appointment.city}
// 								state={appointment.state}
// 								postalCode={appointment.postalCode}
// 								name={appointment.refName}
// 								id={appointment._id}
// 								contractors={appointment.contractors}
// 								conCert={appointment.ConCert}
// 								conPhone={appointment.conPhone}
// 								appointmentPrice={appointment.appointmentPrice}
// 								contractorPrice={appointment.contractorPrice}
// 								additionalCost={appointment.additionalCost}
// 								status={appointment.status}
// 								billingContactName={appointment.billingContactName}
// 								billingPhone={appointment.billingPhone}
// 								ApptMinimum={appointment.ApptMinimum}
// 								contractorMinimum={appointment.contractorMinimum}
// 								billingEmail={appointment.billingEmail}
// 								billingLocationName={appointment.billingLocationName}
// 								billingAddress={appointment.billingAddress}
// 								billingState={appointment.billingState}
// 								billingCity={appointment.billingCity}
// 								billingZipcode={appointment.billingZipcode}
// 								contractorCert={contractorCert}
// 								contractorPhone={phone}
// 								seperateNewAppts={this.seperateNewAppts}
// 								contractorName={contractorName}
// 								price={price}
// 								minimumRequired={minimumRequired}
// 							/>
// 						</MDBCollapse>
// 					</MDBCard>
// 				))}
// 			</Fragment>
// 		);
// 	}
// }

// export default CollapsePage;
import React, { Fragment, Component } from 'react';
import { MDBCollapse, MDBCard, MDBCollapseHeader } from 'mdbreact';
import TabOptions from '../PanelBody/index';
import style from './style.css';
import moment from 'moment';
import { red } from '@material-ui/core/colors';

class CollapsePage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			collapseID: this.props.collapseID,
			selectedContractor: this.props.selectedContractor,
			NewAppointments: []
		};
	}

	/**Function to open/collapse the accodion depending on which  one is already opened | used appointment Id as collapse id to handle having a long list of new appointments  */
	toggleCollapse = (collapseID) => () => {
		this.props.toggleAccordian(collapseID);
	};

	componentDidMount() {
		this.seperateNewAppts();
	}

	accordianColor = (status) => {
		switch (status) {
			case 'New Appointment':
				return 'w-100 info-color';
			case 'Waiting for information':
				return 'w-100 danger-color';
			case 'Waiting for Authorization':
				return 'w-100 warning-color';
		}
	};

	seperateNewAppts = () => {
		const newAppointments = this.props.appointments.filter(function(appointment) {
			return (
				appointment.status == 'New Appointment' ||
				appointment.status == 'Waiting for information' ||
				appointment.status == 'Waiting for Authorization'
			);
		});

		const newAppts = newAppointments.sort(function(a, b) {
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
			NewAppointments: newAppts
		});
	};

	render() {
		const contractorName = this.props.contractorName;
		const phone = this.props.phone;
		const contractorCert = this.props.contractorCert;
		const price = this.props.price;
		const minimumRequired = this.props.minimumRequired;
		const collapseID = this.props.collapseID;
		// console.log({ collapseID });
		// console.log(this.props.toggleAccordian);

		return (
			<Fragment>
				{this.state.NewAppointments.map((appointment, idx) => (
					<MDBCard className='mt-3'>
						{/** Have to format the date and times using 'moment' , when coming into the application */}
						<MDBCollapseHeader
							className={this.accordianColor(appointment.status)}
							onClick={this.toggleCollapse(appointment._id)}>
							{moment(appointment.apptDate).utc().format('dddd MMM Do YYYY')} |{' '}
							{moment(appointment.apptTime, 'HH:mm').format('hh:mm a')} | {appointment.refName} |{' '}
							{appointment.city}
							<i
								className={collapseID === appointment._id ? 'fa fa-angle-down rotate-icon' : 'fa fa-angle-down'}
							/>
						</MDBCollapseHeader>

						<MDBCollapse id={appointment._id} isOpen={collapseID}>
							{/** Side nav panel for holding the tab view for appointments | Pass down props from here  */}
							<TabOptions
								markerType={appointment.markerType}
								loadAppointments={this.props.loadAppointments}
								repName={appointment.repName}
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
								conCert={appointment.ConCert}
								conPhone={appointment.conPhone}
								appointmentPrice={appointment.appointmentPrice}
								contractorPrice={appointment.contractorPrice}
								additionalCost={appointment.additionalCost}
								status={appointment.status}
								billingContactName={appointment.billingContactName}
								billingPhone={appointment.billingPhone}
								ApptMinimum={appointment.ApptMinimum}
								contractorMinimum={appointment.contractorMinimum}
								billingEmail={appointment.billingEmail}
								billingLocationName={appointment.billingLocationName}
								billingAddress={appointment.billingAddress}
								billingState={appointment.billingState}
								billingCity={appointment.billingCity}
								billingZipcode={appointment.billingZipcode}
								contractorCert={contractorCert}
								contractorPhone={phone}
								seperateNewAppts={this.seperateNewAppts}
								contractorName={contractorName}
								price={price}
								minimumRequired={minimumRequired}
							/>
						</MDBCollapse>
					</MDBCard>
				))}
			</Fragment>
		);
	}
}

export default CollapsePage;
