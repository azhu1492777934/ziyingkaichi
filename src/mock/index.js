import Mock from 'mockjs'
import LoginAPI from './login'

Mock.setup({ timeout: 5000 })

Mock.mock(/\/user\/login/, 'post', LoginAPI.Login)
// Mock.mock(/\/user\/logout/, 'get', LoginAPI.logout)
Mock.mock(/\/user\/info\.*/, 'post', LoginAPI.getUserInfo)
