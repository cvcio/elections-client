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
		fullscreen: false,
		error: {
			context: 'error',
			snackbar: false,
			text: ''
		},
		selectedUser: null,
		cachedGraph: {
			nodes: [],
			links: []
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
		},
		fullscreen (state) {
			return state.fullscreen;
		},
		selectedUser (state) {
			return state.selectedUser;
		},
		cachedGraph (state) {
			return state.cachedGraph;
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
			state.error = error;
		},
		setFullscreen (state, fullscreen) {
			state.fullscreen = fullscreen;
		},
		setSelectedUser (state, selectedUser) {
			if (selectedUser) {
				console.debug(
					[
						selectedUser.metrics.followers || 0,
						selectedUser.metrics.friends || 0,
						selectedUser.metrics.statuses || 0,
						selectedUser.metrics.favorites || 0,
						selectedUser.metrics.lists || 0,
						selectedUser.metrics.friends > 0
							? selectedUser.metrics.followers / (selectedUser.metrics.friends)
							: selectedUser.metrics.followers,
						selectedUser.metrics.favorites > 0
							? selectedUser.metrics.statuses / (selectedUser.metrics.favorites)
							: selectedUser.metrics.statuses
					].join(',')
				);
			}
			state.selectedUser = selectedUser;
		},
		saveGraph (state, cachedGraph) {
			state.cachedGraph = cachedGraph;
		}
	},
	actions: {}
});
