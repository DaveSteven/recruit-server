const express = require('express');
const userRouter = require('./user');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const models = require('./model');
const Chat = models.getModel('chat');

// 新建app
const app = express();

const server = require('http').Server(app);
const io = require('socket.io')(server);

io.on('connection', socket => {
  console.log('user login');
  socket.on('send-msg', data => {
    const { from, to, content } = data;
    const chatId = [from, to].sort().join('_');
    Chat.create({chatId, from, to, content}, (err, doc) => {
      io.emit('receive', Object.assign({}, doc._doc));
    })
  });
});

app.use(cookieParser());
app.use(bodyParser.json());
app.use('/user', userRouter);

server.listen(9099, () => {
  console.log('Node app start at port 9099');
});
