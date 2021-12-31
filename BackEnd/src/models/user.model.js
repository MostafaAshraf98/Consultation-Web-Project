const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const Joi = require("Joi");
Joi.objectId = require('Joi-objectid')(Joi);
const validator = require('validator');
const emailvalidator = require("email-validator");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        maxlength: 255
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        maxlength: 255
    },
    userName: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        maxlength: 255,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        maxlength: 255,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    role: {
        type: String,
        required: true,
        default: 'customer',
        trim: true,
        enum: ['customer', 'manager', "administrator"]
    }



}, { timestamps: true })


function validateId(id) {
    const schema = Joi.object({
        id: Joi.objectId().required()
    });
    const result = schema.validate(id);
    return result;
}
function validateUser(user) {
    const schema = Joi.object({
        firstName: Joi.string().min(1).max(255).required(),
        lastName: Joi.string().min(1).max(255).required(),
        userName: Joi.string().min(1).max(255).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(1).max(50).required(),
        role: Joi.string().required().valid('customer', 'manager', 'administrator')
    })
    const result = schema.validate(user);
    return result;
}

userSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password')) { // it will be true if the user is just created or the password field is updated
        user.password = await bcrypt.hash(user.password, 8)
    }

    next();
    //The whole point of this is to run some code before a user is saved and next allows it to know that we are done running our code as their might be async process running , the function wont finish with the end of its implementation
}) // pre is used to do something before the event

userSchema.methods.generateAuthToken = async function () {
    console.log("generateAuthToken called successfully")
    const user = this;
    const token = jwt.sign({ _id: user._id.toString() }, 'authenticating');

    return token
}

userSchema.statics.findByCredentials = async (emailOrUsername, password) => {
    console.log("Finding by credentials");
    var user;
    if (emailvalidator.validate(emailOrUsername))
        user = await User.findOne({ email: emailOrUsername });
    else
        user = await User.findOne({ userName: emailOrUsername });

    if (!user) {
        throw new Error('Unable to login')
    }
    const isMatch = await bcrypt.compare(password, user.password) // password is the one the user enters as he loggs in and the user.password is the hashed one we fetched from the database
    if (!isMatch) {
        throw Error('Unable to login');
    }
    return user;
}


const User = mongoose.model('User', userSchema);
module.exports = {
    User,
    validateId,
    validateUser
}