<template>
	<v-container fill-height :fluid="!$store.state.isIntro">
		<v-layout :align-center="$store.state.isIntro">
			<live-introduction v-if="$store.state.isIntro" class="live-introduction"></live-introduction>

			<live-streamer-2d v-if="!three" class="live-streamer" :stream="stream" :animate="animate" ref="streamer"></live-streamer-2d>
			<live-streamer-3d v-else class="live-streamer" :stream="stream" :animate="animate" ref="streamer"></live-streamer-3d>

			<user id="user" v-if="!$store.state.isIntro" class="mt-0"></user>

			<v-flex align-center justify-center>
			<v-card color="" v-if="legend" class="legend" width="380px">
				<v-flex class="text-xs-right ma-2">
					<v-btn fab small class="ma-0 elevation-1" @click="legend = false">
						<v-icon>mdi-close</v-icon>
					</v-btn>
				</v-flex>
				<v-card-title primary-title>
					<h3>Τί είναι αυτό που βλέπω;</h3>
				</v-card-title>
				<v-card-text class="">
					<v-layout row>
						<v-flex xs12>
							<p class="caption">Το γράφημα ή ο γράφος περιγράφει πως διαδίδεται ένα tweet - αναφορά για να διαμορφώσει πληροφορίες και ως εκ τούτου να επηρεάσει την κοινή γνώμη.</p>
							<p class="caption">Οι χρήστες ταξινομούνται σύμφωνα με συγκεκριμενα χαρακτηριστικά: αριθμός Followers, Following, Statuses, Favourites, Public Lists, Followers / Following, Statuses / Favourites και κάνοντας χρήση αυτοματοποιημένων διαδικασιών / αλγορίθμων.</p>
							<p class="caption">Το μέγεθος κάθε κόμβου εξαρτάται από τον αριθμό των διαδράσεων ανα ημέρα, ενώ χρώματιζεται ανάλογα από τον χαρακτηρισμό που του έχει δοθεί αυτόματα από τον αλγόριθμο. Τελος το χρώμα το δεσμού εξαρτάται από τον τύπο της διάδρασης: <span class="retweet">Retweet</span>, <span class="quote">Quote</span>.</p>
							<p class="caption">Μπορείτε να χρησιμοποιήσετε το ποντίκι σας για να κάνετε zoom-in, zoom-out και να μετακινήσετε το γράφημα.</p>
						</v-flex>
					</v-layout>
					<v-layout row>
						<v-flex>
							<v-icon size="4" color="grey">mdi-checkbox-blank-circle</v-icon>
							<v-icon size="12" color="grey">mdi-checkbox-blank-circle</v-icon>
							<v-icon size="24" color="grey">mdi-checkbox-blank-circle</v-icon>
							<span class="ml-1" style="position:relative;top:-4px;">ACTIONS / DAY</span>
						</v-flex>
						<v-flex>
							<v-tooltip top>
								<template v-slot:activator="{ on }">
									<v-icon size="24" :color="nodeColor('INFLUENCER')" v-on="on">mdi-checkbox-blank-circle</v-icon>
								</template>
								<span>INFLUENCER</span>
							</v-tooltip>

							<v-tooltip top>
								<template v-slot:activator="{ on }">
									<v-icon size="24" :color="nodeColor('ACTIVE')" v-on="on">mdi-checkbox-blank-circle</v-icon>
								</template>
								<span>ACTIVE</span>
							</v-tooltip>

							<v-tooltip top>
								<template v-slot:activator="{ on }">
									<v-icon size="24" :color="nodeColor('AMPLIFIER')" v-on="on">mdi-checkbox-blank-circle</v-icon>
								</template>
								<span>AMPLIFIER</span>
							</v-tooltip>

							<v-tooltip top>
								<template v-slot:activator="{ on }">
									<v-icon size="24" :color="nodeColor('NEW')" v-on="on">mdi-checkbox-blank-circle</v-icon>
								</template>
								<span>NEW</span>
							</v-tooltip>

							<v-tooltip top>
								<template v-slot:activator="{ on }">
									<v-icon size="24" :color="nodeColor('UNKNOWN')" v-on="on">mdi-checkbox-blank-circle</v-icon>
								</template>
								<span>UNKNOWN</span>
							</v-tooltip>
							<span class="ml-1" style="position:relative;top:-4px;">LABEL</span>
						</v-flex>
					</v-layout>
			</v-card-text>
	        </v-card>
		</v-flex>

			<v-layout class="view-actions pa-0 ma-0" v-if="!$store.state.isIntro" column fill-height align-center justify-center>
				<v-tooltip left>
					<template v-slot:activator="{ on }">
						<v-btn
							@click="toggle3D"
							:color="three ? 'secondary lighten-2' : 'secondary'"
							fab
							dark
							small
							class="mx-2" v-on="on">
							<v-icon>{{ three ? 'mdi-numeric-2-box' : 'mdi-numeric-3-box'}}</v-icon>
						</v-btn>
					</template>
					<span>View in {{ three ? '2D' : '3D (Experimental)'}}</span>
				</v-tooltip>
				<v-divider class="short-divider my-3 grey lighten-1"></v-divider>
				<v-tooltip left>
					<template v-slot:activator="{ on }">
						<v-btn
							@click="stream = !stream;"
							:color="stream ? 'secondary lighten-2' : 'secondary'"
							fab
							dark
							small
							class="mx-2" v-on="on">
							<v-icon>{{!stream ? 'mdi-play' : 'mdi-stop'}}</v-icon>
						</v-btn>
					</template>
					<span>{{!stream ? 'Start' : 'Stop'}} Streaming</span>
				</v-tooltip>
				<v-tooltip left>
					<template v-slot:activator="{ on }">
						<v-btn
							@click="animate = !animate;"
							:color="animate ? 'secondary lighten-2' : 'secondary'"
							fab
							dark
							small
							class="mx-2" v-on="on">
							<v-icon>{{!animate ? 'mdi-axis' : 'mdi-axis-lock'}}</v-icon>
						</v-btn>
					</template>
					<span>{{!animate ? 'Unlock' : 'Lock'}} Animation</span>
				</v-tooltip>
				<v-tooltip left>
					<template v-slot:activator="{ on }">
						<v-btn
							@click="$refs.streamer.recenter"
							color="secondary lighten-2"
							fab
							dark
							small
							class="mx-2" v-on="on">
							<v-icon>mdi-image-filter-center-focus</v-icon>
						</v-btn>
					</template>
					<span>Reset Camera Position</span>
				</v-tooltip>
				<v-tooltip left>
					<template v-slot:activator="{ on }">
						<v-btn
							@click="$store.commit('setFullscreen', !$store.state.fullscreen)"
							:color="!$store.state.fullscreen ? 'secondary lighten-2' : 'secondary'"
							fab
							dark
							small
							class="mx-2" v-on="on">
							<v-icon>{{$store.state.fullscreen ? 'mdi-fullscreen-exit' : 'mdi-fullscreen'}}</v-icon>
						</v-btn>
					</template>
					<span>Presentation Mode</span>
				</v-tooltip>
				<v-divider class="short-divider my-3 grey lighten-1"></v-divider>
				<v-tooltip left>
					<template v-slot:activator="{ on }">
						<v-btn
							@click="$refs.streamer.clear()"
							color="primary lighten-1"
							fab
							dark
							small
							class="mx-2" v-on="on">
							<v-icon>mdi-delete-outline</v-icon>
						</v-btn>
					</template>
					<span>Clear Network</span>
				</v-tooltip>
				<v-divider class="short-divider my-3 grey lighten-1"></v-divider>
				<v-tooltip left>
					<template v-slot:activator="{ on }">
						<v-btn
							class="mx-2"
							dark
							fab
							small
							color="secondary"
							@click="legend = true"  v-on="on">
						  <v-icon>mdi-information</v-icon>
						</v-btn>
					</template>
					<span>Open Legend</span>
				</v-tooltip>
			</v-layout>
		</v-layout>
	</v-container>
</template>

<script>
import { nodeColor, linkColor } from '@/utils/utils';

export default {
	name: 'live',
	data () {
		return {
			name: 'live',
			stream: true,
			reset: true,
			fullscreen: false,
			animate: true,
			user: null,
			three: false,
			legend: true
		};
	},
	beforeRouteLeave (to, from, next) {
		this.$refs.streamer.saveGraph(next);
	},
	components: {
		'live-introduction': require('@/components/introduction').default,
		'live-streamer-2d': require('@/components/streamer-2d').default,
		'live-streamer-3d': require('@/components/streamer-3d').default,
		'user': require('@/components/user').default
	},
	methods: {
		toggle3D () {
			this.$refs.streamer.saveGraph(() => {
				this.three = !this.three;
			});
		},
		linkColor,
		nodeColor
	}
};
</script>

<style lang="less">
.live-introduction {
	z-index: 1;
}
.live-streamer {
	z-index: 0;
}
.view-actions {
	position: absolute;
	width: 48px;
	right: 24px;
}
#streamer {
	background: #fafafa; /* Old browsers */
	background: -moz-linear-gradient(#fafafa 0%, #fafafa 60%, #d0d0d0 100%);
	background: -webkit-linear-gradient(#fafafa 0%, #fafafa 60%, #d0d0d0 100%);
	background: linear-gradient(#fafafa 0%, #fafafa 60%, #d0d0d0 100%);
}
.legend {
	position: absolute;
	bottom: 48px;
	right: 24px;
	margin-bottom: -72px;
	z-index: 2;
	// position: relative;
	// top: 50%;
	// transform: translate(0, -50%);
}
.retweet {
	color: #76ff03;
}
.quote {
	color: #F4511E;
}
</style>
