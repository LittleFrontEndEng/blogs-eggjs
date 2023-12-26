module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const articleTypeSchema = new Schema({
    type: {
      type: Number,
      require: true,
      default: 1,
    },
    name: {
      type: String,
      require: true,
    },
    articleCount: {
      type: Number,
      require: true,
      default: 0,
    },
    jumpUrl: {
      type: String,
      require: true,
    },
    author: {
      type: mongoose.ObjectId,
      ref: 'User',
      require: true,
    },
    createdAt: { // 创建时间
      type: Date,
      default: Date.now,
      select: false,
    },
    updatedAt: { // 更新时间
      type: Date,
      default: Date.now,
      select: false,
    },
  });

  return mongoose.model('ArticleType', articleTypeSchema);
};
