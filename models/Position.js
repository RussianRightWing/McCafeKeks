const mongoose = require('mongoose')
const Schema = mongoose.Schema

const categoryPosition = new Schema ({
    name: {
        type: String,
        required: true
    },
    cost: {
        type: Number,
        default: "0"
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'category'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    }
})

module.exports = mongoose.model('position', categoryPosition)