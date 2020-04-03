import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: '',
    component: Home
  },
  {
    path: '/list/:id',
    name: 'List',
    props: true,
    component: () => import('../components/List.vue')
  }

]

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes
})

export default router
