<template>
	<v-flex xs12 md8 lg4 align-center justify-center>
		<h1 class="display-3 mb-3" :class="$vuetify.breakpoint.smAndDown ? 'display-1' : ''">Οι Ευρωεκλογές μέσα από τα δίκτυα διάδοσης πληροφορίας στο Twitter</h1>
		<v-divider class="short-divider my-3" color="#24242d"></v-divider>
		<h4 class="headline my-3">Μία συνεργατική έρευνα, σε πραγματικό χρόνο</h4>

		<p class="subheading">Η συγκεκριμένη εφαρμογή αποτελεί έναν μηχανισμό ανάλυσης δικτύων και παρακολούθησης του περιεχομένου στα μέσα κοινωνικής δικτύωσης και ειδικότερα στο Twitter.</p>
		<p class="subheading">Στόχος μας είναι, για το διάστημα των Ευρωεκλογών 20-27 Μαΐου 2019, η πλήρης χαρτογράφηση των δικτύων διάδοσης της πληροφορίας στο Twitter - σε πραγματικό χρόνο με σκοπό την ταξινόμηση των δημοσιεύσεων (αναφορών), την ανάλυση των μεταξύ τους δικτύων και συσχετισμών, την παρακολούθηση του πολιτικού λόγου, την ανίχνευση διάδοσης ψευδών ειδήσεων, τον εντοπισμό δικτύων προπαγάνδας και ιδιαίτερα όσων συνδέονται με πολιτικά πρόσωπα και πολιτικά κόμματα.</p>

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
	}
};
</script>
