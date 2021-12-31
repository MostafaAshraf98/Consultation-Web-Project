const mongoose = require('mongoose');
const Joi = require('Joi');
Joi.objectId = require('Joi-objectid')(Joi);

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        unique: true,
        trim: true,
        required: true,
        maxlength: 255
    },
    duration:
    {
        type: Date,
        required: false

    },
    posterImage: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true
    },
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    },
    roomNumber: {
        type: Number,
        required: true,
        enum: [1, 2]
    }

}, { timestamps: true });

const Movie = mongoose.model('Movie', movieSchema);

function validateMovie(movie) {
    const schema = Joi.object({
        title: Joi.string().max(255).required(),
        duration: Joi.date().required(),
        start: Joi.date().required(),
        end: Joi.date().required(),
        date: Joi.date().required(),
        roomNumber: Joi.number().required()

    });
    const result = schema.validate(movie);
    return result;
}

function validateId(id) {
    const schema = Joi.object({
        id: Joi.objectId().required()
    });
    const result = schema.validate(id);
    return result;
}

module.exports = {
    Movie,
    validateId,
    validateMovie
}