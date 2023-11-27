const express = require('express');
const connect = require('./schemas/connect');
const bodyParser = require('body-parser');
const registerRoutes = require('./routes/register.js');
const loginRoutes = require('./routes/login.js');
const profileRoutes = require('./routes/profile.js');
const teamPostRoutes = require('./routes/teampost.js');
const userRoutes = require('./routes/user.js');
const mainRoutes= require('./routes/main.js');


const app = express();
app.set('port', process.env.PORT || 3002);

// Middleware and routing setup
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(bodyParser.json());  
app.use('/', loginRoutes);
app.use('/register', registerRoutes);
app.use('/profile', profileRoutes);
app.use('/teampost', teamPostRoutes);
app.use('/user', userRoutes);
app.use('/main', mainRoutes);
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
