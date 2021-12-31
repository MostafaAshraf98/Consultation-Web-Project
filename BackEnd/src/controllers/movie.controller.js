const { Movie, validateId, validateMovie } = require('../models/movie.model');
const multer = require('multer');
var mkdirp = require('mkdirp');

const port = "localhost:3000/";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        var dest = './posters/';
        mkdirp.sync(dest);
        cb(null, './posters/');// this is the destination folder where the photos shall be stored

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
    const { error } = validateMovie(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);
    try {
        const user = req.authUser;
        if (user.role != 'manager')
            return res.status(400).send({ error: "A Movie must be added by a manager" });
        const startTime = req.start;
        const endTime = req.end;
        const date = req.date;
        const room = req.room;
        // const overlapping = Movie.aggregate({ $exp: { $lte: [startTime, "$end"], $gte: [endTime, "$start"], $match: [date, "date"], $match: [room, "room"] } });
        var allMovies = await Movie.find();
        for (const movie of allMovies) {
            if (startTime <= movie.end && endTime >= movie.end && date == movie.date && room == movie.room) {

                return res.status(400).send({ error: "There is an overalapping movie in this time" });
            }
        }
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

const getMovies = async (req, res) => {
    try {
        const allMovies = await Movie.find();
        res.status(200).send(allMovies);
    } catch (error) {
        res.status(400).send({ error: "Could not get the movies from db" });
    }
}

const getMovieBytitle = async (req, res) => {
    try {
        const title = req.params.title;
        if (title == "")
            return res.status(401).send("Please enter the title");
        const movie = await Movie.findOne({ title: title });
        if (!movie)
            return res.status(401).send({ error: "Could not find this movie" });
        res.status(200).send(movie);
    } catch (error) {
        res.status(401).send({ error: "Could not gind this movie" });
    }
}

module.exports = {
    addMovie,
    upload,
    getMovies,
    getMovieBytitle

}