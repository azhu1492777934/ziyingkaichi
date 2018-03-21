import request from '@/utils/request'

export function countryMap() {
  return request({
    url: '/country/map',
    method: 'get'
  })
}

export function modelList(query) {
  return request({
    url: '/country/list',
    method: 'post',
    data: query
  })
}

export function modelDetail(id) {
  return request({
    url: '/country/show/' + id,
    method: 'get'
  })
}

export function modelDelete(id) {
  return request({
    url: '/country/delete/' + id,
    method: 'post'
  })
}

export function modelCreate(model) {
  return request({
    url: '/country/create',
    method: 'post',
    data: model
  })
}

export function modelUpdate(model) {
  return request({
    url: '/country/update',
    method: 'post',
    data: model
  })
}

