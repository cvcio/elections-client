<template>
	<v-container fluid>
		<classify :user="user" :dialog="dialog"></classify>
		<v-layout row>
			<v-flex xs12 sm4>
				<v-card max-width="480px">
					<v-img :src="user.profile_banner_url" class="fallback-color" aspect-ratio="2.75">
						<v-container fill-height>
							<v-layout>
								<v-flex class="text-xs-right">
									<v-btn fab small class="ma-0 elevation-1" @click="$parent.user = null;">
										<v-icon>mdi-close</v-icon>
									</v-btn>
								</v-flex>
							</v-layout>
							<v-chip small class="badge mx-0 my-4" label>
								<span class="font-weight-bold">{{ label }}</span>
								<span class="ml-1 font-weight-normal">{{ (score*100).toFixed(2) }}%</span>
							</v-chip>
						</v-container>
					</v-img>

					<v-card-title primary-title class="px-4 pb-0" justify-end>
						<div>
							<h3 class="headline mb-0">{{ user.name }}</h3>
							<p>{{ user.description }}</p>
						</div>
					</v-card-title>

					<v-card-text class="px-4 pt-0">
						<p>
							User
							<strong>{{user.screen_name}}</strong> joined Twitter on
							<strong>{{$moment(Date.parse(user.created_at)).format('LL')}} ({{ user.metrics.dates.toFixed() }} day{{user.metrics.dates.toFixed() > 1 ? 's' : ''}})</strong>.
							Has <strong>{{user.metrics.followers}}</strong> followers,
							<strong>{{user.metrics.friends}}</strong> friends,
							<strong>{{user.metrics.statuses}}</strong> statuses,
							<strong>{{user.metrics.favourites}}</strong> favorites, <strong>{{
								user.metrics.friends > 0 ? (user.metrics.followers / user.metrics.friends).toFixed(2) : 0
							}}</strong>
							FFR Ratio, is a member in
							<strong>{{user.metrics.listed}}</strong> list{{user.metrics.listed > 1 ? 's' : ''}} and has an average of
							<strong>{{user.metrics.actions.toFixed(2)}}</strong> actions / day.
						</p>

						<v-layout column>
							<span class="caption font-weight-bold">ΔΡΑΣΤΗΡΙΟΤΗΤΑ ΛΟΓΑΡΙΑΣΜΟΥ</span>
							<v-flex xs12 id="chart" class="my-2">
							</v-flex>
							<v-flex xs12>
								<span>ADD TWEETS SCROLLER</span>
							</v-flex>
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
								<span class="caption">45</span>
							</v-layout>
						</v-list-tile>
					</v-card-actions>
				</v-card>
			</v-flex>
		</v-layout>
	</v-container>
</template>

<script>
import Highcharts from 'highcharts';
export default {
	name: 'user',
	props: ['user'],
	data () {
		return {
			dialog: false,
			chart: null,
			userMetrics: []
		};
	},
	watch: {
		user () {
			this.$http(`${this.$BASE_API}/v2/metrics/user/${this.user.screen_name}/volume`)
				.then((res) => {
					this.userMetrics = res.data.data;
					this.addChart();
				});
		}
	},
	components: {
		'classify': require('@/components/classify').default
	},
	computed: {
		label () {
			return this.user.metrics.dates < 120 ? 'NEW' : this.user.user_class;
		},
		score () {
			return this.user.metrics.dates < 120 ? (1).toFixed(2) : this.user.user_class_score.toFixed(2);
		}
	},
	mounted () {
		this.addChart();
	},
	methods: {
		addChart () {
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
		}
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
</style>
