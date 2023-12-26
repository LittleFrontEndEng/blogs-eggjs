const Service = require('egg').Service;
const jwt = require('jsonwebtoken');
class UserService extends Service {
  get User() {
    return this.ctx.model.User;
  }

  findByUsername(username) {
    return this.User.findOne({
      username,
    });
  }

  // 登录时用户校验邮箱和密码
  findByEmail(email) {
    return this.User.findOne({
      email,
    }).select('+password');
  }

  createUser(data) {
    data.password = this.ctx.helper.md5(data.password);
    const user = this.User.create(data);
    return user;
  }

  createToken(data) {
    return jwt.sign(data, this.app.config.jwt.secret, {
      expiresIn: this.app.config.jwt.expiresIn,
    });
  }

  // 校验token
  verifyToken(token) {
    return jwt.verify(token, this.app.config.jwt.secret);
  }

  // 更新用户信息
  updateUser(data) {
    return this.User.findByIdAndUpdate(this.ctx.user._id, data, {
      new: true,
    });
  }
}

module.exports = UserService;
