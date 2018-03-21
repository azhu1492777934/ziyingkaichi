import request from '@/utils/request'

export function modelList(query) {
  return request({
    url: '/country_operator/list',
    method: 'post',
    data: query
  })
}

export function modelDelete(id) {
  return request({
    url: '/country_operator/delete/' + id,
    method: 'post'
  })
}

export function modelCreate(model) {
  return request({
    url: '/country_operator/create',
    method: 'post',
    data: model
  })
}

export function modelUpdateStatus(id, status) {
  return request({
    url: '/country_operator/updateStatus',
    method: 'post',
    data: {id: id, status: status}
  })
}
