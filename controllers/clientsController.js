const db = require('../models');

// Defining methods for the booksController
module.exports = {
	findAll: function(req, res) {
		db.Client
			.find(req.query)
			.sort({ firstName: 1 })
			.then((dbModel) => res.json(dbModel))
			.catch((err) => res.status(422).json(err));
	},
	findById: function(req, res) {
		db.Client.findById(req.params.id).then((dbModel) => res.json(dbModel)).catch((err) => res.status(422).json(err));
	},
	create: function(req, res) {
		db.Client.create(req.body).then((dbModel) => res.json(dbModel)).catch((err) => res.status(422).json(err));
	},
	update: function(req, res) {
		db.Client
			.updateOne({ _id: req.params.id }, req.body)
			.then((dbModel) => res.json(dbModel))
			.catch((err) => res.status(422).json(err));
	},
	remove: function(req, res) {
		db.Client
			.findById({ _id: req.params.id })
			.then((dbModel) => dbModel.remove())
			.then((dbModel) => res.json(dbModel))
			.catch((err) => res.status(422).json(err));
	},
	findByParams: function(req, res) {
		console.log(req.query.query);
		db.Client
			.find({
				$or: [
					{ firstName: new RegExp(req.query.query, 'i') },
					{ lastName: new RegExp(req.query.query, 'i') },
					{ phone: new RegExp(req.query.query, 'i') },
					{ 'location.locationName': new RegExp(req.query.query, 'i') }
				]
			})
			.then((dbModel) => res.json(dbModel))
			.catch((err) => res.status(422).json(err));
	}
};
