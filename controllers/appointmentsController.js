const db = require('../models');

// Defining methods for the booksController
module.exports = {
	findAll: function(req, res) {
		db.Appointment
			.find(req.query)
			.sort({ ApptTime: -1 })
			.then((dbModel) => res.json(dbModel))
			.catch((err) => res.status(422).json(err));
	},
	findById: function(req, res) {
		db.Appointment
			.findById(req.params.id)
			.then((dbModel) => res.json(dbModel))
			.catch((err) => res.status(422).json(err));
	},
	assignInterpreter: function(req, res) {
		db.Contractor
			.create(req.body)
			.then(function(dbInterpreter) {
				// If a Interpreter was associated successfully, find one Appointment (there's only one) and push the new interpreter's _id to the Appointment's `Assigned Interpreter` array
				// { new: true } tells the query that we want it to return the updated Appointment -- it returns the original by default
				// Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
				return db.Appointment.findOneAndUpdate({}, { $push: { contractors: dbInterpreter._id } }, { new: true });
			})
			.then(function(dbAppointment) {
				// If the User was updated successfully, send it back to the client
				res.json(dbAppointment);
			})
			.catch(function(err) {
				// If an error occurs, send it back to the client
				res.json(err);
			});
	},
	populateInterpreter: function(req, res) {
		// Find all users
		db.Appointment
			.find({})
			// Specify that we want to populate the retrieved users with any associated notes
			.populate('contractors')
			.then(function(dbAppointment) {
				// If able to successfully find and associate all Users and Notes, send them back to the client
				res.json(dbappointment);
			})
			.catch(function(err) {
				// If an error occurs, send it back to the client
				res.json(err);
			});
	},
	create: function(req, res) {
		db.Appointment.create(req.body).then((dbModel) => res.json(dbModel)).catch((err) => res.status(422).json(err));
	},
	update: function(req, res) {
		db.Appointment
			.updateOne({ _id: req.params.id }, req.body)
			.then((dbModel) => res.json(dbModel))
			.catch((err) => res.status(422).json(err));
	},
	remove: function(req, res) {
		db.Appointment
			.findById({ _id: req.params.id })
			.then((dbModel) => dbModel.remove())
			.then((dbModel) => res.json(dbModel))
			.catch((err) => res.status(422).json(err));
	},
	findByParams: function(req, res) {
		console.log(req.query);
		db.Appointment
			.find({
				$or: [
					{ refName: new RegExp(req.query.query, 'i') },
					{ assigneePhone: new RegExp(req.query.query, 'i') },
					{ locationName: new RegExp(req.query.query, 'i') },
					{ refNumber: new RegExp(req.query.query, 'i') }
				]
			})
			.then((dbModel) => res.json(dbModel))
			.catch((err) => res.status(422).json(err));
	}
};
