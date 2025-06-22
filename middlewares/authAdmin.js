const jwt = require("jsonwebtoken");
require("dotenv").config();

function authAdmin(req, res, next) {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).send({message: "Access token is missing"});
    }
    try {
        const decoded = jwt.verify(token, process.env.ADMIN_JWT_SECRET);
        req.userId = decoded.id;
        next();
    } catch (e) {
        return res.status(403).send({message: "Invalid access token"});
    }
}

module.exports = authAdmin;