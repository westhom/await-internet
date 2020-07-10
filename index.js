const isReachable = require('is-reachable');

function pause(ms){
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}

/**
 * 
 * @param {Object} [opts] - optional configuration object
 * @param {[string]} [opts.test] - list of websites to check
 * @param {number} [opts.pause=2000] - pause time (ms) between back-to-back test rounds
 * @param {number} [opts.timeout=5000] - max wait (ms) for a request to complete
 * @param {number} [opts.maxWait] - total max wait (ms) for internet before failing
 * @param {number} [opts.maxTries] - max test rounds before failing
 * @returns {Promise} Promise resolves once internet becomes available, or once specified max wait/tries exceeded.
 */
async function internet(opts){
  opts = opts || {};
  const config = {};

  config.test = Array.isArray(opts.test) ? opts.test : ['https://google.com', 'https://twitter.com'];
  config.pause = Number.isInteger(opts.pause) ? opts.pause : 2000;
  config.timeout = Number.isInteger(opts.timeout) ? opts.timeout : 5000;

  config.maxWait = Number.isInteger(opts.maxWait) ? opts.maxWait : 0;
  config.maxTries = Number.isInteger(opts.maxTries) ? opts.maxTries : 0;

  let connected = false;

  const start = new Date();
  const maxWait = Math.max(0, config.maxWait);

  let tries = 0;

  while( !connected ){
    connected = await isReachable(config.test, {
      timeout: config.timeout
    });

    if( connected ){
      return Promise.resolve();
    }

    tries++;
    const now = new Date();

    if( config.maxTries > 0 && tries >= config.maxTries ){
      return Promise.reject(new Error(`await-internet reached max ties (${config.maxTries})`));
    }

    if( config.maxWait > 0 && (now - start) >= maxWait ){
      return Promise.reject(new Error(`await-internet exceeded max wait time (${config.maxWait}ms)`));
    }

    await pause(config.pause);
  }
}

module.exports = internet;