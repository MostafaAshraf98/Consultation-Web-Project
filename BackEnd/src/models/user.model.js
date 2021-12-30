const mongoose = require("mongoose");
const joi = require("joi");
const { string } = require("joi");
joi.objectId = require('joi-objectid')(joi);

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
        type: string,
        required: true,
        default: 'customer',
        trim: true,
        enum: ['customer', 'manager', "administrator"]
    }



}, { timestamps: true })


function validateId(id) {
    const schema = joi.object({
        id: joi.objectId().required()
    });
    const result = schema.validate(id);
    return result;
}
function validateUser(user) {
    const schema = joi.object({
        firstName: joi.string().min(1).max(255).required(),
        lastName: joi.string().min(1).max(255).required(),
        userName: joi.string().min(1).max(255).required(),
        email: joi.string().email().required(),
        password: joi.string().min(1).max(50).required(),
        role: joi.string().required().valid('customer', 'manager', 'administrator')
    })
    const result = schema.validate(user);
    return result;
}

userSchema.methods.generateAuthToken = async function () {
    console.log("generateAuthToken called successfully")
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, 'thisismynewcourse')

    user.tokens = user.tokens.concat({ token })
    await user.save()

    return token
}

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email });
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