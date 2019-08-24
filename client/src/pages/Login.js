import React from 'react';
import SignIn from '../components/loginModal';
import PropTypes from 'prop-types';
import API from '../utils/API';
import './style.css';

class LoginPage extends React.Component {
	/**
   * Class constructor.
   */

	constructor(props) {
		super(props);

		// set the initial component state
		this.state = {
			user: {
				username: '',

				password: ''
			},
			// FirstWay
			//   redirect: `/addressbook`
			// Second Way
			redirect: `/calendar`
		};

		this.processForm = this.processForm.bind(this);

		this.changeUser = this.changeUser.bind(this);
	}

	/**
   * Change the user object.
   *
   * @param {object} event - the JavaScript event object
   */
	changeUser(event) {
		const field = event.target.name;

		const user = this.state.user;

		user[field] = event.target.value;

		this.setState({
			user
		});
		// console.log(this.state);
	}

	processForm(event) {
		// prevent default action. in this case, action is the form submission event
		event.preventDefault();

		console.log(this.state.user);

		// Login routes from Utility
		API.LoginUser({
			username: this.state.user.username,
			password: this.state.user.password
		})
			.then((res) => {
				if (res.data.status === 'Authorized') {
					window.location.pathname = res.data.redirect;
				} else if (res.data.status === 'Unauthorized') {
					window.location.pathname = res.data.redirect;
				}
				// window.location.pathname = '/';
			})
			.catch();
	}

	/**
   * Render the component.
   */
	render() {
		return (
			<main>
				<SignIn submit={this.processForm} onChange={this.changeUser} user={this.state.user} />
			</main>
		);
	}
}

LoginPage.contextTypes = {
	router: PropTypes.object.isRequired
};

export default LoginPage;
