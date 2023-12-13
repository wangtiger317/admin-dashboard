import useJwt from '@/auth/jwt/useJwt'

export default {
  state: {
    filterPasaran: [],
    gameList: [],
  },
  getters: {
    getFilterPasaran: (state) => state.filterPasaran,
    getGameList: (state) => state.gameList,
  },
  mutations: {
    setFilterPasaran(state, payload) {
      state.filterPasaran = payload
    },
    setGameList(state, payload) {
      state.gameList = payload
    },
  },
  actions: {
    async fetchFilterPasaran({ commit }) {
      try {
        const res = await useJwt.fetchData('filterTable')
        commit('setFilterPasaran', res.data.data)
      } catch (error) {
        // throw error.response.data.message
        if (error.response.data.code === 403) {            
          if (!alert(error.response.data.message)) {
            this.$router.push('/login')
          }
        }
        return false
      }
    },
    async fetchGameList({ commit }, payload) {
      try {
        const res = await useJwt.fetchData('betTable', '', {
          params: payload,
        })
        commit('setGameList', res.data.data)
      } catch (error) {
        // throw error.response.data.message
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
