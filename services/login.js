// services/login.js
const User = require('../schemas/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Session = require('../schemas/session');
const LoginHistory = require('../schemas/loginHistory');

exports.authenticateUser = async (email, password) => {
    try {
      // 이메일로 사용자 찾기
      const user = await User.findOne({ email });
  
      if (!user) {
        // 사용자를 찾지 못한 경우 401 응답 코드와 함께 에러 메시지 전달
        const error = new Error('Invalid email or password');
        error.status = 401;
        throw error;
      }
  
      // 비밀번호 검증
      const isPasswordValid = await bcrypt.compare(password, user.password);
  
      if (!isPasswordValid) {
        // 비밀번호가 일치하지 않는 경우 401 응답 코드와 함께 에러 메시지 전달
        const error = new Error('Invalid email or password');
        error.status = 401;
        throw error;
      }
  
      return user; // 로그인 성공 시 사용자 객체 반환
    } catch (error) {
      // 로그인 실패 시 에러 처리
      console.error(error.message);
      throw error; // 변경된 부분: 에러를 다시 throw하여 상위에서 처리하도록 함
    }
  };

// 토큰 발급 함수
exports.generateAuthToken = (user) => {
  const secretKey = 'your_secret_key'; // 반드시 안전한 방식으로 비밀 키를 관리해야 합니다.
  const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '1h' });

  return token;
};

exports.createSession = async (userId) => {
  try {
    const session = await Session.create({
      sessionId: generateSessionId(), // 함수를 통해 고유한 세션 ID를 생성
      userId,
    });
    return session;
  } catch (error) {
    throw new Error('Failed to create session');
  }
};

exports.recordLoginHistory = async (userId, loginSuccess, ipAddress) => {
    try {
      if (userId) {
        await LoginHistory.create({
          userId,
          loginSuccess,
          ipAddress,
        });
      }
    } catch (error) {
      console.error('Failed to record login history:', error.message);
      // 에러 발생 시에는 더 이상 에러를 throw하지 않고 콘솔에만 출력
    }
  };

// 고유한 세션 ID를 생성하는 함수 (실제 구현은 적절한 방식으로 해야 함)
function generateSessionId() {
  // 예시로 무작위 문자열 생성
  return Math.random().toString(36).substring(2, 15);
}
