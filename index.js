const express = require('express');
const userRouter = require('./user');
const mongoose = require('mongoose');


// 新建app
const app = express();

app.use('/user', userRouter);

app.listen(9099, () => {
  console.log('Node app start at port 9099');
});