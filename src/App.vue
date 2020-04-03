<template>
  <v-app>
    <v-app-bar
      flat
      app
      color="#2E343B"
      dark
    >
      <h2>SMA</h2>
      <v-spacer></v-spacer>

      <v-btn
      @click="$vuetify.theme.dark = !$vuetify.theme.dark"
       fab
        text
      >
        <v-icon>mdi-weather-night</v-icon>
      </v-btn>
    </v-app-bar>

    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'App',

  components: {

  },

  data: () => ({
    //
  }),
  mounted () {
    this.$vuetify.theme.dark = false
  }
}
</script>
<style  scoped>

</style>
