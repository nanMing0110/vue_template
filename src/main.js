import Vue from 'vue';
import App from './App.vue';
import router from '@/router/index.js';
import store from '@/store/index.js';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import http from '@/netService/http.js';
Vue.prototype.$http = http;
Vue.config.productionTip = false;
Vue.use(ElementUI);
new Vue({
	router,
	store,
	render: (h) => h(App),
}).$mount('#app');
