/* eslint-env node */

const RSVP = require('rsvp');
const request = RSVP.denodeify(require('request'));
const { execFileSync, spawn } = require('child_process');
const jsdom = require('jsdom');

const { JSDOM } = jsdom;
const { Promise } = RSVP;

let fastBootServer;

module.exports = function setup(hooks) {
  async function visit(assert, path, { headers } = {}) {
    let reqOptions = {
      uri: 'http://localhost:8000' + path,
      headers,
      resolveWithFullResponse: true
    }

    return request(reqOptions)
      .then(function(response) {
        let dom = new JSDOM(response.body);
        return {
          statusCode: response.statusCode,
          headers: response.headers,
          document: dom.window.document
        };
      });
  }

  /**
   * Build the dummy app and start the FastBoot App Server. Watch stdout for at
   * least one message that the server has started.
   */
  hooks.before(async function() {
    if (!process.env.REUSE_FASTBOOT_BUILD) {
      execFileSync('node', ['./node_modules/.bin/ember', 'build']);
      process.env.REUSE_FASTBOOT_BUILD = true;
    }

    fastBootServer = spawn('node', ['fastBootServer.js'])

    let serverStarting = new Promise((resolve) => {
      fastBootServer.stdout.on('data', (data) => {
        process.stdout.write(data);
        if (/HTTP server started/.test(data)) { resolve(); }
      });
    });

    await serverStarting;
  });

  /**
   * Kill the FastBoot App Server.
   */
  hooks.after(async function() {
    fastBootServer.kill('SIGTERM');
  });

  hooks.beforeEach(function(assert) {
    this.visit = visit.bind(this, assert);
  });
};