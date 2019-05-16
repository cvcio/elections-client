<template>
	<v-container fill-height fluid>
		<v-layout :align-center="$store.state.isIntro">
			<live-introduction class="live-introductionr"></live-introduction>
			<live-streamer class="live-streamer" :stream="stream" :animate="animate" ref="streamer"></live-streamer>

			<v-layout class="view-actions pa-0 ma-0" v-if="!$store.state.isIntro" column fill-height align-center justify-center>
				<v-tooltip bottom>
					<template v-slot:activator="{ on }">
						<v-btn
							@click="stream = !stream;"
							:color="stream ? 'secondary lighten-1' : 'primary'"
							fab
							dark
							small
							class="mx-2" v-on="on">
							<v-icon>{{!stream ? 'mdi-play' : 'mdi-stop'}}</v-icon>
						</v-btn>
					</template>
					<span>{{!stream ? 'Start' : 'Stop'}} Streaming</span>
				</v-tooltip>
				<v-tooltip bottom>
					<template v-slot:activator="{ on }">
						<v-btn
							@click="animate = !animate;"
							:color="animate ? 'secondary lighten-1' : 'primary'"
							fab
							dark
							small
							class="mx-2" v-on="on">
							<v-icon>{{!animate ? 'mdi-axis' : 'mdi-axis-lock'}}</v-icon>
						</v-btn>
					</template>
					<span>{{!animate ? 'Unlock' : 'Lock'}} Animation</span>
				</v-tooltip>
				<v-tooltip bottom>
					<template v-slot:activator="{ on }">
						<v-btn
							@click="$refs.streamer.recenter"
							color="secondary lighten-1"
							fab
							dark
							small
							class="mx-2" v-on="on">
							<v-icon>mdi-camera-control</v-icon>
						</v-btn>
					</template>
					<span>Reset Camera Position</span>
				</v-tooltip>
				<v-tooltip bottom>
					<template v-slot:activator="{ on }">
						<v-btn
							@click="$refs.streamer.clear()"
							color="secondary lighten-1"
							fab
							dark
							small
							class="mx-2" v-on="on">
							<v-icon>mdi-refresh</v-icon>
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
			animate: true
		};
	},
	components: {
		'live-introduction': require('@/components/introduction').default,
		'live-streamer': require('@/components/streamer').default
	}
};
</script>

<style lang="less">
.live-introductionr {
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
</style>
