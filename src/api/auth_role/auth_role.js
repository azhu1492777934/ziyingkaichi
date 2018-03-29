import request from '@/utils/request'

export function modelList(query) {
  return request({
    url: '/auth_role/list',
    method: 'post',
    data: query
  })
}

export function modelDetail(id) {
  return request({
    url: '/auth_role/show/' + id ,
    method: 'get'
  })
}

export function modelUpdate(model) {
  return request({
    url: '/auth_role/update',
    method: 'post',
    data: model
  })
}

export function modelCreate(model) {
  return request({
    url: '/auth_role/create',
    method: 'post',
    data: model
  })
}

export function modelDelete(id) {
  return request({
    url: '/auth_role/delete/' + id,
    method: 'post'
  })
}

export function modelPermissionDetail(id) {
  return request({
    url: '/auth_role_permission/show/' + id ,
    method: 'get'
  })
}

export function authRoleMap() {
  return request({
    url: '/auth_role/map',
    method: 'get'
  })
}
