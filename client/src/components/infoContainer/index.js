import React, { Fragment, Component } from 'react';
import { MDBRow, MDBCardBody, MDBTabPane, MDBTabContent, MDBNav, MDBNavItem, MDBNavLink, MDBIcon } from 'mdbreact';
import './style.css';
import Accordian from '../ApptMapCard/AccordCard/index';
import '../ApptMapCard/ScrollBarThin/style.css';
import MapContractorTable from '../Tables/mapContractorTable';
import ContractorProfile from '../Profiles/mapContractorProfile';
import API from '../../utils/API';
class TabsPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			activeItemOuterTabs: '1',
			activeItemInnerPills: '1',
			modal: false,
			contractors: this.props.contractors
		};

		/**Must bind functions that are being passsed down as a prop */
		this.toggleContractorClose = this.toggleContractorClose.bind(this);
	}

	/**Function to load a chosen contractors information */
	loadContractor = (id) => () => {
		this.loadContractorModal(id);
	};

	toggleContractorClose = () => {
		this.setState({
			modal: !this.state.modal
		});
		// this.props.loadContractors();
	};

	/**
   * Using API to load information from MONGODB |
   * Contractor infromation |
   * Handles setting the selected contractor information and also setting the modal to be open*/
	loadContractorModal = (id) => {
		API.getContractor(id)
			.then((res) => {
				this.setState({
					contractor: res.data,
					modal: !this.state.modal
				});
			})
			.catch((err) => console.log(err));
	};

	toggleOuterTabs = (tab) => () => {
		if (this.state.activeItemOuterTabs2 !== tab) {
			this.setState({
				activeItemOuterTabs: tab
			});
		}
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

	toggleInnerPills = (tab) => () => {
		if (this.state.activeItemInnerPills !== tab) {
			this.setState({
				activeItemInnerPills: tab
			});
		}
	};

	/**Dynamically rendering the modal since there are multiple contractos on a single page each time contractor information needs to be loading this process starts with the 'loadContractor' function */
	renderContractorModal() {
		if (!this.state.modal) {
			return null;
		}
		const { contractor } = this.state;

		return (
			<ContractorProfile
				id={contractor._id}
				appointments={this.props.appointments}
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
				modal={this.state.modal}
				toggle={this.toggleContractorClose}
				w9={contractor.w9}
				loadContractors={this.props.loadContractors}
			/>
		);
	}

	render() {
		const contractorName = this.props.contractorName;
		const phone = this.props.phone;
		const contractorCert = this.props.contractorCert;
		const price = this.props.price;
		const minimumRequired = this.props.minimumRequired;
		const collapseID = this.props.collapseID;
		const { contractors, selectedContractor } = this.state;
		const contractorData = [];
		// console.log(this.props.toggleAccordian);
		// console.log({ contractorName });
		// console.log({ phone });
		// console.log({ contractorCert });
		// console.log({ selectedContractor });

		/**Loop through the contractors and push the relevent data for the table into the 'ContractorData' array */
		contractors.forEach((contractor) => {
			contractorData.push({
				name: `${contractor.contractorFirst} ${contractor.contractorLast}`,
				language: `${contractor.contractorLanguage}`,
				phone: this.formatPhoneNumber(contractor.contractorPhone),
				email: `${contractor.contractorEmail}`,
				clickEvent: this.loadContractor(contractor._id)
			});
		});
		return (
			<Fragment>
				<MDBNav tabs className='nav-justified' color='indigo'>
					<MDBNavItem>
						<MDBNavLink
							to='#'
							className={this.state.activeItemOuterTabs === '1' ? 'active' : ''}
							onClick={this.toggleOuterTabs('1')}
							role='tab'>
							<MDBIcon icon='book-open' /> Appointments
							{/**Appointments to be staffed */}
						</MDBNavLink>
					</MDBNavItem>
					<MDBNavItem>
						<MDBNavLink
							to='#'
							className={this.state.activeItemOuterTabs === '2' ? 'active' : ''}
							onClick={this.toggleOuterTabs('2')}
							role='tab'>
							<MDBIcon icon='address-book' /> Contractors {/**Contractors */}
						</MDBNavLink>
					</MDBNavItem>
				</MDBNav>
				<MDBTabContent
					id='apptBlock'
					className='card scrollbar-near-moon thin'
					activeItem={this.state.activeItemOuterTabs}>
					<MDBTabPane tabId='1' role='tabpanel'>
						<h6 className='black-text'>Legend:</h6>
						<MDBRow around>
							<div className='blue-text'>New Appointment</div>{' '}
							<div className='orange-text'>Waiting for Auth</div>{' '}
							<div className='red-text'>Waiting for Info</div>
						</MDBRow>
						<MDBRow>
							<Accordian
								loadAppointments={this.props.loadAppointments}
								contractorCert={contractorCert}
								phone={phone}
								contractorName={contractorName}
								price={price}
								minimumRequired={minimumRequired}
								appointments={this.props.appointments}
								toggleAccordian={this.props.toggleAccordian}
								collapseID={collapseID}
							/>
						</MDBRow>
					</MDBTabPane>
					<MDBTabPane tabId='2' role='tabpanel'>
						<MDBRow>
							<MDBCardBody>
								{/** Contractor table within the sidNav */}
								<MapContractorTable appointments={this.state.ap} contractors={contractorData} />
								{/** Contractor Modal within the sideNav*/}
								{this.renderContractorModal()}
							</MDBCardBody>
						</MDBRow>
					</MDBTabPane>
				</MDBTabContent>
			</Fragment>
		);
	}
}

export default TabsPage;
