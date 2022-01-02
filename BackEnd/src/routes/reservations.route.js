const express = require('express');
const router = express.Router();
const reservationsController = require('../controllers/reservations.controller');
const auth = require('../middlewares/auth');

router.post('/', auth, reservationsController.reserveSeats);

router.get('/:title', reservationsController.getMovieSeatsByTitle)

router.get('/', auth, reservationsController.getUserReservedSeats);
module.exports = router;