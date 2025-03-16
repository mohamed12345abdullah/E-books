const { body, validationResult } = require('express-validator');

exports.registerValidation = [
    body('first_name').notEmpty().withMessage('First name is required'),
    body('last_name').notEmpty().withMessage('Last name is required'),
    body('email').isEmail().withMessage('Please provide a valid email'),
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
    (req, res, next) => {
        console.log("register validation");
        
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log("error in validation register:",errors);
            
            return res.status(400).json({message:" error in validation",error:errors.array() });
        }
        next();
    }
];

exports.loginValidation = [
    body('email').isEmail().withMessage('Please provide a valid email'),
    body('password').notEmpty().withMessage('Password is required'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];
