import request from '@/utils/request'

export function modelList(query) {
  return request({
    url: '/terminal_sim/list',
    method: 'post',
    data: query
  })
}

export function modelBatchUnbind(ids, query) {
  return request({
    url: '/terminal_sim/batchUnbind',
    method: 'post',
    data: {ids: ids, query: query}
  })
}

export function modelUnbind(id) {
  return request({
    url: '/terminal_sim/unbind/' + id,
    method: 'post'
  })
}
