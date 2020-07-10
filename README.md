# Await Internet

Wait for an internet connection. The promise returns once an internet 
connection is available. By default it tries to connect to google.com 
and twitter.com, and by default it tries forever until success.

```js
const internet = require('await-internet');

// async / await style
(async () => {
  await internet();

  console.log("on the internet");
})();

// promise style

internet().then(() => {
  console.log("on the internet");
});
```

## Optional configuration
You can pass a configuration object when calling `internet()`. Note: if you
configure it with max tries or a max wait time, it can potentially result in
a rejected promise.

```js
await internet({
  // specify a list of custom test(s) (all must succceed)
  test: ['https://twitter.com', 'https://en.wikipedia.org'],

  // time (ms) to wait between back-to-back test rounds
  pause: 2000, // default

  // connection timeout before a single test case is considered failed
  timeout: 5000, // default

  // max time (ms) to wait for internet connection before rejecting the promise
  // (default: try forever)
  maxWait: 30 * 60 * 1000,

  // max attempted test rounds before rejecting the promise
  // (default: try forever)
  maxTries: 1000
});
```