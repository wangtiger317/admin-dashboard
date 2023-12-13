// module services this
import useJwt from '@/auth/jwt/useJwt'

export default {
  state: {
    mutasiBank: [],
    mutasiDownload: [],
    mutasiDetail: [],
  },

  getters: {
    getmutasiBank: (state) => state.mutasiBank,
    getMutasDownload: (state) => state.mutasiDownload,
    getDetailMutasi: (state) => state.mutasiDetail,
  },

  mutations: {
    MUTASIBANK(state, payload) {
      state.mutasiBank = payload
    },

    MUTASDOWNLOAD(state, payload) {
      state.mutasiDownload = payload
    },

    MUTASIDETAIL(state, payload) {
      state.mutasiDetail = payload
    },
  },

  actions: {
    // Mutasi Bank list
    mutasiBankList({ commit }, payload) {
      useJwt
        .fetchData('servicesAccount', '/mutasi-bank-list', {
          params: {
            page: payload.page,
            fromDate: payload.fromDate,
            toDate: payload.toDate,
          },
        })
        .then((response) => {
          commit('MUTASIBANK', response.data.data)
        })
        .catch((error) => {
          commit('MUTASIBANK', error.response.data.message)
          if (error.response.data.code === 403) {            
            if (!alert(error.response.data.message)) {
              this.$router.push('/login')
            }
          }
          return false
        })
    },

    // donload mutasi
    downloadMutasiList({ commit }, payload) {
      useJwt
        .fetchData('servicesAccount', '/mutasi-bank-download', {
          params: {
            fromDate: payload.fromDate,
            toDate: payload.toDate,
          },
        })
        .then((response) => {
          commit('MUTASDOWNLOAD', response.data.data)
        })
        .catch((error) => {
          commit('MUTASDOWNLOAD', error.response.data.message)
          if (error.response.data.code === 403) {            
            if (!alert(error.response.data.message)) {
              this.$router.push('/login')
            }
          }
          return false
        })
    },

    // DETAIL MUTASI
    async detailMutasiList({ commit }, payload) {
      const { rekId } = payload
      try {
        const res = await useJwt.getDataList(
          'servicesAccount',
          `/mutasi-bank-details/${rekId}`
        )
        commit('MUTASIDETAIL', res.data.data)
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
