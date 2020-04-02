<template>
  <v-app>
    <v-app-bar
      app
      color="blue darken-3"
      dark
    >
      <h2>API DOCS</h2>
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
      <HelloWorld/>
    </v-content>
  </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld'

export default {
  name: 'App',

  components: {
    HelloWorld
  },

  data: () => ({
    //
  }),
  mounted () {
    this.$vuetify.theme.dark = true
  }
}
</script>
<style  scoped>

</style>
