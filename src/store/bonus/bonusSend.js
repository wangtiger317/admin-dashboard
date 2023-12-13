import useJwt from '@/auth/jwt/useJwt'
export default {
  state: {
    bonusSend: [],
    downloadList: [],
    downloadFilteredList: [],
  },

  getters: {
    getBonusSend: (state) => state.bonusSend,
    getDownloadList: (state) => state.downloadList,
    getDownloadFilteredList: (state) => state.downloadFilteredList,
  },

  mutations: {
    setBonusSendList(state, payload) {
      state.bonusSend = payload
    },

    BONUSTOSENDDOWNLOAD(state, payload) {
      state.downloadList = payload
      state.downloadFilteredList = payload
    },
  },

  actions: {
    // list this
    bonusSendList({ commit }, payload) {
      useJwt
        .fetchData('bonusPotonganAll', '/bonus-to-send', {
          params: {
            searchUsername: payload.searchUsername,
            page: payload.page,
          },
        })
        .then((response) => {
          commit('setBonusSendList', response.data.data)
        })
        .catch((error) => {
          commit('setBonusSendList', error.response.data.message)
          if (error.response.data.code === 403) {
            if (!alert(error.response.data.message)) {
              this.$router.push('/login')
            }
          }
          return false
        })
    },

    // cancel this
    async cancelBonus({ commit }, payload) {
      const { id } = payload
      try {
        await useJwt.createData(
          'bonusPotonganAll',
          `/bonus-to-send-cancel?id=${id}`
        )
        // list
        useJwt
          .fetchData('bonusPotonganAll', '/bonus-to-send', {
            params: {
              searchUsername: payload.searchUsername,
              page: payload.page,
            },
          })
          .then((response) => {
            commit('setBonusSendList', response.data.data)
          })
          .catch((error) => {
            commit('setBonusSendList', error.response.data.message)
            if (error.response.data.code === 403) {
              if (!alert(error.response.data.message)) {
                this.$router.push('/login')
              }
            }
            return false
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

    // send Bonus
    async sendBonus({ commit }, payload) {
      const { id } = payload
      try {
        await useJwt.createData(
          'bonusPotonganAll',
          `/send-bonus-to-send?id=${id}`
        )
        useJwt
          .fetchData('bonusPotonganAll', '/bonus-to-send', {
            params: {
              searchUsername: payload.searchUsername,
              page: payload.page,
            },
          })
          .then((response) => {
            commit('setBonusSendList', response.data.data)
          })
          .catch((error) => {
            commit('setBonusSendList', error.response.data.message)
            if (error.response.data.code === 403) {
              if (!alert(error.response.data.message)) {
                this.$router.push('/login')
              }
            }
            return false
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

    // send all Bonus
    async sendAllBonus({ commit }, payload) {
      try {
        await useJwt.createData('bonusPotonganAll', '/send-all-bonus-to-send')
        useJwt
          .fetchData('bonusPotonganAll', '/bonus-to-send', {
            params: {
              searchUsername: payload.searchUsername,
              page: payload.page,
            },
          })
          .then((response) => {
            commit('setBonusSendList', response.data.data)
          })
          .catch((error) => {
            commit('setBonusSendList', error.response.data.message)
            if (error.response.data.code === 403) {
              if (!alert(error.response.data.message)) {
                this.$router.push('/login')
              }
            }
            return false
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

    // bonus to send download csv
    async bonusDownload({ commit }, payload) {
      useJwt
        .bonusToSendDownload({
          params: {
            searchUsername: payload.searchUsername,
          },
        })
        .then((response) => {
          commit('BONUSTOSENDDOWNLOAD', response.data)
        })
        .catch((error) => {
          commit('BONUSTOSENDDOWNLOAD', error.response.data.message)
          if (error.response.data.code === 403) {
            if (!alert(error.response.data.message)) {
              this.$router.push('/login')
            }
          }
          return false
        })
    },
  },
}
