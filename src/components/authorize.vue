<template>
	<v-dialog v-if="!isUser" v-model="authorize" persistent max-width="640px" no-click-animation transition="slide-y-transition">
		<v-card flat class="elevation-0">
			<v-stepper v-model="step" class="elevation-0">
				<v-stepper-header>
					<v-stepper-step :complete="step > 1" step="1">Εξουσιοδότηση Λογαριασμού</v-stepper-step>
					<v-divider></v-divider>
					<v-stepper-step :complete="step > 2" step="2">Δημιουργία Προφίλ</v-stepper-step>
					<v-divider></v-divider>
					<v-stepper-step :complete="step > 3" step="3">Επιβεβαίωση</v-stepper-step>
				</v-stepper-header>
				<v-stepper-items>
					<v-stepper-content completed step="1" class="pa-4">
						<v-container grid-list-md>
							<v-layout wrap>
								<v-flex xs12>
									<h4 class="">MediaWatch Ευρωεκλογές 2019 &mdash; Αίτημα πρόσβασης</h4>
									<p class="my-3">Η συγκεκριμένη λειτουργία της πλατφόρμας απευθύνεται <strong>μόνο</strong> σε Δημοσιογράφους. Παρακαλούμε πριν συνεχίσετε βεβαιωθείτε ότι διαβάσατε τους <router-link to="/legal">Όρους Χρήσης</router-link> καθώς και τον <router-link to="/legal">Κώδικα Ηθικής</router-link> τους οποίους θα κληθείτε να αποδεχθείτε στο επόμενο στάδιο.</p>
									<div class="text-xs-center">
										<v-btn color="#38A1F3" dark :href="this.$BASE_API + '/api/auth/twitter'">
											<v-icon left dark>mdi-twitter</v-icon>
											Αιτημα προσβασης
										</v-btn>
										<v-btn flat @click="authorize = false">Ακυρωση</v-btn>
									</div>
								</v-flex>
							</v-layout>
						</v-container>
					</v-stepper-content>

					<v-stepper-content step="2" class="pa-4">
						<v-form ref="formProfile">
							<v-container grid-list-md>
								<v-layout wrap>
									<v-flex xs12>
										<h4 class="my-1">Προσωπικά Στοιχεία</h4>
									</v-flex>
									<v-flex xs12>
										<v-text-field label="Λογαργιασμός Twitter"

											disabled
											v-model="form.screenName"
											prefix="@"></v-text-field>
									</v-flex>

									<v-flex xs12 sm6>
										<v-text-field  label="Όνομα" :rules="[rules.required]" v-model="form.firstName" required></v-text-field>
									</v-flex>

									<v-flex xs12 sm6>
										<v-text-field  label="Επίθετο" :rules="[rules.required]" v-model="form.lastName" required></v-text-field>
									</v-flex>

									<v-flex xs12 sm6>
										<v-text-field  label="Email" :rules="[rules.required, rules.email]" v-model="form.email" required></v-text-field>
									</v-flex>

									<v-flex xs12 sm6>
										<v-text-field  label="Κινητό Τηλέφωνο" :rules="[rules.required, rules.mobile]" v-model="form.mobile" :mask="mobile" value="+30" required></v-text-field>
									</v-flex>

									<v-flex xs12>
										<v-text-field  label="Τίτλος Επαγγέλματος" :rules="[rules.required]" v-model="form.profession" required></v-text-field>
									</v-flex>

									<v-flex xs12>
										<v-switch  :label="`Εκπροσωπείτε κάποιον δημοσιογραφικό οργανισμό (${form.org ? 'Ναί' : 'Όχι'})?`" :rules="[rules.required]" v-model="form.org"></v-switch>
									</v-flex>

									<v-flex v-if="form.org" xs12 class="">
										<v-layout row wrap>
											<v-flex xs12>
												<h4 class="my-1 mt-3">Δημοσιογραφικός Οργανισμός</h4>
											</v-flex>
											<v-flex xs12 sm6>
												<v-text-field  label="Όνομα Οργανισμού" :rules="!form.org ? [] : [rules.required]" v-model="form.orgname" required></v-text-field>
											</v-flex>
											<v-flex xs12 sm6>
												<v-text-field  label="URL" :rules="!form.org ? [] : [rules.required, rules.url]" v-model="form.orgurl" required></v-text-field>
											</v-flex>
											<v-flex xs12>
												<h4 class="my-1 mt-3">Στοιχεία Επικοινωνίας Υπεύθυνου</h4>
											</v-flex>
											<v-flex xs12 sm6>
												<v-text-field  label="Όνομα" :rules="!form.org ? [] : [rules.required]" v-model="form.orgfirstName" required></v-text-field>
											</v-flex>

											<v-flex xs12 sm6>
												<v-text-field  label="Επίθετο" :rules="!form.org ? [] : [rules.required]" v-model="form.orglastName" required></v-text-field>
											</v-flex>

											<v-flex xs12 sm6>
												<v-text-field  label="Email" :rules="!form.org ? [] : [rules.required, rules.email]" v-model="form.orgemail" required></v-text-field>
											</v-flex>
											<v-flex xs12 sm6>
												<v-text-field  label="Κινητό Τηλέφωνο" :rules="!form.org ? [] : [rules.required, rules.mobile]" v-model="form.orgmobile" :mask="mobile" value="+30" required></v-text-field>
											</v-flex>
										</v-layout>
									</v-flex>

									<v-flex xs12>
										<v-checkbox v-model="form.terms">
											<template v-slot:label>
												<div @click.stop="">
													Αποδέχεστε τους
													<a href="/legal" target="_blank">Όρους Χρήσης</a>
													και τον
													<a href="/legal" target="_blank">Κώδικα Ηθικής</a>?
												</div>
											</template>
										</v-checkbox>
									</v-flex>
								</v-layout>
								<div class="text-xs-center">
									<v-btn color="accent" :disabled="!form.terms" @click="create">
										Δημιουργια Προφιλ
									</v-btn>
									<v-btn flat @click="authorize = false">Ακυρωση</v-btn>
								</div>
							</v-container>
						</v-form>
					</v-stepper-content>

					<v-stepper-content step="3" class="pa-4">
						<v-form ref="formVerify">
							<v-container grid-list-md>
								<v-layout wrap>
									<h4 class="">Επιβεβαίωση Λογαριασμού</h4>
									<p class="my-3">Σας έχουμε αποστείλει τον 8ψήφιο κωδικό επιβεβαίωσης στο κινητό σας τηλέφωνο <strong>+{{form.mobile}}</strong>. Μη κλείσετε το συγκεκριμένο παράθυρο μέχρι η διαδικασία ολοκληρωθεί.</p>
									<v-flex xs12>
										<v-text-field label="Κωδικός Επιβεβαίωσης"
											v-model="form.pin" mask="AAAAAAAA" required></v-text-field>
									</v-flex>
								</v-layout>
								<div class="text-xs-center">
									<v-btn color="accent" @click="verify">
										Επιβεβαιωση
									</v-btn>
									<v-btn flat color="primary" :disabled="form.pin !== ''" @click="sendPin">Αποστολη Κωδικου</v-btn>
								</div>
							</v-container>
						</v-form>
					</v-stepper-content>
				</v-stepper-items>
			</v-stepper>
		</v-card>
	</v-dialog>
</template>

<script>
export default {
	name: 'authorize',
	props: ['urlParams'],
	data () {
		return {
			authorize: false,
			step: 1,
			mobile: '+## #### ### ###',
			form: {
				idStr: '',
				userId: '',
				screenName: '',
				firstName: '',
				lastName: '',
				email: '',
				mobile: '+30',
				profession: '',
				orgname: '',
				orgurl: 'https://',
				orgfirstName: '',
				orglastName: '',
				orgemail: '',
				orgmobile: '+30',
				terms: false,
				org: false,
				pin: ''
			},
			rules: {
				required: value => value !== '' || 'Value required',
				mobile: value => value.length === 12 || 'Mobile must be valid',
				url: value => /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi.test(value) || 'URL must be valid',
				email: value => /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value.toLowerCase()) || 'E-mail must be valid'
			}
		};
	},
	computed: {
		isUser () {
			return this.$store.state.isAuthenticated;
		},
		error () {
			return this.$store.state.error;
		}
	},
	created () {
		const urlParams = new URLSearchParams(this.urlParams);
		if (urlParams &&
				urlParams.get('method') === 'authorize') {
			this.authorize = true;
			this.step = 1;
			this.$router.push('/');
		}
		if (urlParams &&
				urlParams.get('provider') === 'email' &&
				urlParams.get('method') === 'invite' &&
				urlParams.get('email')) {
			this.authorize = true;
			this.step = 1;
			this.$router.push('/');
		}
		if (urlParams &&
				urlParams.get('provider') === 'twitter' &&
				urlParams.get('method') === 'create' &&
				urlParams.get('idStr') !== '' &&
				urlParams.get('screenName') !== '' &&
				urlParams.get('twitterId') !== '') {
			this.authorize = true;
			this.step = 2;
			this.form.userId = urlParams.get('twitterId');
			this.form.screenName = urlParams.get('screenName');
			this.form.idStr = urlParams.get('idStr');
			this.$router.push('/');
		}
		if (urlParams &&
				urlParams.get('provider') === 'twitter' &&
				urlParams.get('method') === 'verify' &&
				urlParams.get('idStr') !== '' &&
				urlParams.get('mobile') !== '') {
			this.authorize = true;
			this.step = 3;
			this.form.idStr = urlParams.get('idStr');
			this.form.mobile = urlParams.get('mobile');
			this.$router.push('/');
		}
		if (urlParams &&
				urlParams.get('provider') === 'twitter' &&
				urlParams.get('method') === 'login' &&
				urlParams.get('idStr') !== '' &&
				urlParams.get('twitterAccessToken') !== '') {
			this.login({
				idStr: urlParams.get('idStr'),
				twitterAccessToken: urlParams.get('twitterAccessToken')
			});
		}
	},
	methods: {
		cancel () {},
		login (playload) {
			this.$http.post(`/v2/users/token`, playload)
				.then((res) => {
					if (res.data.data.status !== 'active') {
						this.$store.commit('addError', {
							context: 'info',
							snackbar: true,
							text: 'Ο λογαριασμός δεν είναι διαθέσιμος μέχρι να επιβεβαιώσουμε τα στοιχεία σας'
						});
						return;
					}
					window.localStorage.setItem('account', JSON.stringify(res.data.data));
					this.$store.commit('setAuth');
					this.authorize = false;
					this.$router.push('/');
				});
		},
		create () {
			this.form.status = 'create';
			if (this.$refs.formProfile.validate()) {
				this.$http.post(`/v2/users`, this.form)
					.then((res) => {
						this.$store.commit('addError', {
							context: 'info',
							snackbar: true,
							text: 'Ελέγξτε το κινητό σας για τον κωδικό επιβεβαίωσης'
						});
						this.step = 3;
					});
			}
		},
		verify () {
			if (this.$refs.formVerify.validate()) {
				this.$http.post(`/v2/users/verify`, {
					pin: this.form.pin,
					idStr: this.form.idStr
				})
					.then((res) => {
						this.login({
							idStr: res.data.data.idStr,
							twitterAccessToken: res.data.data.twitterAccessToken
						});
						this.authorize = false;
					});
			}
		},
		sendPin () {
			if (this.$refs.formVerify.validate()) {
				this.$http.post(`/v2/users/2fa`, {
					idStr: this.form.idStr
				})
					.then((res) => {
						this.$store.commit('addError', {
							context: 'info',
							snackbar: true,
							text: 'Ο νέος κωδικός εστάλη'
						});
					});
			}
		}
	}
};
</script>

<style lang="less" scopped>
</style>
