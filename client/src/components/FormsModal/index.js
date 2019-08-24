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
import ContrForm from '../Form/ContrForm';
import ApptForm from '../Form/ApptForm';
import ClientForm from '../Form/ClientForm';
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
import './style.css';
import PhoneConferenceForm from '../Form/PhoneConference';

class FormsModal extends Component {
	constructor(props) {
		super(props);
		this.state = {
			modal14: false,
			contractorSave: false,
			clientSave: false,
			apptSave: false,
			apptForm: {
				dateAssigned: {
					elementType: 'DatePicker',
					elementConfig: {
						label: 'Date Assigned',
						outlined: true
					},
					value: new Date()
				},
				apptDate: {
					elementType: 'DatePicker',
					elementConfig: {
						label: 'Appointment Date',
						outlined: true
					},
					value: ''
				},
				apptTime: {
					elementType: 'TimePicker',
					elementConfig: {
						label: 'Appointment Time',
						outlined: true
					},
					value: ''
				},
				endTime: {
					elementType: 'TimePicker',
					elementConfig: {
						label: 'Appointment Time',
						outlined: true
					},
					value: ''
				},
				assigneeFirst: {
					elementType: 'Input',
					elementConfig: {
						label: 'Assignee First Name',
						outlined: true
					},
					value: ''
				},
				assigneeLast: {
					elementType: 'Input',
					elementConfig: {
						label: 'Assignee Last Name',
						outlined: true
					},
					value: ''
				},
				assigneeCompany: {
					elementType: 'Input',
					elementConfig: {
						label: 'Assignee Company',
						outlined: true
					},
					value: ''
				},
				assigneePhone: {
					elementType: 'Input',
					elementConfig: {
						label: 'Assignee Phone #',
						outlined: true
					},
					value: ''
				},
				adjusterFirst: {
					elementType: 'Input',
					elementConfig: {
						label: 'Adjuster First Name',
						outlined: true
					},
					value: ''
				},
				adjusterLast: {
					elementType: 'Input',
					elementConfig: {
						label: 'Adjuster Last Name',
						outlined: true
					},
					value: ''
				},
				adjusterCompany: {
					elementType: 'Input',
					elementConfig: {
						label: 'Adjuster Company',
						outlined: true
					},
					value: ''
				},
				adjusterPhone: {
					elementType: 'Input',
					elementConfig: {
						label: 'Adjuster Phone #',
						outlined: true
					},
					value: ''
				},
				refName: {
					elementType: 'Input',
					elementConfig: {
						label: 'Reference Name',
						outlined: true
					},
					value: ''
				},
				refNumber: {
					elementType: 'Input',
					elementConfig: {
						label: 'Reference Number',
						outlined: true
					},
					name: 'refNumber',
					value: ''
				},
				doi: {
					elementType: 'Input',
					elementConfig: {
						label: 'DOI',
						outlined: true
					},
					name: 'refNumber',
					value: ''
				},
				dob: {
					elementType: 'Input',
					elementConfig: {
						label: 'DOB',
						outlined: true
					},
					name: 'refNumber',
					value: ''
				},
				litigated: {
					elementType: 'Input',
					elementConfig: {
						label: 'Reference Number',
						outlined: true
					},
					name: 'refNumber',
					value: ''
				},
				notes: {
					elementType: 'Input',
					elementConfig: {
						label: 'Notes',
						outlined: true
					},
					name: 'refNumber',
					value: ''
				},
				language: {
					elementType: 'Input',
					elementConfig: {
						label: 'Reference Number',
						outlined: true
					},
					name: 'refNumber',
					value: ''
				},
				assignmentType: {
					elementType: 'Input',
					elementConfig: {
						label: 'Reference Number',
						outlined: true
					},
					name: 'refNumber',
					value: ''
				},
				locationName: {
					elementType: 'Input',
					elementConfig: {
						label: 'Location Name',
						outlined: true
					},
					value: ''
				},
				address: {
					elementType: 'Input',
					elementConfig: {
						label: 'Address',
						outlined: true
					},
					value: ''
				},
				city: {
					elementType: 'Input',
					elementConfig: {
						label: 'City',
						outlined: true
					},
					value: ''
				},
				state: {
					elementType: 'Input',
					elementConfig: {
						label: 'State',
						outlined: true
					},
					value: ''
				},
				postalCode: {
					elementType: 'Input',
					elementConfig: {
						label: 'Postal / Zip Code',
						outlined: true
					},
					value: ''
				}
			},
			contrForm: {
				contractorFirst: {
					elementType: 'Input',
					elementConfig: {
						label: 'Contractor First Name',
						outlined: true
					},
					value: ''
				},
				contractorLast: {
					elementType: 'Input',
					elementConfig: {
						label: 'Contractor Last Name',
						outlined: true
					},
					value: ''
				},
				contractorPhone: {
					elementType: 'Input',
					elementConfig: {
						label: 'Contractor Phone',
						outlined: true
					},
					value: ''
				},
				contractorOtherPhone: {
					elementType: 'Input',
					elementConfig: {
						label: 'Contractor Other Phone',
						outlined: true
					},
					value: ''
				},
				contractorEmail: {
					elementType: 'Input',
					elementConfig: {
						label: 'Contractor Email',
						outlined: true
					},
					value: ''
				},
				contractorLanguage: {
					elementType: 'Input',
					elementConfig: {
						label: 'Contractor Language',
						outlined: true
					},
					value: ''
				},
				certification: {
					elementType: 'MultiSelect',
					elementConfig: {
						label: 'Certification Type',
						outlined: true,
						selected: 'Certification Type',
						options: [
							{
								text: 'Option 1',
								value: 'one'
							},
							{
								text: 'Option 2',
								value: 'two'
							},
							{
								text: 'Option 3',
								value: 'three'
							},
							{
								text: 'Option 4',
								value: 'four'
							},
							{
								text: 'Option 5',
								value: 'five'
							}
						]
					},

					value: false
				},
				certificationNumber: {
					elementType: 'Input',
					elementConfig: {
						label: 'Certification #',
						outlined: true
					},
					value: ''
				},
				type: {
					elementType: 'Input',
					elementConfig: {
						label: 'Type',
						outlined: true
					},
					value: ''
				},
				standing: {
					elementType: 'Input',
					elementConfig: {
						label: 'Standing',
						outlined: true
					},
					name: 'refNumber',
					value: ''
				},
				pricing: {
					elementType: 'Input',
					elementConfig: {
						label: 'Pricing',
						outlined: true
					},
					value: ''
				},
				notes: {
					elementType: 'Input',
					elementConfig: {
						label: 'Notes',
						outlined: true
					},
					value: ''
				},
				locationName: {
					elementType: 'Input',
					elementConfig: {
						label: 'Location Name',
						outlined: true
					},
					value: ''
				},
				address: {
					elementType: 'Input',
					elementConfig: {
						label: 'Address',
						outlined: true
					},
					value: ''
				},
				city: {
					elementType: 'Input',
					elementConfig: {
						label: 'City',
						outlined: true
					},
					value: ''
				},
				state: {
					elementType: 'Input',
					elementConfig: {
						label: 'State',
						outlined: true
					},
					value: ''
				},
				postalCode: {
					elementType: 'Input',
					elementConfig: {
						label: 'Postal / Zip Code',
						outlined: true
					},
					value: ''
				},
				w9: {
					checked: false,
					value: ''
				}
			},
			clientForm: {
				clientFirst: {
					elementType: 'Input',
					elementConfig: {
						label: 'Cllient First Name',
						outlined: true
					},
					value: ''
				},
				clientLast: {
					elementType: 'Input',
					elementConfig: {
						label: 'Client Last Name',
						outlined: true
					},
					value: ''
				},
				clientPhone: {
					elementType: 'Input',
					elementConfig: {
						label: 'Client Phone #',
						outlined: true
					},
					value: ''
				},
				clientEmail: {
					elementType: 'Input',
					elementConfig: {
						label: 'Client Email',
						outlined: true
					},
					value: ''
				},
				position: {
					elementType: 'Input',
					elementConfig: {
						label: 'Position',
						outlined: true
					},
					value: ''
				},
				notes: {
					elementType: 'Input',
					elementConfig: {
						label: 'Notes',
						outlined: true
					},
					value: ''
				},
				companyName: {
					elementType: 'Input',
					elementConfig: {
						label: 'Company Name',
						outlined: true
					},
					value: ''
				},
				companyMainPhone: {
					elementType: 'Input',
					elementConfig: {
						label: 'Main Phone #',
						outlined: true
					},
					value: ''
				},
				clientType: {
					elementType: 'MultiSelect',
					elementConfig: {
						label: 'Client Type',
						outlined: true,
						selected: 'Client Type',
						options: [
							{
								text: 'Option 1',
								value: '1'
							},
							{
								text: 'Option 2',
								value: '2'
							},
							{
								text: 'Option 3',
								value: '3'
							},
							{
								text: 'Option 4',
								value: '4'
							},
							{
								text: 'Option 5',
								value: '5'
							}
						]
					},
					value: ''
				},
				contactName: {
					elementType: 'Input',
					elementConfig: {
						label: 'Contact Name',
						outlined: true
					},
					value: ''
				},
				billingPhone: {
					elementType: 'Input',
					elementConfig: {
						label: 'Billing Phone #',
						outlined: true
					},
					value: ''
				},
				billingEmail: {
					elementType: 'Input',
					elementConfig: {
						label: 'Billing Email',
						outlined: true
					},
					value: ''
				},
				locationName: {
					elementType: 'Input',
					elementConfig: {
						label: 'Location Name',
						outlined: true
					},
					value: ''
				},
				address: {
					elementType: 'Input',
					elementConfig: {
						label: 'Address',
						outlined: true
					},
					value: ''
				},
				city: {
					elementType: 'Input',
					elementConfig: {
						label: 'City',
						outlined: true
					},
					value: ''
				},
				state: {
					elementType: 'Input',
					elementConfig: {
						label: 'State',
						outlined: true
					},
					value: ''
				},
				zipCode: {
					elementType: 'Input',
					elementConfig: {
						label: 'Postal / Zip Code',
						outlined: true
					},
					value: ''
				},
				services: {
					elementType: 'Input',
					elementConfig: {
						label: 'Services',
						outlined: true
					},
					value: ''
				},
				prices: {
					elementType: 'Input',
					elementConfig: {
						label: 'Prices',
						outlined: true
					},
					value: ''
				}
			}
		};
		this.toggle = this.toggle.bind(this);
	}
	targetElement = null;
	componentDidMount() {
		//     // 2. Get a target element that you want to persist scrolling for (such as a modal/lightbox/flyout/nav).
		this.targetElement = document.querySelector('#formsModal');
		console.log(this.state.modal14);
	}

	handleApptChange = (event, inputId) => {
		const updatedApptForm = { ...this.state.apptForm };
		const updatedFormElement = { ...updatedApptForm[inputId] };
		updatedFormElement.value = event.target.value;
		updatedApptForm[inputId] = updatedFormElement;
		this.setState({ apptForm: updatedApptForm });
		// console.log(this.state.apptForm);
	};
	handleContrChange = (event, inputId) => {
		const updatedContrForm = { ...this.state.contrForm };
		const updatedFormElement = { ...updatedContrForm[inputId] };
		updatedFormElement.value = event.target.value;
		updatedContrForm[inputId] = updatedFormElement;
		console.log(updatedContrForm[inputId]);
		console.log(this.state.contrForm.certification.elementConfig.value);
		this.setState({ contrForm: updatedContrForm });
		// console.log(event.value);
	};
	handleClientChange = (event, inputId) => {
		const updatedClientForm = { ...this.state.clientForm };
		const updatedFormElement = { ...updatedClientForm[inputId] };
		updatedFormElement.value = event.target.value;
		updatedClientForm[inputId] = updatedFormElement;
		this.setState({ clientForm: updatedClientForm });
	};

	handleDateChange = (date) => {
		this.setState({
			apptForm: {
				...this.state.apptForm,
				apptDate: {
					elementType: 'DateTimePicker',
					elementConfig: {
						label: 'Appointment Date',
						fullWidth: true,
						variant: 'outlined'
					},
					value: date
				}
			}
		});
	};

	apptFormSubmit = (event) => {
		event.preventDefault();
		const { apptForm } = this.state;

		const formData = {};
		for (let field in apptForm) {
			formData[field] = apptForm[field].value;
		}

		API.saveAppt(formData).then((res) => {
			console.log(`data: ${res.data}`);
			// setTimeout(() => {
			//   alert(`Appointment #${res.data._id} has been Saved`);
			// }, 100);
			const formData = {};
			for (let field in apptForm) {
				apptForm[field].value = '';
				formData[field] = apptForm[field].value;
			}
			this.setState({
				apptForm: { ...apptForm, formData },
				apptSave: true
			});
		});
	};

	contrFormSubmit = (event) => {
		event.preventDefault();
		const { contrForm } = this.state;

		const formData = {};
		for (let field in contrForm) {
			formData[field] = contrForm[field].value;
		}

		API.saveContractor(formData).then((res) => {
			console.log(`data: ${res.data}`);

			// setTimeout(() => {
			//   alert(`Contractor #${res.data._id} has been Saved`);
			// }, 100);
			const formData = {};
			for (let field in contrForm) {
				contrForm[field].value = '';
				formData[field] = contrForm[field].value;
			}
			this.setState({
				contrForm: { ...contrForm, formData },
				contractorSave: true
			});
		});
	};

	clientFormSubmit = (event) => {
		event.preventDefault();
		const { clientForm } = this.state;

		const formData = {};
		for (let field in clientForm) {
			formData[field] = clientForm[field].value;
		}

		API.saveClient(formData).then((res) => {
			console.log(`data: ${res.data}`);

			// setTimeout(() => {
			//   alert(`Contractor #${res.data._id} has been Saved`);
			// }, 100);
			const formData = {};
			for (let field in clientForm) {
				clientForm[field].value = '';
				formData[field] = clientForm[field].value;
			}
			this.setState({
				clientForm: { ...clientForm, formData },
				clientSave: true
			});
		});
	};

	/**Reload Appointments after some change has been made */

	reLoadAppts = () => {
		this.props.loadAppointments();
	};

	/**Reload Clientss after some change has been made */

	reLoadClients = () => {
		this.props.loadClients();
	};

	/**Reload Contractorss after some change has been made */

	reLoadContractors = () => {
		this.props.loadContractors();
	};

	toggle = (nr) => () => {
		let modalNumber = 'modal' + nr;
		// const contractor = this.state.contractorSave;
		// const client = this.state.clientSave;
		// const appointment = this.state.apptSave;
		if (this.state.modal14 === false) {
			this.setState({
				[modalNumber]: true
			});
			//   this.showTargetElement();
			disableBodyScroll(this.targetElement);
		}
		if (this.state.modal14 === true) {
			this.setState({
				[modalNumber]: false
			});
			this.reLoadContractors();
			this.reLoadClients();
			this.reLoadAppts();
			//   this.hideTargetElement();
			enableBodyScroll(this.targetElement);
		}
		// if (contractor === true) {
		// this.reLoadContractors();
		// 	console.log('contractor Update');
		// }

		// if (client === true) {
		// this.reLoadClients();
		// 	console.log('Client Update');
		// }

		// if (appointment === true) {
		// 	console.log('Appt  Update');
		// this.reLoadAppts();
		// }
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

	closeConfirmation = () => {
		alert('?');
	};

	render() {
		const { contrForm } = this.state;
		// if (this.state.modal14 === true) {
		//   disableBodyScroll(this.targetElement);
		//   // document.body.style.overflow = "hidden";
		// } else if (this.state.modal14 === false) {
		//   enableBodyScroll(this.targetElement);
		//   //   document.body.style.overflow = "visible";
		// }
		return (
			<div>
				<MDBNavLink onClick={this.toggle(14)} to={window.location.pathname}>
					<MDBIcon size='1g' icon='plus-square' />
					<span className='d-none d-md-inline ml-1'>Add</span>
				</MDBNavLink>
				<MDBModal id='formsModal' isOpen={this.state.modal14} toggle={this.closeConfirmation} centered size='lg'>
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
								<MDBIcon icon='user' className='mr-1' />
								Appointment
							</MDBNavLink>
						</MDBNavItem>
						<MDBNavItem>
							<MDBNavLink
								className={this.state.activeItem === 2 ? 'active' : ''}
								to='#'
								onClick={() => {
									this.toggleTab(2);
								}}>
								<MDBIcon icon='user-plus' className='mr-1' />
								Contractor
							</MDBNavLink>
						</MDBNavItem>
						<MDBNavItem>
							<MDBNavLink
								className={this.state.activeItem === 3 ? 'active' : ''}
								to='#'
								onClick={() => {
									this.toggleTab(3);
								}}>
								<MDBIcon icon='user-plus' className='mr-1' />
								Client
							</MDBNavLink>
						</MDBNavItem>
						<MDBNavItem>
							<MDBNavLink
								className={this.state.activeItem === 4 ? 'active' : ''}
								to='#'
								onClick={() => {
									this.toggleTab(4);
								}}>
								<MDBIcon icon='phone-volume' className='mr-1' />
								Phone Conference
							</MDBNavLink>
						</MDBNavItem>
					</MDBNav>
					<MDBTabContent activeItem={this.state.activeItem} className='pb-0'>
						<MDBTabPane tabId={1}>
							<MDBModalBody className='mx-0'>
								<ApptForm
									toggle={this.toggle}
									current='Appointment'
									forms={this.state}
									change={this.handleApptChange}
									submit={this.apptFormSubmit}
									loadAppointments={this.props.loadAppointments}
								/>
							</MDBModalBody>
						</MDBTabPane>
						<MDBTabPane tabId={2}>
							<MDBModalBody className='mx-0'>
								{/* <Form
                  current="Contractor"
                  forms={this.state}
                  change={this.handleContrChange}
                  submit={this.contrFormSubmit}
                  options={this.state.contrForm.certification.options}
                /> */}
								<ContrForm
									toggle={this.toggle}
									forms={this.state}
									change={this.handleContrChange}
									submit={this.contrFormSubmit}
									checked={contrForm.w9.checked}
									loadContractors={this.props.loadContractors}
								/>
							</MDBModalBody>
						</MDBTabPane>
						<MDBTabPane tabId={3}>
							<MDBModalBody className='mx-0'>
								<ClientForm
									toggle={this.toggle}
									current='Client'
									forms={this.state}
									change={this.handleClientChange}
									loadClients={this.props.loadClients}
									submit={this.clientFormSubmit}
								/>
							</MDBModalBody>
						</MDBTabPane>
						<MDBTabPane tabId={4}>
							<MDBModalBody className='mx-0'>
								<PhoneConferenceForm
									toggle={this.toggle}
									current='PhoneConference'
									// forms={this.state}
									// change={this.handleClientChange}
									// loadClients={this.props.loadClients}
									// submit={this.clientFormSubmit}
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
