import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from './components/login'
import Home from './components/home'
import Users from './components/home/users.vue'
import Rights from './components/home/rights.vue'
import Roles from './components/home/roles.vue'

Vue.use(VueRouter)
const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login },
    {
      path: '/home',
      component: Home,
      children: [
        { path: '/users', component: Users },
        { path: '/roles', component: Roles },
        { path: '/rights', component: Rights }]
    }

  ]
})
router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    next()
  } else {
    if (localStorage.getItem('token')) {
      next()
    } else {
      next('/')
    }
  }
})
export default router
