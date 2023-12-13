// module services this
import useJwt from '@/auth/jwt/useJwt'

export default {
  state: {
    mutasiEdits: [],
  },

  getters: {
    getMutasiEdit: (state) => state.mutasiEdits,
  },

  mutations: {
    MUTASIEDIT(state, payload) {
      state.mutasiEdits = payload
    },
  },

  actions: {
    // MUTASI EDIT
    mutasiEditlist({ commit }, payload) {
      useJwt
        .mutasiEdit({
          params: {
            whereOption: payload.whereOption,
            nameOption: payload.nameOption,
            fromDate: payload.fromDate,
            toDate: payload.toDate,
            page: payload.page,
          },
        })
        .then((response) => {
          commit('MUTASIEDIT', response.data.data)
        })
        .catch((error) => {
          commit('MUTASIEDIT', error.response.data.message)
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
