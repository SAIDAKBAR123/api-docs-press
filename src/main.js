import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import Clipboard from 'v-clipboard'
import * as firebase from 'firebase'
Vue.use(Clipboard)
Vue.config.productionTip = false

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
  },
  render: h => h(App)
}).$mount('#app')
