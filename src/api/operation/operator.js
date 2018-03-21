import request from '@/utils/request'

export function modelList(query) {
  return request({
    url: '/operator/list',
    method: 'post',
    data: query
  })
}

export function modelDetail(id) {
  return request({
    url: '/operator/show/' + id,
    method: 'get'
  })
}

export function modelDelete(id) {
  return request({
    url: '/operator/delete/' + id,
    method: 'post'
  })
}

export function modelCreate(model) {
  return request({
    url: '/operator/create',
    method: 'post',
    data: model
  })
}

export function modelUpdate(model) {
  return request({
    url: '/operator/update',
    method: 'post',
    data: model
  })
}

