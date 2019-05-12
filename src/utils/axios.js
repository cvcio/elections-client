import axios from 'axios';
import store from '@/store';
const http = axios.create();
// Add a request interceptor
http.interceptors.request.use((config) => {
	if (config.url.indexOf('slack') > -1) return config;
	if (window.localStorage.getItem('authorization')) {
		config.headers['Authorization'] = window.localStorage.getItem('authorization');
	}
	return config;
});
// Add a response interceptor
http.interceptors.response.use((response) => {
	if (response.headers['authorization']) {
		window.localStorage.setItem('authorization', response.headers['authorization']);
	}
	return response;
}, (error) => {
	store.commit('addError', {
		context: 'error',
		snackbar: true,
		text: error.message
	});
	if (error.response.status === 401) {
		window.localStorage.removeItem('authorization');
		window.localStorage.removeItem('account');
		window.location = '/';
	}
});

export {
	http
};
