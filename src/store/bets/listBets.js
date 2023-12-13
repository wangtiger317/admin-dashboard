import useJwt from '@/auth/jwt/useJwt'

export default {
  state: {
    betsList: [],
  },
  getters: {
    getBetsList: (state) => state.betsList,
  },
  mutations: {
    setBetsList(state, payload) {
      state.betsList = payload
    },

    adminDelete(state, adminsId) {
      const eventIndex = state.betsList.data.data.filter((e) => e.id != adminsId)
      state.betsList.data.data = eventIndex
    },
  },

  actions: {
    fetchBetsList({ commit }, payload) {
      useJwt
        .fetchData('betsAll', '/list-bets', {
          params: {
            pasaran: payload.pasaran,
            orderBy: payload.orderBy,
            sortType: payload.sortType,
            whereGame: payload.whereGame,
            search: payload.username,
            page: payload.page,
          },
        })
        .then((response) => {
          commit('setBetsList', response.data.data)
        })
        .catch((error) => {
          commit('setBetsList', error.response.data.message)
          if (error.response.data.code === 403) {            
            if (!alert(error.response.data.message)) {
              this.$router.push('/login')
            }
          }
          return false
        })
    },

    async deleteAdmin({ commit }, payload) {
      const { id } = payload
      try {
        await useJwt.deleteData('betsAll', `/list-bet-delete/${id}`)
        commit('adminDelete', payload.id)
        return true
      } catch (error) {
        if (error.response.data.code === 403) {            
          if (!alert(error.response.data.message)) {
            this.$router.push('/login')
          }
        }
        return false
      }
    },
  },
}
