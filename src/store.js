import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		isIntro: window.localStorage.getItem('intro')
			? JSON.parse(window.localStorage.getItem('intro'))
			: true,
		isAuthenticated: !!window.localStorage.getItem('authorization') &&
			!!JSON.parse(window.localStorage.getItem('account')),
		authToken: window.localStorage.getItem('authorization'),
		isVerified: !!window.localStorage.getItem('verified'),
		account: JSON.parse(window.localStorage.getItem('account')),
		error: {
			context: 'error',
			snackbar: false,
			text: ''
		}
	},
	getters: {
		isIntro (state) {
			return state.isIntro;
		},
		isAuthenticated (state) {
			return state.isAuthenticated;
		},
		isVerified (state) {
			return state.isVerified;
		},
		authToken (state) {
			return state.authToken;
		},
		account (state) {
			return state.account;
		},
		error (state) {
			return state.error;
		}
	},
	mutations: {
		toggleIntro (state, value) {
			state.isIntro = window.localStorage.setItem('intro', value);
		},
		setAuth (state) {
			state.isAuthenticated = !!window.localStorage.getItem('authorization') &&
				!!JSON.parse(window.localStorage.getItem('account'));
			state.authToken = window.localStorage.getItem('authorization');
			state.account = JSON.parse(window.localStorage.getItem('account'));
		},
		setVerified (state) {
			state.isVerified = !!window.localStorage.getItem('verified');
		},
		addError (state, error) {
			console.log(state, error);
			state.error = error;
		}
	},
	actions: {}
});
