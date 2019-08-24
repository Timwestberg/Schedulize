const db = require('../models');

// Defining methods for the booksController
module.exports = {
	findAll: function(req, res) {
		db.keys
			.find(req.query)
			// .sort({ ApptTime: -1 })
			.then((dbModel) => res.json(dbModel))
			.catch((err) => res.status(422).json(err));
	}
};
// // const db = require('../models');
// const key = require('../Googlekeys');
// //
// module.exports = {
// 	getKey: function() {
// 		return key.key;
// 	}
// };
