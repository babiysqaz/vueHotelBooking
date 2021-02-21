import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import( '../views/Home.vue')
  },
  { 
    path: '/room',
    component: () => import(/* webpackChunkName: "about" */ '../views/Room.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
