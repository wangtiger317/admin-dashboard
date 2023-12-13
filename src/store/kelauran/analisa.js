import useJwt from '@/auth/jwt/useJwt'

export default {
  state: {
    analisaKeluaran: [],
  },

  getters: {
    getAnalisaKeluaran: (state) => state.analisaKeluaran,
  },

  mutations: {
    setAnalisaList(state, payload) {
      state.analisaKeluaran = payload
    },
  },

  actions: {
    analisaKeluaranList({ commit }, payload) {
      useJwt
        .fetchData('allKeluaran', '/analisa', {
          params: {
            id_pasaran: payload.id_pasaran,
            hasil: payload.hasil,
            page: payload.page,
          },
        })
        .then((response) => {
          commit('setAnalisaList', response.data.data)
        })
        .catch((error) => {
          commit('setAnalisaList', error.response.data.message)
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
