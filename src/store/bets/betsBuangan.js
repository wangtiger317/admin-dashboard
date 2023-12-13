import useJwt from '@/auth/jwt/useJwt'

export default {
  state: {
    betsBuangan: [],
  },

  getters: {
    getBuanganList: (state) => state.betsBuangan,
  },

  mutations: {
    setBuanganList(state, payload) {
      state.betsBuangan = payload
    },
  },

  actions: {
    buanganBetsList({ commit }, payload) {
      useJwt
        .fetchData('betsAll', '/bet-buangan', {
          params: {
            orderBy: payload.orderBy,
            sortType: payload.sortType,
            whereGame: payload.whereGame,
            pasaran: payload.pasaran,
          },
        })
        .then((response) => {
          commit('setBuanganList', response.data.data)
        })
        .catch((error) => {
          commit('setBuanganList', error.response.data.message)
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
