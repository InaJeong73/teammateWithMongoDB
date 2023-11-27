// routes/login.js 파일
const express = require('express');
const path = require('path');
const loginController = require('../controllers/login.js');

const router = express.Router();

router.post('/', loginController.loginUser);

router.get('/', (req, res) => {
  const htmlPath = path.join(__dirname, '../login.html');
  res.sendFile(htmlPath);
});

module.exports = router;
