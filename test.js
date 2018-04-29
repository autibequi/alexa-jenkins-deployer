var skill = require('./index.js');
var input = require('./examplecomplete.json');
var callback = console.log;

skill.handler(input, {}, callback);