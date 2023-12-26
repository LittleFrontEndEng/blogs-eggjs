const crypto = require('crypto');
const _ = require('lodash');
const Readable = require('stream');
exports.md5 = str => {
  return crypto.createHash('md5').update(str).digest('hex');
};

exports._ = _;


exports.authorinfo = info => {
  console.log('信息数据', info);
  return {
    userId: info._id,
    username: info.username,
    avatar: info.avatar,
    email: info.email,
  };
};

class CharStream extends Readable {
  constructor(string, options) {
    super(options);
    this.string = string;
    this.currentIndex = 0;
  }

  _read(size = 0) {
    if (this.currentIndex >= this.string.length) {
      this.push(null); // 字符串结束，关闭流
      return;
    }
    if (size > 0 && this.currentIndex >= size) {
      this.push(null); // 字符串结束，关闭流
      return;
    }

    const char = this.string.charAt(this.currentIndex);

    this.push(char); // 推送当前字符
    this.currentIndex++;

    // 使用 setImmediate 或 setTimeout 来异步调用 _read 方法
    setImmediate(() => this._read());
  }
}

exports.createCharStream = string => {
  return new CharStream(string);
};
