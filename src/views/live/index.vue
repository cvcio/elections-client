<template>
	<v-container fill-height :fluid="!$store.state.isIntro">
		<v-layout :align-center="$store.state.isIntro">
			<live-introduction v-if="$store.state.isIntro" class="live-introduction"></live-introduction>

			<live-streamer-2d v-if="!three" class="live-streamer" :stream="stream" :animate="animate" ref="streamer"></live-streamer-2d>
			<live-streamer-3d v-else class="live-streamer" :stream="stream" :animate="animate" ref="streamer"></live-streamer-3d>

			<user id="user" v-if="!$store.state.isIntro" class="mt-0"></user>

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
							<v-icon>mdi-camera-control</v-icon>
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
			</v-layout>
		</v-layout>
	</v-container>
</template>

<script>
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
			three: false
		};
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
		}
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
</style>
