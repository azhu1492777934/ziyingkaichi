import request from '@/utils/request'

export function modelList(query) {
  return request({
    url: '/channel_card/list',
    method: 'post',
    data: query
  })
}

export function batchUpdate(ids, query, model) {
  return request({
    url: '/channel_card/batchUpdate',
    method: 'post',
    data: {ids: ids, query: query, model: model}
  })
}
