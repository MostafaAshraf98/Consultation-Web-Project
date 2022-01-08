const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movie.controller');
const auth = require('../middlewares/auth');

// router.post('/', auth, movieController.upload.single("file"), movieController.addMovie);
router.post('/', auth, movieController.addMovie);


router.get('/', movieController.getMovies);

router.get('/:title', movieController.getMovieBytitle);

router.put('/:title', auth, movieController.editMovieByTitle)

module.exports = router;