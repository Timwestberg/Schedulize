const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const clientSchema = new Schema({
	//  Client custom ID for tracking
	clientID: {
		type: Number,
		// maxlength: 12,
		// minlength: 8,
		trim: true
	},
	// Client's First Name seperated
	clientFirst: {
		type: String,
		trim: true
	},
	// Client's Last Name seperated
	clientLast: {
		type: String,
		trim: true
	},
	// Client's Phone Number
	// Includes Min and Max Length validation
	clientPhone: {
		type: Number,
		// maxlength: 12,
		// minlength: 9,
		trim: true
	},
	// Client's Email Address
	// Includes Email validation and requires the field to not be blank
	clientEmail: {
		type: String,
		lowercase: true,
		// required: [ true, "can't be blank" ],
		match: [ /\S+@\S+\.\S+/, 'is invalid' ],
		index: true,
		trim: true
	},
	// Position of client within their respective company
	position: {
		type: String,
		trim: true
	},
	// Any notes needed for the client's file
	notes: {
		type: String,
		// required: false,
		trim: true
	},
	// Company client is mainly representing
	companyName: {
		type: String,
		trim: true
	},
	// Main Phone number for the company the client is representing
	mainPhone: {
		type: Number,
		// maxlength: 12,
		// minlength: 9,
		trim: true
	},
	// Type of client IE: || Insurance || Investigation || ...
	clientType: {
		type: String,
		trim: true
	},
	// Main billing information for the client

	// Billing Contact Name
	contactName: {
		type: String,
		trim: true
	},
	// Phone Number in case of Billing questions
	billingPhone: {
		type: String,
		// maxlength: 12,
		// minlength: 9,
		trim: true
	},
	// Email to send invoices to or other billing related questions
	billingEmail: {
		type: String,
		lowercase: true,
		// required: [ true, "can't be blank" ],
		match: [ /\S+@\S+\.\S+/, 'is invalid' ],
		index: true,
		trim: true
	},
	// Name to refer to billing location IE: "Headquarters"
	locationName: {
		type: String,
		trim: true
	},
	// Street Address
	address: {
		type: String,
		trim: true
	},
	// City Name
	city: {
		type: String,
		trim: true
	},
	// State Name
	// Includes Min and Max for validation
	state: {
		type: String,
		// maxlength: 5,
		// minlength: 2,
		trim: true
	},
	// Zip code of Billing Location
	// Includes Min and Max for Validation
	zipCode: {
		type: Number,
		// maxlength: 5,
		// minlength: 5,
		trim: true
	},
	// Name of service being priced
	services: {
		type: String,
		trim: true
	},
	// Price of typical charge to the client for services
	prices: {
		type: String,
		// required: false,
		trim: true
	},
	minimum: {
		type: String,
		// required: false,
		trim: true
	}
});

// Set a varibale to call the model
const Client = mongoose.model('Client', clientSchema);

// Export client Model Variable
module.exports = Client;

// Completed by Tim Westberg, Please contact before making adjustments
