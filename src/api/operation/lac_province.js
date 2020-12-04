import request from '@/utils/request'

export function operatorMap() {
  return request({
    url: '/lac_province/map',
    method: 'get'
  })
}


export function modelList(query) {
  return request({
    url: '/lac_province/list',
    method: 'post',
    data: query
  })
}

export function modelDetail(id) {
  return request({
    url: '/lac_province/show/' + id,
    method: 'get'
  })
}

export function modelDelete(id) {
  return request({
    url: '/lac_province/delete/' + id,
    method: 'post'
  })
}

export function modelCreate(model) {
  return request({
    url: '/lac_province/create',
    method: 'post',
    data: model
  })
}

export function modelUpdate(model) {
  return request({
    url: '/lac_province/update',
    method: 'post',
    data: model
  })
}

