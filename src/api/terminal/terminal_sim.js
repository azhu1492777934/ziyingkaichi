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

export function modelBatchReboot(ids, query) {
  return request({
    url: '/terminal_sim/batchReboot',
    method: 'post',
    data: {ids: ids, query: query}
  })
}

export function modelBatchShutdown(ids, query) {
  return request({
    url: '/terminal_sim/batchShutdown',
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


export function logList(query) {
  return request({
    url: '/terminal_sim/logListPage/' + query.q.imsi,
    method: 'post',
    data: query
  })
}

