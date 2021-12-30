const mongoose = require('mongoose');
const joi = require('joi');
joi.objectId = require('joi-objectid')(Joi);

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

}, { timestamps: true });

const Movie = mongoose.model('Movie', movieSchema);

function validateMovie(movie) {
    const schema = joi.object({
        title: joi.string().max(255).required(),
    });
    const result = schema.validate(movie);
    return result;
}

function validateId(id) {
    const schema = joi.object({
        id: joi.objectId().required()
    });
    const result = schema.validate(id);
    return result;
}

module.exports = {
    Movie,
    validateId,
    validateMovie
}