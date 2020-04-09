import Vue from 'vue';
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueAnalytics from 'vue-analytics'

import App from './App.vue';
import router from './router';
import store from './store';

// Attach axios to Vue object
Vue.use(VueAxios, axios);

// Attach Google Analytics
Vue.use(VueAnalytics, {
	id: 'UA-137498042-3'
})

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
