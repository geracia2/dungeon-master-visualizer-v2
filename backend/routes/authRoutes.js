const express = require('express')
const router = express.Router()

const authCtrl = require('../controllers/authController')

// this information will be coming from a form on client, so we only have req.body[keys] to work with.

// ===CREATE== [http://localhost:5000/auth/register] ::  POST available: req.body.[keys]
router.post('/register', authCtrl.register)

// ===SHOW=== [http://localhost:5000/auth/login] :: POST available: req.body.[keys]
router.post('/login', authCtrl.login)

module.exports = router