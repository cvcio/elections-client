<template>
	<v-flex xs12 md8 lg4 align-center justify-center>
		<h1 class="display-2 mb-3" :class="$vuetify.breakpoint.smAndDown ? 'display-1' : ''">Οι Εκλογές μέσα από τα δίκτυα διάδοσης πληροφορίας στο Twitter</h1>
		<v-divider class="short-divider my-3" color="#24242d"></v-divider>
		<h4 class="headline my-3">Μία συνεργατική έρευνα, σε πραγματικό χρόνο</h4>

		<p class="">Η συγκεκριμένη εφαρμογή αποτελεί έναν μηχανισμό ανάλυσης δικτύων και παρακολούθησης του περιεχομένου στα μέσα κοινωνικής δικτύωσης και ειδικότερα στο Twitter.</p>
		<p>Επιλέξαμε να παρακολουθήσουμε σε πραγματικό χρόνο τη διαδικτυακή "συζήτηση" με θέμα τις Ευρωεκλογές, <strong>με στόχο την χαρτογράφηση των δικτύων διάδοσης της πληροφορίας στο Twitter</strong>.</p>
		<p>Σκοπός είναι η ταξινόμηση των δημοσιεύσεων (αναφορών) και λογαριασμών, την ανάλυση των μεταξύ τους δικτύων και συσχετισμών, την παρακολούθηση του πολιτικού λόγου, την ανίχνευση διάδοσης ψευδών ειδήσεων, τον εντοπισμό δικτύων προπαγάνδας και ιδιαίτερα όσων συνδέονται με πολιτικά πρόσωπα και πολιτικά κόμματα.</p>
		<p>Οι πολιτικές εξελίξεις μας ανάγκασαν να επεκτείνουμε την έρευνα η οποία θα παραμείνει ενεργή <strong>έως και το τέλος των Βουλευτικών εκλογών και τον σχηματισμό κυβέρνησης</strong>.</p>
		<p>Συνολικά παρακολουθούμε περίπου <a href="https://docs.google.com/spreadsheets/d/1thL_v923guVkqQn5tAKD7V6JOB30PtxxXze0fX3ZNig/edit?usp=sharing" target="_blank">380 πολιτικούς - υποψήφιους βουλευτές</a> και τα συναφή #hashtag των εκλογών. <span class="font-italic">Η συγκεκριμένη έρευνα είνα πειραματική και δεν έχει σκοπό να επιρεάσει την κοινή γνώμη.</span></p>

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
