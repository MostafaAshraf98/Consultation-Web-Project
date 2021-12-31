const { SeatReservations,
    validateId,
    validateSeat } = require('../models/seatreservations.model');
const { Movie } = require('../models/movie.model');

const reserveSeats = async (req, res) => {
    const userId = req.authUser._id;
    // const check = {
    //     seatNumber: req.body.seatNumber,
    //     movieIn: req.body.title,
    // };
    // console.log(check);
    const { error } = validateSeat(req.body);
    console.log("here1");
    if (error)
        return res.status(400).send(error.details[0].message);
    try {
        const movie = await Movie.findOne({ title: req.body.movieIn })
        if (!movie)
            return res.status(400).send({ error: "This movie does not exist" });
        var finalRerservations = [];

        for (seatNumber of req.body.seatNumber) {
            const alreadyExists = await SeatReservations.findOne({ seatNumber: seatNumber, movieIn: req.body.movieIn, })
            if (alreadyExists)
                return res.status(400).send({ error: "One of the seats is already reserved" });

            const seatreservation = new SeatReservations(
                {
                    userReservation: userId,
                    movieIn: req.body.movieIn,
                    seatNumber: seatNumber,
                }
            )
            finalRerservations.push(seatreservation);
            await seatreservation.save();
        }
        res.status(200).send(finalRerservations);
    } catch (error) {
        console.log(error);
        res.status(400).send({ error: "Reservation was unsuccessful" })
    }
}

const getMovieSeatsByTitle = async (req, res) => {
    try {
        var title = req.params.title;
        // title = title.toLowerCase();
        console.log(title);
        const movie = await Movie.findOne({ title: "Inception1" });
        if (!movie)
            return res.status(400).send({ error: 'Could not find this movie' });
        await movie.populate('seats');
        res.status(200).send(movie.seats);

    } catch (error) {
        console.log(error);
        res.status(400).send({ error: "Could not get the seats, error while connecting to database" });
    }
}

const getUserReservedSeats = async (req, res) => {
    const user = req.authUser;
    try {
        await user.populate('seats');
        res.status(200).send(user.seats);
    } catch {
        console.
            res.status(400).send({ error: "Could not get user seats due to error" });
    }
}

module.exports = {
    reserveSeats,
    getMovieSeatsByTitle,
    getUserReservedSeats

}