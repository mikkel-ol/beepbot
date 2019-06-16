import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import StorageManager from './services/storage';

Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
	const token = StorageManager.getToken();
	const isExpired = token ? StorageManager.isExpired() : null;
	// TODO: Handle refresh tokens

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
