import useJwt from '@/auth/jwt/useJwt'

export default {
  state: {
    potonganProviders: [],
    bankEvents: [],
  },

  getters: {
    getPotonganProvider: (state) => state.potonganProviders,
    getBankEvents: (state) => state.bankEvents,
  },

  mutations: {
    setPotonganList(state, payload) {
      state.potonganProviders = payload
    },
    serBankEventsList(state, payload) {
      state.bankEvents = payload
    },
  },

  actions: {
    potonganProviderList({ commit }, payload) {
      useJwt
        .fetchData('bonusPotonganAll', '/potongan-provider-non-bank', {
          params: {
            orderBy: payload.orderBy,
            sortType: payload.sortType,
            event: payload.event,
            toDate: payload.toDate,
            page: payload.page,
            fromDate: payload.fromDate,
          },
        })
        .then((response) => {
          commit('setPotonganList', response.data.data)
        })
        .catch((error) => {
          commit('setPotonganList', error.response.data.message)
          if (error.response.data.code === 403) {            
            if (!alert(error.response.data.message)) {
              this.$router.push('/login')
            }
          }
          return false
        })
    },

    eventBankList({ commit }) {
      useJwt
        .fetchData('bonusPotonganAll', '/potongan-provider-non-bank/events', {})
        .then((response) => {
          commit('serBankEventsList', response.data.data)
        })
        .catch((error) => {
          commit('serBankEventsList', error.response.data.message)
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
