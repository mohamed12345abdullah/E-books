const { body, param, validationResult } = require('express-validator');

const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: "error",
      message: "Validation failed",
      errors: errors.array(),
    });
  }
  next();
};

const addToCartValidation = [
  body('user').notEmpty().withMessage('User ID is required'),
  body('bookId').notEmpty().withMessage('Book ID is required'),
  body('quantity')
    .isInt({ min: 1 }).withMessage('Quantity must be a positive integer'),
  validateRequest
];

const removeFromCartValidation = [
  body('user').notEmpty().withMessage('User ID is required'),
  body('bookId').notEmpty().withMessage('Book ID is required'),
  validateRequest
];

const purchaseCartValidation = [
  body('user').notEmpty().withMessage('User ID is required'),
  validateRequest
];

module.exports = {
  addToCartValidation,
  removeFromCartValidation,
  purchaseCartValidation
};
