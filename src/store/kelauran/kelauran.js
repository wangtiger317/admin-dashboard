import useJwt from '@/auth/jwt/useJwt'

export default {
  state: {
    keluarans: [],
  },

  getters: {
    getKeluaranList: (state) => state.keluarans,
  },

  mutations: {
    setKeluaranList(state, payload) {
      state.keluarans = payload
    },
  },

  actions: {
    keluaranList({ commit }, payload) {
      useJwt
        .fetchData('allKeluaran', '/kelauran-list', {
          params: {
            pasaran: payload.pasaran,
            page: payload.page,
          },
        })
        .then((response) => {
          commit('setKeluaranList', response.data.data)
        })
        .catch((error) => {
          commit('setKeluaranList', error.response.data.message)
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
