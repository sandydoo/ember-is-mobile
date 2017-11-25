/* eslint-env node */

const FastBootAppServer = require('fastboot-app-server');

let server = new FastBootAppServer({
  distPath: 'dist',
  port: 8000,
});

server.start()