const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const passport = require('passport');

router.get('/', passport.authenticate('jwt', { session: false }), userController.indexUser);
router.post('/', userController.createUser);
router.get('/:id', passport.authenticate('jwt', { session: false }), userController.showUser);
router.put('/:id', passport.authenticate('jwt', { session: false }), userController.updateUser);
router.delete('/:id', passport.authenticate('jwt', { session: false }), userController.destroyUser);
router.post('/login',userController.loginUser);

module.exports = router;