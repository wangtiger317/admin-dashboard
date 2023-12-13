// module services this
import useJwt from '@/auth/jwt/useJwt'

export default {
  state: {
    webSettings: [],
    webPage: [],
    webLimits: [],
  },

  getters: {
    getWebsettings: (state) => state.webSettings,
    getWebPage: (state) => state.webPage,
    getWebLimit: (state) => state.webLimits,
  },

  mutations: {
    WEBSETTINGS(state, payload) {
      state.webSettings = payload
    },
    WEBPAGE(state, payload) {
      state.webPage = payload
    },
    WEBLIMIT(state, payload) {
      state.webLimits = payload
    },
  },

  actions: {
    //  web settings
    webSettingslist({ commit }) {
      useJwt
        .settingWeb({})
        .then((response) => {
          commit('WEBSETTINGS', response.data.data)
        })
        .catch((error) => {
          commit('WEBSETTINGS', error.response.data.message)
          if (error.response.data.code === 403) {
            if (!alert(error.response.data.message)) {
              this.$router.push('/login')
            }
          }
          return false
        })
    },

    // web page settings
    webPagelist({ commit }) {
      useJwt
        .settingWebPage({})
        .then((response) => {
          commit('WEBPAGE', response.data.data)
        })
        .catch((error) => {
          commit('WEBPAGE', error.response.data.message)
          if (error.response.data.code === 403) {
            if (!alert(error.response.data.message)) {
              this.$router.push('/login')
            }
          }
          return false
        })
    },

    // web limits settings
    webLimitlist({ commit }) {
      useJwt
        .webLimit({})
        .then((response) => {
          commit('WEBLIMIT', response.data.data)
        })
        .catch((error) => {
          commit('WEBLIMIT', error.data.data)
          if (error.response.data.code === 403) {
            if (!alert(error.response.data.message)) {
              this.$router.push('/login')
            }
          }
          return false
        })
    },

    updateLimitLine({ commit }, payload) {
      const body = {
        data: payload,
      }
      try {
        useJwt.updatedData('settingAll', '/limit-line-update', body)
        return true
      } catch (error) {
        if (error.response.data.code === 403) {
          if (!alert(error.response.data.message)) {
            this.$router.push('/login')
          }
        }
        return false
      }
    },
  },
}
