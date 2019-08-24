import React, { Component } from 'react';
import {
	MDBBtn,
	MDBModal,
	MDBModalBody,
	MDBModalHeader,
	MDBModalFooter,
	MDBInput,
	MDBIcon,
	MDBRow,
	MDBContainer,
	MDBCol,
	MDBCardTitle,
	MDBSelect,
	toast,
	ToastContainer
} from 'mdbreact';
import API from '../../utils/API';
import PrintProvider, { Print } from 'react-easy-print';
import NewAppointment from '../Profiles/NewClientAppt';
import './style.css';
class ModalProfile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			update: false,
			notification: '',
			modal: this.props.modal,
			disabled: true,
			outlined: false,
			clientFirst: this.props.clientFirst,
			clientLast: this.props.clientLast,
			phone: this.props.phone,
			email: this.props.email,
			company: this.props.company,
			companyPhone: this.props.companyPhone,
			clientType: this.props.clientType,
			position: this.props.position,
			contact: this.props.contact,
			billPhone: this.props.billPhone,
			billEmail: this.props.billEmail,
			prices: this.props.prices,
			notes: this.props.notes,
			minimum: this.props.minimum,
			locationName: this.props.locationName,
			address: this.props.address,
			city: this.props.city,
			state: this.props.state,
			zipCode: this.props.zipCode,
			clientID: this.props.clientID,
			optionsType: [
				{
					text: 'Workers Compensation',
					value: '1'
				},
				{
					text: 'Auto',
					value: '2'
				},
				{
					text: 'Investigation',
					value: '3'
				},
				{
					text: 'Insurance',
					value: '4'
				}
			]
		};
		this.handleInputChange = this.handleInputChange.bind(this);
	}
	/**Reload Clients  after some change has been made */
	reLoad = () => {
		this.props.loadClients();
	};

	/**If an update has been made then reload the clients , if no change occurs do not reload data */
	toggleClose = () => {
		const update = this.state.update;
		if (update === true) {
			return this.reLoad();
		} else if (update === false) {
			return this.props.toggle();
		}
	};

	/**Function to update the Client information in the database */
	updateDB = () => {
		API.updateClient(this.state.clientID, {
			clientFirst: this.state.clientFirst,
			clientLast: this.state.clientLast,
			clientPhone: this.state.phone,
			clientEmail: this.state.email,
			position: this.state.position,
			companyName: this.state.company,
			mainPhone: this.state.companyPhone,
			clientType: this.state.clientType,
			contactName: this.state.contact,
			notes: this.state.notes,
			billingPhone: this.state.billPhone,
			billingEmail: this.state.billEmail,
			prices: this.state.prices,
			minimum: this.state.minimum,
			locationName: this.state.locationName,
			address: this.state.address,
			city: this.state.city,
			state: this.state.state,
			zipCode: this.state.zipCode
		})
			.then(this.toggleEdit)
			.then((res) => {
				this.setState({
					notification: '200',
					update: true
				});
			})
			.catch((err) => {
				this.setState({ notification: '422' });
			});
	};

	/**Function to delete the Client from the database */
	DeleteClient = () => {
		API.deleteClient(this.state.clientID).then(this.toggle).then(this.reLoad);
	};
	/**Add final total for Phone conference with optional fees  */
	addTotal = (price, ApptMinimum) => {
		let a = price;
		let b = ApptMinimum;
		let c = a * b;
		return c;
	};

	// Handles the update field function
	handleInputChange(event) {
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;

		this.setState({
			[name]: value
		});
	}

	/**Toggle function for  enabling the inputs so info may be updated in the state */
	toggleEdit = () => {
		this.setState({
			disabled: !this.state.disabled,
			outlined: !this.state.outlined
		});
	};

	/**Toggle function for displaying the "Close" or "Save" Button */
	toggleCloseButton = (disabled) => {
		console.log({ disabled });
		switch (disabled) {
			case false:
				return (
					<MDBBtn color='blue-grey' onClick={this.toggleEdit}>
						Cancel
					</MDBBtn>
				);

			case true:
				return (
					<MDBBtn color='primary' onClick={this.toggleClose}>
						Close
					</MDBBtn>
				);
			default:
				return (
					<MDBBtn color='primary' onClick={this.toggleClose}>
						Close
					</MDBBtn>
				);
		}
	};

	/**Toggels function for displaying the "Edit" or "Cancel" Button */
	toggleEditButton = (disabled) => {
		switch (disabled) {
			case true:
				return (
					<MDBBtn color='success' className='black-text' onClick={this.toggleEdit}>
						<MDBIcon icon='pencil-alt' /> Edit
					</MDBBtn>
				);
			case false:
				return (
					<div>
						<MDBBtn onClick={this.updateDB} color='primary'>
							Save
						</MDBBtn>

						<MDBBtn color='danger' onClick={this.DeleteClient}>
							Delete
						</MDBBtn>
					</div>
				);
			default:
				return (
					<MDBBtn color='success' className='black-text' onClick={this.toggleEdit}>
						<MDBIcon icon='pencil-alt' /> Edit
					</MDBBtn>
				);
		}
	};

	/**Toggle functoin for changing Location Name title into input field */
	toggleLocationNameEdit = (disabled) => {
		switch (disabled) {
			case false:
				return (
					<MDBInput
						outline={this.state.outlined}
						name='locationName'
						value={this.state.locationName}
						label='Location'
						size='sm'
						disabled={disabled}
						type='text'
						onChange={this.handleInputChange}
					/>
				);
			case true:
				return (
					<MDBCardTitle className='info-color-dark text-white z-depth-2 text-center rounded' tag='h2' size='12'>
						{this.state.locationName}
					</MDBCardTitle>
				);
		}
	};

	/**Toggle function for displaying the "Editing" tag next to the window refname  */
	HeaderName = (disabled) => {
		switch (disabled) {
			case true:
				return this.state.clientFirst + ' ' + this.state.clientLast + ' Profile';
				break;
			case false:
				return this.state.clientFirst + ' ' + this.state.clientLast + ' (Editing)';
		}
	};
	/**Function for displaying the correct notfication flag  */
	notification = () => {
		const { notification } = this.state;
		if (notification === '200') {
			toast.success('Client Updated', {
				position: 'top-right'
			});
			this.setState({ notification: '' });
			console.log({ notification });
		}
		if (notification === '422') {
			toast.error('Error');
			this.setState({ notification: '' });
			console.log({ notification });
			//   this.setState({ notification: "" });
		}
	};

	render() {
		const {
			disabled,
			outlined,
			clientFirst,
			clientLast,
			phone,
			email,
			company,
			companyPhone,
			clientType,
			contact,
			billEmail,
			billPhone,
			position,
			notes,
			prices,
			minimum,
			locationName,
			address,
			city,
			state,
			zipCode,
			clientID,
			optionsType
		} = this.state;
		this.notification();
		return (
			<MDBContainer>
				{/* BUTTON */}

				{/* MODAL */}
				<MDBModal className='cascading-modal' isOpen={this.state.modal} toggle={this.toggleClose} size='fluid'>
					<MDBModalHeader
						className='text-center stylish-color-dark text-white'
						titleClass='w-100'
						tag='h1'
						toggle={this.toggleClose}>
						<MDBRow>
							<MDBCol size='8'>{this.HeaderName(disabled)}</MDBCol>
							<MDBCol size='4'>
								<NewAppointment
									assigneeFirst={clientFirst}
									assigneeLast={clientLast}
									assigneeCompany={company}
									assigneePhone={phone}
									billingContactName={contact}
									billingPhone={billPhone}
									billingEmail={billEmail}
									billingLocationName={locationName}
									billingAddress={address}
									billingState={state}
									billingCity={city}
									billingZipcode={zipCode}
								/>
							</MDBCol>
						</MDBRow>
					</MDBModalHeader>
					<PrintProvider>
						<Print single name='foo'>
							<MDBModalBody>
								<MDBContainer>
									<MDBCardTitle
										tag='h2'
										className='z-depth-2 text-center info-color-dark rounded text-white'
										size='12'>
										Client Details
									</MDBCardTitle>

									{/**Client General Information for Adjuster/Investigator */}
									<MDBRow center>
										<MDBCol lg='6' md='6'>
											<MDBInput
												outline={outlined}
												name='clientFirst'
												label='First'
												value={clientFirst}
												disabled={disabled}
												size='sm'
												type='text'
												onChange={this.handleInputChange}
											/>
										</MDBCol>

										<MDBCol lg='6' md='6'>
											<MDBInput
												outline={outlined}
												name='clientLast'
												value={clientLast}
												label='Last'
												disabled={disabled}
												size='sm'
												type='text'
												onChange={this.handleInputChange}
											/>
										</MDBCol>

										<MDBCol lg='6' md='6'>
											<MDBInput
												outline={outlined}
												name='phone'
												disabled={disabled}
												label='Phone'
												value={phone}
												onChange={this.handleInputChange}
											/>
										</MDBCol>

										<MDBCol lg='6' md='6'>
											<MDBInput
												outline={outlined}
												name='email'
												value={email}
												disabled={disabled}
												label='Email'
												type='email'
												onChange={this.handleInputChange}
											/>
										</MDBCol>

										<MDBCol lg='6' md='6'>
											<MDBInput
												outline={outlined}
												name='position'
												value={position}
												disabled={disabled}
												label='Position'
												type='text'
												onChange={this.handleInputChange}
											/>
										</MDBCol>

										<MDBCol lg='10' md='12'>
											<MDBInput
												outline={outlined}
												name='notes'
												label='Notes'
												value={notes}
												disabled={disabled}
												size='sm'
												type='textarea'
												rows='2'
												icon='pencil-alt'
												onChange={this.handleInputChange}
											/>
										</MDBCol>
									</MDBRow>

									<MDBCardTitle
										tag='h2'
										className=' z-depth-2 text-center info-color-dark rounded text-white'
										size='12'>
										Billing Information
									</MDBCardTitle>

									{/**Company General Information */}
									<MDBRow center>
										<MDBCol lg='6' md='6'>
											<MDBInput
												outline={outlined}
												name='company'
												value={company}
												label='Company Name'
												size='sm'
												disabled={disabled}
												type='text'
												onChange={this.handleInputChange}
											/>
										</MDBCol>

										<MDBCol lg='6' md='6'>
											<MDBInput
												outline={outlined}
												name='companyPhone'
												value={companyPhone}
												label='Company Phone'
												disabled={disabled}
												size='sm'
												type='text'
												onChange={this.handleInputChange}
											/>
										</MDBCol>
									</MDBRow>

									{/**Type of Client */}
									<MDBRow center>
										<MDBCol lg='4' md='6'>
											<MDBSelect
												color='primary'
												name='clientType'
												selected={clientType}
												label='Client Type'
												options={optionsType}
												icon=''
												onChange={this.handleInputChange}
											/>
											<label>Client Type</label>
										</MDBCol>
									</MDBRow>

									{/**Billing Contact information */}
									<MDBRow center>
										<MDBCol lg='6' md='6'>
											<MDBInput
												outline={outlined}
												name='contact'
												label='Contact Name'
												size='sm'
												disabled={disabled}
												type='text'
												value={contact}
												onChange={this.handleInputChange}
											/>
										</MDBCol>

										<MDBCol lg='6' md='6'>
											<MDBInput
												outline={outlined}
												name='billPhone'
												label='Contact Phone'
												size='sm'
												disabled={disabled}
												type='text'
												value={billPhone}
												onChange={this.handleInputChange}
											/>
										</MDBCol>

										<MDBCol lg='6' md='6'>
											<MDBInput
												outline={outlined}
												name='billEmail'
												label='Email'
												size='sm'
												disabled={disabled}
												type='email'
												value={billEmail}
												onChange={this.handleInputChange}
											/>
										</MDBCol>
									</MDBRow>
									<MDBRow center>
										<MDBCol sm='3'>
											<MDBInput
												name='prices'
												label='Price'
												value={prices}
												onChange={this.handleInputChange}
												type='number'
											/>
										</MDBCol>
										<MDBCol sm='1'>
											<MDBIcon icon='times' />
										</MDBCol>
										<MDBCol sm='3'>
											<MDBInput
												name='minimum'
												value={minimum}
												onChange={this.handleInputChange}
												type='number'
												label='Minimum time'
											/>
										</MDBCol>

										<MDBCol sm='1'>
											<MDBIcon icon='equals' />
										</MDBCol>

										<MDBCol sm='3'>
											<MDBInput
												labelClass='active'
												name='total'
												value={this.addTotal(this.state.prices, this.state.minimum)}
												label='Total'
												icon=''
											/>
										</MDBCol>
									</MDBRow>

									{/* Should Location Title or Location Input button be Displayed? */}
									{this.toggleLocationNameEdit(disabled)}

									{/**Billing location information */}
									<MDBRow>
										<MDBCol size='12'>
											<MDBInput
												outline={outlined}
												name='address'
												value={address}
												label='Street Address'
												size='sm'
												disabled={disabled}
												type='text'
												onChange={this.handleInputChange}
											/>
										</MDBCol>

										<MDBCol size='4'>
											<MDBInput
												outline={outlined}
												name='city'
												value={city}
												label='City'
												disabled={disabled}
												size='sm'
												type='text'
												onChange={this.handleInputChange}
											/>
										</MDBCol>

										<MDBCol size='4'>
											<MDBInput
												outline={outlined}
												name='state'
												value={state}
												label='State'
												disabled={disabled}
												size='sm'
												type='text'
												onChange={this.handleInputChange}
											/>
										</MDBCol>

										<MDBCol size='4'>
											<MDBInput
												outline={outlined}
												name='zipCode'
												value={zipCode}
												label='Zip Code'
												disabled={disabled}
												size='sm'
												type='text'
												onChange={this.handleInputChange}
											/>
										</MDBCol>
									</MDBRow>
								</MDBContainer>
							</MDBModalBody>
						</Print>
					</PrintProvider>
					<MDBModalFooter>
						{/* Should Edit or cancel changes button be Displayed? */}
						{this.toggleEditButton(disabled)}

						{/* Should Close or Save button be Displayed? */}
						{this.toggleCloseButton(disabled)}
					</MDBModalFooter>
				</MDBModal>
				<ToastContainer hideProgressBar={true} newestOnTop={true} autoClose={5000} />
			</MDBContainer>
		);
	}
}
export default ModalProfile;

/**Completed by full stack developer Tim Westberg, before making changes to this code please contact TimWestberg@formaulgen.com  */
