const { User, validateId, validateUser } = require('../models/user.model');

const createUser = async (req, res) => {
    const { error } = validateUser(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);
    try {
        const user = new UserModel(req.body);
        await user.save();
        const token = await user.generateAuthToken
    } catch {

    }
}


module.exports = {
    createUser
}