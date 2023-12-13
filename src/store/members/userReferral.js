// module services this
import useJwt from '@/auth/jwt/useJwt'

export default {
  state: {
    userReferrals: [],
    userReferralDetails: [],
  },

  getters: {
    getUserReferral: (state) => state.userReferrals,
    getUserReferralDetail: (state) => state.userReferralDetails,
  },

  mutations: {
    USERREFERRAL(state, payload) {
      state.userReferrals = payload
    },
    USERREFERRALDETAIL(state, payload) {
      state.userReferralDetails = payload
    },
  },

  actions: {
    userReferrallist({ commit }, payload) {
      useJwt
        .fetchData('allMembers', '/user-referral-list', {
          params: {
            page: payload.page,
          },
        })
        .then((response) => {
          commit('USERREFERRAL', response.data.data)
        })
        .catch((error) => {
          commit('USERREFERRAL', error.response.data.message)
          if (error.response.data.code === 403) {            
            if (!alert(error.response.data.message)) {
              this.$router.push('/login')
            }
          }
          return false
        })
    },
    userReferralDetaillist({ commit }, payload) {
      const { id, page } = payload
      useJwt
        .fetchData('allMembers', `/user-referral-detail/${id}`, {
          params: {
            page: page,
          },
        })
        .then((response) => {
          commit('USERREFERRALDETAIL', response.data.data)
        })
        .catch((error) => {
          commit('USERREFERRALDETAIL', error.response.data.message)
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
