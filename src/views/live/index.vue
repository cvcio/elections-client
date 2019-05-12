<template>
	<v-container fill-height>
		<v-layout align-center>
			<live-introduction class="live-introductionr"></live-introduction>
			<live-streamer class="live-streamer"></live-streamer>
		</v-layout>
	</v-container>
</template>

<script>
export default {
	name: 'live',
	data () {
		return {
			name: 'live'
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
</style>
