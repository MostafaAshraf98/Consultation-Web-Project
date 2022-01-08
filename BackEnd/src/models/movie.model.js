const mongoose = require('mongoose');
const joi = require('joi');
joi.objectId = require('joi-objectid')(joi);

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        unique: true,
        trim: true,
        required: true,
        maxlength: 255
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

movieSchema.virtual('seats', {
    ref: 'SeatReservations',
    localField: 'title',
    foreignField: 'movieIn'
})

const Movie = mongoose.model('Movie', movieSchema);

function validateMovie(movie) {
    const schema = joi.object({
        title: joi.string().max(255).required(),
        posterImage: joi.string().required(),
        start: joi.date().required(),
        end: joi.date().required(),
        date: joi.date().required(),
        roomNumber: joi.number().required()

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