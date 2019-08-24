import React from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBSelect, MDBBtn, MDBIcon, ToastContainer, toast } from 'mdbreact';
import API from '../../utils/API';
import './style.css';
class ClientForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			clientNotification: '',
			clientFirst: '',
			clientLast: '',
			clientPhone: '',
			clientEmail: '',
			position: '',
			notes: '',
			companyName: '',
			companyMainPhone: '',
			clientType: '',
			contactName: '',
			billingPhone: '',
			billingEmail: '',
			locationName: '',
			address: '',
			city: '',
			state: '',
			zipCode: '',
			services: '',
			prices: '',
			minimum: '',
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

	// Handles the update field function
	handleInputChange(event) {
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;

		this.setState({
			[name]: value
		});
		console.log(this.state);
	}

	handleSelectChange(event) {
		const target = event.target;
		const value = target.selected;
		const name = target.name;

		this.setState({
			[name]: value
		});
		console.log(this.state);
	}

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

	clientFormSubmit = (event) => {
		event.preventDefault();

		API.saveClient({
			clientFirst: this.state.clientFirst,
			clientLast: this.state.clientLast,
			clientPhone: this.state.clientPhone,
			clientEmail: this.state.clientEmail,
			position: this.state.position,
			notes: this.state.notes,
			companyName: this.state.companyName,
			companyMainPhone: this.state.companyMainPhone,
			clientType: this.state.clientType,
			contactName: this.state.contactName,
			billingPhone: this.state.billingPhone,
			billingEmail: this.state.billingEmail,
			locationName: this.state.locationName,
			address: this.state.address,
			city: this.state.city,
			state: this.state.state,
			zipCode: this.state.zipCode,
			services: this.state.services,
			prices: this.state.prices
		})
			.then((res) => {
				console.log(res.data);
				this.setState({
					// clientNotification: '200',
					clientFirst: '',
					clientLast: '',
					clientPhone: '',
					clientEmail: '',
					position: '',
					notes: '',
					companyName: '',
					companyMainPhone: '',
					clientType: '',
					contactName: '',
					billingPhone: '',
					billingEmail: '',
					locationName: '',
					address: '',
					city: '',
					state: '',
					zipCode: '',
					services: '',
					prices: '',
					minimum: ''
				});
				this.clientNotification('200');
				setTimeout(() => window.location.reload(), 1000);
			})
			.catch((err) => {
				// this.setState({ clientNotification: '422' });
				this.clientNotification('422');
				console.log(err);
			});
	};
	/**Add final total for Phone conference with optional fees  */
	addTotal = (price, minimum) => {
		let a = price;
		let b = minimum;
		let c = a * b;
		return c;
	};

	/**Function for displaying the correct notfication flag  */
	clientNotification = (clientNotification) => {
		// const { clientNotification } = this.state;
		if (clientNotification === '200') {
			toast.success('Client Saved!', {
				position: 'top-right'
			});
			this.setState({ clientNotification: '' });
			console.log({ clientNotification });
		}
		if (clientNotification === '422') {
			toast.error('Error saving, check inputs');
			this.setState({ clientNotification: '' });
			console.log({ clientNotification });
			//   this.setState({ clientNotification: "" });
		}
	};

	componentDidMount = () => {
		// console.log('Client Did Mount');
	};

	componentDidUpdate = () => {
		// const { clientNotification } = this.state;
		// console.log('Client Did Update');
		// console.log({ clientNotification });
	};

	componentWillUnmount = () => {
		// const { clientNotification } = this.state;
		// this.setState({ clientNotification: '' });
		// console.log('Client Did Unmount');
		// console.log({ clientNotification });
	};

	render() {
		const {
			clientFirst,
			clientLast,
			clientPhone,
			clientEmail,
			position,
			notes,
			companyName,
			companyMainPhone,
			clientType,
			contactName,
			billingPhone,
			billingEmail,
			locationName,
			address,
			city,
			state,
			zipCode,
			services,
			prices,
			optionsType
		} = this.state;

		// this.clientNotification();
		return (
			<MDBContainer>
				<form onSubmit={this.clientFormSubmit}>
					<MDBRow center>
						<MDBCol lg='6' md='6'>
							<MDBInput
								size='lg'
								name='clientFirst'
								value={clientFirst}
								label='First Name'
								icon=''
								onChange={this.handleInputChange}
							/>
						</MDBCol>
						<MDBCol lg='6' md='6'>
							<MDBInput
								size='lg'
								name='clientLast'
								value={clientLast}
								label='Last Name'
								icon=''
								onChange={this.handleInputChange}
							/>
						</MDBCol>
						<MDBCol lg='6' md='6'>
							<MDBInput
								size='lg'
								name='clientPhone'
								value={this.formatPhoneNumber(clientPhone)}
								label='Phone #'
								icon=''
								onChange={this.handleInputChange}
							/>
						</MDBCol>
						<MDBCol lg='6' md='6'>
							<MDBInput
								size='lg'
								name='clientEmail'
								value={clientEmail}
								label='Email'
								icon=''
								onChange={this.handleInputChange}
							/>
						</MDBCol>
						<MDBCol lg='6' md='6'>
							<MDBInput
								name='position'
								value={position}
								label='Position'
								icon=''
								onChange={this.handleInputChange}
							/>
						</MDBCol>
						<MDBCol lg='10' md='12'>
							<MDBInput
								size='lg'
								name='notes'
								value={notes}
								type='textarea'
								label='Notes'
								icon=''
								onChange={this.handleInputChange}
							/>
						</MDBCol>
					</MDBRow>
					<MDBRow center>
						<MDBCol lg='6' md='6'>
							<MDBInput
								size='lg'
								name='companyName'
								value={companyName}
								label='Company Name'
								icon=''
								onChange={this.handleInputChange}
							/>
						</MDBCol>
						<MDBCol lg='6' md='6'>
							<MDBInput
								size='lg'
								name='companyMainPhone'
								value={this.formatPhoneNumber(companyMainPhone)}
								label='Company Main Phone #'
								icon=''
								onChange={this.handleInputChange}
							/>
						</MDBCol>
					</MDBRow>
					<MDBRow center>
						<MDBCol lg='4' md='6'>
							<MDBSelect
								size='lg'
								color='primary'
								name='clientType'
								value={clientType}
								label='Client Type'
								options={optionsType}
								icon=''
								onChange={this.handleInputChange}
							/>
							<label>Client Type</label>
						</MDBCol>
						<MDBCol lg='4' md='6'>
							<MDBInput
								size='lg'
								name='contactName'
								value={contactName}
								label='Contact Name'
								icon=''
								onChange={this.handleInputChange}
							/>
						</MDBCol>
						<MDBCol lg='4' md='6'>
							<MDBInput
								size='lg'
								name='billingPhone'
								value={this.formatPhoneNumber(billingPhone)}
								label='Billing Phone'
								icon=''
								onChange={this.handleInputChange}
							/>
						</MDBCol>
						<MDBCol lg='4' md='6'>
							<MDBInput
								size='lg'
								name='billingEmail'
								value={billingEmail}
								label='Billing Email'
								icon=''
								onChange={this.handleInputChange}
							/>
						</MDBCol>
					</MDBRow>
					<MDBRow center>
						<MDBCol lg='6' md='6'>
							<MDBInput
								size='lg'
								name='locationName'
								value={locationName}
								label='Location Name'
								icon=''
								onChange={this.handleInputChange}
							/>
						</MDBCol>
						<MDBCol lg='6' md='6'>
							<MDBInput
								size='lg'
								name='address'
								value={address}
								label='Address'
								icon=''
								onChange={this.handleInputChange}
							/>
						</MDBCol>
					</MDBRow>
					<MDBRow center>
						<MDBCol lg='4' md='6'>
							<MDBInput
								size='lg'
								name='city'
								value={city}
								label='City'
								icon=''
								onChange={this.handleInputChange}
							/>
						</MDBCol>
						<MDBCol lg='4' md='6'>
							<MDBInput
								size='lg'
								name='state'
								value={state}
								label='State'
								icon=''
								onChange={this.handleInputChange}
							/>
						</MDBCol>
						<MDBCol lg='4' md='6'>
							<MDBInput
								size='lg'
								name='zipCode'
								value={zipCode}
								label='Postal Code'
								icon=''
								onChange={this.handleInputChange}
							/>
						</MDBCol>
					</MDBRow>
					<MDBRow center>
						<MDBCol sm='3'>
							<MDBInput
								size='lg'
								name='prices'
								label='Price'
								value={this.state.prices}
								onChange={this.handleInputChange}
								type='number'
							/>
						</MDBCol>
						<MDBCol sm='1'>
							<MDBIcon icon='times' />
						</MDBCol>
						<MDBCol sm='3'>
							<MDBInput
								size='lg'
								name='minimum'
								value={this.state.minimum}
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
								size='lg'
								labelClass='active'
								name='total'
								value={this.addTotal(this.state.prices, this.state.minimum)}
								label='Total'
								icon=''
							/>
						</MDBCol>
					</MDBRow>
					<MDBRow center>
						<MDBBtn type='submit'>Submit</MDBBtn>
					</MDBRow>
				</form>
				<ToastContainer hideProgressBar={true} newestOnTop={true} autoClose={3000} />
			</MDBContainer>
		);
	}
}

export default ClientForm;
