const express = require('express');
const UserController = require('../controllers/userController');
const cartController = require('../controllers/cartController');
const { registerValidation, loginValidation } = require('../middlewares/userValidationMiddleware');
const { hashPassword } = require('../middlewares/passwordMiddleware');

const { verifyToken } = require('../middlewares/jwtMiddleware');


const Router = express.Router();

// Route for user registration
Router.post('/register', registerValidation, hashPassword, UserController.register);

// Route for user login
Router.post('/login',  loginValidation, UserController.log_in);

// Router for add to cart
Router.post('/addToCart', verifyToken, cartController.addToCart);

// Router for remove from cart
Router.delete('/removeFromCart', verifyToken, cartController.removeFromCart);

// Router for get cart
Router.get('/getCart', verifyToken, cartController.getCart);



// seen user

Router.post('/seen/start', UserController.seenUser);

Router.post('/seen/end', UserController.endVisit);

// gest log in 

// Router for get all guests
Router.get('/seen/getAllGuests', UserController.getAllGuests);

// Router for get all users visits
Router.get('/seen/getAllUsersVisits', UserController.getAllUsersVisits);

module.exports = Router;
