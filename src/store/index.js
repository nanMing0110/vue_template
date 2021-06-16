import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		activeIdx: 0,
	},
	getters: {
		getActiveIdx: (state) => state.activeIdx,
	},
	mutations: {
		setActiveIdx: (state, idx) => {
			state.activeIdx = idx;
		},
	},
	actions: {
		//支持异步更新数据
	},
	modules: {},
	//组件
	plugins: [
		//当vuex中内容发生改变时,同时向`storage`配置的浏览器存储容器中写入数据
		createPersistedState({
			storage: window.sessionStorage, //vuex和sessionStorage的交互,可选择['localStorage','cookie','sessionStorage']
			key: 'store',
		}),
	],
});
