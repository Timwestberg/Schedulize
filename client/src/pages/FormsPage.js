import React, { Component } from 'react';
import {
	MDBContainer,
	MDBRow,
	MDBCol,
	MDBBtn,
	MDBIcon,
	MDBModalBody,
	MDBNav,
	MDBNavItem,
	MDBNavLink,
	MDBTabContent,
	MDBTabPane
} from 'mdbreact';
import API from '../utils/API';
import ContrForm from '../components/Form/ContrForm';
import ApptForm from '../components/Form/ApptForm';
import ClientForm from '../components/Form/ClientForm';
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
import './style.css';
import PhoneConferenceForm from '../components/Form/PhoneConference';

class FormsPage extends Component {
	state = {};

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

	reLoadAppts = () => {
		this.props.loadAppointments();
	};

	reLoadClients = () => {
		this.props.loadClients();
	};

	reLoadContractors = () => {
		this.props.loadContractors();
	};

	toggleTab(tab) {
		if (this.state.activeItem !== tab) {
			this.setState({
				activeItem: tab
			});
		}
	}

	render() {
		return (
			<MDBContainer>
				<br />
				<br />
				<br />
				<br />
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
				<MDBTabContent activeItem={this.state.activeItem} className='pb-0 card'>
					<MDBTabPane tabId={1}>
						<ApptForm
						//   toggle={this.toggle}
						//   current='Appointment'
						//   forms={this.state}
						//   change={this.handleApptChange}
						//   submit={this.apptFormSubmit}
						//   loadAppointments={this.props.loadAppointments}
						/>
					</MDBTabPane>
					<MDBTabPane tabId={2}>
						<ContrForm />
					</MDBTabPane>
					<MDBTabPane tabId={3}>
						<ClientForm
						//   toggle={this.toggle}
						//   current='Client'
						//   forms={this.state}
						//   change={this.handleClientChange}
						//   loadClients={this.props.loadClients}
						//   submit={this.clientFormSubmit}
						/>
					</MDBTabPane>
					<MDBTabPane tabId={4}>
						<PhoneConferenceForm
						//   toggle={this.toggle}
						//   current='PhoneConference'
						/>
					</MDBTabPane>
				</MDBTabContent>
			</MDBContainer>
		);
	}
}

export default FormsPage;
