import React from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBMask, MDBInput, MDBView, MDBBtn } from 'mdbreact';
import './style.css';
class Login extends React.Component {
	render() {
		return (
			<div className='classic-form-page' id='login'>
				<MDBView>
					<MDBMask className='d-flex justify-content-center align-items-center' overlay='stylish-strong'>
						<MDBContainer>
							<MDBRow>
								<MDBCol md='10' lg='6' xl='5' sm='12' className='mt-5 mx-auto'>
									<MDBCard>
										<MDBCardBody>
											<div className='form-header blue-gradient'>
												<h3>Agency Portal</h3>
											</div>
											<form onSubmit={this.props.submit}>
												<MDBInput
													type='text'
													label='Your username'
													icon='user'
													name='username'
													iconClass='white-text'
													onChange={this.props.onChange}
													value={this.props.user.username}
												/>
												<MDBInput
													name='password'
													type='password'
													label='Your password'
													icon='lock'
													iconClass='white-text'
													onChange={this.props.onChange}
													value={this.props.user.password}
												/>
												<div className='text-center mt-3 black-text'>
													<MDBBtn type='submit' className='blue-gradient' size='lg'>
														Log In
													</MDBBtn>
													<hr />
													<div className='text-center mt-3 black-text'>
														Dont have an account?
														<MDBBtn href='/adduser' className='blue-gradient' size='lg'>
															Register
														</MDBBtn>
													</div>
												</div>
											</form>
										</MDBCardBody>
									</MDBCard>
								</MDBCol>
							</MDBRow>
						</MDBContainer>
					</MDBMask>
				</MDBView>
			</div>
		);
	}
}

export default Login;
