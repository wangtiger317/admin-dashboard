import useJwt from '@/auth/jwt/useJwt'

export default {
  state: {
    freeBets: [],
    freeBetsDetail: [],
  },

  getters: {
    getFreeBet: (state) => state.freeBets,
    getFreeBetDetail: (state) => state.freeBetsDetail,
  },

  mutations: {
    // LIST
    setFreeBetList(state, payload) {
      state.freeBets = payload
    },

    setFreeBetDetail(state, payload) {
      state.freeBetsDetail = payload
    },

    // UPDATE
    updateFree(state, payload) {
      state.freeBets.data.map((datas) => {
        if (datas.id === payload.id) return payload
        return datas
      })
    },

    // DELETE
    freeBetDelete(state, freeid) {
      const eventIndex = state.freeBets.data.filter((e) => e.id != freeid)
      state.freeBets.data = eventIndex
    },

    // CREATE FREE BET
    addList(state, payload) {
      state.freeBets.data.unshift(payload)
    },
  },

  actions: {
    // LIST FREE BET
    rekFreelist({ commit }, payload) {
      useJwt
        .fetchData('bonusPotonganAll', '/freebet-list', {
          params: {
            page: payload.page,
            search: payload.search,
          },
        })
        .then((response) => {
          commit('setFreeBetList', response.data.data)
        })
        .catch((error) => {
          commit('setFreeBetList', error.response.data.message)
          if (error.response.data.code === 403) {
            if (!alert(error.response.data.message)) {
              this.$router.push('/login')
            }
          }
          return false
        })
    },

    freebetDetail({ commit }, payload) {
      const { id } = payload
      useJwt
        .fetchData('bonusPotonganAll', `/freebet-detail/${id}`, {
          params: {
            page: payload.page,
          },
        })
        .then((response) => {
          commit('setFreeBetDetail', response.data.data)
        })
        .catch((error) => {
          commit('setFreeBetDetail', error.response.data.message)
          if (error.response.data.code === 403) {
            if (!alert(error.response.data.message)) {
              this.$router.push('/login')
            }
          }
          return false
        })
    },

    // UPDATE FREE BET
    async updateFree({ commit }, payload) {
      const { id, ...data } = payload
      const body = {
        event: data.event,
        type: data.type,
        status: data.status === 'true' || data.status === true ? 1 : 0,
      }
      // return
      try {
        const res = await useJwt.updateData(
          'bonusPotonganAll',
          `/freebet-update?id=${id}`,
          {
            ...body,
          }
        )
        commit('updateFree', res.data.data)
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

    // DELETE FREE BET
    async freeBetDelete({ commit }, payload) {
      const { id } = payload
      try {
        await useJwt.deleteData('bonusPotonganAll', `/freebet-delete?id=${id}`)
        commit('freeBetDelete', payload.id)
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

    // CREATE FREE BET
    async createFree({ commit }, payload) {
      const { event, amount } = payload
      const body = {
        event,
        amount,
      }
      try {
        await useJwt.createData('bonusPotonganAll', '/freebet-create', body)
        useJwt
          .fetchData('bonusPotonganAll', '/freebet-list', {
            params: {
              page: payload.page,
              search: payload.search,
            },
          })
          .then((response) => {
            commit('setFreeBetList', response.data.data)
          })
          .catch((error) => {
            commit('setFreeBetList', error.response.data.message)
            if (error.response.data.code === 403) {
              if (!alert(error.response.data.message)) {
                this.$router.push('/login')
              }
            }
            return false
          })
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
