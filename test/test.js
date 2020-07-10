const internet = require('../index.js');

internet({
  test: ['https://d9ah9d8hsa98hda98s.com'],
  maxTries: 5
}).then(() => {
  console.log("internet");
}).catch(err => {
  console.log(err);
});