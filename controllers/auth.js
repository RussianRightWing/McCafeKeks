const bcryptjs = require('bcryptjs')
const User = require('../models/User')

module.exports.login = function(req, res) {
  res.status(200).json({
    login: {
      email: req.body.email,
      password: req.body.password
    }
  })
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