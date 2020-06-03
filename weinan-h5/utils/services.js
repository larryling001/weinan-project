import { request } from './request.js';

/**
 * 查询
 */
const apps = {
  login: (param) => request.post(`/login?username=${param.username}&password=${param.password}`),
  getBaseInfo:(param)=>request.post(`/select/${param}`),
  getMoreInfo:(param)=>request.post(`/select/details/${param}`)
}

module.exports = {
	apps
};