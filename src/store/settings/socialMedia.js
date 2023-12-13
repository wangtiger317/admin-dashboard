// module services this
import useJwt from '@/auth/jwt/useJwt'

export default {
  state: {
    webSosmeds: [],
  },

  getters: {
    getWebSosmed: (state) => state.webSosmeds,
  },

  mutations: {
    WEBSOSMED(state, payload) {
      state.webSosmeds = payload
    },
  },

  actions: {
    // web sosmed seetings
    webSosmedlist({ commit }) {
      useJwt
        .fetchData('settingAll', '/sosmed', {})
        .then((response) => {
          commit('WEBSOSMED', response.data.data)
        })
        .catch((error) => {
          commit('WEBSOSMED', error.response.data.message)
          if (error.response.data.code === 403) {
            if (!alert(error.response.data.message)) {
              this.$router.push('/login')
            }
          }
          return false
        })
    },

    async updateSosmed({ commit }, payload) {
      const { ...data } = payload
      const test = useJwt.fetchData('settingAll', '/sosmed', {})
      const body = {
        data: [
          {
            id: 1,
            name: 234,
            value: 2312,
          },
        ],
      }
      try {
        await useJwt.updateData('settingAll', '/web-update?type=social_media', {
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
