const mongoose = require('mongoose');
const Joi = require('Joi');
const Room = require('./room.model');
Joi.objectId = require('Joi-objectid')(Joi);


const seatSchema = mongoose.Schema({
    columnNumber: {
        type: Number,
        min: 1,
        max: 5,
        required: true

    },
    rowNumber: {
        type: Number,
        min: 1,
        max: 6,
        required: true,
    },
    roomId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Room'
    }

})

const Seat = mongoose.model('Seat', seatSchema);

function validateId(id) {
    const schema = Joi.object({
        id: Joi.objectId().required()
    });
    const result = schema.validate(id);
    return result;
}

function validateSeat(seat) {
    const schema = Joi.object({
        columnNumber: Joi.number().min(1).max(5).required(),
        rowNumber: Joi.number().min(1).max(6).required(),
        roomId: Joi.objectId().required()

    })
    const result = schema.validate(seat);
    return result;
}

module.exports = {
    Seat,
    validateId,
    validateSeat
}