import request from '@/utils/request'

export function modelList(query) {
  return request({
    url: '/operator_prefer/list',
    method: 'post',
    data: query
  })
}

export function modelDetail(id) {
  return request({
    url: '/operator_prefer/show/' + id,
    method: 'get'
  })
}

export function modelDelete(id) {
  return request({
    url: '/operator_prefer/delete/' + id,
    method: 'post'
  })
}

export function modelCreate(model) {
  return request({
    url: '/operator_prefer/create',
    method: 'post',
    data: model
  })
}

export function modelUpdate(model) {
  return request({
    url: '/operator_prefer/update',
    method: 'post',
    data: model
  })
}

