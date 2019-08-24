const mongoose = require('mongoose');
const db = require('../models');
var faker = require('faker');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/OCI-Project');

var randomFirst = faker.name.firstName; // Rowan
var randomLast = faker.name.lastName; // Nikolaus
var randomEmail = faker.internet.email(); // Kassandra.Haley@erich.biz
var randomPhone = faker.phone.phoneNumber;
var randomPosition = faker.company.bsAdjective;
var randomlocationName = faker.company.companyName;
var randomAddress = faker.address.streetAddress;
var randomCity = faker.address.city;
var randomState = faker.address.state;
var randomZip = faker.address.zipCode;
var randomText = faker.commerce.productName;

const keySeed = [
	{
		SecretID: 'AIzaSyBBdrrchiVVEcgcVy2ssar7l4Ypzz1-81I'
	}
];

// const clientSeed = [
// 	{
// 		clientFirst: 'Maria',
// 		clientLast: 'Clientson',
// 		clientPhone: 5556667777,
// 		clientEmail: 'client@email.com',
// 		position: 'Henchman',
// 		notes: 'these are notes',
// 		companyName: 'Big Company',
// 		mainPhone: 3332221111,
// 		clientType: 'Investigation',
// 		contactName: 'Comrad Conrad',
// 		billingPhone: '1112223333',
// 		billingEmail: 'billing@email.com',
// 		locationName: 'UCSD Extension',
// 		address: '6256 Greenwich Dr',
// 		city: ' San Diego',
// 		state: 'CA',
// 		zipCode: 92122,
// 		services: 'interpreting',
// 		prices: 50
// 	}
// ];

// const contractorSeed = [
// 	{
// 		contractorFirst: 'Seigfried',
// 		contractorLast: 'Contractorson',
// 		contractorPhone: 8883332222,
// 		contractorEmail: 'contractor@email.com',
// 		certification: 'legal',
// 		standing: 'good',
// 		pricing: '$200',
// 		notes: 'notes, notes, notes, notes, notes',
// 		locationName: 'UCSD',
// 		address: '9500 Gilman Dr',
// 		city: 'La Jolla',
// 		state: 'CA',
// 		postalCode: 92093,
// 		w9: true
// 	}
// ];

// const appointmentSeed = [
// 	{
// 		dateAssigned: '2019-02-09',
// 		apptDate: '2019-02-08',
// 		apptTime: new Date(),
// 		endTime: new Date(),
// 		assigneeFirst: 'randomFirst',
// 		assigneeLast: 'randomLast',
// 		assigneeCompany: 'randomlocationName',
// 		assigneePhone: 'randomPhone',
// 		adjusterFirst: 'randomFirst',
// 		adjusterLast: 'randomLast',
// 		adjusterCompany: 'randomlocationName',
// 		adjusterPhone: 1231231234,
// 		refName: 'sully' + 'randomLast',
// 		refNumber: 5,
// 		doi: new Date(),
// 		dob: new Date(),
// 		litigated: true,
// 		notes: 'A Quarter Mile at a Date ',
// 		language: 'spanish',
// 		assignmentType: 'legal',
// 		locationName: 'DSS',
// 		address: 'randomAddress',
// 		city: 'river',
// 		state: 'randomState',
// 		postalCode: 'randomZip',
// 		dateContractorAssigned: new Date(),
// 		appointmentPrice: '$500',
// 		contractorPrice: '$100',
// 		additionalCost: '$50',
// 		status: 'new appointment'
// 	},
// 	{
// 		dateAssigned: '2019-02-09',
// 		apptDate: '2019-02-08',
// 		apptTime: new Date(),
// 		endTime: new Date(),
// 		assigneeFirst: 'randomFirst',
// 		assigneeLast: 'randomLast',
// 		assigneeCompany: 'randomlocationName',
// 		assigneePhone: 'randomPhone',
// 		adjusterFirst: 'randomFirst',
// 		adjusterLast: 'randomLast',
// 		adjusterCompany: 'randomlocationName',
// 		adjusterPhone: 1231231234,
// 		refName: 'donny' + 'randomLast',
// 		refNumber: 5,
// 		doi: new Date(),
// 		dob: new Date(),
// 		litigated: true,
// 		notes: 'A Quarter Mile at a Date ',
// 		language: 'spanish',
// 		assignmentType: 'legal',
// 		locationName: 'DSS',
// 		address: 'randomAddress',
// 		city: 'jackson',
// 		state: 'randomState',
// 		postalCode: 'randomZip',
// 		dateContractorAssigned: new Date(),
// 		appointmentPrice: '$500',
// 		contractorPrice: '$100',
// 		additionalCost: '$50',
// 		status: 'new appointment'
// 	},
// 	{
// 		dateAssigned: '2019-02-09',
// 		apptDate: '2019-02-08',
// 		apptTime: new Date(),
// 		endTime: new Date(),
// 		assigneeFirst: 'randomFirst',
// 		assigneeLast: 'randomLast',
// 		assigneeCompany: 'randomlocationName',
// 		assigneePhone: 'randomPhone',
// 		adjusterFirst: 'randomFirst',
// 		adjusterLast: 'randomLast',
// 		adjusterCompany: 'randomlocationName',
// 		adjusterPhone: 1231231234,
// 		refName: 'maria' + 'randomLast',
// 		refNumber: 1,
// 		doi: new Date(),
// 		dob: new Date(),
// 		litigated: true,
// 		notes: 'A Quarter Mile at a Date ',
// 		language: 'spanish',
// 		assignmentType: 'legal',
// 		locationName: 'DSS',
// 		address: 'randomAddress',
// 		city: 'yinnick',
// 		state: 'randomState',
// 		postalCode: 'randomZip',
// 		dateContractorAssigned: new Date(),
// 		appointmentPrice: '$500',
// 		contractorPrice: '$100',
// 		additionalCost: '$50',
// 		status: 'new appointment'
// 	},
// 	{
// 		dateAssigned: '2019-02-09',
// 		apptDate: '2019-02-08',
// 		apptTime: new Date(),
// 		endTime: new Date(),
// 		assigneeFirst: 'randomFirst',
// 		assigneeLast: 'randomLast',
// 		assigneeCompany: 'randomlocationName',
// 		assigneePhone: 'randomPhone',
// 		adjusterFirst: 'randomFirst',
// 		adjusterLast: 'randomLast',
// 		adjusterCompany: 'randomlocationName',
// 		adjusterPhone: 1231231234,
// 		refName: 'paul' + 'randomLast',
// 		refNumber: 2,
// 		doi: new Date(),
// 		dob: new Date(),
// 		litigated: true,
// 		notes: 'A Quarter Mile at a Date ',
// 		language: 'spanish',
// 		assignmentType: 'legal',
// 		locationName: 'DSS',
// 		address: 'randomAddress',
// 		city: 'chula vista',
// 		state: 'randomState',
// 		postalCode: 'randomZip',
// 		dateContractorAssigned: new Date(),
// 		appointmentPrice: '$500',
// 		contractorPrice: '$100',
// 		additionalCost: '$50',
// 		status: 'new appointment'
// 	},
// 	{
// 		dateAssigned: '2019-02-09',
// 		apptDate: '2019-02-08',
// 		apptTime: new Date(),
// 		endTime: new Date(),
// 		assigneeFirst: 'randomFirst',
// 		assigneeLast: 'randomLast',
// 		assigneeCompany: 'randomlocationName',
// 		assigneePhone: 'randomPhone',
// 		adjusterFirst: 'randomFirst',
// 		adjusterLast: 'randomLast',
// 		adjusterCompany: 'randomlocationName',
// 		adjusterPhone: 1231231234,
// 		refName: 'Tam t' + 'randomLast',
// 		refNumber: 3,
// 		doi: new Date(),
// 		dob: new Date(),
// 		litigated: true,
// 		notes: 'A Quarter Mile at a Date ',
// 		language: 'spanish',
// 		assignmentType: 'legal',
// 		locationName: 'DSS',
// 		address: 'randomAddress',
// 		city: 'Lake elisnore',
// 		state: 'randomState',
// 		postalCode: 'randomZip',
// 		dateContractorAssigned: new Date(),
// 		appointmentPrice: '$500',
// 		contractorPrice: '$100',
// 		additionalCost: '$50',
// 		status: 'new appointment'
// 	},
// 	{
// 		dateAssigned: '2019-02-09',
// 		apptDate: '2019-02-08',
// 		apptTime: new Date(),
// 		endTime: new Date(),
// 		assigneeFirst: 'randomFirst',
// 		assigneeLast: 'randomLast',
// 		assigneeCompany: 'randomlocationName',
// 		assigneePhone: 'randomPhone',
// 		adjusterFirst: 'randomFirst',
// 		adjusterLast: 'randomLast',
// 		adjusterCompany: 'randomlocationName',
// 		adjusterPhone: 1231231234,
// 		refName: 'john ' + 'randomLast',
// 		refNumber: 4,
// 		doi: new Date(),
// 		dob: new Date(),
// 		litigated: true,
// 		notes: 'A Quarter Mile at a Date ',
// 		language: 'spanish',
// 		assignmentType: 'legal',
// 		locationName: 'DSS',
// 		address: 'randomAddress',
// 		city: 'crispy sea',
// 		state: 'randomState',
// 		postalCode: 'randomZip',
// 		dateContractorAssigned: new Date(),
// 		appointmentPrice: '$500',
// 		contractorPrice: '$100',
// 		additionalCost: '$50',
// 		status: 'new appointment'
// 	},
// 	{
// 		dateAssigned: '2019-02-09',
// 		apptDate: '2019-02-08',
// 		apptTime: new Date(),
// 		endTime: new Date(),
// 		assigneeFirst: 'randomFTim',
// 		assigneeLast: 'randomJim',
// 		assigneeCompany: 'randomlocationName',
// 		assigneePhone: 'randomPhone',
// 		adjusterFirst: 'randomFirst',
// 		adjusterLast: 'randomLast',
// 		adjusterCompany: 'randomlocationName',
// 		adjusterPhone: 1231231234,
// 		refName: 'Timt ' + 'randomTim',
// 		refNumber: 5,
// 		doi: new Date(),
// 		dob: new Date(),
// 		litigated: true,
// 		notes: 'A Quarter Mile at a Date ',
// 		language: 'spanish',
// 		assignmentType: 'legal',
// 		locationName: 'DSS',
// 		address: 'randomAddress',
// 		city: 'randomCity',
// 		state: 'randomState',
// 		postalCode: 'randomZip',
// 		dateContractorAssigned: new Date(),
// 		appointmentPrice: '$500',
// 		contractorPrice: '$100',
// 		additionalCost: '$50',
// 		status: 'new appointment'
// 	}
// ];

// db.Client
// 	.remove({})
// 	.then(() => db.Client.collection.insertMany(clientSeed))
// 	.then((data) => {
// 		console.log(data.result.n + ' records inserted!');
// 		process.exit(0);
// 	})
// 	.catch((err) => {
// 		console.error(err);
// 		process.exit(1);
// 	});

// db.Contractor
// 	.remove({})
// 	.then(() => db.Contractor.collection.insertMany(contractorSeed))
// 	.then((data) => {
// 		console.log(data.result.n + ' datas inserted!');
// 		process.exit(0);
// 	})
// 	.catch((err) => {
// 		console.error(err);
// 		process.exit(1);
// 	});

// db.Appointment
// 	.remove({})
// 	.then(() => db.Appointment.collection.insertMany(appointmentSeed))
// 	.then((data) => {
// 		console.log(data.result.n + ' datas inserted!');
// 		process.exit(0);
// 	})
// 	.catch((err) => {
// 		console.error(err);
// 		process.exit(1);
// 	});

db.keys
	.remove({})
	.then(() => db.keys.collection.insertMany(keySeed))
	.then((data) => {
		console.log(data.result.n + ' datas inserted!');
		process.exit(0);
	})
	.catch((err) => {
		console.error(err);
		process.exit(1);
	});
