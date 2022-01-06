const express = require('express');
const router = express.Router();
const reservationsController = require('../controllers/reservations.controller');
const auth = require('../middlewares/auth');

router.post('/', auth, reservationsController.reserveSeats);

router.get('/guest/:title', reservationsController.getMovieSeatsByTitleForGuest)

router.get('/:title', auth, reservationsController.getUserReservedSeatsinMovie);

router.get('/', auth, reservationsController.getMoviesReservedIn);

module.exports = router;