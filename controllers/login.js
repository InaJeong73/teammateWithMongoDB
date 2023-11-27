// controllers/login.js
const path = require('path');  // path 모듈 추가
const loginService = require('../services/login');

// POST /login 라우터에 대한 컨트롤러
exports.loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    // 사용자 인증
    const user = await loginService.authenticateUser(email, password);

    // 토큰 발급
    const authToken = loginService.generateAuthToken(user);

    // 세션 생성
    const session = await loginService.createSession(user._id);

    // 로그인 히스토리 기록 (로그인 성공)
    await loginService.recordLoginHistory(user._id, true, req.ip);

   // 클라이언트에 토큰 전달 및 세션 ID 쿠키 설정
res.cookie('sessionId', session.sessionId);

// 수정: 로그인 성공 시 클라이언트에게 리다이렉트 정보 전달
res.status(200).json({ success: true, authToken, user, redirect: '/main' });
// 클라이언트에서는 리다이렉트 정보를 확인하고, 필요한 조치를 취해야 함.
// 예를 들어, main.js 파일에서 해당 정보를 확인하고 페이지를 변경하는 코드를 추가해야 함.

     //클라이언트에서는 리다이렉트 정보를 확인하고, 필요한 조치를 취해야 함.
     // 예를 들어, main.js 파일에서 해당 정보를 확인하고 페이지를 변경하는 코드를 추가해야 함.

  } catch (error) {
     // 로그인 실패 시 에러 처리
     console.error(error.message);
     throw error; // 변경된 부분: 에러를 다시 throw하여 상위에서 처리하도록 함

  }
};
