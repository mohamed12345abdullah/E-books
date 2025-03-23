const jwt = require('jsonwebtoken');

const generateToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '1d' });



};



const verifyToken = async (req, res, next) => {
    const headers = req.headers.authorization || req.headers.Authorization ;
    const token = headers.split(' ')[1];

    console.log("token is ",token);
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized dddddd' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.id = decoded.id;

        console.log(decoded);
        // res.end("token verified ,",decoded);
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({ message:error.message });
    }
};





module.exports = {
    generateToken,
    verifyToken
}