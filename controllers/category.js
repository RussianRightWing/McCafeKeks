    const Category = require('../models/Category')
const Position = require('../models/Position')
const exceptionHandler = require('../utilities/exceptionHandler')

module.exports.getAll = async function(req, res) {
    try {
        const categories = await Category.find({
            user: req.user.id
        })
        res.status(200).json(categories)
    }catch (e){
        exceptionHandler(e)
    }

}

module.exports.getById = async function(req, res) {
    try {
        const category = await Category.findById(req.params.id)
        res.status(200).json(category)
    } catch (e){
        exceptionHandler(e)
    }
}

module.exports.remove = async function(req, res) {
    try {
        await Position.remove({category: req.params.id})
        await Category.remove({_id: req.params.id})
        res.status(200).json({
            message: 'Category was deleted'
        })
    } catch (e){
        exceptionHandler(e)
    }
}

module.exports.create = async function(req, res) {
    const checkCategory = await  Category.findOne({name: req.body.name})

    if (checkCategory) {
        res.status(409).json({
            message: 'Category already exists'
        })
    } else {
        try {
            const newCategory = new Category({
                name: req.body.name,
                imageSrc: req.file ? req.file.path : 'fuck',
                user: req.user.id
            })
            await newCategory.save()
            res.status(201).json(newCategory)
        } catch (e) {
            exceptionHandler(e)
        }
    }
}

module.exports.update = async function(req, res) {
    const updated = {
        name: req.body.name,
    }
    if (req.file){
        updated.imageSrc = req.file.path
    }
    try {
        await Category.findByIdAndUpdate(
            {_id: req.params.id},
            {$set: updated},
            {new: true}
        )
        res.status(200).json({
            message: 'Category was updated'
        })
    } catch (e){
        exceptionHandler(e)
    }
}