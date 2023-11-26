const express = require('express');
const bodyParser = require('body-parser');
const connect = require('./schemas/connect');
const authRoutes = require('./routes/auth.js');
const profileRoutes = require('./routes/profile.js');
const teamPostRoutes = require('./routes/teampost.js');
const userRoutes = require('./routes/user.js');

const app = express();
app.set('port', process.env.PORT || 3002);

// Middleware and routing setup
app.use(bodyParser.urlencoded({ extended: true })); // URL-encoded 데이터 파싱을 위한 설정
app.use(bodyParser.json());  // <-- Place body-parser here
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);
app.use('/teampost', teamPostRoutes);
app.use('/user', userRoutes);

connect();

// ...

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Server listening
app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기 중');
});
