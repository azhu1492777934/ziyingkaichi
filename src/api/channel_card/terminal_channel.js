import request from '@/utils/request'

export function modelList(query) {
  return request({
    url: '/terminal_channel/list',
    method: 'post',
    data: query
  })
}

export function batchDelete(ids, query) {
  return request({
    url: '/terminal_channel/batchDelete',
    method: 'post',
    data: {ids: ids, query: query}
  })
}

export function modelCreate(model) {
  return request({
    url: '/terminal_channel/create',
    method: 'post',
    data: model
  })
}

export function batchUpdate(ids, query, model) {
  return request({
    url: '/terminal_channel/batchUpdate',
    method: 'post',
    data: {ids: ids, query: query, model: model}
  })
}
