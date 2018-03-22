import request from '@/utils/request'

export function modelList(query) {
  return request({
    url: '/used_net/list',
    method: 'post',
    data: query
  })
}

export function modelDetail(id) {
  return request({
    url: '/used_net/show/' + id,
    method: 'get'
  })
}

export function modelDelete(id) {
  return request({
    url: '/used_net/delete/' + id,
    method: 'post'
  })
}

export function modelCreate(model) {
  return request({
    url: '/used_net/create',
    method: 'post',
    data: model
  })
}

export function modelUpdate(model) {
  return request({
    url: '/used_net/update',
    method: 'post',
    data: model
  })
}

