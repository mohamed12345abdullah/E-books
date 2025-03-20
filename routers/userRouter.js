const express = require('express');
const UserController = require('../controllers/userController');
const { registerValidation, loginValidation } = require('../middlewares/userValidationMiddleware');
const { hashPassword } = require('../middlewares/passwordMiddleware');

const Router = express.Router();

// Route for user registration
Router.post('/register', registerValidation, hashPassword, UserController.register);

// Route for user login
Router.post('/login', loginValidation, UserController.log_in);

// Router for add to cart
Router.post('/addToCart', UserController.addToCart);

// Router for remove from cart
Router.post('/removeFromCart', UserController.removeFromCart);

// Router for get cart
Router.get('/getCart', UserController.getCart);

module.exports = Router;
