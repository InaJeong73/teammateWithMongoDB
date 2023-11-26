// profile.js

const express = require('express');
const ProfileController = require('../controllers/profile.js');

const router = express.Router();

router.get('/', (req, res) => {
    res.send('Hello from profile');
  });
router.post('/create', ProfileController.createProfile);
router.put('/edit', ProfileController.editProfile);

module.exports = router;
