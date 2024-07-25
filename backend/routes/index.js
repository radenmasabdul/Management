const express = require('express');

const router = express.Router();

const verifyToken = require("../middlewares/auth");

//auth
const RegisterControllers = require('../controllers/auth/RegisterControllers');
const LoginControllers = require("../controllers/auth/LoginControllers");

//user
const userControllers = require("../controllers/user/userControllers");

//validate
const { validateRegister, validateLogin } = require('../utils/validator/auth');
const { validateUser } = require('../utils/validator/user');

//auth
router.post('/register', validateRegister, RegisterControllers.register);
router.post('/login', validateLogin, LoginControllers.login);

//users
router.get('/admin/users/getallusers', verifyToken, userControllers.getAllUsers);
router.post('/admin/users/createusers', verifyToken, validateUser, userControllers.createUser);
router.get('/admin/users/getusers/:id', verifyToken, userControllers.getUsersById);
router.post('/admin/users/updateusers/:id', verifyToken, userControllers.updateUsers);
router.delete('/admin/users/deleteusers/:id', verifyToken, userControllers.deleteUsers);

module.exports = router