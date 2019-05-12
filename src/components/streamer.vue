<template>
	<canvas class="" id="streamer">

	</canvas>
</template>

<script>
export default {
	name: 'live-streamer',
	data () {
		return {
			name: 'live-streamer'
		};
	},
	components: {},
	mounted () {
		var canvas = document.getElementById('streamer');
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;

		var ctx = canvas.getContext('2d');
		ctx.font = '12px Roboto';
		ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
		ctx.textAlign = 'center';
		ctx.fillText('CANVAS', canvas.width / 2, canvas.height / 2);
	},
	methods: {}
};
</script>

<style lang="less">
#streamer {
	position: fixed;
	width: 100%;
	height: 100%;
	background: #fafafa;
	top: 0;
	left: 0;
	display: block;
}
</style>
