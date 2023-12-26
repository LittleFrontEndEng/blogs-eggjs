module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const articleSchema = new Schema({
    desc: {
      type: String,
      require: true,
    },
    title: {
      type: String,
      require: true,
    },
    cover: {
      type: String,
      require: true,
    },
    content: {
      type: String,
      require: true,
    },
    articleType: {
      type: mongoose.ObjectId,
      ref: 'ArticleType',
      require: true,
    },
    author: {
      type: mongoose.ObjectId,
      ref: 'User',
      require: true,
    },
    viewsCount: { // 观看次数
      type: Number,
      default: 0,
    },
    proviewUrl: { // 观看次数
      type: String,
      default: null,
    },
    labelData: { // 观看次数
      type: String,
      default: '[]',
    },
    createdAt: { // 创建时间
      type: Date,
      default: Date.now,
    },
    updatedAt: { // 更新时间
      type: Date,
      default: Date.now,
    },
  });

  return mongoose.model('Article', articleSchema);
};
