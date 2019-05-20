<template>
	<v-container fluid>
		<v-layout row>
			<v-flex xs12 sm4>
				<v-card max-width="480px" v-if="user">
					<v-img :src="user.profile_banner_url" class="fallback-color" aspect-ratio="2.75">
						<v-container fill-height>
							<v-layout>
								<v-flex class="text-xs-right">
									<v-btn fab small class="ma-0 elevation-1" @click="$store.commit('setSelectedUser', null)">
										<v-icon>mdi-close</v-icon>
									</v-btn>
								</v-flex>
							</v-layout>
							<v-chip small v-if="$store.state.isAuthenticated" class="badge mx-0 my-4" :color="nodeColor(label)" :dark="label !== 'NEW' && label !== 'INFLUENCER'" label>
								<span class="font-weight-bold">{{ label }}</span>
								<span class="ml-1 font-weight-normal">{{ label !== 'NEW' ? (score*100).toFixed(2) + '%' : '' }}</span>
							</v-chip>
						</v-container>
					</v-img>

					<v-card-title primary-title class="px-4 pb-0" justify-end>
						<div>
							<h3 class="headline mb-1">
								{{ user.name }}
								<v-chip v-if="$store.state.isAuthenticated" small class="mx-0 my-0" label>
									<span class="font-weight-bold">{{ thousands(user.metrics.dates.toFixed()) }} ημέρ{{user.metrics.dates > 0 ? 'ες' : 'α'}} ενεργός</span>
								</v-chip>
							</h3>
							<p>{{ user.description }}</p>
						</div>
					</v-card-title>

					<v-card-text class="px-4 py-0">
						<v-layout row justify-start wrap class="mb-3">
							<v-flex class="mt-1">
								<h3 class="caption grey--text">Tweets</h3>
								<h3>{{thousands(user.metrics.statuses) || 0}}</h3>
							</v-flex>
							<v-flex class="mt-1">
								<h3 class="caption grey--text">Following</h3>
								<h3>{{thousands(user.metrics.friends) || 0}}</h3>
							</v-flex>
							<v-flex class="mt-1">
								<h3 class="caption grey--text">Followers</h3>
								<h3>{{thousands(user.metrics.followers) || 0}}</h3>
							</v-flex>
							<v-flex class="mt-1">
								<h3 class="caption grey--text">Likes</h3>
								<h3>{{thousands(user.metrics.favorites) || 0}}</h3>
							</v-flex>
							<v-flex class="mt-1">
								<h3 class="caption grey--text">Lists</h3>
								<h3>{{thousands(user.metrics.listed) || 0}}</h3>
							</v-flex>
							<v-flex class="mt-1">
								<h3 class="caption grey--text">
									FFR
									<v-tooltip bottom class="tooltip-info">
										<template v-slot:activator="{ on }">
											<v-icon small v-on="on">mdi-information</v-icon>
										</template>
										<span>Followers / Friends Ratio</span>
									</v-tooltip>
								</h3>

								<h3>{{user.metrics.friends > 0 ? thousands((user.metrics.followers / user.metrics.friends).toFixed(2)) : '-' || '-'}}</h3>
							</v-flex>
							<v-flex class="mt-1">
								<h3 class="caption grey--text">
									ACT
									<v-tooltip bottom class="tooltip-info">
										<template v-slot:activator="{ on }">
											<v-icon small v-on="on">mdi-information</v-icon>
										</template>
										<span>Actions per Day</span>
									</v-tooltip>
								</h3>
								<h3>{{thousands(user.metrics.actions.toFixed()) || 0}}</h3>
							</v-flex>
						</v-layout>

						<v-layout column class="mb-0" v-if="$store.state.isAuthenticated">
							<div>
								<h3 class="caption grey--text">ENGAGEMENT</h3>
								<v-flex xs12 id="chart" class="my-2">
								</v-flex>
							</div>
							<div>
								<h3 class="caption grey--text">SAMPLE TWEETS</h3>
								<v-flex xs12 class="my-2">
									<v-layout align-center justify-start row v-for="(tweet, index) in userSample" :key="tweet._source.id_str">
										<v-flex>
											<v-list-tile-avatar>
												<img :src="tweet._source.user.profile_image_url_https">
											</v-list-tile-avatar>
										</v-flex>
										<v-flex>
											<v-list-tile-content class="">
												<v-list-tile-title>@{{ tweet._source.user.screen_name }} &mdash; {{$moment(tweet._source.created_at).locale('el').format('LLL')}}</v-list-tile-title>
												<p class="caption"><a :href="'https://twitter.com/' + tweet._source.user.screen_name + '/status/' + tweet._source.id_str" target="_blank" class="mb-1 grey--text">{{ tweet._source.full_text }}</a></p>
											</v-list-tile-content>
										</v-flex>
										<v-divider v-if="index < 2"></v-divider>
									</v-layout>
								</v-flex>
							</div>
						</v-layout>
					</v-card-text>

					<v-card-actions class="px-2 pb-4">
						<v-list-tile class="grow">
							<v-list-tile-avatar color="grey darken-3">
								<v-img class="elevation-2" :src="user.profile_image_url_https"></v-img>
							</v-list-tile-avatar>
							<v-list-tile-content>
								<v-list-tile-title>
									<a class="black--text" :href="'https://twitter.com/' + user.screen_name" target="_blank"><span class="grey--text">@</span><span class="font-weight-bold">{{ user.screen_name }}</span></a>
								</v-list-tile-title>
							</v-list-tile-content>
							<v-layout align-center justify-end>
								<v-icon class="mr-1">mdi-graphql</v-icon>
								<span class="caption">{{ userCount }}</span>
							</v-layout>
						</v-list-tile>
					</v-card-actions>
				</v-card>
			</v-flex>
		</v-layout>
	</v-container>
</template>

<script>
import { nodeColor, thousands } from '@/utils/utils';
import Highcharts from 'highcharts';
import { mapState } from 'vuex';

export default {
	name: 'user',
	// props: ['user'],
	data () {
		return {
			dialog: false,
			chart: null,
			userMetrics: [],
			userSample: [],
			userCount: 0
		};
	},
	watch: {
		selectedUser (v, o) {
			console.log(v, o);
			if (!v) return;
			if (this.$store.state.isAuthenticated) {
				this.loadSample();
			}
			this.loadCount();
			this.loadMetrics();
		},
		userMetrics () {
			this.addChart();
		}
	},
	computed: {
		...mapState(['selectedUser']),
		label () {
			if (!this.user) return '';
			return this.user.metrics.dates < 120 ? 'NEW' : this.selectedUser.user_class;
		},
		score () {
			if (!this.user) return 0;
			return this.user.metrics.dates < 120 ? (1).toFixed(2) : this.selectedUser.user_class_score.toFixed(2);
		},
		user () {
			return this.selectedUser;
		}
	},
	mounted () {
		this.addChart();
	},
	methods: {
		loadSample () {
			this.$http(`/v2/annotate?screen_name=${this.user.screen_name}&size=3`)
				.then((res) => {
					try {
						this.userSample = res.data.data.hits.hits || [];
					} catch (e) {
						this.userSample = [];
					}
				});
		},
		loadMetrics () {
			this.$http(`/v2/metrics/user/${this.user.screen_name}/volume`)
				.then((res) => {
					this.userMetrics = res.data.data;
				});
		},
		loadCount () {
			this.$http(`/v2/metrics/user/${this.user.screen_name}/count`)
				.then((res) => {
					this.userCount = res.data.data.value;
				});
		},
		addChart () {
			if (!this.user) return;
			this.chart = Highcharts.chart('chart', {
				animation: false,
				chart: {
					type: 'area',
					style: {
		                fontFamily: 'Roboto',
		                fontSize: '10px'
		            },
					height: 96,
					margin: [0, 0, 24, 0]
				},
				credits: { enabled: false },
				exporting: { enabled: false },
				subtitle: { text: '' },

	            legend: { enabled: false },

				title: {
					text: ''
				},

				xAxis: {
					type: 'datetime',
					dateTimeLabelFormats: {
						hour: '%H:%M',
						day: '%DD/%mm'
					}
				},

				yAxis: {
					title: {
						text: 'Αναφορές'
					},
					labels: {
						align: 'left',
	                    enabled: true,
	                    x: 0,
	                    y: -6,
	                    step: 2
					},
					min: 0,
					showLastLabel: false,
					endOnTick: true,
					showFirstLabale: true,
					tickPosition: 'inside'
				},

				plotOptions: {},
				series: [{
					name: 'Αναφορές',
					data: this.userMetrics.map((m) => {
						return {
							x: m.key,
							y: m.doc_count
						};
					})
				}]
			});
		},
		nodeColor,
		thousands
	}
};
</script>

<style lang="less" scopped>
.fallback-color {
	background: #38A1F3;
}
#chart {
	width: 100%;
	height: 96px;
}
.badge {
	position: absolute;
	bottom: 0;
}
.tooltip-info {
	position: absolute;
}
</style>
