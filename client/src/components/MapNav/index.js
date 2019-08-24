import React from 'react';
import {
	MDBIcon,
	MDBSideNavCat,
	MDBSideNavNav,
	MDBSideNav,
	MDBSideNavLink,
	MDBContainer,
	MDBRow,
	MDBBtn
} from 'mdbreact';
import InfoContainer from '../infoContainer/index';
class SideNavPage extends React.Component {
	state = {
		isOpen: true
	};

	handleToggle = () => {
		this.setState({
			isOpen: !this.state.isOpen
		});
	};

	render() {
		const { isOpen } = this.state;
		return (
			<MDBContainer>
				<MDBRow>
					<MDBBtn className='d-block d-md-none' onClick={this.handleToggle}>
						<MDBIcon icon='bars' size='2x' />
					</MDBBtn>
				</MDBRow>
				<MDBSideNav
					logo='https://mdbootstrap.com/img/logo/mdb-transparent.png'
					// hidden
					triggerOpening={isOpen}
					breakWidth={768}
					className='deep-purple darken-4'>
					<MDBSideNavNav>
						<InfoContainer />
					</MDBSideNavNav>
				</MDBSideNav>
			</MDBContainer>
		);
	}
}

export default SideNavPage;
