const Service = require('egg').Service;

class ArticleService extends Service {
  get Article() {
    return this.ctx.model.Article;
  }

  // findByUsername(username) {
  //   return this.User.findOne({
  //     username,
  //   });
  // }

  // findByEmail(email) {
  //   return this.User.findOne({
  //     email,
  //   }).select('+password');
  // }

  createArticle(data) {
    const article = this.Article.create(data);
    return article;
  }

  // 更新用户信息
  updateUser(data) {
    return this.User.findByIdAndUpdate(this.ctx.user._id, data, {
      new: true,
    });
  }
}

module.exports = ArticleService;
