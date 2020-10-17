const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/', userController.indexUser);
router.post('/', userController.createUser);
router.get('/:id', userController.showUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.destroyUser);
router.post('/login',userController.loginUser);

module.exports = router;