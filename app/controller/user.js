'use strict';

const { Controller } = require('egg');

class UserController extends Controller {
  async signup() {
    const { ctx } = this;
    const body = this.ctx.request.body;
    ctx.validate({
      username: { type: 'string' },
      email: { type: 'email' },
      password: { type: 'string' },
    }, body);

    const userService = this.service.user;

    // 校验用户是否存在
    if (await userService.findByUsername(body.username)) {
      this.ctx.throw(422, '用户已存在');
    }

    if (await userService.findByEmail(body.email)) {
      this.ctx.throw(422, '邮箱已存在');
    }
    // 保存用户
    const user = await userService.createUser(body);

    // // 生成token
    // const token = await userService.createToken({
    //   userId: user._id,
    // });
    // 发送响应
    ctx.body = {
      success: true,
      user: {
        email: user.email,
        username: user.username,
        avatar: user.avatar,
      },
    };
  }

  async login() {
    const { ctx } = this;
    const body = this.ctx.request.body;
    ctx.validate({
      email: { type: 'email' },
      password: { type: 'string' },
    }, body);

    // 校验是否存在该用户
    const userService = this.service.user;

    const user = await userService.findByEmail(body.email);

    if (!user) {
      ctx.throw(422, '该用户不存在');
    }

    // 判断密码是否正确
    if (ctx.helper.md5(body.password) !== user.password) {
      ctx.throw(403, '密码错误');
    }

    // 生成token
    const token = userService.createToken({ userId: user._id });
    ctx.body = {
      success: true,
      user: {
        email: user.email,
        username: user.username,
        avatar: user.avatar,
        token,
      },
    };
  }
}

module.exports = UserController;
