import useJwt from '@/auth/jwt/useJwt'

export default {
  state: {
    bonusHis: [],
    dropDown: [],
  },

  getters: {
    getBonusHistory: (state) => state.bonusHis,
    getBonusDropdown: (state) => state.dropDown,
  },

  mutations: {
    setBonusHisList(state, payload) {
      state.bonusHis = payload
    },

    setDropDown(state, payload) {
      state.dropDown = payload
    },
  },

  actions: {
    // history list
    historyBonusList({ commit }, payload) {
      useJwt
        .fetchData('bonusPotonganAll', '/bonus-history', {
          params: {
            bonus: payload.bonus,
            orderBy: payload.orderBy,
            sortType: payload.sortType,
            toDate: payload.toDate,
            page: payload.page,
            fromDate: payload.fromDate,
          },
        })
        .then((response) => {
          commit('setBonusHisList', response.data.data)
        })
        .catch((error) => {
          commit('setBonusHisList', error.response.data.message)
          if (error.response.data.code === 403) {            
            if (!alert(error.response.data.message)) {
              this.$router.push('/login')
            }
          }
          return false
        })
    },

    dropDownList({ commit }, payload) {
      useJwt
        .fetchData('bonusPotonganAll', '/bonus-list-dropdown', {})
        .then((response) => {
          commit('setDropDown', response.data.data)
        })
        .catch((error) => {
          commit('setDropDown', error.response.data.message)
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
