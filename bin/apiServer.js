#!/usr/bin/env node
require('babel-polyfill');
require('babel-register')({
  "plugins": [
    "dynamic-import-node"
  ]
});

global.__API_PORT__ = process.env.PORT || 12366;
global.__API_HOST__ = process.env.HOST || 'localhost';
global.__DEV__ = process.env.NODE_ENV === 'development';

require('../server/index.js');
