import request from '@/utils/request'

export function modelList(query) {
  return request({
    url: '/forbid_province/list',
    method: 'post',
    data: query
  })
}

export function modelDetail(id) {
  return request({
    url: '/forbid_province/show/' + id,
    method: 'get'
  })
}

export function modelDelete(id) {
  return request({
    url: '/forbid_province/delete/' + id,
    method: 'post'
  })
}

export function modelCreate(model) {
  return request({
    url: '/forbid_province/create',
    method: 'post',
    data: model
  })
}

export function modelUpdate(model) {
  return request({
    url: '/forbid_province/update',
    method: 'post',
    data: model
  })
}

