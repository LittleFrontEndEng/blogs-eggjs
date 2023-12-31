/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1696901316900_9695';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  config.mongoose = {
    client: {
      url: 'mongodb://127.0.0.1:27017/blogs',
      options: {
        // dbName: '',
        // user: '',
        // pass: '',
        // useUnifiedTopology: true,
      },
      // mongoose global plugins, expected a function or an array of function and options
      plugins: [],
    },
  };

  config.security = {
    csrf: {
      enable: false,
    },
  };

  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
  };

  config.jwt = {
    // 使用 command+shift+p -> uuid 命令生成
    secret: 'eaba440c-fab6-4c99-8cd7-d294f2cef196',
    expiresIn: '4h',
  };

  config.openAI = {
    apiKey: process.env.OPENAI_API_KEY,
  };

  return {
    ...config,
    ...userConfig,
  };
};
