const express = require('express');
const router = express.Router();
const AuthControllers = require('../controllers/AuthControllers');

 router.post('/register',AuthControllers.registerPost)
 router.post('/login',AuthControllers.loginPost)
 
 router.get('/register',AuthControllers.register)
 router.get('/login',AuthControllers.login)
 router.get('/logout',AuthControllers.logout)










module.exports = router