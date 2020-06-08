import {
	request
} from './request.js';

/**
 * 查询
 */
let apps = {
	login: (param) => request.post(`/login?username=${param.username}&password=${param.password}`),
	getBaseInfo: (param) => request.post(`/select/${param}`),
	getMoreInfo: (param) => request.post(`/select/details/${param}`),
	// 图片上传
	uploadpictures: (param) => request.post(`/uploadpictures`, param),
	// 图片删除
	delpictures: (param) => request.post(`/delpictures`, param),
}

module.exports = {
	apps
};
