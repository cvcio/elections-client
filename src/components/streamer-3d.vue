<template>
	<v-flex>
		<div class="ma-0 pa-0" id="streamer"></div>
	</v-flex>
</template>

<script>
import { nodeColor, linkColor, debounce } from '@/utils/utils';
import ForceGraph3D from '3d-force-graph';
// import { forceCollide } from 'd3';
import { scaleLinear } from 'd3';
import { SphereBufferGeometry, MeshPhongMaterial, Mesh } from 'three';
import { mapState } from 'vuex';

export default {
	name: 'live-streamer-3d',
	props: ['stream', 'animate'],
	data () {
		return {
			name: 'live-streamer',
			graph: null,
			backgroundColor: 'rgba(0,0,0,0)',
			useAvatars: false,
			user: null,
			data: {
				nodes: [],
				links: []
			},
			nodes: 0,
			camera: null,
			MAX: 5,
			NODES: 0
		};
	},
	computed: {
		...mapState(['cachedGraph'])
	},
	watch: {
		animate () {
			if (this.animate) {
				this.resume();
			} else {
				this.pause();
			}
		}
	},
	beforeDestroy () {
		this.destroy();
		this.socket.close();
		if (typeof window !== 'undefined') {
			window.removeEventListener('resize', this.handleResize, { passive: false });
		}
	},
	mounted () {
		this.socket = new WebSocket(this.$SOCKET);

		this.socket.onopen = this.onopen;
		this.socket.onmessage = this.onmessage;
		this.socket.onclose = this.onclose;

		this.draw();
	},
	methods: {
		onopen () {
			console.info('Socket Conecction Open');
		},
		onmessage (data) {
			if (this.stream) {
				let tweet = JSON.parse(data.data);

				let networkData = this.getNetworkData(tweet);
				if (networkData.nodes.length > 0 || networkData.links.length > 0) {
					debounce(this.addNodes(networkData, 250));
				}
			}
		},
		onclose () {
			console.info('Socket Conecction Closed');
		},
		node (t, type) {
			let scale = scaleLinear().domain([0, 250]).range([2, 16]);
			let size = scale(t.metrics.actions); // scale(this.countEdges(t.id));
			size = Math.min(size, 32);
			t.user_class = t.metrics.dates < 120 ? 'NEW' : t.user_class;
			t.user_class_score = t.metrics.dates < 120 ? 1 : t.user_class_score;
			return {
				id: t.id,
				label: `
				<div class="node elevation-2">
					<div class="v-avatar grey" style="height: 36px; width: 36px;">
						<img src="${t.profile_image_url_https}" alt="DP">
					</div>
					<span class="node-label"><span class="grey--text">@</span><span class="font-weight-bold">${t.screen_name}</span></span>
				</div>
				`,
				color: nodeColor(t.user_class),
				avatar: t.profile_image_url_https,
				type: type || 'tweet',
				size: size,
				t
			};
		},
		existsNode (node) {
			// eslint-disable-next-line
			let { nodes, links } = this.graph.graphData();
			return nodes.some(n => n.id === node);
		},
		existsLink (node) {
			// eslint-disable-next-line
			let { nodes, links } = this.graph.graphData();
			links = links.filter(l => l.source === node || l.target === node);
			return links.some(l => l.source === node || l.target === node);
		},
		getNetworkData (t) {
			let nodes = [];
			let links = [];

			if (!this.existsNode(t.id)) {
				nodes.push(this.node(t));
			}

			if (t.quoted_status) {
				if (!this.existsNode(t.quoted_status.id)) {
					nodes.push(this.node(t.quoted_status, 'quote'));
				}

				if (!this.existsLink(t.quoted_status.id)) {
					links.push({
						target: t.quoted_status.id,
						source: t.id,
						color: linkColor('quote')
					});
				}
			}
			if (t.retweeted_status) {
				if (!this.existsNode(t.retweeted_status.id)) {
					nodes.push(this.node(t.retweeted_status, 'retweet'));
				}

				if (!this.existsLink(t.retweeted_status.id)) {
					links.push({
						target: t.retweeted_status.id,
						source: t.id,
						color: linkColor('retweet')
					});
				}
			}
			return { nodes, links };
		},
		destroy () {
			this.$parent.user = null;
			if (this.graph) {
				this.graph.graphData({ nodes: [], links: [] });
				this.graph.renderer().forceContextLoss();
				this.graph.scene = null;
				this.graph.camera = null;
				this.graph = null;
			}
		},
		handleResize () {
			/*
			if (this.graph.camera()) {
				this.graph.camera().aspect = window.innerWidth / window.innerHeight;
				this.graph.camera().updateProjectionMatrix();
			}
			if (this.graph.renderer()) {
				this.graph.renderer().setSize(window.innerWidth, window.innerHeight);
			}
			if (this.graph) {
				this.graph.refresh();
			}
			*/
			let needsRestart = this.stream;

			if (this.graph) {
				this.$parent.stream = false;
				window.removeEventListener('resize', this.handleResize, { passive: false });

				let { nodes, links } = this.graph.graphData();
				this.data = { nodes, links };
				this.draw();
				this.$parent.stream = needsRestart;
			}
		},
		draw () {
			this.destroy();
			let canvas = document.getElementById('streamer');

			this.graph = ForceGraph3D({
				rendererConfig: {
					antialias: true,
					alpha: true,
					powerPreference: 'high-performance',
					precision: 'lowp'
				}
			})(canvas)
				.nodeRelSize(16)
				.nodeLabel('label')
				.nodeId('id')
				.nodeVal('size')
				.nodeThreeObject(this.newSphere)
				.enableNodeDrag(false)
				.onNodeClick(node => {
					this.$store.commit('setSelectedUser', node.t);
					const distance = 350;
					const distRatio = 1 + distance / Math.hypot(node.x, node.y, node.z);
					this.graph.cameraPosition({
						x: node.x * distRatio,
						y: node.y * distRatio,
						z: -node.z * distRatio
					}, node, 750);
				})
				.onNodeHover(node => {
					canvas.style.cursor = node ? 'pointer' : null;
				})
				.linkOpacity(0.8)
				.linkSource('source')
				.linkTarget('target')
				// .linkDirectionalParticles(1)
        		// .linkDirectionalParticleWidth(1)
				// .linkDirectionalParticleSpeed(0.06)
				.linkWidth(4)
				.linkCurvature(0.02)
				// .d3VelocityDecay(0.3)
				// .warmupTicks(2)
				// .cooldownTime(30000)
				.showNavInfo(false)
				.cameraPosition({ z: 2000 })
				.width(window.innerWidth)
				.height(window.innerHeight)
				.backgroundColor(this.backgroundColor)
				.graphData(this.cachedGraph);
			/*
			this.graph.d3Force('collision', forceCollide(node => Math.cbrt(node.size) * 2));
			this.graph.d3Force('link').distance((link) => {
				return Math.ceil(link.source.size + link.target.size) * 2;
			});
			this.graph.d3Force('charge').strength(-36).theta(0.2);
			*/
			window.addEventListener('resize', this.handleResize, { passive: false });
		},

		newSphere (m) {
			let scale = scaleLinear().domain([2, 16]).range([8, 24]);
			let segments = Math.ceil(scale(m.size));
			let sphere = new SphereBufferGeometry(m.size, segments, segments);
			let sphereMaterial = new MeshPhongMaterial({
				color: m.color,
				reflectivity: 0.8
			});

			let sphereMesh = new Mesh(sphere, sphereMaterial);
			return sphereMesh;
		},
		addNodes (data) {
			if (!this.graph || !this.graph.graphData()) return;
			let { nodes, links } = this.graph.graphData();

			if (this.NODES > this.MAX) {

			} else {

			}

			this.graph.graphData({
				nodes: [...nodes, ...data.nodes],
				links: [...links, ...data.links]
			});

			this.NODES = nodes.length + data.nodes.length;
		},
		removeNode (node) {
			if (!this.graph || !this.graph.graphData()) return;
			let { nodes, links } = this.graph.graphData();
			links = links.filter(l => l.source !== node && l.target !== node);
			nodes.splice(node.id, 1);
			// nodes.forEach((n, idx) => { n.id = idx; });
			this.graph.graphData({ nodes, links });
		},
		pause () {
			if (!this.graph || !this.graph.graphData()) return;
			this.graph.pauseAnimation();
		},
		resume () {
			if (!this.graph || !this.graph.graphData()) return;
			this.graph.resumeAnimation();
			// Re-heat simulation
			this.graph.numDimensions(3);
		},
		clear () {
			this.graph.graphData({ nodes: [], links: [] });
		},
		recenter () {
			if (!this.graph || !this.graph.graphData()) return;
			this.graph.cameraPosition({
				x: 0,
				y: 0,
				z: 2000
			});
		},
		saveGraph (cb) {
			let { nodes, links } = this.graph.graphData();
			this.$store.commit('saveGraph', { nodes, links });
			return cb();
		}
	}
};
</script>

<style lang="less">
#streamer {
	margin: 0;
	padding: 0;
	position: fixed;
	width: 100%;
	height: 100%;
	background: #fafafa;
	top: 0;
	left: 0;
}
.node {
	border: 2px solid white;
	background-color: white;
	border-radius: 36px;
	white-space: nowrap;
	.node-label {
		text-align: center;
		color: black !important;
		font-family: 'Roboto', Sans-serif !important;
		padding: 0 12px 0 2px;
		span {
			position: relative;
			top: 1px;
		}
	}
}

</style>
