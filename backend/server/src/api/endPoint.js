const express = require('express');
const router = express.Router();
const {ping} = require('../controllers/pingController');
const { login, logout } = require('../controllers/authController');

router.get('/ping',ping)

router.post('/login',login)
router.post('/logout',logout)




module.exports = router;