const mongoose = require('mongoose');
const joi = require('joi');
joi.objectId = require('joi-objectid')(joi);

const reservationsSchema = - mongoose.Schema({
    start: {
        type: Date,
        required: true,
    },
    end: {
        type: Date,
        required: true,
    },
    roomId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Room'
    },
    seatId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Seat'
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
})

const Reservations = mongoose.model('Reservations', reservationsSchema);

function validateId(id) {
    const schema = joi.object({
        id: joi.objectId().required()
    });
    const result = schema.validate(id);
    return result;
}

function validateReservation(reservation) {
    const schema = joi.object({
        userId: joi.objectId().required(),
        roomId: joi.objectId().required(),
        seatId: joi.objectId().required(),
        start: joi.date().required(),
        end: joi.date().required()
    })
    const result = schema.validate(reservation);
    return result;
}

module.exports = {
    Reservations,
    validateId,
    validateReservation,
}