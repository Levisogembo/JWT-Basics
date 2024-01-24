const {UnauthenticatedError, BadRequest} = require('../errors/index')
const jwt = require('jsonwebtoken')

const login = async (req,res) =>{
    const {username, password} = req.body
    if(!username || !password){
        throw new BadRequest('please provide email and password')

    }
    console.log(req.body)
    //creating customer id
    const id = new Date().getTime()
    //creating a jwt token
    const token = jwt.sign({id,username},process.env.JWT_SECRET,{expiresIn:'30d'})
    res.status(200).json({msg:'user created',token})
}

const dashboard = async (req, res) =>{
    
    //verifying the token
    try {    
       const luckyNumber = Math.floor(Math.random()*100)
        res.status(200).json({msg:`Hello ${req.user.username}`,secrete:`Here is your authorized data and lucky number is ${luckyNumber}`})
    } catch (error) { 
        throw new UnauthenticatedError('not authorized to access this route')
    }
    
    
}

module.exports = {login,dashboard}