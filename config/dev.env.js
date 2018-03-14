'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API: '"http://localhost:8082/nvt/api/"',
  AUTH_USERNAME_KEY: '"username"',
  AUTH_TOKEN_KEY: '"usertoken"'
})
