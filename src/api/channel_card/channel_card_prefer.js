import request from '@/utils/request'

export function modelList(query) {
  return request({
    url: '/channel_card_prefer/list',
    method: 'post',
    data: query
  })
}

export function modelDetail(id) {
  return request({
    url: '/channel_card_prefer/show/' + id ,
    method: 'get'
  })
}

export function modelUpdate(model) {
  return request({
    url: '/channel_card_prefer/update',
    method: 'post',
    data: model
  })
}

export function modelCreate(model) {
  return request({
    url: '/channel_card_prefer/create',
    method: 'post',
    data: model
  })
}

export function batchDelete(ids, query) {
  return request({
    url: '/channel_card_prefer/batchDelete',
    method: 'post',
    data: {ids: ids, query: query}
  })
}

export function modelDelete(id) {
  return request({
    url: '/channel_card_prefer/delete/' + id,
    method: 'post'
  })
}

export function batchUpdate(ids, query, model) {
  return request({
    url: '/channel_card_prefer/batchUpdate',
    method: 'post',
    data: {ids: ids, query: query, model: model}
  })
}
