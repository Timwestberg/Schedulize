import axios from 'axios';

// const API_KEY2 = googleMaps.key;

export default {
	// searchClients: function(query) {
	// 	return axios.get('/api/clients/params?query=' + query);
	// },

	// searchContractors: function(query) {
	// 	return axios.get('/api/contractors/params?query=' + query);
	// },

	// // Gets all Appointments
	// searchAppts: function(query) {
	// 	return axios.get('/api/appointments/params?query=' + query);
	// },

	populateInterpreters: function() {
		return axios.get('/api/appointments/interpreter');
	},

	assignInterpreters: function() {
		return axios.post('/api/appointments/interpreter');
	},

	// Gets all clients
	getClients: function() {
		return axios.get('/api/clients');
	},
	//
	// getKeys: function() {
	// 	return axios.get('/api/key');
	// },

	getKeys: function() {
		return axios.get('/api/key');
	},
	getClient: function(id) {
		return axios.get('/api/clients/' + id);
	},
	// Gets all appts
	getAppts: function() {
		return axios.get('/api/appointments');
	},
	getAppt: function(id) {
		return axios.get('/api/appointments/' + id);
	},
	// Gets all Contractors
	getContractors: function() {
		return axios.get('/api/contractors');
	},
	//Gets the contractor with the given id
	getContractor: function(id) {
		return axios.get('/api/contractors/' + id);
	},

	updateClient: function(_id, changes) {
		return axios.put('/api/clients/' + _id, changes);
	},

	updateAppt: function(_id, changes) {
		return axios.put('/api/appointments/' + _id, changes);
	},
	updateContractor: function(_id, changes) {
		return axios.put('/api/contractors/' + _id, changes);
	},

	//Saves a client to the database
	saveClient: function(clientData) {
		return axios.post('/api/clients', clientData);
	},
	//Saves a contractor to the database
	saveContractor: function(apptData) {
		return axios.post('/api/contractors', apptData);
	},
	// Saves a User to the database
	SaveUser: function(UserData) {
		return axios.post('/auth/register', UserData);
	},
	//Saves an appt to the database
	saveAppt: function(apptData) {
		return axios.post('/api/appointments', apptData);
	},
	//Deletes the appt with the give id
	deleteAppt: function(id) {
		return axios.delete('/api/appointments/' + id);
	},
	//Deletes the client with the give id
	deleteClient: function(id) {
		return axios.delete('/api/clients/' + id);
	},
	//Deletes the contractor with the give id
	deleteContractor: function(id) {
		return axios.delete('/api/contractors/' + id);
	},
	//Deletes user from database
	deleteUser: function(id) {
		return axios.delete('/auth/users/' + id);
	},
	LoginUser: function(UserData) {
		return axios.post('/auth/login', UserData);
	},
	//Geocode API
	getGeocode: function(address) {
		return axios.get(
			'https://maps.googleapis.com/maps/api/geocode/json?address=' +
				address +
				'&key=AIzaSyAHxDllLkfADecPsdprZqFp4UOuKZRlAk8'
		);
	}
};
