<template>
	<v-dialog v-if="user" v-model="dialog" persistent max-width="720px" no-click-animation transition="slide-y-transition">
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
						<v-btn flat color="primary" @click="$parent.dialog = false">Ακυρωση</v-btn>
					</div>
				</v-container>
			</v-form>
		</v-card>
	</v-dialog>
</template>

<script>
export default {
	props: ['user', 'dialog'],
	name: 'classify',
	data () {
		return {
			form: {
				accountType: '',
				politicalOrientation: '',
				context: '',
				message: ''
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
			],
			note: ''
		};
	},
	methods: {
		save () {
			this.$http.post(`${this.$BASE_API}/v2/annotate`, {
				annotatorIdStr: this.$store.state.account.idStr,
				annotatorScreenName: this.$store.state.account.screenName,
				userIdStr: this.user.id_str,
				userScreenName: this.user.screen_name,
				accountType: this.form.accountType,
				politicalOrientation: this.form.politicalOrientation,
				context: this.form.context,
				note: this.form.note
			}).then((res) => {
				this.$parent.dialog = false;
			});
		}

	}
};
</script>

<style lang="less" scopped>
</style>
