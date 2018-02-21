const mongoose = require('mongoose');

// 连接mongo
const DB_URL = 'mongodb://127.0.0.1:27017/recruit';
mongoose.connect(DB_URL);
mongoose.connection.on('connected', () => {
  console.log('mongo connect success');
});

// 新建表, 文档模型
const models = {
  user: {
    user: { type: String, require: true },
    pwd: { type: String, require: true },
    type: { type: String, require: true },
    avatar: { type: String },
    desc: { type: String },
    title: { type: String },
    company: { type: String },
    money: { type: String }
  },
  chat: {
    chatId: { type: String, require: true },
    from: { type: String, require: true },
    to: { type: String, require: true },
    isRead: { type: Boolean, default: false },
    content: { type: String, require: true },
    createTime: { type: Number, default: +new Date() }
  }
};

for(let m in models) {
  mongoose.model(m, new mongoose.Schema(models[m]))
}

module.exports = {
  getModel: name => {
    return mongoose.model(name)
  }
}