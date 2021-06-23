module.exports = (res, e) => {
    res.status(500).json({
        message: e.message? e.message : e
    })
}