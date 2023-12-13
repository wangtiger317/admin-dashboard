// module services this
import useJwt from '@/auth/jwt/useJwt'

export default {
  state: {
    depositNav: [],
    withdrawNav: [],
  },

  getters: {
    getDepoCount: (state) => state.depositNav,
    getWithdrawCount: (state) => state.withdrawNav,
  },

  mutations: {
    setDepositNav(state, payload) {
      state.depositNav = payload
    },

    setWithdrawNav(state, payload) {
      state.withdrawNav = payload
    },
  },

  actions: {
    // deposit
    fetchDeposit({ commit }) {
      useJwt
        .fetchData('servicesAccount', `/deposit-right-nav`, {})
        .then((response) => {
          commit('setDepositNav', response.data.data)
        })
        .catch((error) => {
          commit('setDepositNav', error.response.data.message)
          if (error.response.data.code === 403) {            
            if (!alert(error.response.data.message)) {
              this.$router.push('/login')
            }
          }
          return false
        })
    },

    // wihdraw
    fetchWithdraw({ commit }) {
      useJwt
        .fetchData('servicesAccount', `/withdraw-right-nav`, {})
        .then((response) => {
          commit('setWithdrawNav', response.data.data)
        })
        .catch((error) => {
          commit('setWithdrawNav', error.response.data.message)
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
