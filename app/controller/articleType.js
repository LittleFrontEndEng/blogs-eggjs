const { Controller } = require('egg');

class ArticleTypeController extends Controller {
  async addArticleType() {
    const { ctx } = this;
    const body = ctx.request.body;
    const { ArticleType } = ctx.model;
    ctx.validate({
      name: { type: 'string' },
      type: { type: 'string' },
      jumpUrl: { type: 'string' },
    }, body);

    const oldArticleType = await ArticleType.find({
      name: body.name,
    });
    if (oldArticleType.length) {
      ctx.throw(422, '已存在该类型');
    }

    const articleTypeService = this.service.articleType;
    body.author = ctx.user._id;
    const articleType = await articleTypeService.createArticleType(body);

    ctx.body = {
      success: true,
      article: {
        name: articleType.name,
      },
    };
  }

  async getArticleTypes() {
    const { ctx } = this;
    const body = ctx.request.body;
    const { ArticleType } = ctx.model;
    ctx.validate({
      name: { type: 'string', required: false },
    }, body);
    const query = body.name ? {
      name: body.name,
    } : {};
    const getArticleTypes = ArticleType.find(query).populate('author').sort({
      createdAt: -1,
    });
    const getLength = ArticleType.countDocuments();
    const [ articleType, count ] = await Promise.all([ getArticleTypes, getLength ]);

    const newData = articleType.map(item => {
      return {
        id: item._id,
        name: item.name,
        type: item.type,
        articleCount: item.articleCount,
        jumpUrl: item.jumpUrl,
      };
    });
    ctx.body = {
      success: true,
      count,
      articleType: newData,
    };
  }

  async delArticleTypes() {
    const { ctx } = this;
    const body = ctx.request.body;
    const { ArticleType } = ctx.model;
    ctx.validate({
      id: { type: 'string' },
    }, body);

    const articleType = ArticleType.findById(body.id);
    if (!articleType) {
      ctx.throw(404, 'Article not found');
    }

    await articleType.deleteOne();
    ctx.body = {
      success: true,
    };
  }

  async editArticleTypes() {
    const { ctx } = this;
    const body = ctx.request.body;
    const { ArticleType } = ctx.model;
    ctx.validate({
      id: { type: 'string' },
      name: { type: 'string' },
    }, body);

    const newArticleType = await ArticleType.findByIdAndUpdate(body.id, {
      name: body.name,
    }, {
      new: true,
    });

    ctx.body = {
      success: true,
      newArticleType,
    };
  }
}

module.exports = ArticleTypeController;
