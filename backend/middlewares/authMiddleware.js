const jwt = require("jsonwebtoken");
const User = require("../models/userModels.js");
const JWT_SECRET = 'MyNameIsManishKumar';
const  asyncHandler = require("express-async-handler")

const protect = asyncHandler(async (req, res, next) => {
    let token 
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer ")){
        try {
            token = req.headers.authorization.split(" ")[1];

            const decoded = jwt.verify(token,JWT_SECRET);

            req.user =  await User.findById(decoded.id).select('-password')

            next();
        } catch (error) {
            console.error(error);
            res.status(401)
            throw new Error ("Not Authorized, Token Entered is Failed")
        }
    }
    if(!token){
        res.status(401)
        throw new Error("Authorization Failed to Determine - No Token Found")
    }
})

const admin = (req,res,next) => {
    if(req.user && req.user.isAdmin){
        next();
    }else{
        res.status(401)
        throw new Error ("Not Authorized as an Admin")
    }
}
module.exports = {protect, admin}