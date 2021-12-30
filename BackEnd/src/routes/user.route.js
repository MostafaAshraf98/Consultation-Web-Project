const express = require('express');
const router = express.Router();
const UserController = require("../controllers/user.controller");
const auth = require("../middlewares/auth");


router.post('/', UserController.createUser);