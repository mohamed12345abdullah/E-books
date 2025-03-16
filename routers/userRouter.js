const express = require('express');
const UserController = require('../controllers/userController');
const { registerValidation, loginValidation } = require('../middlewares/userValidationMiddleware');
const { hashPassword } = require('../middlewares/passwordMiddleware');

const Router = express.Router();

// Route for user registration
Router.post('/register', registerValidation, hashPassword, UserController.register);

// Route for user login
Router.post('/login', loginValidation, UserController.log_in);

module.exports = Router;
