import React from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBSelect, MDBBtn, MDBIcon, toast, ToastContainer } from 'mdbreact';
import API from '../../utils/API';
class ContractorForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			contrNotification: '',
			contractorFirst: '',
			contractorLast: '',
			contractorPhone: '',
			contractorOtherPhone: '',
			contractorEmail: '',
			contractorLanguage: '',
			certification: false,
			certificationNumber: '',
			type: '',
			standing: '',
			pricing: '',
			totalPrice: '',
			minimum: '',
			notes: '',
			locationName: '',
			address: '',
			city: '',
			state: '',
			postalCode: '',
			w9: false,
			optionsLanguage: [
				{
					text: 'Other',
					value: '34'
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
					text: 'Burmese',
					value: '4'
				},
				{
					text: 'Cambodian',
					value: '5'
				},
				{
					text: 'Chinese-Mandarin',
					value: '6'
				},
				{
					text: 'Chinese-Cantonese',
					value: '7'
				},

				{
					text: 'Eastern Armenian',
					value: '8'
				},
				{
					text: 'Egyptian Spoken Arabic',
					value: '9'
				},
				{
					text: 'Farsi',
					value: '10'
				},
				{
					text: 'French',
					value: '11'
				},
				{
					text: 'German',
					value: '12'
				},
				{
					text: 'Hindu',
					value: '13'
				},
				{
					text: 'Indonesian',
					value: '14'
				},
				{
					text: 'Illocono',
					value: '15'
				},
				{
					text: 'Italian',
					value: '16'
				},
				{
					text: 'Japanese',
					value: '17'
				},
				{
					text: 'Korean',
					value: '18'
				},
				{
					text: 'Laotian',
					value: '19'
				},
				{
					text: 'Persian',
					value: '20'
				},
				{
					text: 'Polish',
					value: '21'
				},
				{
					text: 'Portuguese',
					value: '22'
				},
				{
					text: 'Punjabi',
					value: '23'
				},

				{
					text: 'Russian',
					value: '24'
				},
				{
					text: 'Sinhalese (Srilanka)',
					value: '25'
				},
				{
					text: 'Spanish',
					value: '26'
				},

				{
					text: 'Tagolog',
					value: '27'
				},
				{
					text: 'Tamil',
					value: '28'
				},
				{
					text: 'Thai',
					value: '29'
				},
				{
					text: 'Turkish',
					value: '30'
				},
				{
					text: 'Ukrainian',
					value: '31'
				},
				{
					text: 'Urdu',
					value: '32'
				},
				{
					text: 'Vietnamese',
					value: '33'
				}
			],
			optionsStanding: [
				{
					text: 'Preffered',
					value: '1'
				},
				{
					text: 'Good',
					value: '2'
				},
				{
					text: 'New',
					value: '3'
				},
				{
					text: 'Do not Use',
					value: '4'
				}
			],
			optionsType: [
				{
					text: 'Statements',
					value: '1'
				},
				{
					text: 'Qualified Medical',
					value: '2'
				},
				{
					text: 'Certified Medical',
					value: '3'
				},
				{
					text: 'Certified Legal',
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
	/** Funcition for handling select change for assignment type input */
	handleLangaugeChange = (value) => {
		this.setState({
			contractorLanguage: value
		});
	};

	handleSelectChange(event) {
		const target = event.target;
		const value = target.selected;
		const name = target.name;

		this.setState({
			[name]: value
		});
		console.log(this.state);
	}

	/** Function for handling select change for Contractor type input */
	handleCertTypeChange = (value) => {
		this.setState({
			type: value
		});
	};

	/** Function for handling select change for contractor standing input */
	handleStandingChange = (value) => {
		this.setState({
			standing: value
		});
	};

	calcContractorPrice = () => {
		const { minimum, pricing } = this.state;
		const Total = this.addTotal(pricing, minimum);
		this.setState({
			totalPrice: Total
		});

		// return Total;
	};

	/**Adds the tota; together for the contractor price  */
	addTotal = (price, ContractorMinimum) => {
		let a = price;
		let b = ContractorMinimum;
		let c = parseFloat(a) * parseFloat(b);
		return c;
	};

	contrFormSubmit = (event) => {
		event.preventDefault();

		API.saveContractor({
			contractorFirst: this.state.contractorFirst,
			contractorLast: this.state.contractorLast,
			contractorPhone: this.state.contractorPhone,
			contractorOtherPhone: this.state.contractorOtherPhone,
			contractorEmail: this.state.contractorEmail,
			contractorLanguage: this.state.contractorLanguage,
			certification: this.state.certification,
			certificationNumber: this.state.certificationNumber,
			minimum: this.state.minimum,
			type: [ this.state.type ],
			standing: this.state.standing,
			pricing: this.state.pricing,
			totalPrice: this.addTotal(this.state.pricing, this.state.minimum),
			notes: this.state.notes,
			locationName: this.state.locationName,
			address: this.state.address,
			city: this.state.city,
			state: this.state.state,
			postalCode: this.state.postalCode,
			w9: this.state.w9
		})
			.then((res) => {
				console.log(res.data);
				this.setState({
					// contrNotification: '200',
					contractorFirst: '',
					contractorLast: '',
					contractorPhone: '',
					contractorOtherPhone: '',
					contractorEmail: '',
					contractorLanguage: '',
					certification: false,
					certificationNumber: '',
					minimum: '',
					type: '',
					standing: '',
					pricing: '',
					totalPrice: '',
					notes: '',
					locationName: '',
					address: '',
					city: '',
					state: '',
					postalCode: '',
					w9: ''
				});
				this.contrNotification('200');
				setTimeout(() => window.location.reload(), 1000);
			})
			.catch((err) => {
				console.log(err);

				this.contrNotification('422');
			});
	};
	/**Function for displaying the correct notfication flag  */
	contrNotification = (contrNotification) => {
		// const { contrNotification } = this.state;
		if (contrNotification === '200') {
			toast.success('Contractor Saved!', {
				position: 'top-right'
			});
			this.setState({ contrNotification: '' });
			console.log({ contrNotification });
		}
		if (contrNotification === '422') {
			toast.error('Error Please Check Inputs');
			this.setState({ contrNotification: '' });
			console.log({ contrNotification });
			//   this.setState({ contrNotification: "" });
		}
	};

	render() {
		const {
			contractorFirst,
			contractorLast,
			contractorPhone,
			contractorOtherPhone,
			contractorEmail,
			contractorLanguage,
			certification,
			certificationNumber,
			type,
			standing,
			pricing,
			notes,
			locationName,
			address,
			city,
			state,
			postalCode,
			w9,
			optionsStanding,
			optionsType,
			minimum
		} = this.state;
		// this.calcContractorPrice();
		return (
			<MDBContainer>
				<form onSubmit={this.contrFormSubmit}>
					<MDBRow center>
						<MDBCol lg='6' md='6'>
							<MDBInput
								size='lg'
								name='contractorFirst'
								value={contractorFirst}
								label='First Name'
								icon=''
								onChange={this.handleInputChange}
							/>
						</MDBCol>
						<MDBCol lg='6' md='6'>
							<MDBInput
								size='lg'
								name='contractorLast'
								value={contractorLast}
								label='Last Name'
								icon=''
								onChange={this.handleInputChange}
							/>
						</MDBCol>
						<MDBCol lg='4' md='6'>
							<MDBInput
								size='lg'
								name='contractorPhone'
								value={this.formatPhoneNumber(contractorPhone)}
								label='Phone #'
								icon=''
								onChange={this.handleInputChange}
							/>
						</MDBCol>
						<MDBCol lg='4' md='6'>
							<MDBInput
								size='lg'
								name='contractorOtherPhone'
								value={this.formatPhoneNumber(contractorOtherPhone)}
								label='Other Phone #'
								icon=''
								onChange={this.handleInputChange}
							/>
						</MDBCol>
						<MDBCol lg='4' md='6'>
							<MDBInput
								size='lg'
								name='contractorEmail'
								value={contractorEmail}
								label='Email'
								icon=''
								onChange={this.handleInputChange}
							/>
						</MDBCol>
					</MDBRow>
					<MDBRow center>
						<MDBCol lg='4' md='6'>
							<MDBInput
								size='lg'
								id='checkbox1'
								name='certification'
								checked={certification}
								name='certification'
								type='checkbox'
								label='Certified'
								icon=''
								onChange={this.handleInputChange}
							/>
						</MDBCol>
						<MDBCol lg='4' md='6'>
							<MDBInput
								size='lg'
								name='certificationNumber'
								value={certificationNumber}
								label='Certification Number'
								icon=''
								onChange={this.handleInputChange}
							/>
						</MDBCol>
						<MDBCol lg='4' md='6'>
							<MDBSelect
								size='lg'
								multiple
								color='primary'
								name='type'
								selected='Choose'
								label='Type'
								icon=''
								options={optionsType}
								getTextContent={this.handleCertTypeChange}
							/>
							<label>Certification Type</label>
						</MDBCol>
						<MDBCol lg='4' md='6'>
							<MDBSelect
								size='lg'
								multiple
								search
								options={this.state.optionsLanguage}
								value={contractorLanguage}
								getTextContent={this.handleLangaugeChange}
								selected={'Choose Language'}
							/>
						</MDBCol>
						<MDBCol lg='4' md='6'>
							<MDBSelect
								size='lg'
								color='primary'
								name='standing'
								selected='choose'
								label='Standing'
								icon=''
								options={optionsStanding}
								getTextContent={this.handleStandingChange}
							/>
							<label>Standing</label>
						</MDBCol>
						<MDBRow center>
							<MDBCol sm='3'>
								<MDBInput
									size='lg'
									name='pricing'
									label='Price'
									value={pricing}
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
									size='lg'
									labelClass='active'
									name='totalPrice'
									value={this.addTotal(pricing, minimum)}
									label='Total'
									// onChange={this.calcContractorPrice}
								/>
							</MDBCol>
						</MDBRow>
					</MDBRow>
					<MDBRow center>
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
					<MDBRow>
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
						<MDBCol lg='3' md='6'>
							<MDBInput name='city' value={city} label='City' size='lg' onChange={this.handleInputChange} />
						</MDBCol>
						<MDBCol lg='3' md='6'>
							<MDBInput name='state' value={state} label='State' size='lg' onChange={this.handleInputChange} />
						</MDBCol>
						<MDBCol lg='3' md='6'>
							<MDBInput
								size='lg'
								name='postalCode'
								value={postalCode}
								label='Postal Code'
								icon=''
								onChange={this.handleInputChange}
							/>
						</MDBCol>
						<MDBCol lg='3' md='6'>
							<MDBInput
								size='lg'
								id='checkbox2'
								name='w9'
								type='checkbox'
								label='w9'
								icon=''
								checked={w9}
								onChange={this.handleInputChange}
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

export default ContractorForm;
