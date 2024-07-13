const express = require('express');

const router = express.Router();

const RegisterControllers = require('../controllers/auth/RegisterControllers');
const LoginControllers = require("../controllers/auth/LoginControllers");

const { validateRegister, validateLogin } = require('../utils/validator/auth');

router.post('/register', validateRegister, RegisterControllers.register);
router.post('/login', validateLogin, LoginControllers.login);

module.exports = router