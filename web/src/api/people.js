import request from '@/utils/request'

// 获取人物列表
export const getPeopleList = (param) => {
  return request({
    url: '/list',
    method: 'get',
    params:param
  })
}
export const addPeople = (data)=>{
  return request({
    url: '/add',
    method: 'post',
    data: data
  })
}
export const selectPeople = (data)=>{
  return request({
    url: `/select/details/${data}`,
    method: 'post'
  })
}
export const updataPoeple = (data)=>{
  return request({
    url: '/update',
    method: 'post',
    data: data
  })
}
//同步图片
export const synchroImage = (data)=>{
  return request({
    url: `/synchroImage/${data}`,
    method: 'post'
  })
}
//导入信息
