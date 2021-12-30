const mongoose = require('mongoose');
const joi = require('joi');
const Room = require('./room.model');
joi.objectId = require('joi-objectid')(joi);


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
    const schema = joi.object({
        id: joi.objectId().required()
    });
    const result = schema.validate(id);
    return result;
}

function validateSeat(seat) {
    const schema = joi.object({
        columnNumber: joi.number().min(1).max(5).required(),
        rowNumber: joi.number().min(1).max(6).required(),
        roomId: joi.ObjectId().required()

    })
    const result = schema.validate(seat);
    return result;
}

module.exports = {
    Seat,
    validateId,
    validateSeat
}