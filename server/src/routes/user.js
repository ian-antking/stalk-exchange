const express = require('express');
const userController = require('../controllers/user');
const inviteCode = require('../middleware/invite-code');

const router = express.Router();

router.post('/', inviteCode, userController.addUser);

module.exports = router;