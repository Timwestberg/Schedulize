const router = require('express').Router();
const clientRoutes = require('./clients');
const contractorRoutes = require('./contractors');
const apptRoutes = require('./appointments');
// const keyRoutes = require('./key');

// Book routes
router.use('/clients', clientRoutes);
router.use('/appointments', apptRoutes);
router.use('/contractors', contractorRoutes);
// router.use('/key', keyRoutes);

module.exports = router;
