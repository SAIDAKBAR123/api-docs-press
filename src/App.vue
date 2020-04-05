<template>
  <v-app>
    <v-app-bar
      flat
      app
      color="#2E343B"
      dark
    >
      <h2 class="blue--text darken-2 dark font-weight-light">GENTLE API</h2>
      <v-spacer></v-spacer>
      <v-btn  text tile @click="logout">logout<v-icon>mdi-exit</v-icon></v-btn>
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
  methods: {
    logout () {
      this.$store.dispatch('logOut')
    }
  },

  data: () => ({

  }),
  mounted () {
    this.$vuetify.theme.dark = false
  }
}
</script>
<style  scoped>

</style>
