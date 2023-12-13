// module referral this
import useJwt from '@/auth/jwt/useJwt'
export default {
  state: {
    referrallog: [],
    dropdownList: [],
  },
  getters: {
    getReferralLog: (state) => state.referrallog,
    getDropdownList: (state) => state.dropdownList,
  },

  mutations: {
    DAILYREFERRALLOG(state, payload) {
      state.referrallog = payload
    },
    dropdownList(state, payload) {
      state.dropdownList = payload
    },
  },
  actions: {
    async memberloglist({ commit }, payload) {
      useJwt
        .dailyReferralLog({
          params: {
            providers: payload.providers,
            fromDate: payload.fromDate,
            toDate: payload.toDate,
            groupBy: payload.groupBy,
            sortType: payload.sortType,
            sortBy: payload.sortBy,
          },
        })
        .then((response) => {
          commit('DAILYREFERRALLOG', response.data.data)
        })
        .catch((error) => {
          if (error.response.data.code === 403) {
            if (!alert(error.response.data.message)) {
              this.$router.push('/login')
            }
          }
          return false
        })
    },
    fetchDropDownlist({ commit }) {
      useJwt.fetchData('settingAll', '/pasaran-filter').then((response) => {
        commit('dropdownList', response.data.data)
      })
    },
  },
}
