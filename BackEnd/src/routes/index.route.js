const express = require('express');
const userRoute = require('./user.route');
const movieRoute = require('./movie.route');
const reservationsRoute = require('./reservations.route');

const router = express.Router();
router.use('/user', userRoute);
router.use('/movie', movieRoute);
router.use('/reservation', reservationsRoute);

module.exports = router;