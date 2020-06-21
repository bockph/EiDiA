"use strict";

const express = require('express');
const router = express.Router();

const middleWares = require('../middlewares');
const AuthController = require('../controllers/auth');


router.post('/login', AuthController.login);
router.post('/register', AuthController.register); // TODO check authorization
router.get('/me', middleWares.checkAuthentication, AuthController.me);
router.get('/settings', middleWares.checkAuthentication);//, AuthController.settings);
router.post('/settings', middleWares.checkAuthentication);//, AuthController.saveSettings);
router.get('/logout', middleWares.checkAuthentication, AuthController.logout);
router.get('/list', middleWares.checkAuthentication);//, AuthController.logout);

module.exports = router;
