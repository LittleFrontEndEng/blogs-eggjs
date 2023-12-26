const { Controller } = require('egg');

class ArticleController extends Controller {
  async createFile() {
    const { ctx } = this;
    const body = ctx.request.body;
    const { ArticleType } = ctx.model;
    ctx.validate({
      articleType: { type: 'string' },
      title: { type: 'string' },
      cover: { type: 'string' },
      desc: { type: 'string', required: false },
      content: { type: 'string' },
      proviewUrl: { type: 'string', required: false },
      labelData: { type: 'string', required: false },
    }, body);
    const targetType = await ArticleType.findById(body.articleType);
    if (Number(targetType.type) === 2 && !body.proviewUrl) {
      ctx.throw(400, '缺少proviewUrl参数');
    }
    const articleService = this.service.article;
    body.author = ctx.user._id;
    const article = await articleService.createArticle(body);
    // 添加对应的类型个数
    targetType.articleCount++;

    await targetType.save();
    ctx.body = {
      success: true,
      article: {
        title: article.title,
      },
    };
  }

  async getArticle() {
    const { ctx } = this;
    const body = ctx.request.body;
    const { Article } = ctx.model;
    ctx.validate({
      current: { type: 'number' },
      pageSize: { type: 'number' },
      typeId: { type: 'string', required: false },
      title: { type: 'string', required: false },
    }, body);

    const current = Number.parseInt(body.current);
    const pageSize = Number.parseInt(body.pageSize);
    const query = {};
    if (body.typeId) {
      query.articleType = body.typeId;
    }
    if (body.title) {
      query.title = body.title;
    }
    const getArticle = Article.find(query).populate('articleType').populate('author')
      .sort({
        createdAt: -1,
      })
      .skip((current - 1) * pageSize)
      .limit(pageSize);
    const getLength = Article.countDocuments({
      articleType: body.typeId,
    });

    const [ article, count ] = await Promise.all([ getArticle, getLength ]);
    const resultArticle = article.map(item => {
      console.log(item);
      return {
        id: item._id,
        title: item.title,
        cover: item.cover,
        viewsCount: item.viewsCount,
        createTime: item.createdAt,
        updateTime: item.updatedAt,
        desc: item.desc,
        proviewUrl: item.proviewUrl,
        articleType: {
          typeId: item.articleType._id,
          type: item.articleType.type,
          name: item.articleType.name,
        },
        author: {
          username: item.author.username,
          avatar: item.author.avatar,
        },
      };
    });
    ctx.body = {
      success: true,
      count,
      article: resultArticle,
    };
  }

  async deleteArticle() {
    const { ctx } = this;
    const { Article } = ctx.model;
    const { articleId } = ctx.params;

    const article = await Article.findById(articleId);

    if (!article) {
      ctx.throw(404, 'Article not found');
    }

    await article.deleteOne();

    ctx.body = {
      success: true,
    };
  }

  async getArticleDetail() {
    const { ctx } = this;
    const { articleId } = ctx.params;
    const { Article } = ctx.model;

    const article = await Article.findById(articleId).populate('author');

    ctx.body = {
      success: true,
      article,
    };
  }

  async addArticleNum() {
    const { ctx } = this;
    const body = ctx.request.body;
    const { Article } = ctx.model;
    ctx.validate({
      articleId: { type: 'string' },
    }, body);

    const article = await Article.findById(body.articleId);
    if (!article) {
      ctx.throw(404, '该文章不存在');
    }
    article.viewsCount++;

    await article.save();
    ctx.body = {
      success: true,
      article: {
        title: article.title,
      },
    };
  }
}

module.exports = ArticleController;
