<template>
	<v-container grid-list-xl>
		<v-layout align-baseline row wrap class="my-4">
			<v-flex xs12 md8 lg4>
				<h1 class="display-3 mb-3">Οι Εκλογές μέσα από τα δίκτυα διάδοσης πληροφορίας στο Twitter</h1>
				<v-divider class="short-divider my-3" color="#24242d"></v-divider>
				<h4 class="headline my-3">Μία συνεργατική έρευνα, σε πραγματικό χρόνο</h4>
				<arrow></arrow>
			</v-flex>
			<v-flex xs12 md8 lg8 class="mt-5">
				<h4 class="headline my-3">MediaWatch / Ευρωεκλογές 2019</h4>
				<p class="subheading">Η συγκεκριμένη εφαρμογή (<a href="https://elections.mediawatch.io" target="_blank">https://elections.mediawatch.io</a>) αποτελεί έναν μηχανισμό ανάλυσης δικτύων και παρακολούθησης του περιεχομένου στα μέσα κοινωνικής δικτύωσης και ειδικότερα στο Twitter.</p>

				<p class="subheading">Επιλέξαμε να παρακολουθήσουμε σε πραγματικό χρόνο τη διαδικτυακή "συζήτηση" με θέμα τις Ευρωεκλογές, <strong>με στόχο την χαρτογράφηση των δικτύων διάδοσης της πληροφορίας στο Twitter</strong>.</p>

				<p class="subheading">Σκοπός είναι η ταξινόμηση των δημοσιεύσεων (αναφορών) και λογαριασμών, την ανάλυση των μεταξύ τους δικτύων και συσχετισμών, την παρακολούθηση του πολιτικού λόγου, την ανίχνευση διάδοσης ψευδών ειδήσεων, τον εντοπισμό δικτύων προπαγάνδας και ιδιαίτερα όσων συνδέονται με πολιτικά πρόσωπα και πολιτικά κόμματα.</p>

				<p class="subheading">Παράλληλα, στόχος μας είναι η ενημέρωση των πολιτών για τους τρόπους διάχυσης της πληροφορίας και της είδησης στα μέσα κοινωνικής δικτύωσης, παρουσιάζοντας τα δίκτυα που δημιουργούν ή προωθούν συγκεκριμένα αφηγήματα, όπως fake news, προπαγάνδα κ.λπ., τόσο σε τοπικό όσο και σε Ευρωπαϊκό επίπεδο. Παράλληλα, μέσω της εφαρμογής εξάγονται χρήσιμα συμπεράσματα για την ποιότητα του περιεχομένου που παράγεται από τους δημοσιογράφους, τους πολιτικούς και κάθε μορφής “influencer” στα μέσα κοινωνικής δικτύωσης.</p>

				<p class="subheading">Οι πολιτικές εξελίξεις μας ανάγκασαν να επεκτείνουμε την έρευνα η οποία θα παραμείνει ενεργή <strong>έως και το τέλος των Βουλευτικών εκλογών και τον σχηματισμό κυβέρνησης</strong>.</p>

				<p class="subheading"><span class="font-italic">Η συγκεκριμένη έρευνα είνα πειραματική και δεν έχει σκοπό να επιρεάσει την κοινή γνώμη.</span></p>

				<h4 class="headline my-3">Για την μεθοδολογία</h4>
				<p class="subheading">Συνολικά παρακολουθούμε περίπου <a href="https://docs.google.com/spreadsheets/d/1thL_v923guVkqQn5tAKD7V6JOB30PtxxXze0fX3ZNig/edit?usp=sharing" target="_blank">380 πολιτικούς - υποψήφιους βουλευτές</a> και τα συναφή #hashtag των εκλογών μέσω του Twitter Streaming API.</p>
				<p class="subheading">Το γράφημα ή ο γράφος περιγράφει πως διαδίδεται ένα tweet - αναφορά για να διαμορφώσει πληροφορίες και ως εκ τούτου να επηρεάσει την κοινή γνώμη.</p>
				<p class="subheading">Οι χρήστες ταξινομούνται σύμφωνα με συγκεκριμενα χαρακτηριστικά: αριθμός Followers, Following, Statuses, Favourites, Public Lists, Followers / Following, Statuses / Favourites και κάνοντας χρήση αυτοματοποιημένων διαδικασιών / αλγορίθμων.</p>
				<p class="subheading">Το μέγεθος κάθε κόμβου εξαρτάται από τον αριθμό των διαδράσεων ανα ημέρα, ενώ χρώματιζεται ανάλογα από τον χαρακτηρισμό που του έχει δοθεί αυτόματα από τον αλγόριθμο. Τελος το χρώμα το δεσμού εξαρτάται από τον τύπο της διάδρασης: <span class="retweet">Retweet</span>, <span class="quote">Quote</span>.</p>
				<p class="subheading">Μπορείτε να χρησιμοποιήσετε το ποντίκι σας για να κάνετε zoom-in, zoom-out και να μετακινήσετε το γράφημα.</p>

				<h4 class="headline my-3">Σχολιασμός / Δημοσιογράφοι</h4>
				<p class="subheading">Καλούμε τους δημοσιογράφους, τηρώντας τον κώδικα δεοντολογίας τους, να συνδράμουν στην αποτελεσματικότερη λειτουργία της πλατφόρμας αξιολογώντας την κάθε δημοσίευση - αναφορά. Οι δημοσιογράφοι έχουν τη δυνατότητα να αξιολογήσουν την κάθε αναφορά και να την ταξινομήσουν (μη-πολιτικό, πολιτικό, fake news, ρητορική μίσους) με βάση το περιεχόμενό της, να κατατάξουν τον συντάκτη ως προς την ιδιότητά του (ιδιώτης, πολιτικός, δημοσιογράφος κ.λπ.) και να χαρακτηρίσουν το κείμενο ως προς τον πολιτικό προσανατολισμό (αριστερά, κέντρο, δεξιά κ.λπ.), αιτιολογώντας τις όποιες επιλογές τους.</p>
				<p class="subheading">Επισημαίνεται ότι για λόγους αξιοπιστίας της έρευνας δεν αποκαλύπτονται τα στοιχεία του συντάκτη των δημοσιεύσεων - αναφορών, αποκρύπτουμε δηλαδή το όνομα / συνθηματικό του συντάκτη και όλων όσων αναφέρεται.</p>
				<p class="subheading">Τα αποτελέσματα της καταγραφής και τα συμπεράσματα που θα προκύψουν θα δημοσιοποιηθούν συνολικά μετά τις Ευρωεκλογές και θα είναι διαθέσιμα με την μορφη ανοιχτών δεδομένων (open-data).</p>
			</v-flex>
		</v-layout>

		<v-layout align-baseline row wrap class="my-4">
			<v-flex xs12 md8 lg4>
				<h1 class="display-1 my-3">Partners</h1>
				<v-divider class="short-divider my-3" color="#24242d"></v-divider>
				<arrow></arrow>
			</v-flex>
			<v-flex xs12 md8 lg8 class="mt-5">
				<v-container grid-list-xs fluid align-center fill-height>
          			<v-layout row wrap align-center>
						<v-flex xs2>
							<a href="https://mediawatch.io/" target="_blank"><v-img src="/img/partners/cvcio.png"/></a>
						</v-flex>
						<v-flex xs2>
							<a href="https://vouliwatch.gr/" target="_blank"><v-img src="/img/partners/VW_logo-normal.png"/></a>
						</v-flex>
					</v-layout>
				</v-container>
			</v-flex>
		</v-layout>

		<v-layout align-baseline row wrap class="my-4">
			<v-flex xs12 md8 lg4>
				<h1 class="display-1 my-3">Supporters</h1>
				<v-divider class="short-divider my-3" color="#24242d"></v-divider>
				<arrow></arrow>
			</v-flex>
			<v-flex xs12 md8 lg8 class="mt-5">
				<v-container grid-list-xs fluid align-center fill-height>
          			<v-layout row wrap align-center>
						<v-flex xs2>
							<a href="https://imedd.org/" target="_blank"><v-img src="/img/supporters/imedd.png"/></a>
						</v-flex>
					</v-layout>
				</v-container>
			</v-flex>
		</v-layout>

		<v-layout align-baseline row wrap class="my-4">
			<v-flex xs12 md6 lg4>
				<h1 class="display-1 mb-3">Άδεια Χρήσης</h1>
				<v-divider class="short-divider my-3" color="#24242d"></v-divider>
				<h4 class="headline my-3">CC BY-NC-SA 4.0</h4>
				<arrow></arrow>
			</v-flex>
			<v-flex xs12 md8 lg8 class="">
				<h4 class="headline my-3">Άδεια Χρήσης</h4>
				<p class="subheading">Ο διαδικτυακός τόπος <a href="https://elections.mediawatch.io" target="_blank">https://elections.mediawatch.io</a> ανήκει στην υπό σύσταση αστική μη κερδοσκοπική εταιρεία με την επωνυμία «CIVIC INFORMATION OFFICE» και με διακριτικό τίτλο «CVCIO». Το περιεχόμενο της εφαρμογής αυτής αποτελεί παραγωγή και ιδιοκτησία των δημιουργών της εκτός από τις περιπτώσεις όπου επισημαίνεται ρητώς η όποια άλλη προέλευση του περιεχομένου και διατίθεται στο κοινό με άδεια χρήσης <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/" target="_blank">Creative Commons - Αναφορά Δημιουργού - Μη Εμπορική Χρήση - Παρόμοια Διανομή 4.0 Διεθνές</a>.</p>
			</v-flex>
		</v-layout>
	</v-container>
</template>

<script>
export default {
	name: 'about',
	data () {
		return {
			name: 'about'
		};
	},
	components: {
		'arrow': require('@/components/arrow').default
	}
};
</script>
