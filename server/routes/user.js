const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const passport = require('passport');
const asyncHandler = require('express-async-handler');

const passportAuthAccessToken = passport.authenticate('access token', { session: false });

router.get('/', passportAuthAccessToken, asyncHandler(userController.indexUser));
router.post('/', asyncHandler(userController.createUser));
router.get('/:id', passportAuthAccessToken, asyncHandler(userController.showUser));
router.put('/:id', passportAuthAccessToken, asyncHandler(userController.updateUser));
router.delete('/:id', passportAuthAccessToken, asyncHandler(userController.destroyUser));
router.post('/login',asyncHandler(userController.loginUser));

module.exports = router;