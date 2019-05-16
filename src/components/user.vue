<template>
	<v-container fluid>
		<classify :user="user" :dialog="dialog"></classify>
		<v-layout row>
			<v-flex xs12 sm4>
				<v-card max-width="480px">
					<v-img :src="user.profile_banner_url" class="fallback-color" aspect-ratio="2.75">
						<v-container>
							<v-layout>
								<v-flex class="text-xs-left">
									<v-btn fab small class="ma-0" @click="dialog = true">
										<v-icon>mdi-pencil</v-icon>
									</v-btn>
								</v-flex>
								<v-flex class="text-xs-right">
									<v-btn fab small class="ma-0 elevation-1" @click="$parent.user = null;">
										<v-icon>mdi-close</v-icon>
									</v-btn>
								</v-flex>
							</v-layout>
						</v-container>
					</v-img>

					<v-card-title primary-title class="px-4">
						<div>
							<h3 class="headline mb-0">{{ user.name }}</h3>
							<p>{{ user.description }}</p>
						</div>
					</v-card-title>

					<v-card-text class="px-4">
						<p>
							User
							<strong>{{user.screen_name}}</strong> joined Twitter on
							<strong>{{$moment(Date.parse(user.created_at)).format('LL')}} ({{ user.metrics.dates.toFixed() }} day{{user.metrics.dates.toFixed() > 1 ? 's' : ''}})</strong>.
							Has <strong>{{user.metrics.followers}}</strong> followers,
							<strong>{{user.metrics.friends}}</strong> friends,
							<strong>{{user.metrics.statuses}}</strong> statuses,
							<strong>{{user.metrics.favourites}}</strong> favorites, is a member in
							<strong>{{user.metrics.listed}}</strong> list{{user.metrics.listed > 1 ? 's' : ''}} and has an average of
							<strong>{{user.metrics.actions.toFixed(2)}}</strong> actions / day.
						</p>
						<p>
							The user has <strong>{{user.metrics.ffr ? user.metrics.ffr.toFixed(2) : 0}}</strong>
							Followers / Friends Ratio and <strong>{{ score }}</strong>
							chance to be <span class>{{ label }}</span>.
						</p>
						<v-layout column align-center>
							<v-flex xs12>
								<span>ADD TIMELINE CHART</span>
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
export default {
	name: 'user',
	props: ['user'],
	data () {
		return {
			dialog: false
		};
	},
	watch: {
		user () {}
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
	}
};
</script>

<style lang="less" scopped>
.fallback-color {
	background: #38A1F3;
}
</style>
