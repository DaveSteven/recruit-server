const express = require('express');
const utils = require('utility');
const Router = express.Router();
const models = require('./model');
const User = models.getModel('user');

Router.get('/list', (req, res) => {
  User.find({}, (err, doc) => {
    return res.json(doc);
  });
});

// 注册
Router.post('/register', (req, res) => {
  const { user, pwd, type } = req.body;
  User.findOne({ user }, (err, doc) => {
    if (doc) {
      return res.json({ code: 1, msg: '用户名重复！' });
    }
    User.create({ user, type, pwd: md5Pwd(pwd) }, (err, doc) => {
      if (err) {
        return res.json({ code: 1, msg: '出错了！' });
      }
      return res.json({ code: 0 });
    });
  });
});

Router.get('/info', (req, res) => {
  return res.json({ code: 1 });
});

function md5Pwd(pwd) {
  const salt = 'imooc_is_good_312378Xd981Xaa!@#$!@';
  return utils.md5(`${pwd}${salt}`);
}

module.exports = Router;
