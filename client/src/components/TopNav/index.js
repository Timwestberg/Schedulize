import React, { Component } from 'react';
import {
	MDBNavbar,
	MDBNavbarBrand,
	MDBNavbarNav,
	MDBNavItem,
	MDBNavLink,
	MDBIcon,
	MDBDropdown,
	MDBDropdownToggle,
	MDBDropdownMenu,
	MDBDropdownItem
} from 'mdbreact';
// import FormsModal from '../FormsModal/index';
// import ApptSearch from '../AppointmentSearch/index';
class TopNavigation extends Component {
	constructor(props) {
		super(props);
		this.state = {
			collapse: false
		};
		this.onClick = this.onClick.bind(this);
		this.toggle = this.toggle.bind(this);
		this.handleToggleClickA = this.handleToggleClickA.bind(this);
	}

	onClick() {
		this.setState({
			collapse: !this.state.collapse
		});
	}

	toggle() {
		this.setState({
			dropdownOpen: !this.state.dropdownOpen
		});
	}

	handleToggleClickA() {
		this.props.onSideNavToggleClick();
	}

	sideBarMenu(route) {
		switch (route) {
			case 'Map':
				return (
					<div
						onClick={this.handleToggleClickA}
						key='sideNavToggleA'
						style={{
							lineHeight: '32px',
							marginleft: '1em',
							verticalAlign: 'middle'
						}}>
						<MDBIcon icon='bars' color='white' size='lg' />
					</div>
				);
		}
	}

	render() {
		const navStyle = {
			paddingLeft: this.props.toggle ? '16px' : '240px',
			transition: 'padding-left .3s'
		};
		return (
			<MDBNavbar className='flexible-MDBNavbar' light expand='md' scrolling fixed='top' style={navStyle}>
				<MDBNavbarNav expand='sm' right style={{ flexDirection: 'row' }}>
					<MDBNavbarBrand href='/' left className='d-none d-xl-block'>
						<strong className='black-text'>Schedulize</strong>
					</MDBNavbarBrand>

					<MDBNavItem>
						{/* <FormsModal
							loadClients={this.props.loadClients}
							loadContractors={this.props.loadContractors}
							loadAppointments={this.props.loadAppointments}
						/> */}
						<MDBNavLink to='/forms'>
							<MDBIcon icon='plus-square' />
							<span className='d-none d-lg-inline ml-1'>Add</span>
						</MDBNavLink>
					</MDBNavItem>
					<MDBNavItem>
						{/* <ApptSearch /> */}
						<MDBNavLink to='/payroll'>
							<MDBIcon icon='file-invoice-dollar' />
							<span className='d-none d-lg-inline ml-1'>Payroll</span>
						</MDBNavLink>
					</MDBNavItem>

					<MDBNavItem>
						{/* <ApptSearch /> */}
						<MDBNavLink to='/appointments'>
							<MDBIcon icon='archive' />
							<span className='d-none d-lg-inline ml-1'>Appointments</span>
						</MDBNavLink>
					</MDBNavItem>

					<MDBNavItem>
						{/* // onClick={() => this.props.handlePageChange('Calendar')} */}
						<MDBNavLink to='/calendar'>
							<MDBIcon icon='calendar-check' />
							<span className='d-none d-lg-inline ml-1'>Calendar</span>
						</MDBNavLink>
					</MDBNavItem>
					<MDBNavItem>
						{/* // onClick={() => this.props.handlePageChange('AddressBook')} */}
						<MDBNavLink to='/addressbook'>
							<MDBIcon icon='address-book' />
							<span className='d-none d-lg-inline ml-1'>Address Book</span>
						</MDBNavLink>
					</MDBNavItem>
					<MDBNavItem>
						{/* // onClick={() => this.props.handlePageChange('Map')} */}
						<MDBNavLink to='/map'>
							<MDBIcon icon='map' />
							<span className='d-none d-lg-inline ml-1'>Map</span>
						</MDBNavLink>
					</MDBNavItem>
					<MDBDropdown>
						<MDBDropdownToggle nav caret>
							<MDBIcon icon='user' />
							<span className='d-none d-lg-inline'>Account</span>
						</MDBDropdownToggle>
						<MDBDropdownMenu right style={{ minWidth: '200px' }}>
							<MDBDropdownItem href='/'>Log Out</MDBDropdownItem>
							{/* <MDBDropdownItem href='#!'>My Account</MDBDropdownItem> */}
						</MDBDropdownMenu>
					</MDBDropdown>
				</MDBNavbarNav>
			</MDBNavbar>
		);
	}
}

export default TopNavigation;
