<template>
	<v-footer absolute app v-if="!$store.state.fullscreen" color="transparent" class="pa-4" height="auto">
  	  <v-btn class="" to="/about" flat :icon="$vuetify.breakpoint.smAndDown">
		  <v-icon small class="cc">mdi-creative-commons</v-icon>
		  <span class="ml-1" v-if="$vuetify.breakpoint.mdAndUp">BY-NC-SA 4.0</span>
	  </v-btn>
	  <v-btn icon class="text-none" small flat href="https://twitter.com/mediawatch_io" target="_blank"><v-icon small color="grey">mdi-twitter</v-icon></v-btn>
  	  <v-btn flat class="text-none" to="/about" :small="$vuetify.breakpoint.smAndDown">Διαβάστε Περισσότερα</v-btn>
	  <v-btn href="mailto:press@mediawatch.io" flat :small="$vuetify.breakpoint.smAndDown" class="text-none grey--text">Επικοινωνία</v-btn>
	  <v-btn to="/legal" flat v-if="$vuetify.breakpoint.mdAndUp" class="text-none grey--text">Όροι Χρήσης</v-btn>
    </v-footer>
</template>

<script>
export default {
	name: 'footer'
};
</script>

<style lang="less" scopped>
</style>
