import request from '@/utils/request'

export function modelList(query) {
  return request({
    url: '/simpackage/list',
    method: 'post',
    data: query
  })
}

export function batchDelete(ids, query) {
  return request({
    url: '/simpackage/batchDelete',
    method: 'post',
    data: {ids: ids, query: query}
  })
}

export function modelDelete(id) {
  return request({
    url: '/simpackage/delete/' + id,
    method: 'post'
  })
}

export function modelCreate(model) {
  return request({
    url: '/simpackage/create',
    method: 'post',
    data: model
  })
}

export function modelUpdate(model) {
  return request({
    url: '/simpackage/update',
    method: 'post',
    data: model
  })
}

export function modelDetail(id) {
  return request({
    url: '/simpackage/show/' + id,
    method: 'get'
  })
}

export function modelSimPackageProvinceDetail(id) {
  return request({
    url: '/simpackage_province/show/' + id,
    method: 'get'
  })
}

export function batchUpdate(ids, query, model) {
  return request({
    url: '/simpackage/batchUpdate',
    method: 'post',
    data: {ids: ids, query: query, model: model}
  })
}

export function simpackageMap() {
  return request({
    url: '/simpackage/map',
    method: 'get'
  })
}
