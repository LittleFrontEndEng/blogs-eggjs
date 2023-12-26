const { Controller } = require('egg');

class UploadController extends Controller {
  async uploadImage() {
    const { ctx } = this;
    // const body = ctx.request.body;
    console.log('uploadImage', ctx.request);
    // ctx.validate({
    //   type: { type: 'string' },
    //   fileName: { type: 'string' },
    //   file: { type: 'string' },
    // }, body);
    ctx.body = {
      success: true,
    };
  }
}

module.exports = UploadController;
