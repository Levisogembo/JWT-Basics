const {UnauthenticatedError} = require('../errors/index')
const jwt = require('jsonwebtoken')
 
const auth = async (req,res,next) =>{
    const authHeader = req.headers.authorization
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        throw new UnauthenticatedError('no token provided')

    }
    //accessing the token
    const token = authHeader.split(' ')[1]
    try {
        const decodedJwt = jwt.verify(token,process.env.JWT_SECRET)
        const {id,username} = decodedJwt
        req.user = {id,username}
        next()
    } catch (error) { 
        throw new UnauthenticatedError('not authorized to access this route')
    }
    
}

module.exports = auth