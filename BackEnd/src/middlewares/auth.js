const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '') // here we are removing the bearer part from the header ( we past the part we want to replace and the string we want to replace it with)
        const decoded = jwt.verify(token, 'authenticating') //Here decoded is an object that have the property of the unique identifier that we passed when we first created the token
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });//we used the string property name because there is a special char in it '.'
        //we are finding a user with that id that we extracted from the token that the requester passed in the header and with this token valid (not expired) in the token array
        if (!user) {
            throw new Error()
        }

        req.token = token
        req.user = user; // Here we added to the request the user property (which is an object itself) so that we can use it directly in the route handlers and not having to fetch the user again 
        next()

    } catch (error) {
        res.status(401).send({ error: 'Please authenticate' })
    }
};

module.exports = auth

//important Note: THe idea behind auth middleware is that any request that requires authentication to be executed must have a login token provided
//along with the request to check that the user is logged in
//the token that the user passes is passed in the headers section of the request and not as a parameter or in the body
//Headers allows to set key value pairs providing additional info to the server
//We can have headers sent as part of the request or sent back as part of the response