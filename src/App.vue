<template>
	<v-app id="app" light toolbar footer>
		<v-toolbar :inverted-scroll="$store.state.fullscreen" app color="white" flat height="72">
			<v-btn left flat small icon to="/" v-if="$route.path !== '/'">
				<v-icon size="16">mdi-arrow-left</v-icon>
			</v-btn>
			<v-toolbar-title>
				<router-link to="/">
					<span class="grey--text" to="/">MediaWatch</span>
				</router-link>
			</v-toolbar-title>
			<v-divider inset vertical class="mx-3"></v-divider>
			<span class="subheading font-weight-bold">Ευρωεκλογές 2019</span>

			<v-spacer></v-spacer>

			<div v-if="!isUser">
				<span class="grey--text">
					<v-btn flat small round :icon="$vuetify.breakpoint.smAndDown" class="grey--text text-none" to="/about">
						<span v-if="!$vuetify.breakpoint.smAndDown">Είστε Δημοσιογράφος</span>
						<v-icon :right="!$vuetify.breakpoint.smAndDown" small>mdi-help-circle</v-icon>
					</v-btn>
				</span>
				<v-btn large flat round light color="accent" :icon="$vuetify.breakpoint.smAndDown" @click="$refs.authorize.authorize = true">
					<v-icon :left="!$vuetify.breakpoint.smAndDown" dark color="#38A1F3">mdi-twitter</v-icon>
					<span v-if="!$vuetify.breakpoint.smAndDown">Αιτημα προσβασης</span>
				</v-btn>
			</div>
			<div v-else>
				<v-btn fab flat dark color="accent" small class="tour user-settings" to="/classifier">
					<v-avatar class="grey mt-1" size="36">
						<img :src="$store.state.account.profileImageURL" :alt="$store.state.account.firstName[0] + $store.state.account.lastName[0]"/>
			    	</v-avatar>
			    </v-btn>
			</div>

			<form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top" class="ma-0 pa-0">
				<input type="hidden" name="cmd" value="_s-xclick" />
				<input type="hidden" name="hosted_button_id" value="88FQHKKEJ8WQA" />
				<v-btn large round light color="primary" type="submit">
					<v-icon left dark>mdi-paypal</v-icon>
					Donate
				</v-btn>
			</form>
		</v-toolbar>

		<authorize ref="authorize"></authorize>

		<v-content app>
			<v-container fluid fill-height class="rel">
				<v-layout row wrap>
					<v-flex xs12>
						<v-scroll-y-transition mode="out-in">
							<router-view></router-view>
						</v-scroll-y-transition>
					</v-flex>
				</v-layout>
			</v-container>
		</v-content>

		<v-snackbar :multi-line="false" :color="error.context" v-model="error.snackbar" bottom :timeout=12000>
			{{ error.text }}
			<v-btn dark flat @click.native="error.snackbar = false">CLOSE</v-btn>
		</v-snackbar>

		<v-footer absolute app v-if="!$store.state.fullscreen" color="transparent" class="pa-4" height="auto">
			<span class="">Copyright &copy; {{ new Date().getFullYear() }} Civic Information Office</span>
			<v-btn flat class="text-none" to="/about">Διαβάστε Περισσότερα</v-btn>
			<v-spacer></v-spacer>
			<v-btn href="mailto:press@mediawatch.io" flat class="text-none grey--text">Contact</v-btn>
			<v-btn to="/legal" flat class="text-none grey--text">Terms &amp; Privacy</v-btn>
			<v-btn to="/legal" flat class="text-none grey--text">Code of Conduct</v-btn>
		</v-footer>
	</v-app>
</template>

<script>
export default {
	name: 'elections',
	components: {
		'authorize': require('@/components/authorize').default
	},
	computed: {
		isUser () {
			return this.$store.state.isAuthenticated;
		},
		error () {
			return this.$store.state.error;
		}
	}
};
</script>

<style lang="less">
html, body {
	overflow: auto !important;
}
html, body, #app {
	background-color: #fafafa;
	font-family: 'Roboto', Arial, sans-serif;
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

</style>
