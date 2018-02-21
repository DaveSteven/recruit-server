const express = require('express');
const utils = require('utility');
const Router = express.Router();
const models = require('./model');
const User = models.getModel('user');
const Chat = models.getModel('chat');
const _filter = { pwd: 0, __v: 0 };

Router.get('/list', (req, res) => {
  // User.remove({}, (req, res) => {});
  const { type } = req.query;
  User.find({ type }, (err, doc) => {
    return res.json({ code: 0, data: doc });
  });
});

// 登录
Router.post('/login', (req, res) => {
  const { user, pwd } = req.body;
  User.findOne({ user, pwd: md5Pwd(pwd) }, _filter, (err, doc) => {
    if (!doc) {
      return res.json({ code: 1, msg: '用户名或密码错误！' });
    }
    res.cookie('userid', doc._id);
    return res.json({ code: 0, data: doc });
  });
});

// 更新资料
Router.post('/update', (req, res) => {
  const userid = req.cookies.userid;
  if (!userid) {
    return json.dumps({ code: 1 });
  }
  const body = req.body;
  User.findByIdAndUpdate(userid, body, (err, doc) => {
    const data = Object.assign(
      {},
      {
        user: doc.user,
        type: doc.type
      },
      body
    );
    return res.json({ code: 0, data });
  });
});

// 注册
Router.post('/register', (req, res) => {
  const { user, pwd, type } = req.body;
  User.findOne({ user }, (err, doc) => {
    if (doc) {
      return res.json({ code: 1, msg: '用户名重复！' });
    }

    const userModel = new User({ user, type, pwd: md5Pwd(pwd) });
    userModel.save((err, doc) => {
      if (err) {
        return res.json({ code: 1, msg: '出错了！' });
      }
      const { user, type, _id } = doc;
      res.cookie('userid', _id);
      return res.json({ code: 0, data: { user, type, _id } });
    });
  });
});

Router.get('/info', (req, res) => {
  const { userid } = req.cookies;
  if (!userid) {
    return res.json({ code: 1 });
  }
  User.findOne({ _id: userid }, _filter, (err, doc) => {
    if (err) {
      return res.json({ code: 1, msg: '后端出错了' });
    }
    if (doc) {
      return res.json({ code: 0, data: doc });
    }
  });
});

function md5Pwd(pwd) {
  const salt = 'imooc_is_good_312378Xd981Xaa!@#$!@';
  return utils.md5(`${pwd}${salt}`);
}

// 聊天接口
Router.get('/getMsgList', (req, res) => {
  // Chat.remove({}, (req, res) => {});
  const userid = req.cookies.userid;
  User.find({}, (err, userDoc) => {
    if (userDoc) {
      let users = {};
      userDoc.forEach(item => {
        users[item._id] = { name: item.user, avatar: item.avatar };
      });
      Chat.find({ $or: [{ from: userid }, { to: userid }] }, (err, doc) => {
        if (err) {
          return res.json({ code: 1, msg: '后端出错了' });
        }
        if (doc) {
          return res.json({ code: 0, data: { msgList: doc, users } });
        }
      });
    }
  });
});

module.exports = Router;
