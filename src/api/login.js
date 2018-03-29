import request from '@/utils/request'

export function login(username, password) {
  return request({
    url: '/auth_user/login',
    method: 'post',
    data: {
      username: username,
      password: password
    }
  })
}

export function getInfo(username, token) {
  return request({
    url: '/auth_user/info',
    method: 'post',
    params: {
      username: username,
      token: token
    }
  })
}

export function logout(username, token) {
  return request({
    url: '/auth_user/logout',
    method: 'post',
    params: {
      username: username,
      token: token
    }
  })
}
