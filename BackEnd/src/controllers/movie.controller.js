const { Movie, validateId, validateMovie } = require('../models/movie.model');
const multer = require('multer');
var mkdirp = require('mkdirp');
const { date } = require('Joi');
const { move } = require('../routes/user.route');

const port = "localhost:3000/";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        var dest = './posters/';
        mkdirp.sync(dest);
        cb(null, dest);// this is the destination folder where the photos shall be stored

    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
    }
})

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 10 // the maximum file size is 10 mega
    },
    fileFiler(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('Please enter a JPG, JPEG, PNG format'))
        }
    }
})


const addMovie = async (req, res) => {
    console.log("Adding movie");
    console.log(req.body);
    const { error } = validateMovie(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);
    try {
        const user = req.authUser;
        if (user.role != 'manager')
            return res.status(400).send({ error: "A Movie must be added by a manager" });
        const movie = new Movie({
            ...req.body,
            posterImage: port + req.file.path
        })
        await movie.save();
        res.status(200).send(movie);

    } catch (error) {
        console.log(error);
        res.status(400).send({ error: "Adding movie was unsuccessful" });
    }
}

module.exports = {
    addMovie,
    upload

}