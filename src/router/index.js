import Vue from 'vue'
import VueRouter from 'vue-router'

// Routes
import { canNavigate } from '@/libs/acl/routeProtection'
import {
  isUserLoggedIn,
  getUserData,
  getHomeRouteForLoggedInUser,
} from '@/auth/utils'

// This Routes
import dashboard from './routes/dashboard'
import pages from './routes/pages'
import myAccount from './routes/my-acount'
import bets from './routes/bets'
import services from './routes/services'
import members from './routes/members'
import admin from './routes/agent'
import bonusPotongan from './routes/bonus-potongan'
import keluaran from './routes/keluaran'
import setting from './routes/setting'
import cms from './routes/cms'
import lainlain from './routes/lain-lain'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior() {
    return { x: 0, y: 0 }
  },
  routes: [
    { path: '/', redirect: '/login' },
    ...dashboard,
    ...pages,
    ...myAccount,
    ...bets,
    ...services,
    ...members,
    ...admin,
    ...bonusPotongan,
    ...keluaran,
    ...setting,
    ...cms,
    ...lainlain,

    {
      path: '*',
      redirect: 'error-404',
    },
  ],
})

router.beforeEach((to, _, next) => {
  const isLoggedIn = isUserLoggedIn()

  if (!canNavigate(to)) {
    // Redirect to login if not logged in
    if (!isLoggedIn) return next({ name: 'auth-login' })

    // If logged in => not authorized
    return next({ name: 'misc-not-authorized' })
  }

  // Redirect if logged in
  if (to.meta.redirectIfLoggedIn && isLoggedIn) {
    const userData = getUserData()
    next(getHomeRouteForLoggedInUser(userData ? userData.role : null))
  }

  return next()
})

// ? For splash screen
// Remove afterEach hook if you are not using splash screen
router.afterEach(() => {
  // Remove initial loading
  const appLoading = document.getElementById('loading-bg')
  if (appLoading) {
    appLoading.style.display = 'none'
  }
})

export default router
