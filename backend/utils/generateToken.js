const jwt = require('jsonwebtoken');
const JWT_SECRET = 'MyNameIsManishKumar';

const generateToken = (id) => {
    return jwt.sign({id}, JWT_SECRET , {
        expiresIn: '31d'
    });
}

module.exports = generateToken;   