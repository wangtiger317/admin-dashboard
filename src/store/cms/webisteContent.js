// module services this
import useJwt from '@/auth/jwt/useJwt'

export default {
  state: {
    // website content
    webCondition: [],
    webAbout: [],
    webHelp: [],
    webRules: [],
    webBank: [],
  },

  getters: {
    // website content
    getWebsettings: (state) => state.webCondition,
    getWebAbout: (state) => state.webAbout,
    getWebHelp: (state) => state.webHelp,
    getWebRules: (state) => state.webRules,
    getWebBank: (state) => state.webBank,
  },

  mutations: {
    // website content
    WEBCONDITION(state, payload) {
      state.webCondition = payload
    },
    WEBABOUT(state, payload) {
      state.webAbout = payload
    },
    WEBHELP(state, payload) {
      state.webHelp = payload
    },
    WEBRULES(state, payload) {
      state.webRules = payload
    },
    WEBBANK(state, payload) {
      state.webBank = payload
    },
  },

  actions: {
    // Terms and Conditions
    webSettingslist({ commit }, payload) {
      useJwt
        .webContent({
          params: {
            slug: payload.slug,
          },
        })
        .then((response) => {
          commit('WEBCONDITION', response.data.data)
        })
        .catch((error) => {
          commit('WEBCONDITION', error.response.data.message)
          if (error.response.data.code === 403) {
            if (!alert(error.response.data.message)) {
              this.$router.push('/login')
            }
          }
          return false
        })
    },
    // update Terms of Condition
    async updateTerm({ commit }, payload) {
      const { slug, ...data } = payload
      const body = {
        id: data.id,
        title: data.title,
        content: data.contents,
      }
      try {
        await useJwt.updateData('cms', `/website-content-update?slug=${slug}`, {
          ...body,
        })
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

    //  about
    webAboutList({ commit }, payload) {
      useJwt
        .webContent({
          params: {
            slug: payload.slug,
          },
        })
        .then((response) => {
          commit('WEBABOUT', response.data.data)
        })
        .catch((error) => {
          commit('WEBABOUT', error.response.data.message)
          if (error.response.data.code === 403) {
            if (!alert(error.response.data.message)) {
              this.$router.push('/login')
            }
          }
          return false
        })
    },
    // update About
    async updateAbout({ commit }, payload) {
      const { slug, ...data } = payload
      const body = {
        id: data.id,
        title: data.title,
        content: data.contents,
      }
      try {
        await useJwt.updateData('cms', `/website-content-update?slug=${slug}`, {
          ...body,
        })
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

    // help
    webHelpList({ commit }, payload) {
      useJwt
        .webContent({
          params: {
            slug: payload.slug,
          },
        })
        .then((response) => {
          commit('WEBHELP', response.data.data)
        })
        .catch((error) => {
          commit('WEBHELP', error.response.data.message)
          if (error.response.data.code === 403) {
            if (!alert(error.response.data.message)) {
              this.$router.push('/login')
            }
          }
          return false
        })
    },
    // update Help
    async updateHelp({ commit }, payload) {
      const { slug, ...data } = payload
      const body = {
        id: data.id,
        title: data.title,
        content: data.contents,
      }
      try {
        await useJwt.updateData('cms', `/website-content-update?slug=${slug}`, {
          ...body,
        })
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

    // rules
    webRulesList({ commit }, payload) {
      useJwt
        .webContent({
          params: {
            slug: payload.slug,
          },
        })
        .then((response) => {
          commit('WEBRULES', response.data.data)
        })
        .catch((error) => {
          commit('WEBRULES', error.response.data.message)
          if (error.response.data.code === 403) {
            if (!alert(error.response.data.message)) {
              this.$router.push('/login')
            }
          }
          return false
        })
    },
    // update Rules
    async updateRules({ commit }, payload) {
      const { slug, ...data } = payload
      const body = {
        id: data.id,
        title: data.title,
        content: data.contents,
      }
      try {
        await useJwt.updateData('cms', `/website-content-update?slug=${slug}`, {
          ...body,
        })
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

    // bank
    webBankList({ commit }, payload) {
      useJwt
        .webContent({
          params: {
            slug: payload.slug,
          },
        })
        .then((response) => {
          commit('WEBBANK', response.data.data)
        })
        .catch((error) => {
          commit('WEBBANK', error.response.data.message)
          if (error.response.data.code === 403) {
            if (!alert(error.response.data.message)) {
              this.$router.push('/login')
            }
          }
          return false
        })
    },
    // update Bank Info
    async updateBank({ commit }, payload) {
      const { slug, ...data } = payload
      const body = {
        id: data.id,
        title: data.title,
        content: data.contents,
      }
      try {
        await useJwt.updateData('cms', `/website-content-update?slug=${slug}`, {
          ...body,
        })
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
