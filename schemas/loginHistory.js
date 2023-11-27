const mongoose = require('mongoose');

const loginHistorySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  loginTime: {
    type: Date,
    default: Date.now,
  },
  logoutTime: {
    type: Date,
  },
  loginSuccess: {
    type: Boolean,
    required: true,
  },
  ipAddress: {
    type: String,
  },
  // 다른 로그인 히스토리 정보를 저장할 수 있습니다.
});

module.exports = mongoose.model('LoginHistory', loginHistorySchema);
