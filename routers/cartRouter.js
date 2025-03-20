const express = require('express');
const CartController = require('../controllers/cartController');
const { 
  addToCartValidation, 
  removeFromCartValidation, 
  purchaseCartValidation 
} = require('../middlewares/cartValidationMiddleware');
const { handleCartError } = require('../middlewares/cartErrorMiddleware');

const router = express.Router();

// Route for adding a book to cart
router.post('/add', addToCartValidation, CartController.addToCart);

// Route for getting a user's cart
router.get('/:user', CartController.getCart);

// Route for removing a book from cart
router.delete('/remove', removeFromCartValidation, CartController.removeFromCart);

// Route for purchasing cart items
router.post('/buy', purchaseCartValidation, CartController.purchaseCart);

// Global error handling
router.use(handleCartError);

module.exports = router;
