const { User, validateId, validateUser } = require('../models/user.model');

const createUser = async (req, res) => {
    console.log("Creating User");
    const { error } = validateUser(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);
    try {
        var user = req.body;
        var pending = false;
        if (user.role == "manager") {
            pending = true;
            user.role = "customer"
        }

        user = {
            ...user,
            pendingManagerRequest: pending
        }
        const newUser = new User(user);
        await newUser.save();
        const token = await newUser.generateAuthToken();
        const role = user.role;
        res.status(201).send({ role, token });
    } catch (error) {
        console.log(error);
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
        const role = user.role;

        res.send({ role, token });
    } catch (error) {
        res.status(400).send({ error: "User does not exist." });
    }
}

const logoutUser = async (req, res) => {
    try {

    } catch (error) {
        console.log(error);
        res.status(400).send({ error: "Unable to logout the user" });
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
        await user.save();
        res.status(200).send(user);

    } catch (error) {
        console.log(error);
        res.status(400).send({ error: "Error updating user" });
    }

}

const getPendingManagerRequests = async (req, res) => {
    const userAuth = req.authUser;
    if (userAuth.role != "administrator")
        return res.status(400).send({ error: "Only the administrator can see the pending requests" });
    try {
        const pendingRequests = await User.find({ pendingManagerRequest: true }, { _id: 0, userName: 1 });
        res.status(200).send(pendingRequests);
    } catch (error) {
        console.log(error);
        res.status(400).send({ error: "Unable to fetch the pending the requests from database" });
    }
}

const acceptPendingManagerRequests = async (req, res) => {
    const userAuth = req.authUser;
    if (userAuth.role != "administrator")
        return res.status(400).send({ error: "Only the administrator can see the pending requests" });
    try {
        const userNames = req.body.userNames;
        for (const user of userNames) {
            await User.updateOne({ userName: user, pendingManagerRequest: true, role: "customer" }, { pendingManagerRequest: false, role: "manager" });
        }
        res.status(400).send("Selected users roles are updated successfully");

    } catch (error) {
        console.log(error);
        res.status({ error: "Error While updating the user role" });
    }
}


module.exports = {
    createUser,
    loginUser,
    updateUser,
    getPendingManagerRequests,
    acceptPendingManagerRequests,
    logoutUser
}