<template>
	<v-container grid-list-xl>
		<v-layout align-baseline row wrap class="my-4">
			<v-flex xs12 md8 lg4>
				<h1 class="display-3 mb-3">Οι Ευρωεκλογές μέσα από τα δίκτυα διάδοσης πληροφορίας στο Twitter</h1>
				<v-divider class="short-divider my-3" color="#24242d"></v-divider>
				<h4 class="headline my-3">Μία συνεργατική έρευνα, σε πραγματικό χρόνο</h4>
				<arrow></arrow>
			</v-flex>
			<v-flex xs12 md8 lg8 class="mt-5">
				<h4 class="headline my-3">MediaWatch / Ευρωεκλογές 2019</h4>
				<p class="subheading">Η συγκεκριμένη εφαρμογή (<a href="https://elections.mediawatch.io" target="_blank">https://elections.mediawatch.io</a>) αποτελεί έναν μηχανισμό ανάλυσης δικτύων και παρακολούθησης του περιεχομένου στα μέσα κοινωνικής δικτύωσης και ειδικότερα στο Twitter.</p>

				<p class="subheading">Στόχος μας είναι, για το διάστημα των Ευρωεκλογών 20-27 Μαΐου 2019, η πλήρης χαρτογράφηση των δικτύων διάδοσης της πληροφορίας στο Twitter - σε πραγματικό χρόνο με σκοπό την ταξινόμηση των δημοσιεύσεων (αναφορών), την ανάλυση των μεταξύ τους δικτύων και συσχετισμών, την παρακολούθηση του πολιτικού λόγου, την ανίχνευση διάδοσης ψευδών ειδήσεων, τον εντοπισμό δικτύων προπαγάνδας και ιδιαίτερα όσων συνδέονται με πολιτικά πρόσωπα και πολιτικά κόμματα.</p>

				<p class="subheading">Στόχος μας είναι η ενημέρωση των πολιτών για τους τρόπους διάχυσης της πληροφορίας και της είδησης στα μέσα κοινωνικής δικτύωσης, παρουσιάζοντας τα δίκτυα που δημιουργούν ή προωθούν συγκεκριμένα αφηγήματα, όπως fake news, προπαγάνδα κ.λπ., τόσο σε τοπικό όσο και σε Ευρωπαϊκό επίπεδο. Παράλληλα, μέσω της εφαρμογής εξάγονται χρήσιμα συμπεράσματα για την ποιότητα του περιεχομένου που παράγεται από τους δημοσιογράφους, τους πολιτικούς και κάθε μορφής “influencer” στα μέσα κοινωνικής δικτύωσης.</p>
				<p class="subheading">Υπενθυμίζουμε ότι τόσο στο Brexit όσο και στις Αμερικάνικες εκλογές το 2016 τα εκλογικά αποτελέσματα κρίθηκαν από τα δίκτυα προπαγάνδας μέσω των μέσων κοινωνικής δικτύωσης (Yochai Benkler, Network Propaganda, 2018).</p>
				<p class="subheading">Παραλληλα, καλούμε τους δημοσιογράφους, τηρώντας τον κώδικα δεοντολογίας της δημοσιογραφίας, να συνδράμουν στην αποτελεσματικότερη λειτουργία της πλατφόρμας αξιολογώντας την κάθε δημοσίευση - αναφορά και, με βάση το περιεχόμενό της, να κατατάξουν τον συντάκτη ως προς την ιδιότητά του (ιδιώτης, πολιτικός, δημοσιογράφος κ.λπ.), να χαρακτηρίσουν το κείμενο ως προς τον πολιτικό προσανατολισμό  (αριστερά, κέντρο, δεξιά κ.λπ.), να ταξινομήσουν την αναφορά (μη-πολιτικό, πολιτικό, fake news, ρητορική μίσους) και εν τέλει να αιτιολογήσουν τις όποιες επιλογές τους.</p>
				<p class="subheading">Επισημαίνεται ότι για λόγους αξιοπιστίας της έρευνας δεν αποκαλύπτονται τα στοιχεία του συντάκτη των δημοσιεύσεων - αναφορών, αποκρύπτουμε δηλαδή το χανντλε του συντάκτη και όλων όσων αναφέρεται.</p>
				<p class="subheading">Τα αποτελέσματα της καταγραφής και τα συμπεράσματα που θα προκύψουν θα δημοσιοποιηθούν συνολικά μετά τις Ευρωεκλογές.</p>
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
		<!--
		<v-layout align-baseline row wrap class="my-4">
			<v-flex xs12 md8 lg4>
				<h1 class="display-1 my-3">Credits</h1>
				<v-divider class="short-divider my-3" color="#24242d"></v-divider>
				<p class="font-italic grey--text">Disclaimer: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vehicula sem sed turpis aliquet, at mollis lorem facilisis. Maecenas rutrum justo sem, nec mollis ante accumsan id. Integer in ante quam. Mauris bibendum at lacus non mollis. Suspendisse potenti. Vivamus porta eleifend lacus, ac iaculis ex convallis quis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Ut at nisl tempor ante semper mollis ac et neque. Pellentesque nulla dui, aliquam ac efficitur quis, lobortis et enim. Quisque non venenatis nunc, vel dictum elit.</p>
				<arrow></arrow>
			</v-flex>
			<v-flex xs12 md8 lg8>
				<h4 class="headline my-3">Δημοσιογράφοι</h4>
				<p class="subheading">Short Description: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vehicula sem sed turpis aliquet, at mollis lorem facilisis. Maecenas rutrum justo sem, nec mollis ante accumsan id. Integer in ante quam. Mauris bibendum at lacus non mollis. Suspendisse potenti. Vivamus porta eleifend lacus, ac iaculis ex convallis quis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Ut at nisl tempor ante semper mollis ac et neque. Pellentesque nulla dui, aliquam ac efficitur quis, lobortis et enim. Quisque non venenatis nunc, vel dictum elit. Maecenas auctor fermentum ex ut dignissim. Aliquam porttitor ex quis lacus ultrices, eget facilisis magna finibus. Cras maximus metus orci, vitae sodales nibh ultrices vitae. Duis tempus dapibus nunc, in euismod massa tristique ac.</p>
				<p class="subheading">Short Description: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vehicula sem sed turpis aliquet, at mollis lorem facilisis. Maecenas rutrum justo sem, nec mollis ante accumsan id. Integer in ante quam. Mauris bibendum at lacus non mollis. Suspendisse potenti. Vivamus porta eleifend lacus, ac iaculis ex convallis quis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Ut at nisl tempor ante semper mollis ac et neque. Pellentesque nulla dui, aliquam ac efficitur quis, lobortis et enim. Quisque non venenatis nunc, vel dictum elit. Maecenas auctor fermentum ex ut dignissim. Aliquam porttitor ex quis lacus ultrices, eget facilisis magna finibus. Cras maximus metus orci, vitae sodales nibh ultrices vitae. Duis tempus dapibus nunc, in euismod massa tristique ac.</p>
				<p class="subheading">Short Description: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vehicula sem sed turpis aliquet, at mollis lorem facilisis. Maecenas rutrum justo sem, nec mollis ante accumsan id. Integer in ante quam. Mauris bibendum at lacus non mollis. Suspendisse potenti. Vivamus porta eleifend lacus, ac iaculis ex convallis quis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Ut at nisl tempor ante semper mollis ac et neque. Pellentesque nulla dui, aliquam ac efficitur quis, lobortis et enim. Quisque non venenatis nunc, vel dictum elit. Maecenas auctor fermentum ex ut dignissim. Aliquam porttitor ex quis lacus ultrices, eget facilisis magna finibus. Cras maximus metus orci, vitae sodales nibh ultrices vitae. Duis tempus dapibus nunc, in euismod massa tristique ac.</p>
				<p class="subheading">Short Description: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vehicula sem sed turpis aliquet, at mollis lorem facilisis. Maecenas rutrum justo sem, nec mollis ante accumsan id. Integer in ante quam. Mauris bibendum at lacus non mollis. Suspendisse potenti. Vivamus porta eleifend lacus, ac iaculis ex convallis quis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Ut at nisl tempor ante semper mollis ac et neque. Pellentesque nulla dui, aliquam ac efficitur quis, lobortis et enim. Quisque non venenatis nunc, vel dictum elit. Maecenas auctor fermentum ex ut dignissim. Aliquam porttitor ex quis lacus ultrices, eget facilisis magna finibus. Cras maximus metus orci, vitae sodales nibh ultrices vitae. Duis tempus dapibus nunc, in euismod massa tristique ac.</p>
			</v-flex>
		</v-layout>
		-->
		<v-layout align-baseline row wrap class="my-4">
			<v-flex xs12 md8 lg4>
				<h1 class="display-1 my-3">Κώδικας Δεοντολογίας</h1>
				<v-divider class="short-divider my-3" color="#24242d"></v-divider>
				<h4 class="headline my-3">Πλαίσιο Συνεργασίας</h4>
				<arrow></arrow>
			</v-flex>
			<v-flex xs12 md8 lg8 class="mt-5">
				<p class="subheading">Η «CVCIO» έχει ως γενικό σκοπό να μελετήσει, να σχεδιάσει, να αναπτύξει και να προωθήσει καινοτόμες τεχνολογίες με τη μορφή ανοιχτού κώδικα προκειμένου να συμβάλλει στην αποτελεσματικότερη ενημέρωση των πολιτών, την εύρυθμη και διαφανή λειτουργία της δημοκρατίας και των θεσμών καθώς και την ενεργοποίηση της κοινωνίας των πολιτών, με τρεις (3) πυλώνες δράσης: Ελεύθερο Λογισμικό, Ανοιχτά Δεδομένα, Ανοιχτό Περιεχόμενο και γύρω από τους εξής θεματικούς άξονες: Τεχνολογία, Εκπαίδευση, Ενημέρωση, Διαφάνεια.</p>
				<p class="subheading">Βασικές αρχές μας είναι η αλήθεια, η αντικειμενικότητα και η αμεροληψία στη διαχείριση του περιεχομένου με κύριο μέλημά μας τον πολίτη. Θέλουμε οι χρήστες μας να γνωρίζουν ότι:</p>
				<ol class="my-3">
					<li>Τα στοιχεία που συλλέγονται είναι ακριβή, αληθή και κατά το δυνατό πλήρη.</li>
					<li>Αναφέρουμε την πηγή προέλευσης των στοιχείων αυτών.</li>
					<li>Τα στοιχεία παρουσιάζονται με προσοχή και αίσθημα ευθύνης.</li>
					<li>Η ιδιωτική ζωή όλων είναι σεβαστή και απαραβίαστη.</li>
					<li>Οι αναλύσεις είναι αμερόληπτες και ανεξάρτητες.</li>
					<li>Δεν εκφράζουμε προσωπικές απόψεις και πεποιθήσεις.</li>
					<li>Κάθε έρευνα γίνεται προς το δημόσιο συμφέρον, για την εκπλήρωση του σκοπού μας και ειδικότερα για την εξασφάλιση της ενημέρωσης της κοινής γνώμης.</li>
					<li>Δεν διατηρούμε καμία εργασιακή σχέση με οποιονδήποτε τυχόν συμμετέχει στις έρευνές μας.</li>
				</ol>
				<p class="subheading">Ειδικότερα, για την επίτευξη του σκοπού της παρούσας έρευνας μέσω της πλατφόρμας <a href="https://elections.mediawatch.io" target="_blank">https://elections.mediawatch.io</a> η «CVCIO» θα συνεργαστεί σε εθελοντική βάση με δημοσιογράφους και δημοσιογραφικούς οργανισμούς. Ο πιλοτικός χαρακτήρας της πλατφόρμας μας έχει ερευνητικά αλλά και δημοσιογραφικά χαρακτηριστικά και διεκδικεί να επεξεργάζεται (σύμφωνα με τα άρθρα του ΓΚΠΔ 679/2016 περί δημοσιογραφικής εξαίρεσης) προσωπικά δεδομένα που αυτοβούλως τα υποκείμενα ή τα media, κοινοποιούν δημόσια στα μέσα κοινωνικής δικτύωσης (ΜΚΔ).</p>

				<p class="subheading">Στο πλαίσιο αυτής της συνεργασίας, όλοι οι συμμετέχοντες δηλώνουν ότι αποδέχονται ανεπιφύλακτα τα  παρακάτω:</p>
				<ol class="my-3">
					<li>Η συνεργασία αυτή  μεταξύ της «CVCIO» και οποιουδήποτε άλλου προσώπου, φυσικού ή νομικού, γίνεται αποκλειστικά για τους σκοπούς της παρούσας έρευνας, χωρίς κανένα αντάλλαγμα, εθελοντικά, δεν υποκρύπτεται ουδεμία εργασιακή σχέση και δεν γεννάται ουδεμία αξίωση για αποζημίωση από κανένα μέρος.</li>
					<li>Η έρευνα διεξάγεται αποκλειστικά για την ενημέρωση των πολιτών.</li>
					<li>Όλοι οι χρήστες θα πρέπει να συμπεριφέρονται με ανοχή, ευγένεια και σεβασμό.</li>
					<li>Κανένας από τους συμμετέχοντες δεν αποκτά κανένα δικαίωμα πνευματικής ιδιοκτησίας επί τους περιεχομένου της έρευνας αυτής.</li>
					<li>Η «CVCIO» διατηρεί το δικαίωμα να αρνηθεί την εγγραφή οποιουδήποτε ατόμου ή ομάδας εάν εκτιμήσει ότι είναι πιθανόν να είναι κακόβουλα, σκόπιμα προκλητικά, παραβιάζουν τους νόμους κατά των διακρίσεων ή είναι άλλως ακατάλληλα για ένταξη στο δίκτυό μας. Επιπλέον, μπορεί να αρνηθεί την εγγραφή οποιουδήποτε ατόμου ή ομάδας κατά την απόλυτη διακριτική της ευχέρεια. Ομοίως, διατηρεί το δικαίωμα να αναστείλει ή να τερματίσει την εγγραφή κάθε ατόμου ή ομάδας κατά την απόλυτη διακριτική της ευχέρεια.</li>
					<li>Όλοι οι συμμετέχοντες οφείλουν να αποδεχθούν ανεπιφύλακτα και να σεβαστούν τον κώδικα δεοντολογίας μας, διαφορετικά δεν θα πρέπει να συμμετέχουν στην έρευνα αυτή.</li>
					<li>Ειδικότερα, οι δημοσιογράφοι οφείλουν να τηρούν της αρχές δεοντολογίας του δημοσιογραφικού επαγγέλματος, να είναι ακριβείς, ανεξάρτητοι και ελεύθεροι από μεροληψίες και στερεότυπα∙ η επεξεργασία και κατηγοριοποίηση οποιωνδήποτε στοιχείων θα πρέπει να γίνει με αυστηρά δημοσιογραφικά κριτήρια και όχι βάσει προσωπικών απόψεων και πεποιθήσεων με μοναδικό γνώμονα την πληροφόρηση του πολίτη.</li>
					<li>Κάθε μέρος που συμμετέχει είναι αποκλειστικά υπεύθυνο και οφείλει να συμμορφώνεται με τους κανόνες και τις διατάξεις που ισχύουν περί προστασίας δεδομένων προσωπικού χαρακτήρα.</li>
					<li>Καταγράφεται η άποψη του δημοσιογράφου – χρήστη της πλατφόρμας, αντιπροσωπευτικά για σειρά από θέματα δημόσιου ενδιαφέροντος.</li>
					<li>Κάθε συμμετέχων δηλώνει ότι αποδέχεται τους όρους χρήσης και προστασίας δεδομένων προσωπικού χαρακτήρα της πλατφόρμας και συναινεί στη χρήση των προσωπικών του δεδομένων αποκλειστικά για το σκοπό της παρούσας έρευνας.</li>
					<li>Η «CVCIO» δε φέρει καμία ευθύνη για τυχόν απαιτήσεις νομικής, αστικής ή ποινικής φύσης ούτε για οποιαδήποτε τυχόν ζημία (θετική, ειδική ή αποθετική).</li>
				</ol>
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
				<!--<p class="subheading">Επί της ουσίας αυτό, μεταξύ άλλων σημαίνει ότι άλλοι μπορούν να χρησιμοποιήσουν το περιεχόμενο με κάθε τρόπο εκτός από οποιαδήποτε εμπορικό σκοπό. Σε καμία περίπτωση η εταιρεία «CVCIO» δε φέρει ευθύνη για τυχόν απαιτήσεις νομικής, αστικής ή ποινικής φύσης ούτε για οποιαδήποτε τυχόν ζημία (θετική, ειδική ή αποθετική) του χρήστη/επισκέπτη αυτού του διαδικτυακού τόπου. Σε μια τέτοια περίπτωση, επικοινωνήστε μαζί μας για άμεση συνεννόηση.</p>-->
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
