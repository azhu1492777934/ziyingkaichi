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

export function batchUpdateByUserGroup(ids, query, model) {
  return request({
    url: '/terminal/batchUpdateByUserGroup',
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

export function modelDelete(id) {
  return request({
    url: '/terminal/delete/' + id,
    method: 'post'
  })
}

export function uploadTerminalFile(file) {
  return request({
    url: '/terminal/upload/',
    method: 'post',
    data: file
  })
}

export function download(ids, query, model) {
  return request({
    url: '/terminal/download',
    method: 'post',
    data: {ids: ids, query: query, model: model}
  })
}

export function groupMap() {
  return request({
    url: '/terminal/groupmap',
    method: 'get'
  })
}

