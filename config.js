'use strict';

const nconf = module.exports = require('nconf');
const path = require('path');

nconf.argv().env([
    'PORT',
    'BE_SRV_SERVICE_HOST',
    'BE_SRV_SERVICE_PORT'
]).file({
    file: path.join(__dirname, 'config.json')
}).defaults({
    PORT: '8080'
});