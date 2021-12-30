const mongoose = require('mongoose');
const joi = require('joi');
joi.objectId = require('joi-objectid')(joi);

const roomSchema = new mongoose.Schema({
    numberOfSeats: {
        type: Number,
        default: 30,
        required: true,
    },
    numberOfRows: {
        type: Number,
        default: 6,
        required: true,
    },
    numberOfColumns: {
        type: Number,
        default: 5,
        required: true,
    },
})

const Room = mongoose.model('Room', roomSchema);

function validateId(id) {
    const schema = joi.object({
        id: joi.objectId().required()
    });
    const result = schema.validate(id);
    return result;
}

module.exports = {
    Room,
    validateId
}