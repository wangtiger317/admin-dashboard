import useJwt from '@/auth/jwt/useJwt'

export default {
  state: {
    keluaranScan: [],
    detailScan: [],
  },

  getters: {
    getScanKeluaranList: (state) => state.keluaranScan,
    getDetailScan: (state) => state.detailScan,
  },

  mutations: {
    setScanList(state, payload) {
      state.keluaranScan = payload
    },

    setDetailScan(state, payload) {
      state.detailScan = payload
    },
  },

  actions: {
    // LIST
    scanKeluaranList({ commit }, payload) {
      useJwt
        .fetchData('allKeluaran', '/scan', {
          params: {
            pasaran: payload.pasaran,
            sortProfitMin: payload.sortProfitMin,
            sortProfitMax: payload.sortProfitMax,
            sortOptions: payload.sortOptions,
          },
        })
        .then((response) => {
          commit('setScanList', response.data.data)
        })
        .catch((error) => {
          commit('setScanList', error.response.data.message)
          if (error.response.data.code === 403) {            
            if (!alert(error.response.data.message)) {
              this.$router.push('/login')
            }
          }
          return false
        })
    },

    // DETAIL
    async detailKeluaranList({ commit }, payload) {
      const { id } = payload
      try {
        const res = await useJwt.fetchData('allKeluaran', `/scan/details/${id}`)
        commit('setDetailScan', res.data.data)
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
