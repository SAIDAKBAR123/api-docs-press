import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import Clipboard from 'v-clipboard'
import * as firebase from 'firebase'
import EditProject from './components/EditProject.vue'
import EditApi from './components/EditApi.vue'
import VuePrismEditor from 'vue-prism-editor'
import 'vue-prism-editor/dist/VuePrismEditor.css'
import 'prismjs'
import 'prismjs/themes/prism.css'
// import the styles
Vue.component('prism-editor', VuePrismEditor)
Vue.use(Clipboard)
Vue.config.productionTip = false

Vue.component('edit-dialog', EditProject)
Vue.component('edit-api-dialog', EditApi)
new Vue({
  router,
  store,
  vuetify,
  created () {
    firebase.initializeApp({
      apiKey: 'AIzaSyBOyYw8D4i_QcAAgUa6IGets-tYoTCpmro',
      authDomain: 'api-docs-61899.firebaseapp.com',
      databaseURL: 'https://api-docs-61899.firebaseio.com',
      storageBucket: 'bucket.appspot.com'
    })
    firebase.auth().onAuthStateChanged(user => {
      if (user) { this.$store.dispatch('autoSignIn', user) }
    })
  },
  render: h => h(App)
}).$mount('#app')
