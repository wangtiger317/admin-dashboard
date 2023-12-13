import useJwt from '@/auth/jwt/useJwt'

export default {
  state: {
    betsTerpasang: [],
  },

  getters: {
    getTerpasangList: (state) => state.betsTerpasang,
  },

  mutations: {
    setTerpasangList(state, payload) {
      state.betsTerpasang = payload
    },
  },

  actions: {
    buanganTerpasangList({ commit }, payload) {
      useJwt
        .fetchData('betsAll', '/buangan-terpasang', {
          params: {
            orderBy: payload.orderBy,
            sortType: payload.sortType,
            whereGame: payload.whereGame,
            pasaran: payload.pasaran,
            page: payload.page,
            fromDate: payload.fromDate,
            toDate: payload.toDate,
          },
        })
        .then((response) => {
          commit('setTerpasangList', response.data.data)
        })
        .catch((error) => {
          commit('setTerpasangList', error.response.data.message)
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
