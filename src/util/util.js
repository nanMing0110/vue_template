/*  */
import html2canvas from 'html2canvas';
import JsPDF from 'jspdf';
let util = {};
export default util;

/**
 * axios请求参数序列化
 * @param {a: 'a', b: 'b'}
 * @returns  ['a=a', 'b=b']
 */
util.arrayObjectKeyValues = function (obj) {
	let arr = [];
	for (let key in obj) {
		arr.push(`${key}=${obj[key]}`);
	}
	return arr;
};

/**
 * 检查一个变量是不是JSON对象
 * input： any
 * return: true or false
 */
util.isJson = function (data) {
	try {
		JSON.parse(data);
		return true;
	} catch (err) {
		return false;
	}
};

/**
 * JSON对象反序列化
 * input： string
 * return: object or null
 */
util.parse = function (data) {
	if (data && util.isJson(data)) return JSON.parse(data);
	return data;
};

/**
 * JSON对象序列化
 * input： json
 * return: string
 */
util.stringify = function (data) {
	if (!data) return '';
	if (data && util.isJson(data)) return data;
	return JSON.stringify(data);
};

/**
 * 判断传入的数据是否非空
 * input： any
 * return： Boolean 非空： true， 包含空值： false
 */
util.VerifyValues = function (item) {
	//处理字符串
	if (typeof item == 'string') return !!item;
	//处理数组
	if (Array.isArray(item)) return item.length > 0;
	//处理对象
	let result = true;
	if (typeof item == 'object') {
		let keys = Object.keys(item);
		let len = keys.length;

		for (let i = 0; i < len; i++) {
			if (!item[keys[i]] || item[keys[i]] == '') {
				result = false;
				break;
			}
		}
	}
	return result;
};
/**
 * 判断传入的数据是否有非空项
 * input： any
 * return： Boolean 非空： true， 包含空值： false
 */
util.notEmpty = function (item) {
	//处理字符串
	if (typeof item == 'string') return !!item;
	//处理数组
	if (Array.isArray(item)) return item.length > 0;
	//处理对象
	let result = true;
	if (typeof item == 'object') {
		let keys = Object.keys(item);
		let len = keys.length;

		for (let i = 0; i < len; i++) {
			if (
				item[keys[i]] &&
				item[keys[i]] !== '' &&
				item[keys[i]] !== undefined &&
				item[keys[i]] !== null
			) {
				result = true;
				break;
			}
		}
	}
	return result;
};

/**
 * 格式化日期
 * input： String， Date
 * return： String 'yyyy-MM-dd' => '2019-09-04'
 */
util.formatDate = function (date = new Date(), fmt = 'yyyy-MM-dd') {
	let o = {
		'M+': date.getMonth() + 1, //月份
		'd+': date.getDate(), //日
		'h+': date.getHours(), //小时
		'm+': date.getMinutes(), //分
		's+': date.getSeconds(), //秒
		'q+': Math.floor((date.getMonth() + 3) / 3), //季度
		S: date.getMilliseconds(), //毫秒
	};
	if (/(y+)/.test(fmt))
		fmt = fmt.replace(
			RegExp.$1,
			(date.getFullYear() + '').substr(4 - RegExp.$1.length)
		);
	for (let k in o)
		if (new RegExp('(' + k + ')').test(fmt))
			fmt = fmt.replace(
				RegExp.$1,
				RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
			);
	return fmt;
};
/**
 * 校验联系方式
 * @param phoneNumber 值
 * @param type 1:手机+电话 ；2：手机 ； 3：电话
 * @returns {boolean}
 */
util.checkPhone = function (phoneNumber, type = 1) {
	let mobile = /^1[3456789]\d{9}$/,
		phone = /^0\d{2,3}-?\d{7,8}$/;
	if (type == 1) {
		return mobile.test(phoneNumber) || phone.test(phoneNumber);
	} else if (type == 2) {
		return mobile.test(phoneNumber);
	} else if (type == 3) {
		return phone.test(phoneNumber);
	}
};

/**
 * 校验身份证号格式
 * @param cardNo
 * @returns {boolean}
 */
util.checkIDCardNo = function (cardNo) {
	// 身份证验证
	let citylist = {
		11: '北京',
		12: '天津',
		13: '河北',
		14: '山西',
		15: '内蒙古',
		21: '辽宁',
		22: '吉林',
		23: '黑龙江',
		31: '上海',
		32: '江苏',
		33: '浙江',
		34: '安徽',
		35: '福建',
		36: '江西',
		37: '山东',
		41: '河南',
		42: '湖北',
		43: '湖南',
		44: '广东',
		45: '广西',
		46: '海南',
		50: '重庆',
		51: '四川',
		52: '贵州',
		53: '云南',
		54: '西藏 ',
		61: '陕西',
		62: '甘肃',
		63: '青海',
		64: '宁夏',
		65: '新疆',
		71: '台湾',
		81: '香港',
		82: '澳门',
		91: '国外',
	};
	let iSum = 0,
		iCount = cardNo.length;
	// 长度不符
	if (!/(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test(cardNo)) return false;

	cardNo = cardNo.replace(/x$/i, 'a');
	// 非法地区
	if (citylist[Number.parseInt(cardNo.substr(0, 2))] == null) return false;
	// 非法年份
	if (cardNo.substr(6, 1) != '1' && cardNo.substr(6, 1) != '2') return false;

	// 非法生日
	let sBirthday =
		cardNo.substr(6, 4) +
		'-' +
		Number(cardNo.substr(10, 2)) +
		'-' +
		Number(cardNo.substr(12, 2));
	let date = new Date(sBirthday.replace(/-/g, '/'));
	if (
		sBirthday !=
		date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
	)
		return false;

	if (iCount == 18) {
		for (var i = 17; i >= 0; i--) {
			iSum += (Math.pow(2, i) % 11) * parseInt(cardNo.charAt(17 - i), 11);
		}
		if (iSum % 11 != 1) return false;
	}
	return true;
};

/**
 * 校验邮箱格式
 * @param emailStr
 * @returns {boolean}
 */
util.checkEmail = function (emailStr) {
	let email = /^\w+@[a-z0-9]+\.[a-z]{2,4}$/;
	return email.test(emailStr);
};

/**
 * 检查统一社会信用代码格式
 * @param Code
 * @returns {boolean} false：不是有效的统一社会信用编码！；true：
 */
util.checkSocialCreditCode = function (Code) {
	let patrn = /^[0-9A-Z]+$/;
	//18位校验及大写校验
	if (Code.length != 18 || patrn.test(Code) == false) {
		return false;
	} else {
		let Ancode; //统一社会信用代码的每一个值
		let Ancodevalue; //统一社会信用代码每一个值的权重
		let total = 0;
		let weightedfactors = [
			1, 3, 9, 27, 19, 26, 16, 17, 20, 29, 25, 13, 8, 24, 10, 30, 28,
		]; //加权因子
		let str = '0123456789ABCDEFGHJKLMNPQRTUWXY';
		//不用I、O、S、V、Z
		for (let i = 0; i < Code.length - 1; i++) {
			Ancode = Code.substring(i, i + 1);
			Ancodevalue = str.indexOf(Ancode);
			total = total + Ancodevalue * weightedfactors[i];
			//权重与加权因子相乘之和
		}
		let logiccheckcode = 31 - (total % 31);
		if (logiccheckcode == 31) {
			logiccheckcode = 0;
		}
		let Str = '0,1,2,3,4,5,6,7,8,9,A,B,C,D,E,F,G,H,J,K,L,M,N,P,Q,R,T,U,W,X,Y';
		let Array_Str = Str.split(',');
		logiccheckcode = Array_Str[logiccheckcode];

		let checkcode = Code.substring(17, 18);
		if (logiccheckcode != checkcode) {
			return false;
		}
		return true;
	}
};

/**
 * 增加附件上传类型验证
 * @param filetype
 * @returns {boolean}
 */
util.checkFileType = function (filetype) {
	var fileTypeRegu =
		/(gif|jpe?g|png|dwg|bmp|doc|docx|txt|ppt|pptx|xlsx|xls|pdf|tif|chm|xml|rar|zip|7z|ceb)$/i;
	return fileTypeRegu.test(filetype);
};
/**
 * 将页面转化成pdf下载
 * @param {*} el
 * @param {*} name
 */
util.htmlToPdf = function (el, name) {
	html2canvas(el).then((canvas) => {
		let contentWidth = canvas.width;
		let contentHeight = canvas.height;
		//一页pdf显示html页面生成的canvas高度;
		let pageHeight = (contentWidth / 592.28) * 841.89;
		//未生成pdf的html页面高度
		let leftHeight = contentHeight;
		//页面偏移
		let position = 0;
		//a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
		let imgWidth = 595.28;
		let imgHeight = (592.28 / contentWidth) * contentHeight;
		let pageData = canvas.toDataURL('image/jpeg', 1.0);
		let pdf = new JsPDF('', 'pt', 'a4');
		//有两个高度需要区分，一个是html页面的实际高度，和生成pdf的页面高度(841.89)
		//当内容未超过pdf一页显示的范围，无需分页
		if (leftHeight < pageHeight) {
			pdf.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight);
		} else {
			while (leftHeight > 0) {
				//arg3-->距离左边距;arg4-->距离上边距;arg5-->宽度;arg6-->高度
				pdf.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight);
				leftHeight -= pageHeight;
				position -= 841.89;
				//避免添加空白页
				if (leftHeight > 0) {
					//添加新页
					pdf.addPage();
				}
			}
		}
		pdf.save(`${name}.pdf`);
	});
};
/**
 * 将页面转化成pdf下载
 * @param {*} ele
 * @param {*} name
 */
util.printOut = (ele, name) => {
	let shareContent = ele, //需要截图的包裹的（原生的）DOM 对象
		width = shareContent.clientWidth, //获取dom 宽度
		height = shareContent.clientHeight, //获取dom 高度
		canvas = document.createElement('canvas'), //创建一个canvas节点
		scale = 1; //定义任意放大倍数 支持小数
	width = parseInt(width) < 1480 ? 1480 : width;
	height = parseInt(height) < 1480 ? 1480 : height;
	console.log(width, height);
	canvas.width = width * scale; //定义canvas 宽度 * 缩放
	canvas.height = height * scale; //定义canvas高度 *缩放
	canvas.style.width = shareContent.clientWidth * scale + 'px';
	canvas.style.height = shareContent.clientHeight * scale + 'px';
	canvas.getContext('2d').scale(scale, scale); //获取context,设置scale
	console.log(canvas);
	let opts = {
		scale: scale, // 添加的scale 参数
		canvas: canvas, //自定义 canvas
		logging: false, //日志开关，便于查看html2canvas的内部执行流程
		width: width, //dom 原始宽度
		height: height,
		useCORS: true, // 【重要】开启跨域配置
	};

	html2canvas(shareContent, opts).then(() => {
		var contentWidth = canvas.width;
		var contentHeight = canvas.height;
		//一页pdf显示html页面生成的canvas高度;
		var pageHeight = (contentWidth / 592.28) * 841.89;
		//未生成pdf的html页面高度
		var leftHeight = contentHeight;
		//页面偏移
		var position = 0;
		//a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
		var imgWidth = 595.28;
		var imgHeight = (592.28 / contentWidth) * contentHeight;
		var pageData = canvas.toDataURL('image/jpeg', 1.0);
		var PDF = new JsPDF('', 'pt', 'a4');
		if (leftHeight < pageHeight) {
			PDF.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight);
		} else {
			while (leftHeight > 0) {
				PDF.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight);
				leftHeight -= pageHeight;
				position -= 841.89;
				if (leftHeight > 0) {
					PDF.addPage();
				}
			}
		}
		PDF.save(name + '.pdf'); // 这里是导出的文件名
	});
};
/**
 * 从字符串中提取所有的A=B组合
 * input: http://127.0.0.1:9999/?abc=32423&def=333/#/move-car/index?query=9898&name=3234dsfsd&age=231
 * output: {abc:32423, def: 333, age: "231", name: "3234dsfsd", query: "9898"}
 */

util.getUrlParams = function (url = window.location.href) {
	let params = url.split('?').pop().split('&');
	if (params.length == 1) {
		if (!params[0]) {
			return '';
		}
		if (params[0].indexOf('=') < 0) {
			return params[0] || '';
		}
	}
	let data = {};
	let len = params.length;
	for (let i = 0; i < len; i++) {
		let map = params[i].split('=');
		map[1] =
			map[1].indexOf('#') > -1 ? map[1].slice(0, map[1].indexOf('#')) : map[1];
		data[map[0]] = map[1];
	}
	return data;
};
/**
 * 从字符串路径中提取当前的路由名称
 * in:http://localhost:8999/#/Details?ticket=6d71afa9fc204828f4758f771c2a1acfc718e8457283e99386dafe2ed9&rowguid=b4a96cc3-42d2-99f4-18ed6256d&sblsh=0001595
 * out:Details
 * @param url
 * @returns {string}
 */
util.getURLRouterPath = function (url = window.location.href) {
	let index = url.lastIndexOf('/');
	let str = url.substring(index + 1, url.length).split('?')[0];
	return str;
};
