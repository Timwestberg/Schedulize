import React, { Component } from 'react';
import Contractors from '../components/Tables/contractorTable';
import Clients from '../components/Tables/clientTable';
import API from '../utils/API';
import ContractorProfile from './contractorProfile';
import ClientProfile from '../components/clientProfile/index';
import PrintProvider, { Print, NoPrint } from 'react-easy-print';
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
	MDBIcon,
	MDBJumbotron
} from 'mdbreact';

class TabsPage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			activeItem: '1',
			contractors: this.props.contractors,
			clients: this.props.clients,
			appointments: this.props.appointments,
			modal1: false,
			modal2: false,
			client: [],
			contractor: [],
			clientRows: [],
			contractorRows: [],
			clientData: [],
			contractorData: []
		};
		this.toggleContractorClose = this.toggleContractorClose.bind(this);
		this.loadContractorProfile = this.loadContractorProfile.bind(this);
		this.loadAppointments = this.loadAppointments.bind(this);
		this.toggleClientClose = this.toggleClientClose.bind(this);
		this.toggleContractorClose = this.toggleContractorClose.bind(this);
	}

	componentDidMount() {
		this.loadClientData();
		this.loadContractorData();
		this.renderContractorProfile(this.state.modal2);
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
		this.loadContractorProfile(id);
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
	toggleConPrint = (modal) => {
		switch (modal) {
			case false:
				return (
					<Print single name='foo'>
						<Contractors contractors={this.state.contractorData} />
					</Print>
				);
			case true:
				return <Contractors contractors={this.state.contractorData} />;
		}
	};

	/**Toggle functoin for changing Location Name title into input field */
	toggleClientPrint = (modal) => {
		switch (modal) {
			case false:
				return (
					<Print single name='foo'>
						<Clients clients={this.state.clientData} />
					</Print>
				);
			case true:
				return <Clients clients={this.state.clientData} />;
		}
	};

	/**
   * Using API to load information from MONGODB |
   * Appointment infromation |
   * Handles geocoding address*/
	loadContractorProfile = (id) => {
		console.log(this.state.modal2);
		API.getContractor(id)
			.then((res) => {
				this.setState({
					contractor: res.data,
					modal2: !this.state.modal2
				});
				console.log(this.state.contractor);
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

	renderClientModal() {
		if (!this.state.modal1) {
			return null;
		}
		const { client } = this.state;

		return (
			<ClientProfile
				id={client._id}
				clientFirst={client.clientFirst}
				clientLast={client.clientLast}
				phone={client.clientPhone}
				email={client.clientEmail}
				company={client.companyName}
				companyPhone={client.companyMainPhone}
				clientType={client.clientType}
				contact={client.contactName}
				billPhone={client.billingPhone}
				billEmail={client.billingEmail}
				position={client.position}
				minimum={client.minimum}
				notes={client.notes}
				prices={client.prices}
				locationName={client.locationName}
				address={client.address}
				city={client.city}
				state={client.state}
				zipCode={client.zipCode}
				clientID={client._id}
				modal={this.state.modal1}
				toggle={this.toggleClientClose}
				loadClients={this.props.loadClients}
			/>
		);
	}

	/**Load contractor information to place in data array, must load data this way to avoid duplicating when using the print function, this also seems the best way to spot function from running everytime table is rerendered */
	loadContractorData = () => {
		const { clients } = this.state;

		clients.forEach((client) => {
			this.state.clientData.push({
				name: `${client.clientFirst.charAt(0).toUpperCase() + client.clientFirst.slice(1)} ${client.clientLast}`,
				company: `${client.companyName.charAt(0).toUpperCase() + client.companyName.slice(1)}`,
				position: `${client.position.charAt(0).toUpperCase() + client.position.slice(1)}`,
				phone: this.formatPhoneNumber(client.clientPhone),
				email: `${client.clientEmail.charAt(0).toUpperCase() + client.clientEmail.slice(1)}`,
				clickEvent: this.loadClient(client._id)
			});
		});
	};
	/**
   * Using API to load information from MONGODB |
   * Appointment infromation |
   * Handles geocoding address*/
	loadAppointments = () => {
		API.getAppts()
			.then((res) => {
				this.setState({
					appointments: res.data
				});
			})
			.catch((err) => console.log(err));
	};
	/**Load client information to place in data array, must load data this way to avoid duplicating when using the print function, this also seems the best way to spot function from running everytime table is rerendered */
	loadClientData = () => {
		const { contractors } = this.state;
		contractors.forEach((contractor) => {
			this.state.contractorData.push({
				name: `${contractor.contractorFirst.charAt(0).toUpperCase() +
					contractor.contractorFirst.slice(1)} ${contractor.contractorLast}`,
				language: `${contractor.contractorLanguage.charAt(0).toUpperCase() +
					contractor.contractorLanguage.slice(1)}`,
				certified: this.ChangeCertBooleanToString(contractor.certification),
				type: `${contractor.type}`,
				phone: this.formatPhoneNumber(contractor.contractorPhone),
				email: `${contractor.contractorEmail.charAt(0).toUpperCase() + contractor.contractorEmail.slice(1)}`,
				clickEvent: this.loadContractor(contractor._id)
			});
		});
	};

	renderContractorProfile(profile) {
		if (profile === false) {
			return (
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
									<i class='fas fa-user-tie' /> Contractors
								</MDBNavLink>
							</MDBNavItem>
							<MDBNavItem>
								<MDBNavLink
									to='#'
									className={this.state.activeItem === '2' ? 'active' : ''}
									onClick={this.toggle('2')}
									role='tab'>
									<i class='fas fa-user-secret' /> Clients
								</MDBNavLink>
							</MDBNavItem>
						</MDBNav>
						<MDBTabContent className='card' activeItem={this.state.activeItem}>
							<MDBTabPane tabId='1' role='tabpanel'>
								<Contractors contractors={this.state.contractorData} />
								{/* {this.toggleConPrint(modal2)} */}
							</MDBTabPane>
							<MDBTabPane tabId='2' role='tabpanel'>
								<Clients clients={this.state.clientData} />
								{this.renderClientModal()}
							</MDBTabPane>
						</MDBTabContent>
					</MDBCol>
				</MDBRow>
			);
		} else if (this.state.modal2 === true) {
			const { contractor } = this.state;
			return (
				<MDBRow>
					<MDBCol>
						<MDBJumbotron>
							<MDBIcon
								far
								icon='times-circle'
								onClick={this.toggleContractorClose}
								size='3x'
								className='exitIcon'
							/>
							<ContractorProfile
								id={contractor._id}
								appointments={this.state.appointments}
								conFirst={contractor.contractorFirst}
								conLast={contractor.contractorLast}
								conPhone={contractor.contractorPhone}
								secondary={contractor.contractorPhone}
								email={contractor.contractorEmail}
								language={contractor.contractorLanguage}
								certification={contractor.certification}
								certificationNumber={contractor.certificationNumber}
								pricing={contractor.pricing}
								minimum={contractor.minimum}
								notes={contractor.notes}
								type={contractor.type}
								standing={contractor.standing}
								locationName={contractor.locationName}
								address={contractor.address}
								city={contractor.city}
								state={contractor.state}
								zipCode={contractor.postalCode}
								modal={this.state.modal2}
								toggle={this.toggleContractorClose}
								w9={contractor.w9}
								loadContractors={this.props.loadContractors}
								loadAppointments={this.props.loadAppointments}
								loadContractor={this.loadContractorProfile}
								toggleContractorClose={this.toggleContractorClose}
							/>
						</MDBJumbotron>
					</MDBCol>
				</MDBRow>
			);
		}
	}

	render() {
		const { modal1, modal2 } = this.state;

		return (
			<MDBContainer className='mt-4' fluid>
				{/* <PrintProvider> */}
				{this.renderContractorProfile(this.state.modal2)}

				{/* </PrintProvider> */}
			</MDBContainer>
		);
	}
}

export default TabsPage;
