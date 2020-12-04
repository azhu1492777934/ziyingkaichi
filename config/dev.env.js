'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API: '"http://134.175.178.206/nvt/api/"',
  //BASE_API: '"http://vct.finemifi.com/nvt/api/"',
  //BASE_API: '"http://10.10.1.96/nvt/api/"',
  AUTH_USERNAME_KEY: '"username"',
  AUTH_TOKEN_KEY: '"usertoken"'
})
