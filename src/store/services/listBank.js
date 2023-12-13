import useJwt from '@/auth/jwt/useJwt'

export default {
  state: {
    bankNameList: [],
    rekeningConstantList: [],
    rekeningPulsaCons: [],
  },
  getters: {
    getBankNameList: (state) => state.bankNameList,
    getRekeningConstantList: (state) => state.rekeningConstantList,
    getRekeningPulsa: (state) => state.rekeningPulsaCons,
  },
  mutations: {
    setBankList(state, payload) {
      state.bankNameList = payload
    },

    setRekeningPulsa(state, payload) {
      state.rekeningPulsaCons = payload
    },

    setRekeningConstantList(state, payload) {
      state.rekeningConstantList = payload
    },

    updateBankName(state, payload) {
      state.bankNameList.data.map((datas) => {
        if (datas.id === payload.id) return payload
        return datas
      })
    },

    DELETE_BANK_NAME(state, bankId) {
      const eventIndex = state.bankNameList.data.filter((e) => e.id !== bankId)
      state.bankNameList.data = eventIndex
    },
  },

  actions: {
    // LIST
    fetchBankNameList({ commit }, payload) {
      useJwt
        .fetchData('servicesAccount', '/bank-name-list', {
          params: {
            page: payload.page,
            bankName: payload.nameAccount,
          },
        })
        .then((response) => {
          commit('setBankList', response.data.data)
        })
        .catch((error) => {
          commit('setBankList', error.response.data.message)
          if (error.response.data.code === 403) {            
            if (!alert(error.response.data.message)) {
              this.$router.push('/login')
            }
          }
          return false
        })
    },

    // LIST
    fetchRekeningPulsa({ commit }) {
      useJwt
        .fetchData('servicesAccount', '/constant-rekening-nonbank-list')
        .then((response) => {
          commit('setRekeningPulsa', response.data.data)
        })
        .catch((error) => {
          commit('setRekeningPulsa', error.response.data.message)
          if (error.response.data.code === 403) {            
            if (!alert(error.response.data.message)) {
              this.$router.push('/login')
            }
          }
          return false
        })
    },

    // LIST
    fetchRekeningConstantList({ commit }) {
      useJwt
        .fetchData('servicesAccount', '/constant-rekening-list')
        .then((response) => {
          commit('setRekeningConstantList', response.data.data)
        })
        .catch((error) => {
          commit('setRekeningConstantList', error.response.data.message)
          error.response.data.message
        })
    },

    // UPDATE
    async updateBankName({ commit }, payload) {
      const { id, ...data } = payload
      const body = {
        name: data.name,
        status: data.is_bank,
      }
      try {
        const res = await useJwt.updateData(
          'servicesAccount',
          `/constant-rekening-update/?id=${id}`,
          {
            ...body,
          }
        )
        commit('updateBankName', res.data.data)
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

    // create
    async createBankName({ commit }, payload) {
      const { name, status } = payload
      const body = {
        name,
        status,
      }
      try {
        const res = await useJwt.createData(
          'servicesAccount',
          '/constant-rekening-create',
          body
        )
        useJwt
          .fetchData('servicesAccount', '/bank-name-list', {
            params: {
              page: payload.page,
              bankName: payload.nameAccount,
            },
          })
          .then((response) => {
            commit('setBankList', response.data.data)
          })
          .catch((error) => {
            commit('setBankList', error.response.data.message)
            if (error.response.data.code === 403) {            
              if (!alert(error.response.data.message)) {
                this.$router.push('/login')
              }
            }
            return false
          })
        commit('addAdminList', res.data.data)
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

    async deleteBankName({ commit }, bankaccount) {
      try {
        const res = await useJwt.deleteBankName({
          params: { id: bankaccount.id },
        })
        if (res.status === 200 || res.status === 204) {
          commit('DELETE_BANK_NAME', bankaccount.id)
        }
      } catch (error) {
        // throw error.response.data.message
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
