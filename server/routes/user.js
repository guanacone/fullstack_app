const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const passport = require('passport');
const asyncHandler = require('express-async-handler');

const passportAuth = passport.authenticate('jwt', { session: false });

router.get('/', passportAuth, asyncHandler(userController.indexUser));
router.post('/', asyncHandler(userController.createUser));
router.get('/:id', passportAuth, asyncHandler(userController.showUser));
router.put('/:id', passportAuth, asyncHandler(userController.updateUser));
router.delete('/:id', passportAuth, asyncHandler(userController.destroyUser));
router.post('/login',asyncHandler(userController.loginUser));

module.exports = router;