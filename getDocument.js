const fetch = require('node-fetch');
const env = require('node-env-file');
env(__dirname + '/.env'); // Load .env file variables

if (!process.env.PERSONAL_ACCESS_TOKEN) {
  throw new Error(`Put your Figma token in a .env in the root directory of this directory.
  The .env file should look like this:
  PERSONAL_ACCESS_TOKEN='xxxx'`);
}

module.exports = (id) => fetch(`https://api.figma.com/v1/files/${id}`, {
  method: 'GET',
  headers: { "x-figma-token": process.env.PERSONAL_ACCESS_TOKEN }
}).then(function(response) {
  return response.json();
}).catch(function (error) {
  return { err: error };
});