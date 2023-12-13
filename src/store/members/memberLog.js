// module services this
import useJwt from '@/auth/jwt/useJwt'

export default {
  state: {
    memberLogs: [],
  },

  getters: {
    getMemberLog: (state) => state.memberLogs,
  },

  mutations: {
    MEMBERLOG(state, payload) {
      state.memberLogs = payload
    },
  },

  actions: {
    memberLoglist({ commit }, payload) {
      useJwt
        .fetchData('allMembers', '/member-log-list', {
          params: {
            whereOption: payload.whereOption,
            nameOption: payload.nameOption,
            fromDate: payload.fromDate,
            toDate: payload.toDate,
            page: payload.page,
          },
        })
        .then((response) => {
          commit('MEMBERLOG', response.data.data)
        })
        .catch((error) => {
          commit('MEMBERLOG', error.response.data.message)
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
