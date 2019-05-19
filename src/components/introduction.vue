<template>
	<v-flex xs12 md8 lg4 align-center justify-center>
		<arrow></arrow>
		<h1 class="display-3 mb-3" :class="$vuetify.breakpoint.smAndDown ? 'display-1' : ''">Οι Ευρωεκλογές μέσα από τα δίκτυα διάδοσης πληροφορίας στο Twitter</h1>
		<v-divider class="short-divider my-3" color="#24242d"></v-divider>
		<h4 class="headline my-3">Μία συνεργατική έρευνα, σε πραγματικό χρόνο</h4>

		<p class="subheading">Για πρώτη φορά μια ελληνική πλατφόρμα αποκαλύπτει σε πραγματικό χρόνο όλες τις συζητήσεις που γίνονται στο Twitter, παρουσιάζοντας έναν διαδραστικό χάρτη της διάδοσης μιας πληροφορίας.</p>

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
