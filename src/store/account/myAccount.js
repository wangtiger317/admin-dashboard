// module services this
import useJwt from '@/auth/jwt/useJwt'

export default {
  state: {
    myAccounts: [],
  },

  getters: {
    getMyacount: (state) => state.myAccounts,
  },

  mutations: {
    MYACCOUNT(state, payload) {
      state.myAccounts = payload
    },
  },

  actions: {
    // MY ACCOUNT
    accountlist({ commit }) {
      useJwt
        .myAccount({})
        .then((response) => {
          commit('MYACCOUNT', response.data.data)
        })
        .catch((error) => {
          commit('MYACCOUNT', error.response.data.code)
          if (error.response.data.code === 403) {            
            if (!alert('Access Denied!.')) {
              this.$router.push('/login')
            }
          }
        })
    },
  },
}
