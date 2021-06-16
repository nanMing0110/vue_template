import http from '@/netService/http.js';
// 根据事项code获取事项信息
const getDataByCode = (code) => {
	const param = { code };
	return http.get('/getAllItemInfoByItemCode', param, false);
};
export default getDataByCode;
