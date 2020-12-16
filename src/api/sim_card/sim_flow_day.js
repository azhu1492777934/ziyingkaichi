import request from '@/utils/request'

export function modelList(query) {
  return request({
    url: '/sim_day/list',
    method: 'post',
    data: query
  })
}

export function download(ids, query, model) {
  return request({
    url: '/sim_day/download',
    method: 'post',
    data: {ids: ids, query: query, model: model}
  })
}

export function totalFlow(query) {
  return request({
    url: '/sim_day/total',
    method: 'post',
    data: query
  })
}

