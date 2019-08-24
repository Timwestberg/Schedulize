const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contractorSchema = new Schema({
	// Contractor's First Name
	markerType: {
		type: String,
		default: 'contractor',
		required: true
	},
	contractorFirst: {
		type: String,
		trim: true
	},
	// Contractor's Last Name
	contractorLast: {
		type: String,
		trim: true
	},
	// Contractor's Phone Number
	contractorPhone: {
		type: Number,
		maxlength: 12,
		minlength: 9,
		trim: true
	},
	contractorOtherPhone: {
		type: Number,
		maxlength: 12,
		minlength: 9,
		trim: true
	},
	// Contractor's E-mail
	contractorEmail: {
		type: String,
		lowercase: true,
		// required: [true, "can't be blank"],
		trim: true,
		match: [ /\S+@\S+\.\S+/, 'is invalid' ],
		index: true
	},
	contractorLanguage: {
		type: String,
		trim: true
	},
	// Certification of contractor|| IE: "Medical" , "Legal", "Qualified" ||
	certification: {
		type: Boolean,
		trim: true
	},
	certificationNumber: {
		type: String,
		trim: true
	},
	type: {
		type: Array,
		trim: true
	},
	// How contractor ranks among other's within the agency ||IE: "Preferred", "Not in Use", "Back-up" ||
	standing: {
		type: String,
		trim: true
	},
	// Typical Price of interpreter per appointment
	pricing: {
		type: String,
		trim: true
	},
	minimum: {
		type: String,
		trim: true
	},
	totalPrice: {
		type: Number,
		trim: true
	},
	// Notes regarding the contractor
	notes: {
		type: String
	},
	// Contractor's Information for the database, Location used for plotting interpreter onto Map
	locationName: {
		type: String,
		trim: true
	},
	address: {
		type: String,
		trim: true
	},
	city: {
		type: String,
		trim: true
	},
	state: {
		type: String,
		trim: true
	},
	postalCode: {
		type: Number,
		trim: true
	},
	// Does Contractor have an updated W-9 on File
	w9: {
		type: Boolean
	},
	// For Payroll purposes, reference all appointments a contractor as previously completed
	appointments: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Appointment'
		}
	]
});

const Contractor = mongoose.model('Contractor', contractorSchema);

module.exports = Contractor;
