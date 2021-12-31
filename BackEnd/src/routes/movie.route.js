const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movie.controller');
const auth = require('../middlewares/auth');

router.post('/', auth, movieController.upload.single("file"), movieController.addMovie);

router.get('/', auth, movieController.getMovies);

router.get('/:title', auth, movieController.getMovieBytitle);

module.exports = router;