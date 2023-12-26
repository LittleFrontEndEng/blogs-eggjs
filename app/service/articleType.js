const Service = require('egg').Service;

class ArticleTypeService extends Service {
  get ArticleType() {
    return this.ctx.model.ArticleType;
  }

  createArticleType(data) {
    const articleType = this.ArticleType.create(data);
    return articleType;
  }
}

module.exports = ArticleTypeService;
