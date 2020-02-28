<template>
	<v-app id="app" light toolbar footer>

		<v-toolbar :inverted-scroll="$store.state.fullscreen" app color="white" flat height="72">
			<v-btn left flat small icon to="/" v-if="$route.path !== '/'">
				<v-icon size="16">mdi-arrow-left</v-icon>
			</v-btn>
			<v-toolbar-title>
				<router-link to="/">
					<span class="mt-1 grey--text" to="/">MediaWatch</span>
				</router-link>
			</v-toolbar-title>
			<v-divider inset vertical class="mx-3" v-if="$vuetify.breakpoint.mdAndUp"></v-divider>
			<span class="subheading font-weight-bold mt-1">Εκλογές 2019</span>

			<v-spacer></v-spacer>

			<div v-if="!isUser">
				<span class="grey--text">
					<v-btn flat small round :icon="$vuetify.breakpoint.smAndDown" class="grey--text text-none" to="/about">
						<span v-if="$vuetify.breakpoint.mdAndUp">Είστε Δημοσιογράφος</span>
						<v-icon :right="$vuetify.breakpoint.mdAndUp" small>mdi-help-circle</v-icon>
					</v-btn>
				</span>
				<v-btn round color="accent" small class="tour user-settings mx-4 px-3" href="https://medium.com/cvcio/eu-elections-2019-4d7a75176ba9" target="_blank">
					EU2019 Report
				</v-btn>
				<v-btn :large="$vuetify.breakpoint.mdAndUp" flat round light color="accent" :icon="$vuetify.breakpoint.smAndDown" @click="$refs.authorize.authorize = true">
					<v-icon :left="$vuetify.breakpoint.mdAndUp" dark color="#38A1F3">mdi-twitter</v-icon>
					<span v-if="$vuetify.breakpoint.mdAndUp">Αιτημα προσβασης</span>
				</v-btn>
			</div>
			<div v-else>
				<span class="grey--text">
					<v-btn round color="accent" small class="tour user-settings mx-4 px-3" href="https://medium.com/cvcio/eu-elections-2019-4d7a75176ba9" target="_blank">
						EU2019 Report
				    </v-btn>
					<span class="caption" v-if="$vuetify.breakpoint.mdAndUp">Περιοχή Σχολιασμού</span>
					<v-btn fab flat dark color="accent" small class="tour user-settings" to="/classifier">
						<v-avatar class="grey" size="36">
							<img :src="$store.state.account.profileImageURL" :alt="$store.state.account.firstName[0] + $store.state.account.lastName[0]"/>
				    	</v-avatar>
				    </v-btn>

					<v-btn flat small color="grey" icon @click="logout">
						<v-icon small>mdi-logout</v-icon>
					</v-btn>
				</span>
			</div>

			<form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top" class="ma-0 pa-0">
				<input type="hidden" name="cmd" value="_s-xclick" />
				<input type="hidden" name="hosted_button_id" value="BLQB4GV8422AN" />
				<v-btn :large="$vuetify.breakpoint.mdAndUp" :round="$vuetify.breakpoint.mdAndUp" :fab="$vuetify.breakpoint.smAndDown" :small="$vuetify.breakpoint.smAndDown" light color="primary" type="submit">
					<v-icon :left="$vuetify.breakpoint.mdAndUp" dark>mdi-paypal</v-icon>
					<span v-if="$vuetify.breakpoint.mdAndUp">Donate</span>
				</v-btn>
			</form>
		</v-toolbar>

		<authorize ref="authorize" :urlParams="urlParams"></authorize>

		<v-content app>
			<v-container fluid fill-height class="rel pa-0">
				<v-layout row wrap>
					<v-flex xs12>
						<v-scroll-y-transition mode="out-in">
							<router-view></router-view>
						</v-scroll-y-transition>
					</v-flex>
				</v-layout>
			</v-container>
		</v-content>

		<v-snackbar :multi-line="true" :color="error.context" v-model="error.snackbar" bottom :timeout="20000">
			{{ error.text }}
			<v-btn dark flat @click.native="error.snackbar = false">CLOSE</v-btn>
		</v-snackbar>

		<foot></foot>

	</v-app>
</template>

<script>
export default {
	name: 'elections',
	components: {
		'authorize': require('@/components/authorize').default,
		'foot': require('@/components/footer').default
	},
	computed: {
		isUser () {
			return this.$store.state.isAuthenticated;
		},
		error () {
			return this.$store.state.error;
		},
		urlParams () {
			return window.location.search;
		}
	},
	methods: {
		logout () {
			window.localStorage.removeItem('authorization');
			window.localStorage.removeItem('account');
			window.localStorage.removeItem('intro');

			window.location = '/';
		}
	}
};
</script>

<style lang="less">
html, body {
	overflow: auto !important;
}
html, body, #app {
	background-color: #ffffff;
	font-family: 'Roboto', Arial, sans-serif;
}

.container.grid-list-xl {
	max-width: 1264px;
}

a {
	text-decoration: none;
}

h1, h2, h3, h4, h5, h6 {
	&.display-1, &.display-2, &.display-3, &.mono {
		font-family: 'Roboto Mono' !important;
	}
}
.display-1, .display-2, .display-3, .mono {
	font-family: 'Roboto Mono' !important;
}

.short-divider {
    width: 72px;
    border-color: #24242d !important;
}

.cc {
	top: -1px;
	position: relative;
}

</style>
