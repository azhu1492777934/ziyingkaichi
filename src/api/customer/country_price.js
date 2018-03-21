import request from '@/utils/request'

export function modelList(query) {
  return request({
    url: '/country_price/list',
    method: 'post',
    data: query
  })
}

export function batchDelete(ids, query) {
  return request({
    url: '/country_price/batchDelete',
    method: 'post',
    data: {ids: ids, query: query}
  })
}

export function modelDelete(id) {
  return request({
    url: '/country_price/delete/' + id,
    method: 'post'
  })
}

export function modelCreate(model) {
  return request({
    url: '/country_price/create',
    method: 'post',
    data: model
  })
}

export function modelUpdate(model) {
  return request({
    url: '/country_price/update',
    method: 'post',
    data: model
  })
}

export function modelDetail(id) {
  return request({
    url: '/country_price/show/' + id,
    method: 'get'
  })
}
export function batchUpdate(ids, query, model) {
  return request({
    url: '/country_price/batchUpdate',
    method: 'post',
    data: {ids: ids, query: query, model: model}
  })
}
