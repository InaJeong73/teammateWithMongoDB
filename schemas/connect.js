// schemas/connect.js

const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb+srv://Ina:1111@cluster0.ln9m7nd.mongodb.net/?retryWrites=true&w=majority';

const connect = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      dbName: 'teammate',
    });
    console.log('MongoDB에 연결되었습니다.');
  } catch (error) {
    console.error('MongoDB 연결 오류:', error);
  }
};

module.exports = connect;
