const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const passport = require('passport');
const asyncHandler = require('express-async-handler');

const passportAuth = passport.authenticate('jwt', { session: false });

router.get('/', asyncHandler(passportAuth, userController.indexUser));
router.post('/', asyncHandler(userController.createUser));
router.get('/:id', asyncHandler(passportAuth, userController.showUser));
router.put('/:id', asyncHandler(passportAuth, userController.updateUser));
router.delete('/:id', asyncHandler(passportAuth, userController.destroyUser));
router.post('/login',asyncHandler(userController.loginUser));

module.exports = router;