const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const passport = require('passport');
const asyncHandler = require('express-async-handler');

const passportAuthAccessToken = passport.authenticate('access token', { session: false });
const passportAuthRefreshToken = passport.authenticate('refresh token', { session: false });
const passportAuthActivationToken = passport.authenticate('activation token', { session: false });

router.get('/', passportAuthAccessToken, asyncHandler(userController.indexUser));
router.post('/', asyncHandler(userController.createUser));
router.get('/reset_password', asyncHandler(userController.sendResetPasswordLink));
router.get('/activate_account', passportAuthActivationToken, asyncHandler(userController.activateAccount));
router.get('/:id', passportAuthAccessToken, asyncHandler(userController.showUser));
router.put('/:id', passportAuthAccessToken, asyncHandler(userController.updateUser));
router.put('/update_password/:id', passportAuthAccessToken, asyncHandler(userController.updatePassword));
router.delete('/:id', passportAuthAccessToken, asyncHandler(userController.destroyUser));
router.post('/login',asyncHandler(userController.loginUser));
router.post('/logout', asyncHandler(userController.logoutUser));
router.post('/refresh', passportAuthRefreshToken, asyncHandler(userController.refreshUser));

module.exports = router;