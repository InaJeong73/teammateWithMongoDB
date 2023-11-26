// services/auth.js
const bcrypt = require('bcrypt');
const emailValidator = require('email-validator');
const nodemailer = require('nodemailer');
const User = require('../schemas/user'); // User 모델 import
const twilio = require('twilio'); // Twilio import

class AuthService {
  static async registerUser(userData) {
    const {name, email, phoneNumber, password, university, age, experience,major } = userData;


    // if (!(await AuthService.validateUniversityEmail(email))) {
    //   throw new Error('Invalid university email address');
    // }
    try{
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);


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
    }catch (error) {
    console.error('Error during user registration:', error);
    throw new Error('Error during user registration');
    }
  }


  static async authenticateUser(email, password) {
    // 사용자 인증 로직
    // 이 부분은 사용자의 이메일과 비밀번호를 확인하여 로그인 처리하는 로직을 추가해야 합니다.
  }

  static async generateAuthToken(user) {
    // 사용자를 위한 인증 토큰 생성 로직
    // 이 부분은 사용자 정보를 기반으로 JWT 또는 다른 인증 토큰을 생성하는 로직을 추가해야 합니다.
  }

  static async validateUniversityEmail(email) {
    const allowedUniversityDomains = ['ac.kr', 'edu.kr', 'co.kr']; // 등록을 허용할 대학교 이메일 도메인 목록

    if (emailValidator.validate(email)) {
      // 이메일 형식이 유효한 경우
      const domain = email.split('@')[1]; // 이메일 주소에서 도메인 부분 추출
      if (allowedUniversityDomains.some(allowedDomain => domain.endsWith(allowedDomain))) {
        return true; // 대학교 이메일 도메인 중 하나와 일치하면 true 반환
      }
    }

    return false; // 대학교 이메일이 아니거나 유효하지 않은 형식이면 false 반환
  }


   // 전화번호를 통한 인증 코드 전송
  static async sendVerificationCodeByPhoneNumber(phoneNumber) {
    // Twilio 설정
    const accountSid = 'your_account_sid'; // Twilio 계정 SID
    const authToken = 'your_auth_token'; // Twilio 인증 토큰
    const twilioPhoneNumber = 'your_twilio_phone_number'; // Twilio 전화번호

    const client = twilio(accountSid, authToken);

    // // 랜덤한 6자리 숫자로 구성된 인증 코드 생성
    // const verificationCode = this.generateRandomCode();

    try {
      // Twilio를 사용하여 SMS 전송
      await client.messages.create({
        body: `Your verification code is: ${verificationCode}`,
        from: twilioPhoneNumber,
        to: phoneNumber,
      });

      console.log(`Verification code ${verificationCode} sent to ${phoneNumber}`);
      return verificationCode;
    } catch (error) {
      console.error(`Error sending SMS: ${error.message}`);
      throw new Error('Error sending SMS');
    }
  }
 
//이메일을 통한 인증 코드 전송
static async sendVerificationCodeByEmail(universityEmail) {
    // Nodemailer 설정
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'your_email@gmail.com', // 발신자 Gmail 계정
            pass: 'your_password', // 발신자 Gmail 앱 비밀번호
        },
    });

    // 랜덤한 6자리 숫자로 구성된 인증 코드 생성
    const verificationCode = this.generateRandomCode();

    // 이메일 옵션 설정
    const mailOptions = {
        from: 'your_email@gmail.com',
        to: universityEmail,
        subject: 'Verification Code',
        text: `Your verification code is: ${verificationCode}`,
    };

    try {
        // 이메일 전송
        await transporter.sendMail(mailOptions);

        console.log(`Verification code ${verificationCode} sent to ${universityEmail}`);
        return verificationCode;
    } catch (error) {
        console.error(`Error sending email: ${error.message}`);
        throw new Error('Error sending email');
    }
}



  static generateRandomCode() {
    return Math.floor(100000 + Math.random() * 900000);
  }

  static async verifyCode(userEnteredCode, generatedCode) {
    // 사용자가 입력한 인증 코드의 유효성 확인 로직
    return userEnteredCode === generatedCode;
  }
}

module.exports = AuthService;
