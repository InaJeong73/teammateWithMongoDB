// services/register.js
const bcrypt = require('bcrypt');
const emailValidator = require('email-validator');
const nodemailer = require('nodemailer');
const User = require('../schemas/user'); // User 모델 import
const twilio = require('twilio'); // Twilio import
const jwt = require('jsonwebtoken');

class RegisterService {
  // 사용자 등록 함수
  static async registerUser(userData) {
    const { name, email, phoneNumber, password, university, age, experience, major } = userData;

    try {
      // 비밀번호 암호화를 위한 salt 생성
      const saltRounds = 10;
      const salt = await bcrypt.genSalt(saltRounds);

      // 비밀번호 해싱
      const hashedPassword = await bcrypt.hash(password, salt);

      // 데이터베이스에 사용자 등록
      const newUser = await User.create({
        name,
        email,
        phoneNumber,
        password: hashedPassword,
        university,
        age,
        experience,
        major,
      });

      return newUser;
    } catch (error) {
      console.error('사용자 등록 중 에러 발생', error);
      throw new Error('사용자 등록 중 에러 발생');
    }
  }

  // 사용자 인증 토큰 생성 함수
  static async generateAuthToken(user) {
    try {
      // 사용자 정보에서 필요한 데이터 추출
      const { name, email, phoneNumber, university, age, experience, major } = user;

      // 토큰에 담을 정보
      const payload = {
        user: {
          name,
          email,
          phoneNumber,
          university,
          age,
          experience,
          major,
          // 다른 필요한 사용자 정보 추가
        },
      };

      // 토큰 생성 및 반환
      const authToken = jwt.sign(payload, 'your_secret_key', { expiresIn: '1h' });
      return authToken;
    } catch (error) {
      console.error('인증 토큰 생성 중 에러:', error);
      throw new Error('인증 토큰 생성 중 에러');
    }
  }

  // 이메일과 비밀번호 중복성 확인 함수
  static async checkDuplication(email, password) {
    try {
      // 이메일과 비밀번호를 이용중인 사용자가 있는지 확인
      const existingUser = await User.findOne({ email, password });

      if (existingUser) {
        // 중복된 경우
        return { duplicate: true, message: '이미 등록된 사용자입니다.' };
      } else {
        // 중복되지 않은 경우
        return { duplicate: false, message: '사용할 수 있는 이메일과 비밀번호입니다.' };
      }
    } catch (error) {
      console.error('중복성 확인 중 에러 발생', error);
      throw new Error('중복성 확인 중 에러 발생');
    }
  }

  // 대학교 이메일 유효성 검사 함수
  static async validateUniversityEmail(email) {
    const allowedUniversityDomains = ['ac.kr', 'edu.kr', 'co.kr'];

    if (emailValidator.validate(email)) {
      const domain = email.split('@')[1];

      if (allowedUniversityDomains.some(allowedDomain => domain.endsWith(allowedDomain))) {
        return true;
      }
    }

    return false;
  }
}

module.exports = RegisterService;


  
//    // 전화번호를 통한 인증 코드 전송
//   static async sendVerificationCodeByPhoneNumber(phoneNumber) {
//     // Twilio 설정
//     const accountSid = 'your_account_sid'; // Twilio 계정 SID
//     const authToken = 'your_auth_token'; // Twilio 인증 토큰
//     const twilioPhoneNumber = 'your_twilio_phone_number'; // Twilio 전화번호

//     const client = twilio(accountSid, authToken);

//     // // 랜덤한 6자리 숫자로 구성된 인증 코드 생성
//     // const verificationCode = this.generateRandomCode();

//     try {
//       // Twilio를 사용하여 SMS 전송
//       await client.messages.create({
//         body: `Your verification code is: ${verificationCode}`,
//         from: twilioPhoneNumber,
//         to: phoneNumber,
//       });

//       console.log(`Verification code ${verificationCode} sent to ${phoneNumber}`);
//       return verificationCode;
//     } catch (error) {
//       console.error(`Error sending SMS: ${error.message}`);
//       throw new Error('Error sending SMS');
//     }
//   }
 
// //이메일을 통한 인증 코드 전송
// static async sendVerificationCodeByEmail(universityEmail) {
//     // Nodemailer 설정
//     const transporter = nodemailer.createTransport({
//         service: 'gmail',
//         auth: {
//             user: 'your_email@gmail.com', // 발신자 Gmail 계정
//             pass: 'your_password', // 발신자 Gmail 앱 비밀번호
//         },
//     });

//     // 랜덤한 6자리 숫자로 구성된 인증 코드 생성
//     const verificationCode = this.generateRandomCode();

//     // 이메일 옵션 설정
//     const mailOptions = {
//         from: 'your_email@gmail.com',
//         to: universityEmail,
//         subject: 'Verification Code',
//         text: `Your verification code is: ${verificationCode}`,
//     };

//     try {
//         // 이메일 전송
//         await transporter.sendMail(mailOptions);

//         console.log(`Verification code ${verificationCode} sent to ${universityEmail}`);
//         return verificationCode;
//     } catch (error) {
//         console.error(`Error sending email: ${error.message}`);
//         throw new Error('Error sending email');
//     }
// }



//   static generateRandomCode() {
//     return Math.floor(100000 + Math.random() * 900000);
//   }

//   static async verifyCode(userEnteredCode, generatedCode) {
//     // 사용자가 입력한 인증 코드의 유효성 확인 로직
//     return userEnteredCode === generatedCode;
//   }
