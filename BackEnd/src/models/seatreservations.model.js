const mongoose = require('mongoose');
const joi = require('joi');
joi.objectId = require('joi-objectid')(joi);


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
    const schema = joi.object({
        id: joi.objectId().required()
    });
    const result = schema.validate(id);
    return result;
}

function validateSeat(seat) {
    const schema = joi.object({
        seatNumber: joi.array().items(joi.number()).required(),
        movieIn: joi.string().required()
    })
    const result = schema.validate(seat);
    return result;
}

module.exports = {
    SeatReservations,
    validateId,
    validateSeat
}