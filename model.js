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