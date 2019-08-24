const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const apptSchema = new Schema({
	// Date appointment is being received
	markerType: {
		type: String,
		default: 'appointment'
		// required: true
	},
	repName: {
		type: String,
		trim: true
	},
	dateAssigned: {
		type: String,
		default: Date.now,
		trim: true
	},
	// Date appointment is taking place
	apptDate: {
		required: true,
		type: Date,
		trim: true,
		default: '01/01/1901'
	},
	//How the appointment was received
	receivedBy: {
		type: String,
		trim: true
	},
	//Time of appt
	earlyArrival: {
		type: Boolean,
		default: false,
		trim: true
	},
	startTime: {
		type: String,
		trim: true
	},
	//Time of appt
	apptTime: {
		type: String,
		trim: true,
		default: '01:00',
		required: true
	},
	// End Time of the appointment
	endTime: {
		type: String,
		trim: true
	},
	//Information of person assigning the appointment
	// Serperated into first Name
	assigneeFirst: {
		type: String,
		// required: true,
		trim: true
	},
	// Serperated into last Name
	assigneeLast: {
		type: String,
		// required: true,
		trim: true
	},
	// Where assignee is calling from
	assigneeCompany: {
		type: String,
		// required: true,
		trim: true
	},
	// Phone number of individual booking appointment
	assigneePhone: {
		type: Number,
		// required: true,
		maxlength: 12,
		// minlength: 9,
		trim: true
	},
	// Information of adjuster for the case
	adjusterFirst: {
		type: String,
		trim: true
	},
	// Serperated adjuster last Name
	adjusterLast: {
		type: String,
		trim: true
	},
	// Adjuster Company
	adjusterCompany: {
		type: String,
		trim: true
	},
	// Adjuster Phone Number
	adjusterPhone: {
		type: Number,
		maxlength: 10,
		// minlength: 9,
		trim: true
	},
	// Reference name for the case/file being worked on
	refName: {
		type: String,
		trim: true
	},
	// Reference number IE: "Order Number" || "Claim Number"
	refNumber: {
		type: String,
		trim: true
	},
	// Date of Injury || Date of Loss
	// Custom Field for OC Agency
	doi: {
		type: String,
		trim: true
	},
	dob: {
		type: String,
		trim: true
	},
	// Is the file represented by an attorney
	// Custom field for OC Agency
	litigated: {
		type: Boolean
		// required: true
	},
	// Notes on the appointment
	notes: {
		type: String
	},
	// What language will eb primarily be needed
	// Custom field for OC Agency
	language: {
		type: String,
		trim: true
	},
	// Type of appointment
	assignmentType: {
		type: String,
		trim: true
	},
	// Name of the Location where assignment will be taking place
	locationName: {
		type: String,
		trim: true
	},
	// Street Address
	address: {
		type: String,
		trim: true
	},
	//location city
	city: {
		type: String,
		trim: true
	},
	//location state
	// Includes Min and Max for validation
	state: {
		type: String,
		trim: true,
		maxlength: 5
		// minlength: 2
	},
	//location zip
	postalCode: {
		type: Number,
		maxlength: 5
		// minlength: 5
	},
	// Reference contractors information by model relation
	// `contractors` is an array that stores ObjectIds
	// The ref property links these ObjectIds to the Note model
	// This allows us to populate the User with any associated Notes
	contractors: {
		type: String,
		trim: true
	},
	// Price being build to Agency by contractor
	contractorPrice: {
		type: String,
		default: 0,
		trim: true
	},
	contractorMinimum: {
		type: String,
		trim: true
	},
	conPhone: {
		type: String,
		trim: true
	},
	conCert: {
		type: String,
		trim: true
	},
	// Date contractor accepted the assignment
	dateContractorAssigned: {
		type: String,
		trim: true
	},
	// Price being billed out to client
	appointmentPrice: {
		type: Number,
		default: 0,
		trim: true
	},
	ApptMinimum: {
		type: Number,
		trim: true
	},

	// Additional cost being past on by the contractor
	additionalCost: {
		type: Number,
		trim: true
	},
	// Status of appointment in scheduling procedure
	status: {
		type: String,
		trim: true
	},
	facility: {
		type: Boolean,
		trim: true,
		default: false
	},
	// Status of appointment in scheduling procedure
	billingStatus: {
		default: 'To be Billed',
		type: String,
		trim: true
	},
	statusReason: {
		type: String,
		trim: true
	},
	// Billing Contact Name
	billingContactName: {
		type: String,
		trim: true
	},
	// Phone Number in case of Billing questions
	billingPhone: {
		type: Number,
		maxlength: 12,
		// minlength: 9,
		trim: true
	},
	// Email to send invoices to or other billing related questions
	billingEmail: {
		type: String,
		lowercase: true,
		// required: [ true, "can't be blank" ],
		// match: [ /\S+@\S+\.\S+/, 'is invalid' ],
		index: true,
		trim: true
	},
	// Name to refer to billing location IE: "Headquarters"
	billingLocationName: {
		type: String,
		trim: true
	},
	// Street Address
	billingAddress: {
		type: String,
		trim: true
	},
	// City Name
	billingCity: {
		type: String,
		trim: true
	},
	// State Name
	// Includes Min and Max for validation
	billingState: {
		type: String,
		maxlength: 5,
		// minlength: 2,
		trim: true
	},
	// Zip code of Billing Location
	// Includes Min and Max for Validation
	billingZipCode: {
		type: Number,
		maxlength: 5,
		// minlength: 5,
		trim: true
	},
	// For Phone Conference appointments
	contractors: {
		type: String,
		trim: true
	},
	recipient: {
		type: String,
		trim: true
	},
	Length: {
		type: String,
		default: 0,
		trim: true
	},
	connection: {
		type: Boolean,
		default: 0,
		trim: true
	}
});

const Appointment = mongoose.model('Appointment', apptSchema);

module.exports = Appointment;

// Completed by Tim Westberg, Please contact before making adjustments
