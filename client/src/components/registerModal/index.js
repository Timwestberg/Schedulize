import React from 'react';
import {
	MDBNavbar,
	MDBNavbarBrand,
	MDBNavbarNav,
	MDBNavItem,
	MDBNavLink,
	MDBFormInline,
	MDBCollapse,
	MDBContainer,
	MDBNavbarToggler,
	MDBRow,
	MDBCol,
	MDBCard,
	MDBCardBody,
	MDBMask,
	MDBInput,
	MDBIcon,
	MDBView,
	MDBBtn
} from 'mdbreact';
import './style.css';
// import WebAppNav from '../webAppNavBar/index';
class Register extends React.Component {
	state = {
		collapseID: ''
	};

	toggleCollapse = (collapseID) => () =>
		this.setState((prevState) => ({
			collapseID: prevState.collapseID !== collapseID ? collapseID : ''
		}));

	render() {
		return (
			<div id='register'>
				{/* <WebAppNav className='WebNavBar' /> */}
				<MDBMask className='d-flex justify-content-center align-items-center' overlay='gradient'>
					<MDBContainer className='h-100 d-flex justify-content-center align-items-center'>
						<MDBRow>
							<MDBCol md='12' className='mt-5 mx-auto'>
								<MDBCard>
									<MDBCardBody>
										<h2 className='font-weight-bold my-4 text-center mb-5 mt-4 font-weight-bold'>
											<strong>REGISTER</strong>
										</h2>
										<hr />
										<MDBRow className='mt-5'>
											<MDBCol md='6' className='ml-lg-5 ml-md-3'>
												<MDBRow className='pb-4'>
													<MDBCol size='2' lg='1'>
														<MDBIcon icon='user' size='lg' className='indigo-text' />
													</MDBCol>
													<MDBCol col='10'>
														<h4 className='font-weight-bold mb-4'>
															<strong>Username</strong>
														</h4>
														<p className=''>
															<ol>
																<li>Your Username must be atleast 6 characters</li>
																<li>Your Username must contain atleast 1 number</li>
																<li>Please choose a Username that reflects your name</li>
																<hr />
																<section>Example: "JohnnyB12"</section>
															</ol>
														</p>
													</MDBCol>
												</MDBRow>
												<MDBRow className='pb-4'>
													<MDBCol size='2' lg='1'>
														<MDBIcon icon='lock' className='deep-purple-text fa-lg' />
													</MDBCol>
													<MDBCol col='10'>
														<h4 className='font-weight-bold mb-4'>
															<strong>Password</strong>
														</h4>
														<p className=''>
															<ol>
																<li>Your password must be 8 or more characters</li>
																<li>Your password must contain 1 number</li>
																<li>
																	Your password must contain 1 special character <br /> "[ ? / ~ # ` !
																	@ $ % ^ & * etc..."
																	<hr />
																	Example: "Under$cover7"
																</li>
															</ol>
														</p>
													</MDBCol>
												</MDBRow>
												<MDBRow className='pb-4'>
													<MDBCol size='2' lg='1'>
														<MDBIcon icon='money-bill-alt' className='purple-text fa-lg' />
													</MDBCol>
													<MDBCol col='10'>
														<h4 className='font-weight-bold mb-4'>
															<strong>Tips</strong>
														</h4>
														<p className=''>
															Use programs such as <a href='https://www.lastpass.com/'>LastPass</a> to
															save all your passwords securely.
														</p>
													</MDBCol>
												</MDBRow>
											</MDBCol>

											<MDBCol md='5'>
												<MDBRow className='pb-4 d-flex justify-content-center mb-4'>
													<h4 className='mt-3 mr-4'>
														<strong>Register credentials with:</strong>
													</h4>
												</MDBRow>
												<form onSubmit={this.props.onSubmit}>
													<MDBInput
														type='text'
														name='name'
														label='Your name'
														icon='user-tie'
														onChange={this.props.onChange}
														value={this.props.user.name}
													/>
													<MDBInput
														type='text'
														name='username'
														label='Your username'
														icon='user'
														onChange={this.props.onChange}
														value={this.props.user.username}
													/>
													<MDBInput
														type='password'
														name='password'
														label='Your password'
														icon='lock'
														onChange={this.props.onChange}
														value={this.props.user.password}
													/>
													<div className='text-center'>
														<MDBBtn type='submit' color='indigo' rounded>
															Register
														</MDBBtn>
													</div>
												</form>
											</MDBCol>
										</MDBRow>
									</MDBCardBody>
								</MDBCard>
							</MDBCol>
						</MDBRow>
					</MDBContainer>
				</MDBMask>
			</div>
		);
	}
}

export default Register;
