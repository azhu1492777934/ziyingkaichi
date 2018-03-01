import Mock from 'mockjs'
import LoginAPI from './login'

Mock.setup({ timeout: 5000 })

Mock.mock(/\/user\/login/, 'post', LoginAPI.login)
Mock.mock(/\/user\/logout/, 'post', LoginAPI.logout)
Mock.mock(/\/user\/info\.*/, 'get', LoginAPI.getUserInfo)
