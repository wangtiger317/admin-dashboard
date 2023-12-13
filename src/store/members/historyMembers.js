// module services this
import useJwt from '@/auth/jwt/useJwt'

export default {
  state: {
    historyMember: [],
    historyTransaksi: [],
    detailHistoryTransaksi: [],
  },

  getters: {
    getHistoryMember: (state) => state.historyMember,
    getHistoryTransaksi: (state) => state.historyTransaksi,
    getDetailHistoryTransaksi: (state) => state.detailHistoryTransaksi,
  },

  mutations: {
    HISTORYMEMBERS(state, payload) {
      state.historyMember = payload
    },
    HISTORYTRANSAKSI(state, payload) {
      state.historyTransaksi = payload
    },
    DETAILHISTORYTRANSAKSI(state, payload) {
      state.detailHistoryTransaksi = payload
    },
  },
  actions: {
    // history member
    historyMember({ commit }, payload) {
      useJwt
        .fetchData('allMembers', '/history-member', {
          params: {
            id: payload.id
          }
        })
        .then((response) => {
          commit('HISTORYMEMBERS', response.data.data)
        })
        .catch((error) => {
          commit('HISTORYMEMBERS', error.response.data.message)
          if (error.response.data.code === 403) {            
            if (!alert(error.response.data.message)) {
              this.$router.push('/login')
            }
          }
          return false
        })
    },
    historyTransaksi({ commit }, payload) {
      useJwt
        .fetchData('allMembers', '/history-transaksi-member-list', {
          params: {
            id: payload.id,
            filter: payload.filter,
            betID: payload.betId,
            page: payload.page
          }
        })
        .then((response) => {
          commit('HISTORYTRANSAKSI', response.data.data)
        })
        .catch((error) => {
          commit('HISTORYTRANSAKSI', error.response.data.message)
          if (error.response.data.code === 403) {            
            if (!alert(error.response.data.message)) {
              this.$router.push('/login')
            }
          }
          return false
        })
    },
    detailHistoryTransaksi({ commit }, payload) {
      const {id} = payload
      useJwt
        .fetchData('allMembers', `/history-detail-transaksi-member-list/${id}`, {
          params: {
            page: payload.page
          }
        })
        .then((response) => {
          commit('DETAILHISTORYTRANSAKSI', response.data.data)
        })
        .catch((error) => {
          commit('DETAILHISTORYTRANSAKSI', error.response.data.message)
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
