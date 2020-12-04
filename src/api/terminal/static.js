import request from '@/utils/request'

export function modelTsidList(query) {
  return request({
    url: '/terminal_sim/tsidList',
    method: 'post',
    data: query
  })
}

export function modelImsiList(query) {
  return request({
    url: '/terminal_sim/imsiList',
    method: 'post',
    data: query
  })
}

export function modelImsiDateList(query) {
  return request({
    url: '/terminal_sim/imsiDateList',
    method: 'post',
    data: query
  })
}

