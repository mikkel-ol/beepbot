import Vue from 'vue';
import Router from 'vue-router';

import Home from './views/Home.vue';
import Login from './views/Login.vue';
import Error from './views/Error.vue';

Vue.use(Router);

export default new Router({
	mode: 'history',
	base: process.env.BASE_URL,
	routes: [
		{
			path: '/',
			name: 'home',
			component: Home,
			meta: {
				requiresAuth: false
			}
		},
		{
			path: '/login',
			name: 'login',
			component: Login
		},
		{
			path: '/error',
			name: 'error',
			component: Error
		},
		{
			path: '*',
			name: 'catch-all',
			redirect: { name: 'home' }
		}
	]
});
