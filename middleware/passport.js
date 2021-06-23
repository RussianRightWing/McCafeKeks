const User = require('../models/User')
const mongoose = require('mongoose')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt

const opt = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: require('../config/tokenKey').tokenKey
}

module.exports = passport => {
    passport.use(new JwtStrategy(opt, async (payload, done) => {
        try {
            const user = await User.findById(payload.userId).select('email id')
            if (user){
                done(null, user)
            } else {
                done(null, false)
            }
        } catch (e){
            console.log(e)
        }
    })
    )
}