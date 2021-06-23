const multer = require('multer')
const moment = require('moment')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'upload/')
    },
    filename: (req, file, cb) => {
        const date = moment().format('DDMMYYYY_HHmmss_SSS')
        cb(null, `${date}-${file.originalname}`)
    }
})

const typeFilter = (req, file, cb) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

const sizeFilter = {
    fileSize: 1600 * 1200 * 4
}

module.exports = multer({
    storage,
    typeFilter,
    sizeFilter
})