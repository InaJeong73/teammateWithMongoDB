// auth-controller.js
const AuthService = require('../services/auth.js');

exports.registerUser = async (req, res, next) => {
  console.log('Request body:', req.body); // 여기에 추가

  const { name, email, phoneNumber, password, university, age, experience,major} = req.body;
  try {
    const newUser = await AuthService.registerUser({
      name: name,
      email: email,
      phoneNumber: phoneNumber,
      password: password,
      university: university,
      age: age,
      experience: experience,
      major:major,
    });
    const authToken = await AuthService.generateAuthToken(newUser);
    return res.json({ user: newUser, authToken });
  } catch (error) {
    console.error(error);  // 에러를 콘솔에 출력
    return res.status(500).json({ error: 'Internal Server Error' });  // 클라이언트에게 간단한 에러 응답 전송
  }
};

exports.verifyPhoneNumber = async (req, res, next) => {
    const { phoneNumber } = req.body;

    try {
        // 전화번호 인증 코드 전송
        await AuthService.sendVerificationCodeByPhoneNumber(phoneNumber);
        return res.json({ success: true, message: 'Verification code sent successfully' });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Failed to send verification code' });
    }
};

exports.verifyEmail = async (req, res, next) => {
    const { universityEmail } = req.body;

    try {
        // 이메일 주소의 유효성 확인
        await AuthService.validateUniversityEmail(universityEmail);

        // 이메일 인증 코드 전송
        await AuthService.sendVerificationCodeByEmail(universityEmail);

        return res.json({ success: true, message: 'Verification code sent successfully' });
    } catch (error) {
        return res.status(400).json({ success: false, message: 'Invalid university email address' });
    }
};

exports.authenticateUser = async (req, res, next) => {
    const { email, password } = req.body;

    // 이메일 주소의 유효성 확인
    const isEmailValid = await AuthService.validateEmail(email);

    if (!isEmailValid) {
        return res.status(400).json({ message: 'Invalid email address' });
    }

    // 나머지 로직은 이전 코드와 동일하게 처리
    try {
        const user = await AuthService.authenticateUser(email, password);
        const authToken = await AuthService.generateAuthToken(user);
        return res.json({ user, authToken });
    } catch (error) {
        return res.status(401).json({ message: 'Authentication failed' });
    }
};


exports.verifyCode = async (req, res, next) => {
  const { verificationCode } = req.body;

  try {
      // 사용자가 입력한 인증 코드의 유효성 확인 로직
      const isValidCode = await AuthService.verifyCode(verificationCode);

      if (isValidCode) {
          return res.json({ success: true, message: 'Verification successful' });
      } else {
          return res.json({ success: false, message: 'Invalid verification code' });
      }
  } catch (error) {
      console.error('Error during verification:', error);
      return res.status(500).json({ success: false, message: 'Error during verification' });
  }
};
