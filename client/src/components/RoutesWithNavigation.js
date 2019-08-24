import React, { Component } from 'react';
import { Router, Route } from 'react-router-dom';
import NewUser from '../pages/Register';
import TopNavigation from './TopNav/index';
import Map from '../pages/Map';
import AddressBook from '../pages/AddressTable';
import API from '../utils/API';
import './ApptMapCard/ScrollBarThin/style.css';
import Calendar from '../pages/Calendar';
import createHistory from 'history/createBrowserHistory';
import Appointments from '../pages/Appointments';
import Login from '../pages/Login';
import Forms from '../pages/FormsPage';
import Payroll from '../pages/invoice';
import {
	MDBNavbar,
	MDBNavbarBrand,
	MDBNavbarNav,
	MDBNavItem,
	MDBNavLink,
	MDBCollapse,
	MDBContainer,
	MDBNavbarToggler
} from 'mdbreact';
const history = createHistory();

class RoutesWithNavigation extends Component {
	constructor(props) {
		super(props);
		this.state = {
			toggle: false,
			windowWidth: 0,
			currentPage: '',
			// SecretID: '',
			sideNavToggled: false,
			breakWidth: 1400,
			contractors: [],
			appointments: [],
			apptData: [],
			clients: [],
			collapseID: '',
			contractorCoords: [],
			appointmentCoords: []
		};
		this.loadAppointment = this.loadAppointment.bind(this);
		this.loadAppointments = this.loadAppointments.bind(this);
		this.loadContractors = this.loadContractors.bind(this);
		this.loadClients = this.loadClients.bind(this);
	}

	componentDidMount() {
		this.loadContractors();
		this.loadAppointments();
		this.loadClients();
		// this.loadkey();
	}

	toggleCollapse = (collapseID) => () =>
		this.setState((prevState) => ({
			collapseID: prevState.collapseID !== collapseID ? collapseID : ''
		}));
	loadContractors = () => {
		API.getContractors()
			.then((res) => {
				this.setState({
					contractors: res.data
				});
			})
			.catch((err) => console.log(err));
	};

	// loadkey = () => {
	// 	API.getKeys()
	// 		.then((res) => {
	// 			// key(res.data[0].SecretID);
	// 			this.setState({
	// 				SecretID: res.data[0].SecretID
	// 			});

	// 			console.log(this.state.SecretID);
	// 		})
	// 		.catch((err) => console.log(err));
	// };
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
	/**
   * Using API to load information from MONGODB |
   * Appointment infromation |
   * Handles geocoding address*/
	loadAppointment = (id) => {
		API.getAppt(id)
			.then((res) => {
				this.setState({
					appointments: res.data,
					modal: !this.state.modal
				});
			})
			.catch((err) => console.log(err));
	};
	/**
   * Using API to load information from MONGODB |
   * Client infromation |
   * Handles geocoding address*/
	loadClients = () => {
		API.getClients()
			.then((res) => {
				this.setState({
					clients: res.data
				});
			})
			.catch((err) => console.log(err));
	};

	componentWillUnmount() {}

	toggleSideNav = () => {
		if (this.state.windowWidth < this.state.breakWidth) {
			this.setState({
				sideNavToggled: !this.state.sideNavToggled
			});
		}
	};

	handlePageChange = (page) => {
		this.setState({ currentPage: page });
	};

	topNavRender = (path) => {
		switch (path) {
			case '/':
				return (
					<MDBNavbar className='deep-purple darken-4' dark expand='md' fixed='top' scrolling transparent>
						<MDBContainer>
							<MDBNavbarBrand>
								<strong className='white-text'>Schedulize</strong>
							</MDBNavbarBrand>
							<MDBNavbarToggler onClick={this.toggleCollapse('navbarCollapse')} />
							<MDBCollapse id='navbarCollapse' isOpen={this.state.collapseID} navbar>
								{/* <MDBNavbarNav right>
									<MDBNavItem active>
										<MDBNavLink to='/'>Not an adminstator?</MDBNavLink>
									</MDBNavItem>
								</MDBNavbarNav> */}
							</MDBCollapse>
						</MDBContainer>
					</MDBNavbar>
				);
			default:
				return (
					<TopNavigation
						toggle={this.state.windowWidth < this.state.breakWidth}
						onSideNavToggleClick={this.toggleSideNav}
						className='white-skin'
						loadClients={this.loadClients}
						loadContractors={this.loadContractors}
						loadAppointments={this.loadAppointments}
					/>
				);
		}
	};

	render() {
		const renderMergedProps = (component, ...rest) => {
			const finalProps = Object.assign({}, ...rest);
			return React.createElement(component, finalProps);
		};

		const PropsRoute = ({ component, ...rest }) => {
			return (
				<Route
					{...rest}
					render={(routeProps) => {
						return renderMergedProps(component, routeProps, rest);
					}}
				/>
			);
		};

		const { appointments, clients, contractors } = this.state;
		return (
			<Router history={history}>
				<div className='flexible-content white-skin'>
					{this.topNavRender(window.location.pathname)}
					<PropsRoute exact path='/' component={Login} />
					<PropsRoute path='/addUser' component={NewUser} />
					<PropsRoute
						exact
						path='/appointments'
						component={Appointments}
						loadAppointments={this.loadAppointments}
						appointments={appointments}
					/>
					<PropsRoute
						exact
						path='/calendar'
						component={Calendar}
						loadAppointments={this.loadAppointments}
						appointments={appointments}
					/>
					<PropsRoute
						exact
						path='/addressbook'
						component={AddressBook}
						contractors={contractors}
						loadAppointments={this.loadAppointments}
						loadClients={this.loadClients}
						loadContractors={this.loadContractors}
						appointments={appointments}
						clients={clients}
					/>

					<PropsRoute
						exact
						path='/map'
						component={Map}
						// Secretkey={this.state.SecretID}
						contractors={contractors}
						loadAppointments={this.loadAppointments}
						loadContractors={this.loadContractors}
						appointments={appointments}
					/>
					<PropsRoute
						exact
						path='/forms'
						component={Forms}
						// contractors={contractors}
						// loadAppointments={this.loadAppointments}
						// loadContractors={this.loadContractors}
						// appointments={appointments}
					/>
					<PropsRoute
						exact
						path='/payroll'
						component={Payroll}
						contractors={contractors}
						loadAppointments={this.loadAppointments}
						loadContractors={this.loadContractors}
						appointments={appointments}
					/>
				</div>
			</Router>
		);
	}
}

export default RoutesWithNavigation;
