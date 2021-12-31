const mongoose = require('mongoose');
const Joi = require('Joi');
Joi.objectId = require('Joi-objectid')(Joi);

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
    const schema = Joi.object({
        id: Joi.objectId().required()
    });
    const result = schema.validate(id);
    return result;
}

function validateReservation(reservation) {
    const schema = Joi.object({
        userId: Joi.objectId().required(),
        roomId: Joi.objectId().required(),
        seatId: Joi.objectId().required(),
        start: Joi.date().required(),
        end: Joi.date().required()
    })
    const result = schema.validate(reservation);
    return result;
}

module.exports = {
    Reservations,
    validateId,
    validateReservation,
}