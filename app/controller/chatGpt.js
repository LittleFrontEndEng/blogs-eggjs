const { Controller } = require('egg');
class ChatController extends Controller {
  async createChat() {
    const { ctx } = this;
    const body = ctx.request.body;
    console.log('body', body);
    ctx.validate(
      {
        message: { type: 'string' },
      },
      body
    );
    ctx.response.res.statusCode = 200;
    const result = await ctx.service.openaiService.generateResponse(body.message);
    for await (const message of result) {
      if (message.content) {
        console.log('content', message.content);
        ctx.response.res.write(`${message.content}`);
      }
    }
    ctx.response.res.write('  ');
    ctx.response.res.end();
  }
}

module.exports = ChatController;
