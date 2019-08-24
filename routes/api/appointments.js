const router = require('express').Router();
const appointmentsController = require('../../controllers/appointmentsController');

router
	.route('/')
	.get(appointmentsController.findAll, appointmentsController.populateInterpreter)
	.post(appointmentsController.create);

router.route('/params').get(appointmentsController.findByParams);

router
	.route('/interpreter')
	.get(appointmentsController.populateInterpreter)
	.post(appointmentsController.assignInterpreter);

router
	.route('/:id')
	.get(appointmentsController.findById)
	.put(appointmentsController.update)
	.delete(appointmentsController.remove);

module.exports = router;
