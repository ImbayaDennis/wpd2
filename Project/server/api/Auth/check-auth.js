const jtw = require('jsonwebtoken');

module.exports = (req, res, next) =>{
    try {
        const token = req.headers.authentication.split(" ")[1];

        const decoded = jtw.verify(token, process.env.JWT_KEY);
        req.userData = decoded;
        next();
    } catch (error) {
       return res.status(401).json([]);
    }
}