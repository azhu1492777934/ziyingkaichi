import request from '@/utils/request'

export function modelList(query) {
  return request({
    url: '/auth_permission/list',
    method: 'post',
    data: query
  })
}

export function modelDetail(id) {
  return request({
    url: '/auth_permission/show/' + id ,
    method: 'get'
  })
}

export function modelUpdate(model) {
  return request({
    url: '/auth_permission/update',
    method: 'post',
    data: model
  })
}

export function modelCreate(model) {
  return request({
    url: '/auth_permission/create',
    method: 'post',
    data: model
  })
}

export function modelDelete(id) {
  return request({
    url: '/auth_permission/delete/' + id,
    method: 'post'
  })
}

export function authPermissionMap() {
  return request({
    url: '/auth_permission/map',
    method: 'get'
  })
}
