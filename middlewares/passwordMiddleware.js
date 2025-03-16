const bcrypt = require('bcryptjs');

exports.hashPassword = async (req, res, next) => {
    try {
        if (req.body.password) {
            const hashedPassword = await bcrypt.hash(req.body.password, 12);
            console.log(req.body.password);
            
            req.body.password = hashedPassword;
        }
        next();
    } catch (error) {
        res.status(500).json({ message: 'Failed to hash password', error: error.message });
    }
};

exports.comparePassword = async (inputPassword, storedPassword) => {
    try {
        console.log(inputPassword,storedPassword);
        
        return await bcrypt.compare(inputPassword, storedPassword);

    } catch (error) {
        console.log(error);
        
    }
};
