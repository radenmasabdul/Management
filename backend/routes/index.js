const express = require('express');

const router = express.Router();

const verifyToken = require("../middlewares/auth");

//auth
const RegisterControllers = require('../controllers/auth/RegisterControllers');
const LoginControllers = require("../controllers/auth/LoginControllers");

//user
const userControllers = require("../controllers/user/userControllers");

const { validateRegister, validateLogin } = require('../utils/validator/auth');

//auth
router.post('/register', validateRegister, RegisterControllers.register);
router.post('/login', validateLogin, LoginControllers.login);

//users
router.get('/admin/users', verifyToken, userControllers.getAllUsers);

module.exports = router