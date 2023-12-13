// module services this
import useJwt from '@/auth/jwt/useJwt'

export default {
  state: {
    winLosedetails: [],
    winLosedetailsDownload: [],
  },

  getters: {
    getWinLoseDetail: (state) => state.winLosedetails,
    getWinLoseDetailDownload: (state) => state.winLosedetailsDownload,
  },

  mutations: {
    WINLOSEALLDETAILS(state, payload) {
      state.winLosedetails = payload
    },

    WINLOSEALLDETAILSDOWNLOAD(state, payload) {
      state.winLosedetailsDownload = payload
    },
  },
  actions: {
    // WINLOSE DETAIL
    winLosedetail({ commit }, payload) {
      const { providers, memberId, fromDate, toDate } = payload
      useJwt
        .fetchData(
          'allMembers',
          `/win-lose-all-detail-list/${providers}/${memberId}/${fromDate}/${toDate}`,
          {}
        )
        .then((response) => {
          commit('WINLOSEALLDETAILS', response.data.data)
        })
        .catch((error) => {
          commit('WINLOSEALLDETAILS', error.response.data.message)
          if (error.response.data.code === 403) {
            if (!alert(error.response.data.message)) {
              this.$router.push('/login')
            }
          }
          return false
        })
    },

    // WINLOSE DETAIL
    winLosedetailDownload({ commit }, payload) {
      const { providers, memberId, fromDate, toDate } = payload
      useJwt
        .fetchData(
          'allMembers',
          `/win-lose-all-detail-list-download/${providers}/${memberId}/${fromDate}/${toDate}`,
          {}
        )
        .then((response) => {
          commit('WINLOSEALLDETAILSDOWNLOAD', response.data.data)
        })
        .catch((error) => {
          commit('WINLOSEALLDETAILSDOWNLOAD', error.response.data.message)
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
