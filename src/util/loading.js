import { Loading } from 'element-ui';

const loadOption = {
	fullscreen: true,
	lock: true,
	text: '拼命加载中',
	background: 'rgba(0, 0, 0, 0.7)',
}; //spinner: 'el-icon-loading',

let loadingInstance;

export default {
	open() {
		loadingInstance = Loading.service(loadOption);
	},
	close() {
		loadingInstance.close();
	},
};
