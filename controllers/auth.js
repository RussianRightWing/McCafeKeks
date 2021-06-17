const bcryptjs = require('bcryptjs')
const jsonWebToken = require('jsonwebtoken')
const User = require('../models/User')
const tokenKey = require('../config/tokenKey')

module.exports.login = async function(req, res) {
  const user = await User.findOne({email: req.body.email})
  if (user){
    const comparePassword = bcryptjs.compareSync(req.body.password, user.password)
    if (comparePassword){
      const token = jsonWebToken.sign({
        email: user.email,
        userId: user._id
      }, tokenKey.tokenKey, {
        expiresIn: 60*60*6
      })
      res.status(200).json({
        token: `Bearer ${token}`
      })
    }
    else {
      res.status(401).json({
        message: 'Invalid password'
      })
    }
  }
  else {
    res.status(404).json({
      message: 'User is not found'
    })
  }
}


module.exports.register = async function(req, res) {
  const checkUser = await  User.findOne({email: req.body.email})

  if (checkUser) {
    res.status(409).json({
      message: 'User is registered, sorry man'
    })
  }
  else {
    const salt = bcryptjs.genSaltSync(12)
    const user = new User ({
      email: req.body.email,
      password: bcryptjs.hashSync(req.body.password, salt)
    })
    try{
      await user.save()
      res.status(201).json({
        message: 'User is saved',
        user: user
      })
    }catch(e){
      res.status(408).json({
        message: 'User is not saved',
        exception: e
      })
    }
  }

}