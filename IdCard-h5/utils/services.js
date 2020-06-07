import { request } from './request.js';

/**
 * 查询
 */
const apps = {
  cardID:param=> request.get(`/cardcode/${param}`),
  login: (param) => request.post(`/login?username=${param.username}&password=${param.password}`),
}

module.exports = {
	apps
};