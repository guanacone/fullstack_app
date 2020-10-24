const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const passport = require('passport');

const passportAuth = passport.authenticate('jwt', { session: false });

router.get('/', passportAuth, userController.indexUser);
router.post('/', userController.createUser);
router.get('/:id', passportAuth, userController.showUser);
router.put('/:id', passportAuth, userController.updateUser);
router.delete('/:id', passportAuth, userController.destroyUser);
router.post('/login',userController.loginUser);

module.exports = router;