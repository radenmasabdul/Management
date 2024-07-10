const express = require('express');

const router = express.Router();

const RegisterControllers = require('../controllers/RegisterControllers');
const LoginControllers = require("../controllers/LoginControllers");

const { validateRegister, validateLogin } = require('../utils/validator/auth');

router.post('/register', validateRegister, RegisterControllers.register);
router.post('/login', validateLogin, LoginControllers.login);

module.exports = router