const mongoose = require('mongoose');
const joi = require('joi');
joi.objectId = require('joi-objectid')(joi);

const scheduleSchema = mongoose.Schema({
    start: {
        type: Date,
        required: true,
    },
    end: {
        type: Date,
        required: true,
    },
    date: {
        type: Date,
        required: true
    },
    movieId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Movie'
    },
    roomId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Room'
    }
})

const Schedule = mongoose.model('Schedule', scheduleSchema);

function validateId(id) {
    const schema = joi.object({
        id: joi.objectId().required()
    });
    const result = schema.validate(id);
    return result;
}

function validateSchedule(schedule) {
    const schema = joi.object({
        movieId: joi.objectId().required(),
        roomId: joi.objectId().required(),
        start: joi.date().required(),
        end: joi.date().required(),
        date: joi.date().required()

    })
    const result = schema.validate(reservation);
    return result;
}

module.exports = {
    Schedule,
    validateId,
    validateSchedule
}