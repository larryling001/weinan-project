
const baseUrl = 'http://com.dl.house.vaiwan.com';//测试环境
// const baseUrl = 'http://192.168.0.155:8810';//测试环境
// const baseUrl = 'https://hcp.ikingtech.info/evaluationMatter'; //生产环境
const uploadUrl = "http://192.168.1.100/oss/api/upload/v1" // 上传图片地址
const downloadUrl = "http://192.168.1.100/" // 下载图片地址


const defaultMessage = '';
let showNoLogin = true
const requestConfig = (url, data, methods, isShowLoading, contentType) => {
	let showLoding = isShowLoading ? true : isShowLoading
	if (showLoding !== false) {
		uni.showLoading({
			title: defaultMessage,
		});
	}
	const promise = new Promise((resolve, reject) => {
		/**
		 * 发起请求
		 */
		uni.request({
			url: baseUrl + url,
			data: data,
			header: {
				'content-type': contentType?contentType:'application/json', // 默认值
				'Authorization': uni.getStorageSync('Authorization') || ''
			},
			method: methods,
			/**
			 * 收到开发者服务成功返回的回调函数
			 */
			success: function(res) {
				uni.hideLoading();
				if (res.statusCode === 401) {
					if (showNoLogin) {
						showNoLogin = false
						uni.showToast({
							title:'登录超时请重新登录',
							icon:'none'
						})
						uni.removeStorageSync('webToken');
					}
					return;
				}
				if (res.statusCode !== 200) {
					uni.showToast({
						title: res.data.msg,
						icon: 'none'
					})
					return
				}
				if (!res.data) {
					uni.showToast({
						title: res.data.msg,
						icon: 'none'
					})
				}
				resolve(res);
			},
			/**
			 * 接口调用失败的回调函数
			 */
			fail: function(error) {
				uni.hideLoading();
				console.log('error', error)
				uni.showModal({
					title: '提示',
					content: '网络异常',
					showCancel: false
				});
				reject(error);
			},
			/**
			 * 接口调用结束的回调函数（调用成功、失败都会执行）
			 */
			complete: function(res) {

			}
		})
	});
	return promise;
}

const request = {
  get: async (url, isShowLoading,contentType) => {
    let result = await requestConfig(url, {}, 'GET', isShowLoading, contentType).then();
    return result.data;
  },
  post: async (url, data,isShowLoading,contentType) => {
    let result = await requestConfig(url, data, 'POST', isShowLoading, contentType);
    return result.data;
  },
  put: async (url, data,isShowLoading,contentType) => {
    let result = await requestConfig(url, data, 'PUT', isShowLoading, contentType);
    return result.data;
  }
};

module.exports = {
	baseUrl: baseUrl,
	request: request,
	uploadUrl: uploadUrl,
	downloadUrl: downloadUrl
}
