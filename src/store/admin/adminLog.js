// module admin this
import useJwt from '@/auth/jwt/useJwt'
export default {
  state: {
    admislog: [],
  },
  getters: {
    getAdminLog: (state) => state.admislog,
  },

  mutations: {
    ADMINLOG(state, payload) {
      state.admislog = payload
    },
  },
  actions: {
    adminloglist({ commit }, payload) {
      useJwt
        .adminLog({
          params: {
            whereOption: payload.whereOption,
            nameOption: payload.nameOption,
            fromDate: payload.fromDate,
            toDate: payload.toDate,
            page: payload.page,
          },
        })
        .then((response) => {
          commit('ADMINLOG', response.data.data)
        })
        .catch((error) => {
          commit('ADMINLOG', error.response.data.message)
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
