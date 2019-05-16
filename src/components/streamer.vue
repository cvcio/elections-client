<template>
	<v-flex>
		<div class="ma-0 pa-0" id="streamer"></div>
		<user id="user" :user="user" v-if="user" class="mt-4"></user>
	</v-flex>
</template>

<script>
import { debounce } from '@/utils/utils';
import ForceGraph3D from '3d-force-graph';
import { forceCollide, forceCenter, forceManyBody, scaleLinear } from 'd3';
import { SpotLight, SphereBufferGeometry, MeshPhysicalMaterial, Mesh, TextureLoader, SpriteMaterial, Sprite } from 'three';

export default {
	name: 'live-streamer',
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
			camera: null
		};
	},
	components: {
		'user': require('@/components/user').default
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
		this.socket = new WebSocket('ws://localhost:8000/v2/ws');

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
				color: this.nodeColor(t.user_class),
				avatar: t.profile_image_url_https,
				type: type || 'tweet',
				size: size,
				t
			};
		},
		exists (node) {
			// eslint-disable-next-line
			let { nodes, links } = this.graph.graphData();
			return nodes.some(n => n.id === node);
		},
		countEdges (node) {
			// eslint-disable-next-line
			let { nodes, links } = this.graph.graphData();
			links = links.filter(l => l.source === node || l.target === node);
			return links.length || 1;
		},
		getNetworkData (t) {
			let nodes = [];
			let links = [];

			if (!this.exists(t.id)) {
				nodes.push(this.node(t));
			}

			if (t.quoted_status) {
				if (!this.exists(t.quoted_status.id)) {
					nodes.push(this.node(t.quoted_status, 'quote'));
				}

				links.push({
					source: t.quoted_status.id,
					target: t.id,
					color: this.linkColor('quote')
				});
			}
			if (t.retweeted_status) {
				if (!this.exists(t.retweeted_status.id)) {
					nodes.push(this.node(t.retweeted_status, 'retweet'));
				}

				links.push({
					source: t.retweeted_status.id,
					target: t.id,
					color: this.linkColor('retweet')
				});
			}
			return { nodes, links };
		},
		destroy () {
			if (this.graph !== null && this.graph.graphData()) {
				this.graph.graphData({ nodes: [], links: [] });
				this.graph.renderer().forceContextLoss();
				this.graph.scene = null;
				this.graph.camera = null;
				this.graph = null;
			}
		},
		handleResize () {
			if (this.graph.camera()) {
				this.graph.camera().aspect = window.innerWidth / window.innerHeight;
				this.graph.camera().updateProjectionMatrix();
			}
			if (this.graph.renderer()) {
				this.graph.renderer().setSize(window.innerWidth, window.innerHeight);
			}
		},
		draw () {
			this.destroy();
			let canvas = document.getElementById('streamer');

			let highlightNodes = [];
			let highlightLink = null;

			this.graph = ForceGraph3D({
				rendererConfig: {
					antialias: true,
					alpha: true,
					powerPreference: 'high-performance'
				}
			})(canvas)
				.forceEngine('d3')
				.nodeLabel('label')
				.nodeId('id')
				.nodeVal('size')
				.nodeOpacity(1)
				.nodeThreeObject(this.newSphere)
				.enableNodeDrag(false)
				.nodeColor(node => highlightNodes.indexOf(node) === -1 ? 'rgba(0,255,255,0.6)' : 'rgb(255,0,0,1)')
				.onNodeClick(node => {
					this.user = node.t;
					const distance = 350;
					const distRatio = 1 + distance / Math.hypot(node.x, node.y, node.z);
					this.graph.cameraPosition({
						x: node.x * distRatio,
						y: node.y * distRatio,
						z: node.z * distRatio
					}, node, 500);
				})
				.onNodeHover(node => {
					canvas.style.cursor = node ? 'pointer' : null;
					if ((!node && !highlightNodes.length) || (highlightNodes.length === 1 && highlightNodes[0] === node)) return;
          			highlightNodes = node ? [node] : [];
					// update geometry
				})
				.onLinkHover(link => {
					canvas.style.cursor = link ? 'pointer' : null;
					if (highlightLink === link) return;
					highlightLink = link;
					highlightNodes = link ? [link.source, link.target] : [];
					// update geometry
				})

				.linkOpacity(0.8)
				.linkDirectionalParticles(link => link === highlightLink ? 4 : 1)
        		.linkDirectionalParticleWidth(1)
				.linkDirectionalParticleSpeed(0.06)
				.linkWidth(0)
				.linkCurvature(0.02)
				// .d3VelocityDecay(0.3)
				// .warmupTicks(0)
				.cooldownTime(30000)
				.showNavInfo(false)
				.cameraPosition({ z: 2000 })
				.width(window.innerWidth)
				.height(window.innerHeight)
				.backgroundColor(this.backgroundColor)
				.graphData(this.data);

			this.graph.d3Force('collision', forceCollide(node => Math.cbrt(node.size) * 2));
			this.graph.d3Force('link').distance((link) => {
				return Math.ceil(link.source.size + link.target.size) * 2;
			});
			this.graph.d3Force('charge').strength(-36).theta(0.2);

			var lights = [];

			let spotLight = new SpotLight(0xffffff, 1);
			spotLight.position.set(15, 40, 35);
			spotLight.angle = Math.PI / 4;
			spotLight.penumbra = 0.05;
			spotLight.decay = 2;
			spotLight.distance = 200;
			spotLight.castShadow = true;
			spotLight.shadow.mapSize.width = 1024;
			spotLight.shadow.mapSize.height = 1024;
			spotLight.shadow.camera.near = 10;
			spotLight.shadow.camera.far = 200;
			lights.push(spotLight);

			// lights[0] = new DirectionalLight(0xffffff, 1);
			// lights[0].position.set(1, 0, 0).normalize();
			// lights[1] = new DirectionalLight(0x999999, 1);
			// lights[1].position.set(0.75, 1, 0.5);
			// lights[2] = new DirectionalLight(0x8200C9, 1);
			// lights[2].position.set(-0.75, -1, 0.5);

			lights.forEach((l) => {
				this.graph.scene().add(l);
			});

			window.addEventListener('resize', this.handleResize, { passive: false });
		},

		newSphere (m) {
			let sphere = new SphereBufferGeometry(m.size, 32, 32);
			let sphereMaterial = new MeshPhysicalMaterial({
				color: m.color,
				metalness: 0,
				roughness: 0.5,
				clearCoat: 0.8,
				clearCoatRoughness: 0.8,
				reflectivity: 0.8
			});

			/* let material = new MeshPhongMaterial({
				color: m.color,
				flatShading: FlatShading,
				specular: 0xffffff,
				vertexColors: VertexColors
			});
			*/
			let sphereMesh = new Mesh(sphere, sphereMaterial);

			if (this.useAvatars) {
				let imgTexture = new TextureLoader().load(m.avatar);
				let imgMaterial = new SpriteMaterial({ map: imgTexture });
				let sprite = new Sprite(imgMaterial);
				sprite.scale.set(12, 12);
				sphereMesh.add(sprite);
			}
			return sphereMesh;
		},
		addNodes (data) {
			if (!this.graph || !this.graph.graphData()) return;
			let { nodes, links } = this.graph.graphData();
			this.graph.graphData({
				nodes: [...nodes, ...data.nodes],
				links: [...links, ...data.links]
			});
		},
		addNode (node) {
			if (!this.graph || !this.graph.graphData()) return;
			let { nodes, links } = this.graph.graphData();
			this.graph.graphData({
				nodes: [...nodes, node],
				links: [...links]
			});
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
		nodeColor (t) {
			switch (t) {
			case 'SUPER USER':
			case 'INFLUENCER':
				return '#76ff03';
			case 'ACTIVE':
			case 'NORMAL':
				return '#00b0ff';
			case 'AUTO':
			case 'BOT':
			case 'PARTIAL AUTO':
				return '#ff1744';
			case 'OTHER':
			case 'UNKNOWN':
				return '#757575';
			case 'NEW':
				return '#ffd600';
			default:
				return '#00b0ff';
			}
		},
		linkColor (t) {
			switch (t.toLowerCase()) {
			case 'tweet':
			case 'tweets':
				return '#00b0ff';
			case 'retweet':
			case 'retweets':
				return '#76ff03';
			case 'quote':
			case 'quotes':
				return '#F4511E';
			case 'reply':
			case 'replies':
				return '#19CF86';
			default:
				return '#cccccc';
			}
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

	background: #fafafa; /* Old browsers */
	background: -moz-linear-gradient(top, #f3f3f3 0%, #e0e0e0 100%); /* FF3.6-15 */
	background: -webkit-linear-gradient(top, #f3f3f3 0% ,#e0e0e0 100%); /* Chrome10-25,Safari5.1-6 */
	background: linear-gradient(to bottom, #f3f3f3 0%, #e0e0e0 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
	filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#f3f3f3', endColorstr='#e0e0e0',GradientType=0 ); /* IE6-9 */
}
.node {
	border: 2px solid white;
	.v-avatar {
		background: red;
	}
	background-color: white;
	border-radius: 36px;
}
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

</style>
