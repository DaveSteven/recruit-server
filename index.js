const express = require('express');
const userRouter = require('./user');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

// 新建app
const app = express();

const server = require('http').Server(app);
const io = require('socket.io')(server);

io.on('connection', socket => {
  console.log('user login');
  socket.on('send-msg', data => {
    io.emit('receive', data);
  });
});

app.use(cookieParser());
app.use(bodyParser.json());
app.use('/user', userRouter);

server.listen(9099, () => {
  console.log('Node app start at port 9099');
});
