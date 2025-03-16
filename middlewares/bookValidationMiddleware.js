const { body, param, validationResult } = require('express-validator');

// Validation for adding/updating a book
exports.addBookValidation = [
    body('title')
        .notEmpty().withMessage('Title is required')
        .isLength({ max: 100 }).withMessage('Title cannot exceed 100 characters'),
    body('author')
        .notEmpty().withMessage('Author is required')
        .isLength({ max: 100 }).withMessage('Author cannot exceed 100 characters'),
    body('description')
        .notEmpty().withMessage('Description is required')
        .isLength({ max: 500 }).withMessage('Description cannot exceed 500 characters'),
    body('brand')
        .notEmpty().withMessage('Brand is required')
        .isLength({ max: 100 }).withMessage('Brand cannot exceed 100 characters'),
    body('originalPrice')
        .isFloat({ min: 0 }).withMessage('Original price must be a positive number'),
    body('discountedPrice')
        .isFloat({ min: 0 }).withMessage('Discounted price must be a positive number')
        .custom((value, { req }) => value <= req.body.originalPrice)
        .withMessage('Discounted price cannot exceed original price'),
    body('coverImageUrl')
        .isURL().withMessage('Cover image URL must be valid'),
    body('stock')
        .isInt({ min: 0 }).withMessage('Stock must be a non-negative integer'),
    body('publicationDate')
        .isISO8601().toDate().withMessage('Publication date must be a valid ISO 8601 date'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

// Validation for getting a book by ID
exports.getBookByIdValidation = [
    param('id')
        .isMongoId().withMessage('Invalid book ID'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];
