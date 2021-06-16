module.exports.overview = function(req, res) {
    res.status(200).json({
        helloWorld: 'sniggers'
    })

}

module.exports.analytics = function(req, res) {
    res.status(200).json({
        helloAnalWorld: 'niggers'
    })
}