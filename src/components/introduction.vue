<template>
	<v-flex xs12 md8 lg4 align-center justify-center>
		<arrow></arrow>
		<h1 class="display-3 mb-3">Οι Ευρωεκλογές μέσα από τα δίκτυα διάδοσης πληροφορίας στο Twitter</h1>
		<v-divider class="short-divider my-3" color="#24242d"></v-divider>
		<h4 class="headline my-3">Μία συνεργατική έρευνα, σε πραγματικό χρόνο</h4>

		<p class="subheading">Για πρώτη φορά μια ελληνική πλατφόρμα αποκαλύπτει σε πραγματικό χρόνο όλες τις συζητήσεις που γίνονται στο Twitter, παρουσιάζοντας έναν διαδραστικό χάρτης της διάδοσης μιας πληροφορίας.</p>

		<p class="font-italic grey--text">Disclaimer: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vehicula sem sed turpis aliquet, at mollis lorem facilisis. Maecenas rutrum justo sem, nec mollis ante accumsan id. Integer in ante quam. Mauris bibendum at lacus non mollis. Suspendisse potenti. Vivamus porta eleifend lacus, ac iaculis ex convallis quis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Ut at nisl tempor ante semper mollis ac et neque. Pellentesque nulla dui, aliquam ac efficitur quis, lobortis et enim. Quisque non venenatis nunc, vel dictum elit.</p>

		<v-btn class="mx-0" color="primary" @click="$store.commit('toggleIntro', false)">Close</v-btn>
	</v-flex>
</template>

<script>
export default {
	name: 'live-introduction',
	computed: {
		isIntro () {
			return this.$store.state.isIntro;
		}
	},
	data () {
		return {
			name: 'live'
		};
	},
	components: {
		'arrow': require('@/components/arrow').default
	}
};
</script>
