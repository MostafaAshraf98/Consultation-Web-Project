const mongoose = require('mongoose');
const Joi = require('Joi');
Joi.objectId = require('Joi-objectid')(Joi);


const seatReservationsSchema = mongoose.Schema({
    seatNumber: {
        type: Number,
        required: true

    },
    userReservation: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    movieIn:
    {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Movie'
    }
}, {
    timestamps: true
})

const SeatReservations = mongoose.model('SeatReservations', seatReservationsSchema);

function validateId(id) {
    const schema = Joi.object({
        id: Joi.objectId().required()
    });
    const result = schema.validate(id);
    return result;
}

function validateSeat(seat) {
    const schema = Joi.object({
        seatNumber: Joi.array().items(Joi.number()).required(),
        movieIn: Joi.string().required()
    })
    const result = schema.validate(seat);
    return result;
}

module.exports = {
    SeatReservations,
    validateId,
    validateSeat
}