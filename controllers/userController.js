const User = require('../models/userModel');
const { hashPassword, comparePassword } = require('../middlewares/passwordMiddleware');
const { generateToken } = require('../middlewares/jwtMiddleware');

class UserController {
    static async register(req, res) {
        try {
            const { first_name, last_name, email, password } = req.body;
            console.log(" register ", password);
            
            // Check if user already exists
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                console.log(existingUser);
                
                return res.status(400).json({ message: 'User with this email already exists' });
            }

            // Create new user
            const newUser = await User.create({ first_name, last_name, email, password });
            res.status(201).json({ message: 'User registered successfully', user: newUser });
        } catch (error) {
            res.status(500).json({ message: 'Failed to register user', error: error.message });
        }
    }

    static async log_in(req, res) {
        try {
            const { email, password } = req.body;

            // Check if user exists and compare password
            const user = await User.findOne({ email });
            console.log(user.password);
             
            if (!user ) {
                return res.status(404).json({ message: 'user not found' });
            } 
            const checker= await comparePassword(password, user.password);
            console.log(checker);
            
            if(!checker){
                return res.status(401).json({ message: 'Wrong password' });

            }
            // Generate token
            const token = generateToken(user._id);
            res.status(200).json({ message: 'Login successful', token });
        } catch (error) {
            console.log("error",error);
            
            res.status(500).json({ message: 'Failed to log in user', error: error.message });
        }
    }
}

module.exports = UserController;
