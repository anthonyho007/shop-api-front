'use strict';

const nconf = module.exports = require('nconf');
const path = require('path');

nconf.argv().env([
    'PORT',
    'BACKEND_HOST',
    'BACKEND_PORT'
]).file({
    file: path.join(__dirname, 'config.json')
}).defaults({
    PORT: '8080'
});