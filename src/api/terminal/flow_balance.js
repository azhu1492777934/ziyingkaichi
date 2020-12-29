import request from '@/utils/request'

export function modelList(query) {
  return request({
    url: '/flow_balance/list',
    method: 'post',
    data: query
  })
}

export function modelDetail(id) {
  return request({
    url: '/flow_balance/show/' + id,
    method: 'get'
  })
}

export function modelCreate(model) {
  return request({
    url: '/flow_balance/create',
    method: 'post',
    data: model
  })
}

export function modelUpdate(model) {
  return request({
    url: '/flow_balance/update',
    method: 'post',
    data: model
  })
}

export function batchUpdate(ids, query, model) {
  return request({
    url: '/flow_balance/batchUpdate',
    method: 'post',
    data: {ids: ids, query: query, model: model}
  })
}

export function download(query) {
  return request({
    url: 'flow_balance/download ',
    method: 'post',
    data: query
  })
}

