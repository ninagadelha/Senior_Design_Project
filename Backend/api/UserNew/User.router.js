const express = require('express');
const userController = require('./User.controller')
const router = express.Router();

//define routes and map them to controller methods
router.get("/timestamp", userController.getTimestamp);
router.get("/users" , userController.getUsers);
router.post("/login", userController.loginUser);
router.post("/newuser",userController.newUser);
router.post("/updateProgramDirector", userController.updateProgramDirector);
router.post("/updateResearcher", userController.UpdateResearcher);
router.post("/updateStudent", userController.UpdateStudent);
router.get("/userexist", userController.getExistingUser);
router.get("/usersprogram", userController.getUsersProgram);

module.exports = router;