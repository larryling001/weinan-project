import { request } from './request.js';

/**
 * 查询
 */
const apps = {
  cardID:param=> request.get(`/cardcode/${param}`)	
}

module.exports = {
	apps
};