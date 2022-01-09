const { SeatReservations,
    validateId,
    validateSeat } = require('../models/seatreservations.model');
const { Movie } = require('../models/movie.model');

const reserveSeats = async (req, res) => {
    const userId = req.authUser._id;
    const { error } = validateSeat(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);
    try {
        const movie = await Movie.findOne({ title: req.body.movieIn })
        if (!movie)
            return res.status(400).send({ error: "This movie does not exist" });

        // var finalRerservations = [];
        for (seatNumber of req.body.seatNumber) {
            const alreadyExists = await SeatReservations.findOne({ seatNumber: seatNumber, movieIn: movie._id, })
            if (alreadyExists)
                return res.status(400).send({ error: "One of the seats is already reserved" });

            const seatreservation = new SeatReservations(
                {
                    userReservation: userId,
                    movieIn: movie._id,
                    seatNumber: seatNumber,
                }
            )

            // const obj = {};
            // obj.seatNumber = seatreservation.seatNumber;
            // obj.movieIn = movie.title;
            // finalRerservations.push(obj);
            await seatreservation.save();

        }
        res.status(200).send({ message: "Reserving seats was successful" });
    } catch (error) {
        console.log(error);
        res.status(400).send({ error: "Reservation was unsuccessful" })
    }
}

const getMovieSeatsByTitleForGuest = async (req, res) => {
    try {
        var title = req.params.title;
        // title = title.toLowerCase();
        console.log(title);
        const movie = await Movie.findOne({ title: title });
        if (!movie)
            return res.status(400).send({ error: 'Could not find this movie' });
        const movieId = movie._id;
        const reservedSeats = await SeatReservations.find({ movieIn: movieId }, { _id: 0, seatNumber: 1 })
        const arr = [];
        for (seat of reservedSeats)
            arr.push(seat.seatNumber.toString())
        res.status(200).send(arr);

    } catch (error) {
        console.log(error);
        res.status(400).send({ error: "Could not get the seats, error while connecting to database" });
    }
}

const getUserReservedSeatsinMovie = async (req, res) => {
    const userId = req.authUser._id;
    const title = req.params.title;
    try {
        const movie = await Movie.findOne({ title: title });
        if (!movie)
            return res.status(400).send({ error: 'Could not find this movie' });
        // await user.populate('seats'); // the user reserved seats
        const movieId = movie._id;
        const userReservedMovieSeats = await SeatReservations.find({ userReservation: userId, movieIn: movieId }, { seatNumber: 1, _id: 0 });
        const otherReservedMovieSeats = await SeatReservations.find({ userReservation: { $ne: userId }, movieIn: movieId }, { seatNumber: 1, _id: 0 });
        console.log(userReservedMovieSeats)
        const users = [];
        const others = []
        for (reservation of userReservedMovieSeats)
            users.push(reservation.seatNumber.toString())

        for (reservation of otherReservedMovieSeats)
            others.push(reservation.seatNumber.toString())
        res.status(200).send({ userReservedSeats: users, otherReservedSeats: others });
    } catch (error) {
        console.log(error);
        res.status(400).send({ error: "Could not get user seats due to error" });
    }
}

const getMoviesReservedIn = async (req, res) => {
    const userId = req.authUser._id;
    try {
        console.log("Getting movies reserved in");
        const MoviesReservedIn = await SeatReservations.find({ userReservation: userId }, { _id: 0, movieIn: 1 }).populate("movieIn");
        const movieTitles = []
        const uniqueMovies = []
        for (movie of MoviesReservedIn) {
            if (!movieTitles.includes(movie.movieIn.title)) {
                movieTitles.push(movie.movieIn.title);
                const result = movie.movieIn.toObject();
                delete result._id;
                delete result.__v;
                delete result.createdAt;
                delete result.updatedAt;
                uniqueMovies.push(result)
            }
        }
        console.log(uniqueMovies)
        res.status(200).send(uniqueMovies);

    } catch (error) {
        console.log(error);
        res.status(400).send({ error: "Unable to get the movies that this user is reserved in" });
    }
}

module.exports = {
    reserveSeats,
    getMovieSeatsByTitleForGuest,
    getUserReservedSeatsinMovie,
    getMoviesReservedIn
}