// routes/main.js 파일
const express = require('express');
const router = express.Router();
router.get('/', (req, res) => {
    res.send('here is main');//response에 helloworld라는 문자열을 담아서 보낸다는 뜻
  });

module.exports = router;
