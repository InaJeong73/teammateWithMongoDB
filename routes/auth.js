//routes/auth.js
const express = require('express');
const path = require('path');
const AuthController = require('../controllers/auth.js');

const router = express.Router();

router.post('/register', AuthController.registerUser);
router.post('/login', AuthController.authenticateUser);

router.get('/', (req, res) => {
  const htmlPath = path.join(__dirname, '../auth.html');
  res.sendFile(htmlPath);
});

router.get('/register', (req, res) => {
  const registrationHtmlPath = path.join(__dirname, '../registration.html');
  res.sendFile(registrationHtmlPath);
});

module.exports = router;
