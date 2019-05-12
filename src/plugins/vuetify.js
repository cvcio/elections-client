import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import '@mdi/font/css/materialdesignicons.css';

Vue.use(Vuetify, {
	iconfont: 'mdi',
	theme: {
		primary: '#ED2038',
		accent: '#0F0F18',
		secondary: '#3772FF',
		error: '#FF5252',
		info: '#2196F3',
		success: '#4CAF50',
		warning: '#FFC107'
	}
});
