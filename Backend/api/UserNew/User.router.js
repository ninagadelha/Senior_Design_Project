const express = require('express');
const userController = require('./User.controller')
const router = express.Router();

//define routes and map them to controller methods
router.get("/timestamp", userController.getTimestamp);
router.get("/users" , userController.getUsers);
router.post("/login", userController.loginUser);


module.exports = router;