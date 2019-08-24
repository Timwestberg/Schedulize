import React, { Fragment, Component } from 'react';
import { MDBBtn, MDBModal, MDBModalHeader, MDBModalBody, MDBIcon, MDBInput } from 'mdbreact';
// const nodemailer = require('nodemailer');

class EmailModal extends Component {
	constructor(props) {
		super(props);

		this.state = {
			modal: this.props.modal,
			interpreterName: '',
			interpreterEmail: '',
			subject: '',
			message: ''
		};
	}

	toggleEmailModal = () => {
		this.props.toggle();
	};

	// emailAppt = () => {
	// 	// create reusable transporter object using the default SMTP transport
	// 	let transporter = nodemailer.createTransport({
	// 		name: 'www.ocinterpreting.com',
	// 		host: 'box727.bluehost.com ',
	// 		port: 465,
	// 		secure: true,
	// 		auth: {
	// 			user: 'oci@ocinterpreting.com',
	// 			pass: 'TempPassword66$$'
	// 		}
	// 	});

	// 	// send mail with defined transport object
	// 	let info = transporter.sendMail({
	// 		from: '"O.C. Interpreting Agency" <oci@ocinterpreting.com>', // sender address
	// 		to: this.state.interpreterEmail, // list of receivers
	// 		subject: this.state.subject, // Subject line
	// 		html: this.state.message // html body
	// 	});

	// 	console.log('Message sent: %s', info.messageId);
	// 	// Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
	// };
	// Handles the update field function
	handleInputChange(event) {
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;

		this.setState({
			[name]: value
		});
	}

	render() {
		const { interpreterEmail, interpreterName } = this.state;
		return (
			<MDBModal isOpen={this.state.modal} toggle={this.toggleEmailModal()} cascading>
				<MDBModalHeader toggle={this.toggleEmailModal()} className='light-blue darken-3 white-text'>
					<MDBIcon icon='envelope' className='mr-2' /> {'Email Assignment'}
				</MDBModalHeader>
				<MDBModalBody className='mb-0'>
					<MDBInput
						name='interpreterName'
						label='Interpreter Name'
						type='text'
						value={interpreterName}
						onChange={this.handleInputChange}
						icon='user'
					/>
					<MDBInput
						name='interpreterEmail'
						label='Interpreter Email'
						type='email'
						onChange={this.handleInputChange}
						icon='envelope'
					/>

					<MDBInput name='subject' label='subject' type='text' onChange={this.handleInputChange} icon='tag' />
					<MDBInput
						name='message'
						label='Your message'
						type='textarea'
						onChange={this.handleInputChange}
						icon='pencil-alt'
					/>

					<div className='text-center mb-1-half'>
						<MDBBtn color='info' className='mb-2'>
							Send
							<MDBIcon icon='send' className='ml-1' />
						</MDBBtn>
					</div>
				</MDBModalBody>
			</MDBModal>
		);
	}
}
export default EmailModal;
