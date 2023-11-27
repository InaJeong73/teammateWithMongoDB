const express = require('express');
const multer = require('multer');
const registerController = require('../controllers/register.js');
const path = require('path');
const router = express.Router();
const upload = multer();

router.post('/', upload.none(), async (req, res, next) => {
  try {
    const registrationResult = await registerController.registerUser(req.body);

    // registrationResult는 { success: boolean, message: string } 형태의 객체
    if (registrationResult.success) {
      // 회원가입이 성공한 경우
      console.log('회원가입 성공! 사용자 정보:', req.body);
      return res.redirect('/');  // 로그인 페이지로 리디렉션
    } else {
      // 회원가입이 실패한 경우
      return res.status(400).json({ error: registrationResult.message });
    }
  } catch (err) {
    // Handle any errors that might occur during the registration process
    console.error('회원가입 중 오류 발생:', err);
    res.status(500).json({ error: '내부 서버 오류' });
  }
});

router.get('/', (req, res) => {
  const registrationHtmlPath = path.join(__dirname, '../registration.html');
  res.sendFile(registrationHtmlPath);
});

module.exports = router;

// router.post('/verify-phone', upload.none(), async (req, res) => {
//   const { phoneNumber } = req.body;

//   try {
//     // Call the verifyPhoneNumber function from the controller
//     const result = await registerController.verifyPhoneNumber(req, res);
//     // Handle the result if needed
//     return res.json(result);
//   } catch (error) {
//     return res.status(500).json({ success: false, message: 'Failed to send verification code' });
//   }
// });


// router.post('/verify-email', upload.none(), async (req, res) => {
//   const { universityEmail } = req.body;

//   try {
//     // Call the verifyEmail function from the controller
//     const result = await registerController.verifyEmail(req, res);
//     // Handle the result if needed
//     return res.json(result);
//   } catch (error) {
//     return res.status(400).json({ success: false, message: 'Invalid university email address' });
//   }
// });

// router.post('/verify-code', upload.none(), async (req, res) => {
//   try {
//     // Call the verifyCode function from the controller
//     const result = await registerController.verifyCode(req, res);
//     // Handle the result if needed
//     return res.json(result);
//   } catch (error) {
//     console.error('Error during verification:', error);
//     return res.status(500).json({ success: false, message: 'Error during verification' });
//   }
// });