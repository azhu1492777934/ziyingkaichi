import request from '@/utils/request'

export function modelList(query) {
  return request({
    url: '/simpool/list',
    method: 'post',
    data: query
  })
}

export function batchDelete(ids, query) {
  return request({
    url: '/simpool/batchDelete',
    method: 'post',
    data: {ids: ids, query: query}
  })
}

export function modelDelete(id) {
  return request({
    url: '/simpool/delete/' + id,
    method: 'post'
  })
}

export function modelCreate(model) {
  return request({
    url: '/simpool/create',
    method: 'post',
    data: model
  })
}

export function modelUpdate(model) {
  return request({
    url: '/simpool/update',
    method: 'post',
    data: model
  })
}

export function modelDetail(id, model) {
  return request({
    url: '/simpool/showQuery/' + id,
    method: 'post',
    data: model
  })
}
export function batchUpdate(ids, query, model) {
  return request({
    url: '/simpool/batchUpdate',
    method: 'post',
    data: {ids: ids, query: query, model: model}
  })
}

export function simpoolMap() {
  return request({
    url: '/simpool/map',
    method: 'get'
  })
}
