const express = require('express');
const mongoose = require('mongoose');

// 连接mongo
const DB_URL = 'mongodb://127.0.0.1:27017/recruit';
mongoose.connect(DB_URL);
mongoose.connection.on('connected', () => {
  console.log('mongo connect success');
});

// 新建表, 文档模型
const User = mongoose.model(
  'user',
  new mongoose.Schema({
    user: { type: String, require: true },
    age: { type: Number, require: true }
  })
);
// 新增数据
// User.create(
//   {
//     user: 'David',
//     age: 24
//   },
//   (err, doc) => {
//     if (!err) {
//       console.log(doc);
//     } else {
//       console.log(err);
//     }
//   }
// );
// User.update({ user: 'David' }, { $set: { age: 25 } }, (err, doc) => {
//   console.log(doc);
// });

// 新建app
const app = express();

app.get('/', (req, res) => {
  res.send('<h1>Hello Sumey!</h1>');
});

app.get('/data', (req, res) => {
  User.find({}, (err, doc) => {
    res.json(doc);
  });
  //   res.json({ name: 'immoc React App', type: 'IT' });
});

app.listen(9099, () => {
  console.log('Node app start at port 9099');
});
