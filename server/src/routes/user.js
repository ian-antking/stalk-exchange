const express = require('express')
const userController = require('../controllers/user')
const inviteCode = require('../middleware/invite-code')
const auth = require('../middleware/auth')

const router = express.Router()

router.get('/all', auth, userController.getUsers)
router.get('/:id', auth, userController.getUserById)
router.post('/', inviteCode, userController.addUser)
router.patch('/', auth, userController.updateUser)

module.exports = router
