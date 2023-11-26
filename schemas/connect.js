// schemas/connect.js

const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb://root:nodejsbook@127.0.0.1/admin?authMechanism=DEFAULT';

const connect = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      dbName:'teammate',
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB에 연결되었습니다.');
  } catch (error) {
    console.error('MongoDB 연결 오류:', error);
  }
};

module.exports = connect;
