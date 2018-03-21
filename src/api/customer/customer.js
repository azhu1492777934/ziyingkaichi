import request from '@/utils/request'

export function modelList(query) {
  return request({
    url: '/customer/list',
    method: 'post',
    data: query
  })
}

export function batchDelete(ids, query) {
  return request({
    url: '/customer/batchDelete',
    method: 'post',
    data: {ids: ids, query: query}
  })
}

export function modelDelete(id) {
  return request({
    url: '/customer/delete/' + id,
    method: 'post'
  })
}

export function modelCreate(model) {
  return request({
    url: '/customer/create',
    method: 'post',
    data: model
  })
}

export function modelUpdate(model) {
  return request({
    url: '/customer/update',
    method: 'post',
    data: model
  })
}

export function modelDetail(id) {
  return request({
    url: '/customer/show/' + id,
    method: 'get'
  })
}

export function queryCustomer(name) {
  return request({
    url: '/customer/query',
    method: 'post',
    data: { realName: name }
  })
}
