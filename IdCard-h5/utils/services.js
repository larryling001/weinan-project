import { request } from './request.js';

/**
 * 查询
 */
const apps = {
  cardID:param=> request.get(`/cardcode/${param}`),
  login: (param) => request.post(`/login?username=${param.username}&password=${param.password}`),
  city: (param) => request.get(`/townshiplist`),
  village: (param) => request.get(`/villagecommitteebytownship/${param}`),
  peopleName: (param) => request.get(`/userlistbyvillagecommittee/${param}`),
  usertype: (param) => request.get(`/getUserTyps`),
  year: (param) => request.get(`/getyear`),
  statistics: param => request.post(`/statistics`,param,true)
}

module.exports = {
	apps
};