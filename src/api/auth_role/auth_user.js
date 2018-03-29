import request from '@/utils/request'

export function modelList(query) {
  return request({
    url: '/auth_user/list',
    method: 'post',
    data: query
  })
}

export function modelDetail(id) {
  return request({
    url: '/auth_user/show/' + id ,
    method: 'get'
  })
}

export function modelUpdate(model) {
  return request({
    url: '/auth_user/update',
    method: 'post',
    data: model
  })
}

export function modelCreate(model) {
  return request({
    url: '/auth_user/create',
    method: 'post',
    data: model
  })
}

export function modelDelete(id) {
  return request({
    url: '/auth_user/delete/' + id,
    method: 'post'
  })
}

export function modelRoleDetail(id) {
  return request({
    url: '/auth_user_role/show/' + id ,
    method: 'get'
  })
}

export function modelRoleUpdate(authUserId, roleIds) {
  return request({
    url: '/auth_user_role/update',
    method: 'post',
    data: {
      authUserId: authUserId,
      roleIds: roleIds,
    }
  })
}
