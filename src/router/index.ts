import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'

const Login = () => import(/* webpackChunkName: "login" */ '@/pages/Login.vue')
const Works = () => import(/* webpackChunkName: "works" */ '@/pages/Works.vue')

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: _ => store.state.user === null ? '/login' : '/works'
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/works',
      component: Works
    }
  ]
})