const router = require('express').Router();
const clientsController = require('../../controllers/clientsController');

router.route('/').get(clientsController.findAll).post(clientsController.create);

router.route('/params').get(clientsController.findByParams);

router.route('/:id').get(clientsController.findById).put(clientsController.update).delete(clientsController.remove);
module.exports = router;
