const mongoose = require('mongoose');
const Joi = require('Joi');
Joi.objectId = require('Joi-objectid')(Joi);

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
    const schema = Joi.object({
        id: Joi.objectId().required()
    });
    const result = schema.validate(id);
    return result;
}

function validateSchedule(schedule) {
    const schema = Joi.object({
        movieId: Joi.objectId().required(),
        roomId: Joi.objectId().required(),
        start: Joi.date().required(),
        end: Joi.date().required(),
        date: Joi.date().required()

    })
    const result = schema.validate(reservation);
    return result;
}

module.exports = {
    Schedule,
    validateId,
    validateSchedule
}