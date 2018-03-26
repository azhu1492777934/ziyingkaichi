import request from '@/utils/request'

export function modelList(query) {
  return request({
    url: '/simcard/list',
    method: 'post',
    data: query
  })
}

export function modelCreate(model) {
  return request({
    url: '/simcard/create',
    method: 'post',
    data: model
  })
}

export function modelUpdate(model) {
  return request({
    url: '/simcard/update',
    method: 'post',
    data: model
  })
}

export function modelDetail(id) {
  return request({
    url: '/simcard/show/' + id,
    method: 'get'
  })
}
export function batchUpdatePackage(ids, query, model) {
  return request({
    url: '/simcard/batchUpdatePackage',
    method: 'post',
    data: {ids: ids, query: query, model: model}
  })
}

export function batchUpdateOffPeriod(ids, query, model) {
  return request({
    url: '/simcard/batchUpdateOffPeriod',
    method: 'post',
    data: {ids: ids, query: query, model: model}
  })
}

export function batchUpdateExpiryDate(ids, query, model) {
  return request({
    url: '/simcard/batchUpdateExpiryDate',
    method: 'post',
    data: {ids: ids, query: query, model: model}
  })
}

export function batchUpdateAPN(ids, query, model) {
  return request({
    url: '/simcard/batchUpdateAPN',
    method: 'post',
    data: {ids: ids, query: query, model: model}
  })
}

export function batchUpdateStatus(ids, query, model) {
  return request({
    url: '/simcard/batchUpdateStatus',
    method: 'post',
    data: {ids: ids, query: query, model: model}
  })
}

export function download(ids, query, model) {
  return request({
    url: '/simcard/download',
    method: 'post',
    data: {ids: ids, query: query, model: model}
  })
}

export function simcardMap(imsi) {
  return request({
    url: '/simcard/map',
    method: 'post',
    data: { query: { imsi: imsi } }
  })
}

