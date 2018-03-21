import request from '@/utils/request'

export function modelList(query) {
  return request({
    url: '/order/list',
    method: 'post',
    data: query
  })
}

export function batchUpdate(ids, query, model) {
  return request({
    url: '/order/batchUpdate',
    method: 'post',
    data: {ids: ids, query: query, model: model}
  })
}

export function batchBind(ids, query, model) {
  return request({
    url: '/order/batchBind',
    method: 'post',
    data: {ids: ids, query: query, model: model}
  })
}

export function batchRefund(ids, query) {
  return request({
    url: '/order/batchRefund',
    method: 'post',
    data: {ids: ids, query: query}
  })
}

export function modelShow(id) {
  return request({
    url: '/order/show/' + id,
    method: 'get'
  })
}

export function updateOrderTrip(model) {
  return request({
    url: '/order/updateOrderTrip',
    method: 'post',
    data: model
  })
}
