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
			path: '/live/tweet/:id',
			component: () => import(/* webpackChunkName: "live" */ './views/live/index.vue')
		},
		{
			path: '/live/account/:id',
			component: () => import(/* webpackChunkName: "live" */ './views/live/index.vue')
		},
		{
			path: '/live/cluster/:id',
			component: () => import(/* webpackChunkName: "live" */ './views/live/index.vue')
		},
		{
			path: '/live/user/:id',
			component: () => import(/* webpackChunkName: "live" */ './views/live/index.vue')
		},
		{
			path: '/metrics',
			component: () => import(/* webpackChunkName: "metrics" */ './views/Metrics.vue')
		},
		{
			path: '/users',
			component: () => import(/* webpackChunkName: "users" */ './views/Users.vue')
		},
		{
			path: '/users/:id',
			component: () => import(/* webpackChunkName: "users" */ './views/Users.vue')
		},
		{
			path: '/account',
			component: () => import(/* webpackChunkName: "account" */ './views/Account.vue')
		},
		{
			path: '/account/tweets',
			component: () => import(/* webpackChunkName: "account" */ './views/Account.vue')
		},
		{
			path: '/about',
			component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
		},
		{
			path: '/legal',
			component: () => import(/* webpackChunkName: "legal" */ './views/Legal.vue')
		},
		{
			path: '/donate',
			component: () => import(/* webpackChunkName: "donate" */ './views/Donate.vue')
		},
		{
			path: '/classifier',
			component: () => import(/* webpackChunkName: "classifier" */ './views/Classifier.vue')
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
