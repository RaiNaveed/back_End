const express = require('express');
const Router = express.Router();
const {userRegister, userLogin} = require('../Controller/userController');

Router.post('/register', userRegister);
Router.post('/login', userLogin)

module.exports = Router