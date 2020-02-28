import Vue from 'vue';

import App from '@/App.vue';
import router from '@/router';
import store from '@/store';

import { http } from '@/utils/axios';
import moment from 'moment';
import _ from 'lodash';
import * as d3 from 'd3';

import '@/plugins/vuetify';
import '@/registerServiceWorker';

Vue.config.productionTip = false;

Vue.prototype.$http = http;
Vue.prototype.$moment = moment;
Vue.prototype.$_ = _;
Vue.prototype.$d3 = d3;
Vue.prototype.$BASE_API = process.env.VUE_APP_BASE_API || 'https://api.elections.mediawatch.io';
Vue.prototype.$SOCKET = process.env.VUE_APP_SOCKET || 'wss://api.elections.mediawatch.io/v2/ws';
Vue.prototype.$VERSION = require('../package.json').version;
Vue.prototype.$moment.locale('el');

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
