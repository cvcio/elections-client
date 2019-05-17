<template>
	<v-container grid-list-xl fill-height>
		<v-layout align-center justify-center>
			<v-flex xs12 md8 lg4>
				<v-card class="" color="#00acee" dark max-width="400">
					<v-img
						v-if="tweet.media && tweet.media.length > 0"
						class="white--text"
						contain
						:src="tweet.media[0]"></v-img>
					<v-card-title class="px-4">
						<v-layout align-center justify-end>
							<v-flex class="text-xs-left">
								<v-icon small left>mdi-twitter</v-icon>
							</v-flex>
							<v-flex class="text-xs-right">
								<v-btn v-for="(url, index) in tweet.urls" :key="index" fab small light :href="url" target="_blank">
									<v-icon small>mdi-link</v-icon>
								</v-btn>
							</v-flex>
						</v-layout>
					</v-card-title>
					<v-card-text class="pa-4">
						<h2 class="mb-3 headline">{{ tweet.masked_text }}</h2>
						<span class="">{{ $moment(tweet.created_at).locale('el').format('LLL') }}</span>
					</v-card-text>
				</v-card>
			</v-flex>
			<v-flex xs12 md8 lg4>
				<v-card flat class="pa-5 elevation-0">
					<v-form ref="form">
						<v-container grid-list-md>
							<v-layout wrap class="my-2">
								<p class="font-italic grey--text">Disclaimer: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vehicula sem sed turpis aliquet, at mollis lorem facilisis. Maecenas rutrum justo sem, nec mollis ante accumsan id. Integer in ante quam. Mauris bibendum at lacus non mollis. Suspendisse potenti. Vivamus porta eleifend lacus, ac iaculis ex convallis quis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Ut at nisl tempor ante semper mollis ac et neque. Pellentesque nulla dui, aliquam ac efficitur quis, lobortis et enim. Quisque non venenatis nunc, vel dictum elit.</p>
								<p class="my-1">Σας έχουμε αποστείλει τον 8ψήφιο κωδικό επιβεβαίωσης στο κινητό σας τηλέφωνο <strong>+{{form.mobile}}</strong>. Μη κλείσετε το συγκεκριμένο παράθυρο μέχρι η διαδικασία ολοκληρωθεί.</p>
								<v-flex xs12 class="px-0">
									<v-combobox v-model="form.accountType" :items="accountType" label="Τύπος Λογαριασμού" clearable chips small-chips deletable-chips>
									</v-combobox>
								</v-flex>
							</v-layout>

							<v-layout wrap class="my-2">
								<p class="my-1">Σας έχουμε αποστείλει τον 8ψήφιο κωδικό επιβεβαίωσης στο κινητό σας τηλέφωνο <strong>+{{form.mobile}}</strong>. Μη κλείσετε το συγκεκριμένο παράθυρο μέχρι η διαδικασία ολοκληρωθεί.</p>
								<v-flex xs12 class="px-0">
									<v-combobox v-model="form.politicalOrientation" :items="politicalOrientation" label="Πολιτικός Προσανατολισμός" clearable chips small-chips deletable-chips>
									</v-combobox>
								</v-flex>
							</v-layout>

							<v-layout wrap class="my-2">
								<p class="my-1">Σας έχουμε αποστείλει τον 8ψήφιο κωδικό επιβεβαίωσης στο κινητό σας τηλέφωνο <strong>+{{form.mobile}}</strong>. Μη κλείσετε το συγκεκριμένο παράθυρο μέχρι η διαδικασία ολοκληρωθεί.</p>
								<v-flex xs12 class="px-0">
									<v-combobox v-model="form.context" :items="context" label="Περιεχόμενο" multiple clearable chips small-chips deletable-chips>
									</v-combobox>
								</v-flex>
							</v-layout>

							<v-layout wrap class="my-2">
								<p class="my-1">Σας έχουμε αποστείλει τον 8ψήφιο κωδικό επιβεβαίωσης στο κινητό σας τηλέφωνο <strong>+{{form.mobile}}</strong>. Μη κλείσετε το συγκεκριμένο παράθυρο μέχρι η διαδικασία ολοκληρωθεί.</p>
								<v-flex xs12 class="px-0">
									<v-textarea label="Αιτιολόγιση" v-model="form.note" counter="280" auto-grow required></v-textarea>
								</v-flex>
							</v-layout>

							<div class="text-xs-center">
								<v-btn color="accent" @click="save">
									Αποθηκευση
								</v-btn>
								<v-btn flat color="primary" @click="loadTweet">
									Επομενο
									<v-icon right>mdi-arrow-right</v-icon>
								</v-btn>
							</div>
						</v-container>
					</v-form>
				</v-card>
			</v-flex>
		</v-layout>
	</v-container>
</template>

<script>
export default {
	name: 'classifier',
	data () {
		return {
			name: 'classifier',
			tweet: {
				full_text: '',
				created_at: '',
				media: [],
				urls: []
			},
			form: {
				accountType: '',
				politicalOrientation: '',
				context: '',
				note: ''
			},
			accountType: [
				'Ιδιώτης / Πολίτης',
				'Δημοσιογράφος',
				'Δημοσιογραφικός Οργανισμός',
				'Πολιτικός',
				'Πολιτικό Κόμμα',
				'Πολιτικό Πρόσωπο',
				'Δημόσιο Πρόσωπο',
				'Εμπορικός Λογαργιασμός',
				'Δεν Γνωρίζω / Δεν Απαντώ',
				'Άλλο'
			],
			politicalOrientation: [
				'Εξωκοινοβουλευτική Αριστερά',
				'Αριστερά',
				'Κεντροαριστερά',
				'Κεντροδεξιά',
				'Κέντρο',
				'Δεξιά',
				'Ακροδεξιά',
				'Δεν Γνωρίζω / Δεν Απαντώ',
				'Άλλο'
			],
			context: [
				'Μη Πολιτικό',
				'Παραπολιτικό',
				'Πολιτικό',
				'Προπαγάνδα',
				'Ψευδής Πληροφορίες',
				'Λανθασμένες Πληροφορίες',
				'Ρητορική Μίσους',
				'Δεν Γνωρίζω / Δεν Απαντώ',
				'Άλλο'
			]
		};
	},
	mounted () {
		this.loadTweet();
	},
	methods: {
		loadTweet () {
			this.$http(`${this.$BASE_API}/v2/annotate`)
				.then((res) => {
					this.form = { accountType: '', politicalOrientation: '', context: '', note: '' };
					this.tweet = {
						full_text: res.data.data.full_text,
						masked_text: res.data.data.full_text.replace(/(^|[^@\w])@(\w{1,15})\b/g, ' @...'),
						created_at: res.data.data.created_at,
						media: res.data.data.media,
						urls: res.data.data.urls
					};
				});
		},
		save () {
			if (this.form.accountType === '' &&
				this.form.politicalOrientation === '' &&
				this.form.context === '' &&
				this.form.note === '') {
				this.loadTweet();
				return;
			}

			this.$http.post(`${this.$BASE_API}/v2/annotate`, {
				annotatorIdStr: this.$store.state.account.idStr,
				annotatorScreenName: this.$store.state.account.screenName,
				text: this.tweet.full_text,
				accountType: this.form.accountType,
				politicalOrientation: this.form.politicalOrientation,
				context: this.form.context,
				note: this.form.note,
				media: this.tweet.media,
				urls: this.tweet.urls
			}).then((res) => {
				this.loadTweet();
			});
		}
	}
};
</script>
