const express = require('express');
const router = express.Router();
const UserController = require("../controllers/user.controller");
const auth = require("../middlewares/auth");


router.post('/', UserController.createUser);

router.post('/login', UserController.loginUser);

router.post('/logout', auth, UserController.logoutUser);


router.put('/', auth, UserController.updateUser);

router.get('/pending', auth, UserController.getPendingManagerRequests);

router.put('/pending', auth, UserController.acceptPendingManagerRequests)


module.exports = router;