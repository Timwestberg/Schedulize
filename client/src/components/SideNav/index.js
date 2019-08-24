import React from 'react';
import { SideNavNav, SideNav, MDBSelect } from 'mdbreact';
import Tabs from '../infoContainer/index';
import './style.css';
import { Hidden } from '@material-ui/core';
// import EmailAppt from '../components/emailModal/index';
class SideNavigation extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			optionsLanguage: [
				{
					checked: true,
					text: 'All Languages',
					value: '31'
				},
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
			]
		};
	}

	/** Funcition for handling select change for assignment type input */
	handleLangaugeChange = (value) => {
		this.props.seperateByLanguage(value);
	};
	render() {
		const { FirstName, LastName, Phone, concertNumber, Price, minimum } = this.props.selectedContractor;
		const contractorName = FirstName + ' ' + LastName;
		const phone = Phone;
		const contractorCert = concertNumber;
		const price = Price;
		const minimumRequired = minimum;
		const collapseID = this.props.collapseID;

		return (
			<div className='white-skin'>
				<SideNav
					id='side-nav'
					bg='https://mdbootstrap.com/img/Photos/Others/sidenav4.jpg'
					mask='strong'
					triggerOpening={this.props.triggerOpening}
					style={{ transition: 'padding-left .3s' }}>
					<form role='search' className='search-form'>
						<div className='form-group md-form mt-0 pt-1 ripple-parent'>
							<MDBSelect
								label='Language Select'
								search
								options={this.state.optionsLanguage}
								value={this.props.language}
								getTextContent={this.handleLangaugeChange}
							/>
						</div>
					</form>
					<SideNavNav>
						<Tabs
							loadAppointments={this.props.loadAppointments}
							loadAppts={this.props.loadAppts}
							contractors={this.props.contractors}
							contractorCert={contractorCert}
							phone={phone}
							price={price}
							minimumRequired={minimumRequired}
							contractorName={contractorName}
							toggleAccordian={this.props.toggleAccordian}
							appointments={this.props.appointments}
							loadContractors={this.props.loadContractors}
							collapseID={collapseID}
						/>
					</SideNavNav>
				</SideNav>
			</div>
		);
	}
}

export default SideNavigation;
