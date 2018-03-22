import request from '@/utils/request'

export function modelList(query) {
  return request({
    url: '/terminal/list',
    method: 'post',
    data: query
  })
}
export function batchUpdate(ids, query, model) {
  return request({
    url: '/terminal/batchUpdate',
    method: 'post',
    data: {ids: ids, query: query, model: model}
  })
}

export function modelStop(id) {
  return request({
    url: '/terminal/stop/' + id,
    method: 'post'
  })
}
