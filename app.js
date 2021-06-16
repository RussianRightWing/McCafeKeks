const express = require('express')
const app = express()

const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')

const mongoKeys = require('./config/mongoKeys')
const authRoutes = require('./routes/auth')
const analyticsRoutes = require('./routes/analytics')
const categoryRoutes = require('./routes/category')
const orderRoutes = require('./routes/order')
const positionRoutes = require('./routes/position')


app.use(bodyParser.urlencoded({extended: true }))
app.use(bodyParser.json())
app.use(morgan('dev'))
app.use(cors())
mongoose.connect(mongoKeys.mongoURl)
    .then(()=> {console.log('all good with mongoDB')})
    .catch(error => console.log(error))


app.use('/api/auth', authRoutes)
app.use('/api/analytics', analyticsRoutes)
app.use('/api/category', categoryRoutes)
app.use('/api/order', orderRoutes)
app.use('/api/position', positionRoutes)


module.exports = app