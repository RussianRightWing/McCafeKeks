const express = require('express')
const passport = require('passport')
const controller = require('../controllers/category')
const multer = require('../middleware/multer')
const router = express.Router()

router.get('/', passport.authenticate('jwt', {session: false}), controller.getAll)
router.get('/:id', passport.authenticate('jwt', {session: false}), controller.getById)
router.delete('/:id', passport.authenticate('jwt', {session: false}), controller.remove)
router.post('/', passport.authenticate('jwt', {session: false}), multer.single('image'), controller.create)
router.post('/:id', passport.authenticate('jwt', {session: false}), multer.single('image'), controller.update)


module.exports = router