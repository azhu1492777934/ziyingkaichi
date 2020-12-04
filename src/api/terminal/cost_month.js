import request from '@/utils/request'

export function modelList(query) {
  return request({
    url: '/cost_month/list',
    method: 'post',
    data: query
  })
}

export function download(ids, query, model) {
  return request({
    url: '/cost_month/download',
    method: 'post',
    data: {ids: ids, query: query, model: model}
  })
}

