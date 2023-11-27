// register-controller.js
const registerService = require('../services/register.js');

exports.registerUser = async (req, res, next) => {
  console.log('Request body:', req.body);

  const { name, email, phoneNumber, password, university, age, experience, major } = req.body;

  try {
    // 대학 이메일 유효성 검사
    const isUniversityEmailValid = await registerService.validateUniversityEmail(email);

    if (!isUniversityEmailValid) {
    // 실패 시 클라이언트에게 실패 정보를 응답하면서도 연결은 끊지 않음
      console.error('유효하지 않은 대학 이메일 주소입니다');
      return res.status(400).json({ error: '유효하지 않은 대학 이메일 주소입니다' });
    }

    // 사용자 중복성 검사
    const duplicationCheck = await registerService.checkDuplication(email, password);

    if (duplicationCheck.duplicate) {
    // 중복된 경우 클라이언트에게 실패 정보를 응답하면서도 연결은 끊지 않음
      console.error(duplicationCheck.message);
      return res.status(400).json({ error: duplicationCheck.message });
    }


    // 사용자 등록
    const newUser = await registerService.registerUser({
      name,
      email,
      phoneNumber,
      password,
      university,
      age,
      experience,
      major,
    });

    // 사용자 토큰 생성
    const authToken = await registerService.generateAuthToken(newUser);

    // 클라이언트에게 "No Content" 응답
    return { success: true, message: '회원가입에 성공했습니다.' };
  } catch (error) {
    console.error(error);

    // 실패 시 클라이언트에게 경고 정보를 응답하면서도 연결은 끊지 않음
    return { success: false, message: '회원가입에 실패했습니다. 다시 시도해주세요.' };
  }
};



// exports.verifyPhoneNumber = async (req, res, next) => {
//     const { phoneNumber } = req.body;

//     try {
//         // 전화번호 인증 코드 전송
//         await registerService.sendVerificationCodeByPhoneNumber(phoneNumber);
//         return res.json({ success: true, message: 'Verification code sent successfully' });
//     } catch (error) {
//         return res.status(500).json({ success: false, message: 'Failed to send verification code' });
//     }
// };

// exports.verifyEmail = async (req, res, next) => {
//     const { universityEmail } = req.body;

//     try {
//         // 이메일 주소의 유효성 확인
//         await registerService.validateUniversityEmail(universityEmail);

//         // 이메일 인증 코드 전송
//         await registerService.sendVerificationCodeByEmail(universityEmail);

//         return res.json({ success: true, message: 'Verification code sent successfully' });
//     } catch (error) {
//         return res.status(400).json({ success: false, message: 'Invalid university email address' });
//     }
// };

// exports.verifyCode = async (req, res, next) => {
//   const { verificationCode } = req.body;

//   try {
//       // 사용자가 입력한 인증 코드의 유효성 확인 로직
//       const isValidCode = await registerService.verifyCode(verificationCode);

//       if (isValidCode) {
//           return res.json({ success: true, message: 'Verification successful' });
//       } else {
//           return res.json({ success: false, message: 'Invalid verification code' });
//       }
//   } catch (error) {
//       console.error('Error during verification:', error);
//       return res.status(500).json({ success: false, message: 'Error during verification' });
//   }
// };
