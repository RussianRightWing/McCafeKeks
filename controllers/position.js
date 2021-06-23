const Position = require('../models/Position')
const exceptionHandler = require('../utilities/exceptionHandler')

module.exports.getByCategoryId = async function(req, res) {
    try {
        const positions = await Position.find({
            category: req.params.categoryId,
            user: req.user.id
        })
        res.status(200).json(positions)
    } catch (e){
        exceptionHandler(res, e)
    }
}

module.exports.create = async function(req, res) {
    try {
        const position = new Position({
            name: req.body.name,
            cost: req.body.cost,
            category: req.body.category,
            user: req.body.user
        })
        await position.save()
        res.status(201).json({position})
    } catch (e){
        exceptionHandler(res, e)
    }
}

module.exports.remove = async function(req, res) {
    try {
        await Position.remove({_id: req.params.id})
        res.status(200).json({
            message: 'Position was deleted'
        })
    } catch (e){
        exceptionHandler(res, e)
    }
}

module.exports.update = async function(req, res) {
    try {
        await Position.findByIdAndUpdate(
            {_id: req.params.id},
            {$set: req.body},
            {new: true}
        )
        res.status(200).json({
            message: 'Position was updated'
        })
    } catch (e){
        exceptionHandler(res, e)
    }
}