import Vue from 'vue';
import VueSession from 'vue-session';
import VueCookies from 'vue-cookies';

import App from '@/App.vue';
import router from '@/router';
import store from '@/store';

import { http } from '@/utils/axios';
import moment from 'moment';
import _ from 'lodash';

import '@/plugins/vuetify';
import '@/registerServiceWorker';

Vue.use(VueSession, {
	persist: true
});

Vue.use(VueCookies);

Vue.config.productionTip = false;

Vue.prototype.$http = http;
Vue.prototype.$moment = moment;
Vue.prototype.$_ = _;
Vue.prototype.$BASE_API = process.env.VUE_APP_BASE_API || '';
Vue.prototype.$VERSION = require('../package.json').version;
Vue.prototype.$DOMAINNAME = process.env.VUE_APP_DOMAINNAME || 'EU Elections 2019';

// eslint-disable-next-line
new Vue({
	el: '#app',
	router,
	store,
	template: '<App/>',
	components: {
		App
	}
});
