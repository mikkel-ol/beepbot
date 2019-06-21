import Vue from 'vue';
import axios from 'axios'
import VueAxios from 'vue-axios'

import App from './App.vue';
import router from './router';
import store from './store';

// Attach axios to Vue object
Vue.use(VueAxios, axios);

Vue.config.productionTip = false;

// TODO: Set this up properly with state in Vuex
router.beforeEach((to, from, next) => {

	if (to.meta.requiresAuth) {
		if (!token || isExpired) {
			next({ name: 'login' });
		}
	}

	next();
});

new Vue({
	router,
	store,
	render: (h) => h(App)
}).$mount('#app');
