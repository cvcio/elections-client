<template>
	<v-flex xs12 md8 lg4 v-if="isIntro">
		<arrow></arrow>
		<h1 class="display-3 mb-3">A Nice Title or Application Name</h1>
		<v-divider class="short-divider my-3" color="#24242d"></v-divider>
		<h4 class="headline my-3">Even Better Sub-Title Goes Here</h4>

		<p class="subheading">Short Description: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vehicula sem sed turpis aliquet, at mollis lorem facilisis. Maecenas rutrum justo sem, nec mollis ante accumsan id. Integer in ante quam. Mauris bibendum at lacus non mollis. Suspendisse potenti. Vivamus porta eleifend lacus, ac iaculis ex convallis quis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Ut at nisl tempor ante semper mollis ac et neque. Pellentesque nulla dui, aliquam ac efficitur quis, lobortis et enim. Quisque non venenatis nunc, vel dictum elit. Maecenas auctor fermentum ex ut dignissim. Aliquam porttitor ex quis lacus ultrices, eget facilisis magna finibus. Cras maximus metus orci, vitae sodales nibh ultrices vitae. Duis tempus dapibus nunc, in euismod massa tristique ac.</p>

		<p class="font-italic grey--text">Disclaimer: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vehicula sem sed turpis aliquet, at mollis lorem facilisis. Maecenas rutrum justo sem, nec mollis ante accumsan id. Integer in ante quam. Mauris bibendum at lacus non mollis. Suspendisse potenti. Vivamus porta eleifend lacus, ac iaculis ex convallis quis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Ut at nisl tempor ante semper mollis ac et neque. Pellentesque nulla dui, aliquam ac efficitur quis, lobortis et enim. Quisque non venenatis nunc, vel dictum elit.</p>

		<v-btn class="mx-0" color="primary" @click="$store.commit('toggleIntro', false)">Close</v-btn>
	</v-flex>
</template>

<script>
export default {
	name: 'live-introduction',
	computed: {
		isIntro () {
			return this.$store.state.isIntro;
		}
	},
	data () {
		return {
			name: 'live'
		};
	},
	components: {
		'arrow': require('@/components/arrow').default
	}
};
</script>
