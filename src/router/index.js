import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,

  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
  },
  ,
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue'),
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('../views/Dashboard.vue'),
    meta: {private: true}
  },
  {
    path: '/calificaciones',
    name: 'Calificaciones',
    component: () => import('../views/Calificaciones.vue'),
    meta: {private: true}
  },
  {
    path: '/estatus',
    name: 'Estatus',
    component: () => import('../views/Estatus.vue'),
    meta: {private: true}
  },
  {
    path: '/materias',
    name: 'Materias',
    component: () => import('../views/Materias.vue'),
    meta: {private: true}
  },
  {
    path: '/help',
    name: 'Help',
    component: () => import('../views/Help.vue'),
    meta: {private: true}
  },
]
 

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next)=>{
  if(to.meta.private){
    if(store.getters['auth/userIsAuthenticated']){
      next()
    }else{
      store.commit('auth/SET_ERROR', 'Oops! Parece que no haz iniciado sesion o probablemente tu sesion expiro.')
      next('/login')
    }
  }else{
    next()
  }
})
export default router
