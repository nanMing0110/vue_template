/**
 * 封装axios
 * @description 当前使用axios进行数据获取,接口返回格式需统一规范
 */
import axios from 'axios';
import util from '@/util/util.js';
import conf from '@/config/config.js';
import loading from '@/util/loading.js';
import { Message } from 'element-ui';
axios.defaults.baseURL = conf.baseURL;
axios.defaults.timeout = conf.timeout;

//请求拦截
axios.interceptors.request.use(
	(config) => {
		//在请求发送之前要做什么
		return config;
	},
	(error) => {
		Message({
			showClose: true,
			message: error,
			type: 'warning',
		});
		return Promise.reject(error);
	}
);

axios.interceptors.response.use(
	(response) => {
		return response;
	},
	(error) => {
		//对请求错误做处理
		Message({
			showClose: true,
			message: '网络错误，请联系管理员！',
			type: 'warning',
			duration: '0',
		});
		return Promise.reject(error);
	}
);
//返回状态判断
function checkStatus(response) {
	if (!response.status) {
		return {
			code: '501',
			status: false,
			error: response.statusText,
		};
	}
	if (response.status === 200 || response.status === 304) {
		if (util.isJson(response.data)) return JSON.parse(response.data);
		let result = response.data;
		if (result.data && util.isJson(result.data)) {
			result.data = JSON.parse(result.data);
			let keys = Object.keys(result.data);
			if (keys.length) {
				for (let i = 0, len = keys.length; i < len; i++) {
					if (
						!Number.isInteger(Number(result.data[keys[i]])) &&
						util.isJson(result.data[keys[i]])
					) {
						result.data[keys[i]] = JSON.parse(result.data[keys[i]]);
					}
				}
			}
		}
		return result;
	}
	return {
		status: false,
		data: response.statusText,
	};
}

const post = (
	url,
	data,
	isLoading = true,
	contentType = 'application/x-www-form-urlencoded'
) => {
	isLoading ? loading.open() : '';
	if (contentType == 'application/x-www-form-urlencoded') {
		data = util.arrayObjectKeyValues(data).join('&');
	}
	return new Promise((resolve, reject) => {
		axios({
			method: 'post',
			url: axios.defaults.baseURL + url,
			data: data,
			timeout: axios.defaults.timeout,
			headers: {
				'X-Requested-With': 'XMLHttpRequest',
				'Content-Type': contentType,
			},
		})
			.then((res) => checkStatus(res))
			// 最后一个then 启用 resolve,reject
			.then((res) => {
				isLoading ? loading.close() : '';
				resolve(res);
			})
			.catch((err) => {
				loading.close();
				reject(err);
			});
	});
};
const get = (url, params, isLoading = true) => {
	isLoading ? loading.open() : '';
	return new Promise((resolve, reject) => {
		axios({
			method: 'get',
			url: axios.defaults.baseURL + url,
			params,
			timeout: axios.defaults.timeout,
			headers: {
				'X-Requested-With': 'XMLHttpRequest',
				'Content-Type': 'application/json',
			},
		})
			.then((res) => checkStatus(res))
			.then((res) => {
				isLoading ? loading.close() : '';
				resolve(res);
			})
			.catch((err) => {
				loading.close();
				reject(err);
			});
	});
};

export default {
	post,
	get,
};
