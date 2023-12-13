<template>
  <div id="app" class="h-100" :class="[skinClasses]">
    <component :is="layout">
      <router-view />
    </component>

    <scroll-to-top v-if="enableScrollToTop" />
  </div>
</template>

<script>
import ScrollToTop from '@core/components/scroll-to-top/ScrollToTop.vue'

// This will be populated in `beforeCreate` hook
import { $themeColors, $themeBreakpoints, $themeConfig } from '@themeConfig'
import { provideToast } from 'vue-toastification/composition'
import { watch } from '@vue/composition-api'
import useAppConfig from '@core/app-config/useAppConfig'

import { useWindowSize, useCssVar } from '@vueuse/core'

import store from '@/store'

import { isUserLoggedIn } from '@/auth/utils'

import useRoute from 'vue-router'
import useJwt from '@/auth/jwt/useJwt'

const LayoutVertical = () => import('@/layouts/vertical/LayoutVertical.vue')
const LayoutFull = () => import('@/layouts/full/LayoutFull.vue')

export default {
  components: {
    // Layouts
    LayoutVertical,
    LayoutFull,

    ScrollToTop,

    useRoute,
  },
  // ! We can move this computed: layout & contentLayoutType once we get to use Vue 3
  // Currently, router.currentRoute is not reactive and doesn't trigger any change
  computed: {
    route: () => useRoute(),
    layout() {
      if (this.$route.meta.layout === 'full') return 'layout-full'
      return `layout-${this.contentLayoutType}`
    },
    contentLayoutType() {
      return this.$store.state.appConfig.layout.type
    },
  },

  data() {
    return {
      responseeee: [],
    }
  },
  methods: {
    async checkUsingEndpointNotifBody() {
      useJwt.fetchData('servicesAccount', `/notif-body`, {})
    },
  },
  created() {
    if (localStorage.getItem('accessToken') === null) {
      this.$router.push({ name: 'login' })
    }

    if (localStorage.getItem('accessToken') != null) {
      this.$router.push({ name: 'dashboard-status' })
    }

    setTimeout(() => {
      setInterval(
        function () {
          const routeSekarang = this.$route.name
          if (routeSekarang !== 'auth-login') {
            // this.checkUsingEndpointNotifBody() // comment this line if don't need to call request per second.
            const isLoggedIn = isUserLoggedIn()
            if (!isLoggedIn) {
              // tendangan maut jwt :/
              if (!alert('Please login again, your session ended.')) {
                this.$router.push('/login')
              }
            }
          }
        }.bind(this),
        1000
      ) // run / call per second, so comment line 75 checkUsingEndpointNotifBody if don't want to run it per second.
    }, 4000)
  },

  beforeCreate() {
    // Set colors in theme
    const colors = [
      'primary',
      'secondary',
      'success',
      'info',
      'warning',
      'danger',
      'light',
      'dark',
    ]

    // eslint-disable-next-line no-plusplus
    for (let i = 0, len = colors.length; i < len; i++) {
      $themeColors[colors[i]] = useCssVar(
        `--${colors[i]}`,
        document.documentElement
      ).value.trim()
    }

    // Set Theme Breakpoints
    const breakpoints = ['xs', 'sm', 'md', 'lg', 'xl']

    // eslint-disable-next-line no-plusplus
    for (let i = 0, len = breakpoints.length; i < len; i++) {
      $themeBreakpoints[breakpoints[i]] = Number(
        useCssVar(
          `--breakpoint-${breakpoints[i]}`,
          document.documentElement
        ).value.slice(0, -2)
      )
    }

    // Set RTL
    const { isRTL } = $themeConfig.layout
    document.documentElement.setAttribute('dir', isRTL ? 'rtl' : 'ltr')
  },
  setup() {
    const { skin, skinClasses } = useAppConfig()
    const { enableScrollToTop } = $themeConfig.layout

    // If skin is dark when initialized => Add class to body
    if (skin.value === 'dark') document.body.classList.add('dark-layout')

    // Provide toast for Composition API usage
    // This for those apps/components which uses composition API
    // Demos will still use Options API for ease
    provideToast({
      hideProgressBar: true,
      closeOnClick: false,
      closeButton: false,
      icon: false,
      timeout: 3000,
      transition: 'Vue-Toastification__fade',
    })

    // Set Window Width in store
    store.commit('app/UPDATE_WINDOW_WIDTH', window.innerWidth)
    const { width: windowWidth } = useWindowSize()
    watch(windowWidth, () => {
      store.commit('app/UPDATE_WINDOW_WIDTH')
    })

    return {
      skinClasses,
      enableScrollToTop,
    }
  },
}
</script>
