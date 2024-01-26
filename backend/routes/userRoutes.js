const express = require('express')
const router = express.Router()
const userCtrl = require('../controllers/userController')

// ===SHOW=== [http://localhost:5000/api/users] :: GET available: req.id = payload.id, req.username = payload.username;
router.get('/', userCtrl.show)

module.exports = router