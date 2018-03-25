import request from '@/utils/request'

export function modelList(query) {
  return request({
    url: '/ready_terminal_sim/list',
    method: 'post',
    data: query
  })
}

export function batchDelete(ids, query) {
  return request({
    url: '/ready_terminal_sim/batchDelete',
    method: 'post',
    data: {ids: ids, query: query}
  })
}

export function modelDelete(id) {
  return request({
    url: '/ready_terminal_sim/delete/' + id,
    method: 'post'
  })
}

export function modelCreate(model) {
  return request({
    url: '/ready_terminal_sim/create',
    method: 'post',
    data: model
  })
}

export function modelUpdate(model) {
  return request({
    url: '/ready_terminal_sim/update',
    method: 'post',
    data: model
  })
}

export function modelDetail(id) {
  return request({
    url: '/ready_terminal_sim/show/' + id,
    method: 'get'
  })
}
export function batchUpdate(ids, query, model) {
  return request({
    url: '/ready_terminal_sim/batchUpdate',
    method: 'post',
    data: {ids: ids, query: query, model: model}
  })
}
