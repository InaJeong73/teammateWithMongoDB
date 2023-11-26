// routes/user.js

const express = require('express');
const UserController = require('../controllers/user.js');

const router = express.Router();

router.get('/', UserController.getAllUsers);
router.post('/', UserController.createUser);
router.get('/:userId', UserController.getUserById);
router.patch('/:userId', UserController.updateUser);
router.delete('/:userId', UserController.deleteUser);
router.post('/:userId/profile', UserController.createProfile);

// 다른 유저 라우팅들 추가 가능

module.exports = router;
