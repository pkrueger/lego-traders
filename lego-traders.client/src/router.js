import { createRouter, createWebHashHistory } from 'vue-router'
import { authGuard } from '@bcwdev/auth0provider-client'

function loadPage(page) {
  return () => import(`./pages/${page}.vue`)
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: loadPage('HomePage')
  },
  {
    path: '/marketplace',
    name: 'Marketplace',
    component: loadPage('MarketplacePage')
  },
  {
    path: '/account',
    name: 'Account',
    component: loadPage('AccountPage'),
    beforeEnter: authGuard
  },
  {
    path: '/collection',
    name: 'Collection',
    component: loadPage('CollectionPage')
  },
  {
    path: '/forum',
    name: 'Forum',
    component: loadPage('ForumPage')
  },
  {
    path: '/createyourown',
    name: 'MOC',
    component: loadPage('MOCPage')
  }
]

export const router = createRouter({
  linkActiveClass: 'router-link-active',
  linkExactActiveClass: 'router-link-exact-active',
  history: createWebHashHistory(),
  routes
})
