var log4js = require('log4js');
log4js.configure({
  appenders: [
    {
      type: 'file',
      filename: process.env.APP_LOG_FILE_PATH,
      category: 'location_manager'
    }
  ],
  levels: {
    "location_manager":  process.env.APP_LOG_LEVEL
  }
});

GLOBAL.logger = log4js.getLogger('location_manager');
