import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import API from '../utils/API';
import Geocode from 'react-geocode';
import { MDBContainer, MDBInput, MDBCol, MDBRow, MDBCardTitle, MDBIcon } from 'mdbreact';
import MapStyles from '../components/GoogleMap/mapStyles.json';
import SideNavigation from '../components/SideNav/index';
import './style.css';
import moment from 'moment';
/**
 *Documentation for geocoding found here https://www.npmjs.com/package/react-geocode*/

Geocode.enableDebug();

const style = {
	width: '100%',
	height: '91vh',
	position: 'relative',
	top: '66px'
};

const MAP = {
	defaultZoom: 12,
	defaultCenter: {
		lat: 32.852721,
		lng: -117.182762
	},
	options: {
		styles: MapStyles,
		maxZoom: 19
	}
};
// function key(key) {
// 	API_KEY2 = key;
// 	console.log(API_KEY2);
// }

// let keyCode = '';
let API_KEY2 = '';

export class GoogleMap extends Component {
	constructor(props) {
		super(props);
		this.state = {
			emailModal: false,
			language: 'All Languages',
			showingInfoWindow: false,
			sideNavToggled: false,
			SecretID: '',
			windowWidth: 0,
			breakWidth: 1400,
			activeMarker: {},
			selectedPlace: {},
			selectedContractor: [],
			selectedAppointment: [],
			contractors: this.props.contractors,
			appointments: this.props.appointments,
			contractorCoords: [],
			appointmentCoords: [],
			collapseID: '',
			mapOptions: {
				center: MAP.defaultCenter,
				zoom: MAP.defaultZoom
			},
			buttonStyle: {
				transform: 'scaleY(1) scaleX(1) translateY(10px) translateX(0)',
				opacity: '1'
			}
		};
		this.toggleAccordianCollapse = this.toggleAccordianCollapse.bind(this);
		this.toggleEmailModal = this.toggleEmailModal.bind(this);
		this.seperateByLanguage = this.seperateByLanguage.bind(this);
		this.handleLangaugeChange = this.handleLangaugeChange.bind(this);
	}

	componentDidMount() {
		this.loadContractorCoords();
		// this.loadkey();
		// console.log(googleKey.key);
	}
	// componentWillMount() {
	// 	this.loadkey();
	// }

	loadContractorCoords = () => {
		this.state.contractors.map((contractor, contractoridx) => {
			const StreetAddress = contractor.address;
			const address = StreetAddress.split(' ');
			const city = contractor.city.split(' ');
			const fullAddress =
				address[0] + '+' + address[1] + '+' + address[2] + ',+' + city[0] + '+' + city[1] + ',+' + contractor.state;
			// console.log({ fullAddress });
			this.ContractorGeocode(fullAddress, contractoridx);
		});
	};

	/**Function to open/collapse the accodion depending on which  one is already opened | used appointment Id as collapse id to handle having a long list of new appointments  */
	toggleAccordianCollapse = (collapseID) => {
		this.loadAppointment(collapseID);
		this.setState((prevState) => ({
			collapseID: prevState.collapseID !== collapseID ? collapseID : ''
		}));
		// console.log(collapseID);
	};

	// loadkey = () => {
	// 	API.getKeys()
	// 		.then((res) => {
	// 			// key(res.data[0].SecretID);
	// 			this.setState({
	// 				SecretID: res.data[0].SecretID
	// 			});

	// 			// console.log(this.state.SecretID);
	// 		})
	// 		.catch((err) => console.log(err));
	// };

	/**Toggle function for  enabling the inputs so info may be updated in the state */
	toggleEmailModal = () => {
		this.setState({
			emailModal: !this.state.emailModal
		});
	};

	loadAppointmentCoords = () => {
		const { address, city, state } = this.state.selectedAppointment;
		const StreetAddress = address;
		const Saddress = StreetAddress.split(' ');
		const Scity = city.split(' ');
		const fullAddress =
			Saddress[0] + '+' + Saddress[1] + '+' + Saddress[2] + ',+' + Scity[0] + '+' + Scity[1] + ',+' + state;
		// console.log({ fullAddress });
		this.apptGeocode(fullAddress);
	};
	seperateByLanguage = (language) => {
		const contractorsFiltered = this.props.contractors.filter(function(contractor) {
			switch (language) {
				case 'All Languages':
					return contractor;
				default:
					return contractor.contractorLanguage === language;
			}
		});
		this.handleLangaugeChange(language);

		this.setState({
			contractors: contractorsFiltered
		});
	};

	/** Funcition for handling select change for assignment type input */
	handleLangaugeChange = (value) => {
		this.setState({
			language: value
		});
	};
	/**
    * Using API to load information from MONGODB |
    * Appointment infromation |
    * Handles geocoding address*/
	loadAppointment = (id) => {
		API.getAppt(id)
			.then((res) => {
				this.setState({
					selectedAppointment: res.data
				});

				this.loadAppointmentCoords();
			})
			.catch((err) => console.log(err));
	};

	/**
    *Documentation for geocoding found here https://www.npmjs.com/package/react-geocode*/
	ContractorGeocode = (location, contractoridx) => {
		// console.log(location);
		API.getGeocode(location)
			.then((res) => {
				// console.log(res.data);
				const { lat, lng } = res.data.results[0].geometry.location;
				let contractorCoords = this.state.contractorCoords[contractoridx] || {};
				contractorCoords = { lat: lat, lng: lng };
				this.state.contractorCoords[contractoridx] = contractorCoords;
				this.setState({
					contractorCoords: this.state.contractorCoords
				});
				// console.log('COORDS', lat, lng, contractoridx);
				// return res.data.results[0].geometry.location;
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

	/**
    *Documentation for geocoding found here https://www.npmjs.com/package/react-geocode*/
	apptGeocode = (location) => {
		// console.log(this.state.appointments);
		API.getGeocode(location)
			.then((res) => {
				// console.log(res.data);
				const { lat, lng } = res.data.results[0].geometry.location;
				// let appointmentCoords = this.state.appointmentCoords || {};
				let appointmentCoords = { lat: lat, lng: lng };
				// this.state.appointmentCoords = appointmentCoords;
				this.setState({
					appointmentCoords: appointmentCoords
				});
				console.log('APPT COORDS', appointmentCoords);
				// return res.data.results[0].geometry.location;
			})
			.catch((err) => console.log(err));
	};

	/**
    *Documentation for geocoding found here https://www.npmjs.com/package/react-geocode*/
	addressSearch = () => {
		API.getGeocode(this.state.search).then(
			(res) => {
				const { lat, lng } = res.data.results[0].geometry.location;
				this.setState({
					coords: { lat, lng }
				});
				// console.log(lat, lng);
			},
			(error) => {
				console.error(error);
			}
		);
	};

	onMarkerClick = (props, marker, e) => {
		switch (props.markerType) {
			case 'contractor':
				this.setState({
					selectedContractor: props,
					selectedPlace: props,
					activeMarker: marker,
					showingInfoWindow: true
				});
				break;
			case 'appointments':
				this.setState({
					selectedAppointment: props,
					selectedPlace: props,
					activeMarker: marker,
					showingInfoWindow: true
				});
				break;
			default:
				this.setState({
					selectedPlace: props,
					activeMarker: marker,
					showingInfoWindow: true
				});
		}
	};

	/**
    *Handles Map click event |
    * unselects a marker|
    * Once Map is clicked "showingInfowindow" is removed by updating to false*/
	onMapClicked = () => {
		if (this.state.showingInfoWindow) {
			this.setState({
				showingInfoWindow: false,
				activeMarker: null
			});
		}
	};

	handleInputChange = (event) => {
		const { name, value } = event.target;
		this.setState({
			[name]: value
		});
	};

	// toggleSideNav = () => {
	// 	if (this.state.windowWidth < this.state.breakWidth) {
	// 		this.setState({
	// 			sideNavToggled: !this.state.sideNavToggled
	// 		});
	// 	}
	// };

	infoWindow = (markerType) => {
		console.log(this.state.selectedPlace);
		switch (markerType) {
			case 'appointment':
				return (
					<MDBContainer className='overflow-hidden'>
						<MDBRow center>
							<MDBCol center size={12}>
								<MDBCardTitle tag='h2' className='info-color-dark text-center white-text'>
									{' '}
									{this.state.selectedPlace.refName}
								</MDBCardTitle>
							</MDBCol>
						</MDBRow>

						<MDBRow>
							<MDBCol md={6} sm={12}>
								<MDBInput
									outline
									disabled
									label='Appointment Date'
									value={moment(this.state.selectedPlace.apptDate).format('dddd MMM Do YYYY')}
									size='sm'
								/>
							</MDBCol>

							<MDBCol md={6} sm={12}>
								<MDBInput
									outline
									disabled
									label='Appointment Time'
									value={moment(this.state.selectedPlace.apptTime, 'HH:mm').format('hh:mm a')}
									size='sm'
								/>
							</MDBCol>

							<MDBCol md={4} sm={12}>
								<MDBInput
									outline
									disabled
									label='Location'
									value={this.state.selectedPlace.locationName}
									size='sm'
								/>
							</MDBCol>

							<MDBCol md={8} sm={12}>
								<MDBInput
									outline
									disabled
									label='Address'
									value={this.state.selectedPlace.location}
									size='sm'
								/>
							</MDBCol>

							<MDBCol sm={12}>
								<MDBInput
									type='textarea'
									outline
									value={this.state.selectedPlace.notes}
									disabled
									label='Notes'
									size='sm'
								/>
							</MDBCol>

							<MDBCol md={3} sm={6}>
								<MDBInput
									outline
									disabled
									label='Language'
									value={this.state.selectedPlace.language}
									size='sm'
								/>
							</MDBCol>

							<MDBCol md={3} sm={6}>
								<MDBInput
									disabled
									label='Litigated'
									checked={this.state.selectedPlace.litigated}
									type='checkbox'
									id='checkbox2'
								/>
							</MDBCol>

							<MDBCol sm={6}>
								<MDBInput
									outline
									disabled
									label='Type of Assignment'
									value={this.state.selectedPlace.assignmentType}
									size='sm'
								/>
							</MDBCol>
							{/* <MDBCol md={6} sm={12}>
								<MDBRow>
									<MDBCol md={3} sm={6}>
										<MDBBtn size='lg' floating color='red'>
											<MDBIcon icon='user-plus' size='lg' />
										</MDBBtn>
									</MDBCol>
									<MDBCol md={3} sm={6}>
										<MDBBtn size='lg' floating color='yellow'>
											<MDBIcon icon='paste' size='lg' />
										</MDBBtn>
									</MDBCol>
									<MDBCol md={3} sm={6}>
										<MDBBtn size='lg' floating color='green'>
											<MDBIcon icon='sms' size='lg' />
										</MDBBtn>
									</MDBCol>
									<MDBCol md={3} sm={6}>
										<MDBBtn size='lg' onClick={this.toggleEmailModal} floating color='blue'>
											<MDBIcon icon='envelope' size='lg' />
										</MDBBtn>
									</MDBCol>
								</MDBRow>
							</MDBCol> */}
						</MDBRow>
					</MDBContainer>
				);

			case 'contractor':
				return (
					<MDBContainer className='overflow-hidden'>
						<MDBRow center>
							<MDBCol center justify-content size={12}>
								<MDBCardTitle rounded tag='h2' className='info-color-dark text-center white-text'>
									{' '}
									{this.state.selectedPlace.title}
								</MDBCardTitle>
							</MDBCol>
						</MDBRow>

						<MDBRow>
							<MDBCol md={6} sm={12}>
								<MDBInput
									outline
									disabled
									label='Phone Number'
									value={this.formatPhoneNumber(this.state.selectedPlace.Phone)}
									size='sm'
								/>
							</MDBCol>

							<MDBCol md={6} sm={12}>
								<MDBInput
									outline
									disabled
									label='Other Phone'
									value={this.formatPhoneNumber(this.state.selectedPlace.OtherPhone)}
									size='sm'
								/>
							</MDBCol>

							<MDBCol md={6} sm={12}>
								<MDBInput outline disabled label='Email' value={this.state.selectedPlace.Email} size='sm' />
							</MDBCol>

							<MDBCol md={6} sm={12}>
								<MDBInput
									outline
									disabled
									label='Address'
									value={this.state.selectedPlace.location}
									size='sm'
								/>
							</MDBCol>

							<MDBCol md={6} sm={12}>
								<MDBInput
									type='textarea'
									outline
									disabled
									label='Notes'
									value={this.state.selectedPlace.Notes}
									size='sm'
								/>
							</MDBCol>

							<MDBCol md={3} sm={6}>
								<MDBInput
									outline
									disabled
									label='Language'
									value={this.state.selectedPlace.Language}
									size='sm'
								/>
							</MDBCol>

							<MDBCol md={3} sm={6}>
								<MDBInput
									disabled
									label='Certified'
									checked={this.state.selectedPlace.Cert}
									type='checkbox'
									id='checkbox2'
								/>

								<MDBInput
									label='Certification number'
									value={this.state.selectedPlace.concertNumber}
									type='text'
									outline
									disabled
									size='sm'
								/>
							</MDBCol>
							<MDBCol sm={6}>
								<MDBInput
									label='Type'
									value={this.state.selectedPlace.CertType}
									type='text'
									outline
									disabled
									size='sm'
								/>
							</MDBCol>

							<MDBCol md={3} sm={6}>
								<MDBInput
									outline
									disabled
									label='Agency Standing'
									value={this.state.selectedPlace.Stand}
									size='sm'
								/>
							</MDBCol>

							<MDBCol md={3} sm={12}>
								<MDBInput
									outline
									disabled
									label='Contractor Price'
									value={this.state.selectedPlace.Price}
									size='sm'
								/>
							</MDBCol>
						</MDBRow>
					</MDBContainer>
				);
		}
	};
	toggleSideNav = () => {
		if (this.state.windowWidth < this.state.breakWidth) {
			this.setState({
				sideNavToggled: !this.state.sideNavToggled
			});
		}
	};
	/** Funcition for handling select change for assignment type input */

	render() {
		return (
			<div>
				<div className='white-skin'>
					<SideNavigation
						style={{ transition: 'all .3s' }}
						language={this.state.language}
						seperateByLanguage={this.seperateByLanguage}
						handleLangaugeChange={this.handleLangaugeChange}
						triggerOpening={this.state.sideNavToggled}
						onLinkClick={() => this.toggleSideNav()}
						appointments={this.state.appointments}
						selectedContractor={this.state.selectedContractor}
						contractors={this.state.contractors}
						toggleAccordian={this.toggleAccordianCollapse}
						collapseID={this.state.collapseID}
						loadAppointments={this.props.loadAppointments}
						loadContractors={this.props.loadContractors}
					/>
				</div>

				<MDBContainer className='d-flex justify-content-center' fluid>
					<div className='justify-content-start' onClick={this.toggleSideNav} key='sideNavToggleA'>
						<MDBIcon id='sideNavBars' icon='bars' color='white' size='lg' />
					</div>

					<Map
						// bootstrapURLKeys={{ key: this.state.SecretID }}
						yesIWantToUseGoogleMapApiInternals
						defaultZoom={MAP.defaultZoom}
						defaultCenter={MAP.defaultCenter}
						maxZoom={19}
						options={MAP.options}
						onChange={this.handleMapChange}
						onReady={this.fetchPlaces}
						google={this.props.google}
						zoom={10}
						style={style}
						styles={MapStyles}
						initialCenter={{
							lat: 32.852721,
							lng: -117.182762
						}}
						onClick={this.onMapClicked}>
						<Marker
							onClick={this.onMarkerClick}
							markerType={this.state.selectedAppointment.markerType}
							dateAssigned={this.state.selectedAppointment.dateAssigned}
							apptDate={this.state.selectedAppointment.apptDate}
							apptTime={this.state.selectedAppointment.apptTime}
							endTime={this.state.selectedAppointment.endTime}
							assigneeFirst={this.state.selectedAppointment.assigneeFirst}
							assigneeLast={this.state.selectedAppointment.assigneeLast}
							assigneeCompany={this.state.selectedAppointment.assigneeCompany}
							assigneePhone={this.state.selectedAppointment.assigneePhone}
							adjusterFirst={this.state.selectedAppointment.adjusterFirst}
							adjusterLast={this.state.selectedAppointment.adjusterLast}
							adjusterPhone={this.state.selectedAppointment.adjusterPhone}
							adjusterCompany={this.state.selectedAppointment.adjusterCompany}
							refName={this.state.selectedAppointment.refName}
							refNumber={this.state.selectedAppointment.refNumber}
							doi={this.state.selectedAppointment.doi}
							dob={this.state.selectedAppointment.dob}
							litigated={this.state.selectedAppointment.litigated}
							notes={this.state.selectedAppointment.notes}
							language={this.state.selectedAppointment.language}
							assignmentType={this.state.selectedAppointment.assignmentType}
							locationName={this.state.selectedAppointment.locationName}
							address={this.state.selectedAppointment.address}
							city={this.state.selectedAppointment.city}
							state={this.state.selectedAppointment.state}
							notes={this.state.selectedAppointment.notes}
							postalCode={this.state.selectedAppointment.zipCode}
							name={this.state.selectedAppointment.refName}
							position={this.state.appointmentCoords}
							location={
								this.state.selectedAppointment.address +
								' ' +
								this.state.selectedAppointment.city +
								' ' +
								this.state.selectedAppointment.state +
								' ' +
								this.state.selectedAppointment.postalCode
							}
							key={this.state.selectedAppointment._id}
							appointmentID={this.state.selectedAppointment._id}
							icon='http://maps.google.com/intl/en_us/mapfiles/ms/micons/purple-dot.png'
						/>

						{this.state.contractors.map((contractor, idx) => (
							<Marker
								onClick={this.onMarkerClick}
								markerType={contractor.markerType}
								FirstName={contractor.contractorFirst}
								LastName={contractor.contractorLast}
								Phone={contractor.contractorPhone}
								OtherPhone={contractor.contractorOtherPhone}
								Email={contractor.contractorEmail}
								Language={contractor.contractorLanguage}
								Cert={contractor.certification}
								concertNumber={contractor.certificationNumber}
								minimum={contractor.minimum}
								CertType={contractor.type}
								Stand={contractor.standing}
								Price={contractor.totalPrice}
								Notes={contractor.notes}
								address={contractor.address}
								City={contractor.city}
								State={contractor.state}
								ZipCode={contractor.postalCode}
								W9={contractor.w9}
								locationnName={contractor.locationName}
								title={contractor.contractorFirst + ' ' + contractor.contractorLast}
								position={this.state.contractorCoords[idx]}
								location={
									contractor.address +
									' ' +
									contractor.city +
									' ' +
									contractor.state +
									' ' +
									contractor.postalCode
								}
								key={contractor._id}
								contractorID={contractor._id}
								icon='http://maps.google.com/mapfiles/ms/icons/green-dot.png'
							/>
						))}

						<InfoWindow
							// style={{ overflow: 'none' }}
							marker={this.state.activeMarker}
							visible={this.state.showingInfoWindow}>
							{this.infoWindow(this.state.selectedPlace.markerType)}
						</InfoWindow>
						{/* <EmailAppt toggle={this.toggleEmailModal} modal={this.state.emailModal} /> */}
					</Map>
				</MDBContainer>
			</div>
		);
	}
}

const LoadingContainer = (props) => <div>Fancy loading container!</div>;

export default GoogleApiWrapper({
	apiKey: 'AIzaSyAHxDllLkfADecPsdprZqFp4UOuKZRlAk8',
	LoadingContainer: LoadingContainer
})(GoogleMap);
