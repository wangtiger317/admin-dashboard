// module bonus & potongan this
import useJwt from '@/auth/jwt/useJwt'

export default {
  state: {
    setTurnover: [],
    setRefferals: [],
    bonusPotongan: [],
    bonusRolingan: [],
  },

  getters: {
    getSetTurnover: (state) => state.setTurnover,
    getSetReferral: (state) => state.setRefferals,
    getbonusPotongan: (state) => state.bonusPotongan,
    getRolinganList: (state) => state.bonusRolingan,
  },

  mutations: {
    //  TURNOVER
    setTurnoverList(state, payload) {
      state.setTurnover = payload
    },

    updateTurnover(state, payload) {
      state.setTurnover.data.map((datas) => {
        if (datas.id === payload.id) return payload
        return datas
      })
    },

    updateCrons(state, payload) {
      state.setTurnover.setting.map((dataId) => {
        if (dataId.id === payload.id) return payload
        return datas
      })
    },

    // REFERRAL
    SETREFERRAL(state, payload) {
      state.setRefferals = payload
    },

    // CASBACK
    setPotonganList(state, payload) {
      state.bonusPotongan = payload
    },

    updatePotongan(state, payload) {
      state.bonusPotongan.data.map((datas) => {
        if (datas.id === payload.id) return payload
        return datas
      })
    },

    // ROLINGAN
    setRolinganList(state, payload) {
      state.bonusRolingan = payload
    },
    updateRolingan(state, payload) {
      state.bonusRolingan.data.map((datas) => {
        if (datas.id === payload.id) return payload
        return datas
      })
    },
  },

  actions: {
    // LIST TUNOVER
    fetchTurnoverList({ commit }, payload) {
      useJwt
        .fetchData('bonusPotonganAll', '/setting-turnover', {
          params: {
            page: payload.page,
          },
        })
        .then((response) => {
          commit('setTurnoverList', response.data.data)
        })
        .catch((error) => {
          commit('setTurnoverList', error.response.data.message)
          if (error.response.data.code === 403) {
            if (!alert(error.response.data.message)) {
              this.$router.push('/login')
            }
          }
          return false
        })
    },

    // UPDATE TUROVER
    async updateTurnover({ commit }, payload) {
      const { id, ...data } = payload
      const body = {
        title: data.judul,
        value: data.value.replace(/,/g, ''),
        type: data.type,
        give: data.type === 'uang' ? data.give.replace(/,/g, '') : data.give,
      }
      try {
        const res = await useJwt.updateData(
          'bonusPotonganAll',
          `/setting-turnover-update?id=${id}`,
          {
            ...body,
          }
        )
        commit('updateTurnover', res.data.data)
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

    // UPDATE CRONT ALL THISSSSS
    async updateCronTurn({ commit }, payload) {
      const { id, ...data } = payload.item
      const body = {
        date_generate: data.date_generate,
        date_send: data.date_send,
        time_generate: data.time_generate,
        time_send: data.time_send,
      }
      try {
        await useJwt.updateData(
          'bonusPotonganAll',
          `/setting-cron-update?id=${id}`,
          {
            ...body,
          }
        )
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

    // bonusReferral
    referrallist({ commit }, payload) {
      useJwt
        .fetchData('bonusPotonganAll', '/setting-referral', {
          params: {
            page: payload.page,
          },
        })
        .then((response) => {
          commit('SETREFERRAL', response.data.data)
        })
        .catch((error) => {
          commit('SETREFERRAL', error.response.data.message)
          if (error.response.data.code === 403) {
            if (!alert(error.response.data.message)) {
              this.$router.push('/login')
            }
          }
          return false
        })
    },

    // UPDATE CRONT ALL THISSSSS
    updateReferral({ commit }, payload) {
      const body = {
        data: payload,
      }
      try {
        useJwt.createData('bonusPotonganAll', '/setting-referral-update', body)
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

    // LIST CASHBACK
    fetchPotonganList({ commit }, payload) {
      useJwt
        .fetchData('bonusPotonganAll', '/setting-cashback', {
          params: {
            page: payload.page,
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

    // UPDATE CASHBACK
    async updatePotongan({ commit }, payload) {
      const { id, ...data } = payload
      const body = {
        title: data.judul,
        value: data.value,
        min_lose: data.min_lose.replace(/,/g, ''),
        max_lose: data.max_lose.replace(/,/g, ''),
      }
      try {
        const res = await useJwt.updateData(
          'bonusPotonganAll',
          `/setting-cashback-update?id=${id}`,
          {
            ...body,
          }
        )
        commit('updatePotongan', res.data.data)
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

    // LIST
    fetchRolinganList({ commit }, payload) {
      useJwt
        .fetchData('bonusPotonganAll', '/setting-rollingan', {
          params: {
            page: payload.page,
          },
        })
        .then((response) => {
          commit('setRolinganList', response.data.data)
        })
        .catch((error) => {
          commit('setRolinganList', error.response.data.message)
          if (error.response.data.code === 403) {
            if (!alert(error.response.data.message)) {
              this.$router.push('/login')
            }
          }
          return false
        })
    },

    // UPDATE
    async updateRolingan({ commit }, payload) {
      const { id, ...data } = payload
      const body = {
        title: data.judul,
        value: data.value,
        min_rollingan: data.min_rollingan.replace(/,/g, ''),
        max_rollingan: data.max_rollingan,
      }
      try {
        const res = await useJwt.updateData(
          'bonusPotonganAll',
          `/setting-rollingan-update?id=${id}`,
          {
            ...body,
          }
        )
        commit('updateRolingan', res.data.data)
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
