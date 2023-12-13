// module services this
import useJwt from '@/auth/jwt/useJwt'

export default {
  state: {
    winLoses: [],
    providerList: [],
    downloadList: [],
  },

  getters: {
    getWinLose: (state) => state.winLoses,
    getProviders: (state) => state.providerList,
    getDownloadList: (state) => state.downloadList,
  },

  mutations: {
    WINLOSEALL(state, payload) {
      state.winLoses = payload
    },

    providerListMutation(state, payload) {
      state.providerList = payload
    },
    WINLOSTDOWNLOAD(state, payload) {
      state.downloadList = payload
    },
  },
  actions: {
    winLoselist({ commit }, payload) {
      useJwt
        .fetchData('allMembers', '/win-lose-all-list', {
          params: {
            providers: payload.providers,
            username: payload.username,
            fromDate: payload.fromDate,
            toDate: payload.toDate,
            sortDate: payload.sortDate,
            sortBalance: payload.sortBalance,
            sortWin: payload.sortWin,
            sortLose: payload.sortLose,
            sortPlayerWL: payload.sortPlayerWL,
          },
        })
        .then((response) => {
          commit('WINLOSEALL', response.data.data)
        })
        .catch((error) => {
          commit('WINLOSEALL', error.response.data.message)
          if (error.response.data.code === 403) {
            if (!alert(error.response.data.message)) {
              this.$router.push('/login')
            }
          }
          return false
        })
    },
    fetchProviders({ commit }) {
      useJwt
        .fetchData('allMembers', '/provider-list')
        .then((response) => {
          commit('providerListMutation', response.data.data)
        })
        .catch((error) => {
          commit('providerListMutation', error.response.data.message)
          if (error.response.data.code === 403) {
            if (!alert(error.response.data.message)) {
              this.$router.push('/login')
            }
          }
          return false
        })
    },
    async winLoseDownload({ commit }, payload) {
      useJwt
        .winLoseAllDownload({
          params: {
            providers: payload.providers,
            username: payload.username,
            fromDate: payload.fromDate,
            toDate: payload.toDate,
          },
        })
        .then((response) => {
          commit('WINLOSTDOWNLOAD', response.data)
        })
        .catch((error) => {
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
