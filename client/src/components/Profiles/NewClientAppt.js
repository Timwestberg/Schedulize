import React, { Component } from 'react';
import {
	MDBContainer,
	MDBRow,
	MDBCol,
	MDBBtn,
	MDBIcon,
	MDBModal,
	MDBModalBody,
	MDBNav,
	MDBNavItem,
	MDBNavLink,
	MDBTabContent,
	MDBTabPane
} from 'mdbreact';
// import Form from "../Form/index";
import API from '../../utils/API';
import Input from '../UI/Input';
import NewAppointment from '../Form/ClientApptForm';
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
import './style.css';
import PhoneConference from '../Form/ClientPhoneForm';
class FormsModal extends Component {
	constructor(props) {
		super(props);
		this.state = {
			modal13: false,
			apptSave: false
		};
		this.toggle = this.toggle.bind(this);
	}
	targetElement = null;
	componentDidMount() {
		//     // 2. Get a target element that you want to persist scrolling for (such as a modal/lightbox/flyout/nav).
		this.targetElement = document.querySelector('#formsModal');
		// console.log(this.state.modal14);
	}

	// handleApptChange = (event, inputId) => {
	// 	const updatedApptForm = { ...this.state.apptForm };
	// 	const updatedFormElement = { ...updatedApptForm[inputId] };
	// 	updatedFormElement.value = event.target.value;
	// 	updatedApptForm[inputId] = updatedFormElement;
	// 	this.setState({ apptForm: updatedApptForm });
	// 	// console.log(this.state.apptForm);
	// };

	// handleDateChange = (date) => {
	// 	this.setState({
	// 		apptForm: {
	// 			...this.state.apptForm,
	// 			apptDate: {
	// 				elementType: 'DateTimePicker',
	// 				elementConfig: {
	// 					label: 'Appointment Date',
	// 					fullWidth: true,
	// 					variant: 'outlined'
	// 				},
	// 				value: date
	// 			}
	// 		}
	// 	});
	// };

	// apptFormSubmit = (event) => {
	// 	event.preventDefault();
	// 	const { apptForm } = this.state;

	// 	const formData = {};
	// 	for (let field in apptForm) {
	// 		formData[field] = apptForm[field].value;
	// 	}

	// 	API.saveAppt(formData).then((res) => {
	// 		console.log(`data: ${res.data}`);
	// 		// setTimeout(() => {
	// 		//   alert(`Appointment #${res.data._id} has been Saved`);
	// 		// }, 100);
	// 		const formData = {};
	// 		for (let field in apptForm) {
	// 			apptForm[field].value = '';
	// 			formData[field] = apptForm[field].value;
	// 		}
	// 		this.setState({
	// 			apptForm: { ...apptForm, formData },
	// 			apptSave: true
	// 		});
	// 	});
	// };

	reLoadAppts = () => {
		this.props.loadAppointments();
	};

	toggle = (nr) => () => {
		let modalNumber = 'modal' + nr;

		if (this.state.modal13 === false) {
			this.setState({
				[modalNumber]: true
			});
			console.log('opened Follow up');
			//   this.showTargetElement();
			// disableBodyScroll(this.targetElement);
		}
		if (this.state.modal13 === true) {
			this.setState({
				[modalNumber]: false
			});
			// this.reLoadAppts();
			//   this.hideTargetElement();
			// enableBodyScroll(this.targetElement);
		}
	};

	toggleTab(tab) {
		if (this.state.activeItem !== tab) {
			this.setState({
				activeItem: tab
			});
		}
	}

	//   showTargetElement = () => {
	//     // ... some logic to show target element
	//     // 3. Disable body scroll
	//     disableBodyScroll(this.targetElement);
	//   };

	//   hideTargetElement = () => {
	//     // ... some logic to hide target element

	//     // 4. Re-enable body scroll
	//     enableBodyScroll(this.targetElement);
	//   };
	componentWillUnmount() {
		// 5. Useful if we have called disableBodyScroll for multiple target elements,
		// and we just want a kill-switch to undo all that.
		// OR useful for if the `hideTargetElement()` function got circumvented eg. visitor
		// clicks a link which takes him/her to a different page within the app.
		clearAllBodyScrollLocks();
	}

	render() {
		const { contrForm } = this.state;

		const {
			assigneeFirst,
			assigneeLast,
			assigneeCompany,
			assigneePhone,
			billingContactName,
			billingPhone,
			billingEmail,
			billingLocationName,
			billingAddress,
			billingState,
			billingCity,
			billingZipcode
		} = this.props;
		// console.log(assigneeFirst);
		// if (this.state.modal14 === true) {
		//   disableBodyScroll(this.targetElement);
		//   // document.body.style.overflow = "hidden";
		// } else if (this.state.modal14 === false) {
		//   enableBodyScroll(this.targetElement);
		//   //   document.body.style.overflow = "visible";
		// }
		return (
			<div>
				<MDBBtn outline onClick={this.toggle(13)} to={window.location.pathname} color='warning'>
					New Appointment
				</MDBBtn>
				<MDBModal id='formsModal' isOpen={this.state.modal13} toggle={this.toggle(13)} centered size='lg'>
					<MDBNav
						tabs
						color='info'
						className='md-tabs nav-justified tabs-2 text-white'
						style={{ margin: '-1.5rem 1rem 0 1rem' }}>
						<MDBNavItem>
							<MDBNavLink
								className={this.state.activeItem === 1 ? 'active' : ''}
								to='#'
								onClick={() => {
									this.toggleTab(1);
								}}>
								<MDBIcon icon='user' />
								<h6>Follow Up</h6>
							</MDBNavLink>
						</MDBNavItem>
						<MDBNavItem>
							<MDBNavLink
								className={this.state.activeItem === 2 ? 'active' : ''}
								to='#'
								onClick={() => {
									this.toggleTab(2);
								}}>
								<MDBIcon icon='phone-volume' className='mr-1' />
								<h6>Phone Conference</h6>
							</MDBNavLink>
						</MDBNavItem>
					</MDBNav>
					<MDBTabContent activeItem={this.state.activeItem} className='pb-0'>
						<MDBTabPane tabId={1}>
							<MDBModalBody className='mx-0'>
								<NewAppointment
									toggle={this.toggle}
									current='Appointment'
									forms={this.state}
									change={this.handleApptChange}
									submit={this.apptFormSubmit}
									assigneeFirst={assigneeFirst}
									assigneeLast={assigneeLast}
									assigneeCompany={assigneeCompany}
									assigneePhone={assigneePhone}
									billingContactName={billingContactName}
									billingPhone={billingPhone}
									billingEmail={billingEmail}
									billingLocationName={billingLocationName}
									billingAddress={billingAddress}
									billingState={billingState}
									billingCity={billingCity}
									billingZipcode={billingZipcode}
									// loadAppointments={this.props.loadAppointments}
								/>
							</MDBModalBody>
						</MDBTabPane>
						<MDBTabPane tabId={2}>
							<MDBModalBody className='mx-0'>
								<PhoneConference
									toggle={this.toggle}
									current='Appointment'
									forms={this.state}
									change={this.handleApptChange}
									submit={this.apptFormSubmit}
									assigneeFirst={assigneeFirst}
									assigneeLast={assigneeLast}
									assigneeCompany={assigneeCompany}
									assigneePhone={assigneePhone}
									billingContactName={billingContactName}
									billingPhone={billingPhone}
									billingEmail={billingEmail}
									billingLocationName={billingLocationName}
									billingAddress={billingAddress}
									billingState={billingState}
									billingCity={billingCity}
									billingZipcode={billingZipcode}
									// loadAppointments={this.props.loadAppointments}
								/>
							</MDBModalBody>
						</MDBTabPane>
					</MDBTabContent>
				</MDBModal>
			</div>
		);
	}
}

export default FormsModal;
