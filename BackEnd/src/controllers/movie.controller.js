const { Movie, validateId, validateMovie } = require('../models/movie.model');
const multer = require('multer');
var mkdirp = require('mkdirp');

const port = "localhost:8086/";

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
        if (user.role == 'customer')
            return res.status(400).send({ error: "A Movie must be added by a manager" });
        const startTime = req.body.start;
        const endTime = req.body.end;
        const date = req.body.date;
        const room = req.body.roomNumber;
        const title = req.body.title;
        // const overlapping = Movie.aggregate({ $exp: { $lte: [startTime, "$end"], $gte: [endTime, "$start"], $match: [date, "date"], $match: [room, "room"] } });
        var allMovies = await Movie.find();
        for (const movie of allMovies) {
            console.log(movie);
            console.log(startTime, endTime, room,)
            if (startTime <= movie.end && endTime >= movie.end && date == movie.date && room == movie.roomNumber)
                return res.status(400).send({ error: "There is an overalapping movie in this time" });
            if (title == movie.title)
                return res.status(400).send({ error: "There is a movie with this same title" });
        }
        const movie = new Movie({
            ...req.body,
            // posterImage: port + req.file.path
        })
        await movie.save();
        res.status(200).send(movie);

    } catch (error) {
        console.log(error);
        res.status(400).send({ error: "Adding movie was unsuccessful" });
    }
}

const getMovies = async (req, res) => {
    console.log("Getting movies endpoint");
    try {
        const allMovies = await Movie.find({}, { _id: 0, __v: 0, createdAt: 0, updatedAt: 0 });
        console.log(allMovies);
        res.status(200).send(allMovies);
    } catch (error) {
        res.status(400).send({ error: "Could not get the movies from db" });
    }
}

const getMovieBytitle = async (req, res) => {
    try {
        var title = req.params.title;
        // title = title.toLowerCase();
        console.log(title);
        if (title == "")
            return res.status(401).send("Please enter the title");
        const movie = await Movie.find({ title: title }, { _id: 0, __v: 0, createdAt: 0, updatedAt: 0 });
        if (!movie)
            return res.status(401).send({ error: "Could not find this movie" });
        res.status(200).send(movie);
    } catch (error) {
        console.log(error);
        res.status(401).send({ error: "Could not find this movie" });
    }
}

const editMovieByTitle = async (req, res) => {
    const user = req.authUser;
    const title = req.params.title;
    console.log(title);
    if (user.role == "customer")
        return res.status(400).send({ error: "A customer cannot edit a movie" });
    const updates = Object.keys(req.body);
    const allowedUpdates = ['title', 'posterImage', 'date', 'start', 'end', 'roomNumber'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));
    if (!isValidOperation)
        return res.status(400).send({ error: "Invalid updates!" });
    try {
        const movieToUpdate = await Movie.findOne({ title: title });
        if (!movieToUpdate)
            return res.status(400).send({ error: "Unable to find this movie" });
        updates.forEach((update) => {
            movieToUpdate[update] = req.body[update]; // here the bracket notation serves as the property in the object is dynamic
        });

        // check the overlapping with another movie or the existance of a movie with the same title
        var allMovies = await Movie.find();
        for (const movie of allMovies) {
            if (movieToUpdate.start <= movie.end && movieToUpdate.end >= movie.end && movieToUpdate.date == movie.date && movieToUpdate.roomNumber == movie.roomNumber)
                return res.status(400).send({ error: "There is an overalapping movie in this time" });
            if (movieToUpdate.title == movie.title)
                return res.status(400).send({ error: "There is a movie with this same title" });
        }
        await movieToUpdate.save();
        const obj = movieToUpdate.toObject();
        delete obj._id;
        delete obj.__v;
        delete obj.createdAt;
        delete obj.updatedAt;

        res.status(200).send(obj);

    } catch (error) {
        console.log(error);
        res.status(400).send({ error: "Unable to edit Movie" });
    }
}

module.exports = {
    addMovie,
    upload,
    getMovies,
    getMovieBytitle,
    editMovieByTitle

}