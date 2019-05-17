import Vue from 'vue';
import Router from 'vue-router';
import store from '@/store';

Vue.use(Router);

let router = new Router({
	mode: 'history',
	scrollBehavior (to, from, savedPosition) {
		return { x: 0, y: 0 };
	},
	routes: [
		{
			path: '/',
			component: () => import(/* webpackChunkName: "live" */ './views/live/index.vue'),
			props: (route) => ({
				provider: route.query.provider || '',
				method: route.query.method || '',
				twitterId: route.query.twitterId || ''
			})
		},
		{
			path: '/live',
			component: () => import(/* webpackChunkName: "live" */ './views/live/index.vue')
		},
		{
			path: '/about',
			component: () => import(/* webpackChunkName: "about" */ './views/static/about.vue')
		},
		{
			path: '/legal',
			component: () => import(/* webpackChunkName: "legal" */ './views/static/legal.vue')
		},
		{
			path: '/classifier',
			component: () => import(/* webpackChunkName: "classifier" */ './views/classifier/index.vue'),
			meta: {
				requiresAuth: true
			}
		}
	]
});

router.beforeEach((to, from, next) => {
	if (to.meta.requiresAuth) {
		if (!store.state.isAuthenticated || !store.state.account) {
			next({
				path: '/?method=authorize',
				query: { redirect: to.fullPath }
			});
		}
		next();
	} else {
		next();
	}
	next();
});

export default router;
