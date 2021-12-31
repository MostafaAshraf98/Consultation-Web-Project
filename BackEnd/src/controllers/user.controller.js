const { User, validateId, validateUser } = require('../models/user.model');

const createUser = async (req, res) => {
    console.log("Creating User");
    const { error } = validateUser(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);
    try {
        const user = new User(req.body);

        await user.save();
        const token = await user.generateAuthToken();
        res.status(201).send({ user, token });
        // const token = await user.
    } catch (error) {
        res.status(400).send({ error: "User already exists" });
    }
}

const loginUser = async (req, res) => {
    try {
        var user;
        if (req.body.emailorusername)
            user = await User.findByCredentials(req.body.emailorusername, req.body.password);
        else
            return res.status(400).send({ error: "Please enter email or username" });

        const token = await user.generateAuthToken();
        res.send({ user, token });
    } catch (error) {
        res.status(400).send({ error: "User does not exist." });
    }
}

const updateUser = async (req, res) => {
    const administrator = req.authUser; // this is the administrator
    console.log(administrator);
    if (administrator.role != "administrator") {
        return res.status(400).send({ error: "Only administrator can update the users" });
    }
    try {
        console.log(req.body);
        const user = await User.findOne({ userName: req.body.username });
        if (!user)
            res.status(400).send({ error: "This user does not exist" });
        user.role = req.body.role;
        user.save();
        res.status(200).send(user);

    } catch (error) {
        console.log(error);
        res.status(400).send({ error: "Error updating user" });
    }

}


module.exports = {
    createUser,
    loginUser,
    updateUser,
}