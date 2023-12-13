// module services this
import useJwt from '@/auth/jwt/useJwt'

export default {
  state: {
    bankAccount: [],
    rekPulsa: [],
    bankUser: [],
    bankFilters: [],
    rekeningFilters: [],
    bankTujuan: [],
  },

  getters: {
    getBankAccount: (state) => state.bankAccount,
    getRekPulsa: (state) => state.rekPulsa,
    getBankUser: (state) => state.bankUser,
    getBankFilter: (state) => state.bankFilters,
    getRekeningFilter: (state) => state.rekeningFilters,
    getBankTujuan: (state) => state.bankTujuan,
  },

  mutations: {
    BANKTUJUAN(state, payload) {
      state.bankTujuan = payload
    },
    BANKACCOUNT(state, payload) {
      state.bankAccount = payload
    },
    REKPULSA(state, payload) {
      state.rekPulsa = payload
    },
    BANKUSER(state, payload) {
      state.bankUser = payload
    },
    BANKFILTER(state, payload) {
      state.bankFilters = payload
    },
    REKENINGFILTER(state, payload) {
      state.rekeningFilters = payload
    },

    DELETE_BANK_ACCOUNT(state, bankId) {
      const eventIndex = state.bankAccount.data.filter((e) => e.id !== bankId)
      state.bankAccount.data = eventIndex
    },
    ADD_BANK_ACCOUNT(state, payload) {
      state.bankAccount.data.unshift(payload)
    },
  },
  actions: {
    // BANK ACCOUNT LIST
    bankAccountlist({ commit }, payload) {
      useJwt
        .fetchData('servicesAccount', '/bank-account-list', {
          params: {
            page: payload.page,
            nameAccount: payload.nameAccount,
          },
        })
        .then((response) => {
          commit('BANKACCOUNT', response.data.data)
        })
        .catch((error) => {
          commit('BANKACCOUNT', error.response.data.message)
          if (error.response.data.code === 403) {
            if (!alert(error.response.data.message)) {
              this.$router.push('/login')
            }
          }
          return false
        })
    },

    // BANK ACCOUNT CREATE
    async createBankAccount({ commit }, payload) {
      try {
        await useJwt.createData(
          'servicesAccount',
          '/bank-account-create',
          payload
        )
        useJwt
          .fetchData('servicesAccount', '/bank-account-list', {
            params: {
              page: payload.page,
              nameAccount: payload.nameAccount,
            },
          })
          .then((response) => {
            commit('BANKACCOUNT', response.data.data)
          })
          .catch((error) => {
            commit('BANKACCOUNT', error.response.data.message)
            if (error.response.data.code === 403) {
              if (!alert(error.response.data.message)) {
                this.$router.push('/login')
              }
            }
            return false
          })
        // commit('ADD_BANK_ACCOUNT', res.data.data)
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

    // BANK ACCOUNT UPDATE
    async bankAccountUpdate({ commit }, payload) {
      const { id, ...data } = payload
      const body = {
        namaRekeningBank: data.rekName,
        nomor_rekening: data.noRek,
        userBanking: data.userBanking,
        passBanking: data.passBanking,
        status: data.status,
      }
      try {
        await useJwt.updateData(
          'servicesAccount',
          `/bank-account-update?id=${id}`,
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

    rekPulsalist({ commit }, payload) {
      useJwt
        .rekeningPulsa({
          params: {
            page: payload.page,
          },
        })
        .then((response) => {
          commit('REKPULSA', response.data.data)
        })
        .catch((error) => {
          commit('REKPULSA', error.response.data.message)
          if (error.response.data.code === 403) {
            if (!alert(error.response.data.message)) {
              this.$router.push('/login')
            }
          }
          return false
        })
    },

    // bank list
    bankUserList({ commit }, payload) {
      useJwt
        .bankUser({
          params: {
            username: payload.username,
            bank: payload.bank,
            rekTujuan: payload.rekTujuan,
            orderBy: payload.orderBy,
            sortBy: payload.sortBy,
            page: payload.page,
          },
        })
        .then((response) => {
          commit('BANKUSER', response.data.data)
        })
        .catch((error) => {
          commit('BANKUSER', error.response.data.message)
          if (error.response.data.code === 403) {
            if (!alert(error.response.data.message)) {
              this.$router.push('/login')
            }
          }
          return false
        })
    },

    // rekening tujuan list
    async rekeningTujunDrop({ commit }, payload) {
      const { constantId } = payload
      try {
        const res = await useJwt.fetchData(
          'servicesAccount',
          `/user-rekening-tujuan/${constantId}`
        )
        commit('BANKTUJUAN', res.data.data)
        return true
      } catch (error) {
        commit('BANKTUJUAN', error.response.data.message)
        if (error.response.data.code === 403) {
          if (!alert(error.response.data.message)) {
            this.$router.push('/login')
          }
        }
        return false
      }
    },

    // bank filter
    bankFilterlist({ commit }) {
      useJwt
        .bankFilter({})
        .then((response) => {
          commit('BANKFILTER', response.data.data)
        })
        .catch((error) => {
          commit('BANKFILTER', error.response.data.message)
          if (error.response.data.code === 403) {
            if (!alert(error.response.data.message)) {
              this.$router.push('/login')
            }
          }
          return false
        })
    },

    // rekening filter
    rekeningFilterlist({ commit }) {
      useJwt
        .rekeningFilter({})
        .then((response) => {
          commit('REKENINGFILTER', response.data.data)
        })
        .catch((error) => {
          commit('REKENINGFILTER', error.response.data.message)
          if (error.response.data.code === 403) {
            if (!alert(error.response.data.message)) {
              this.$router.push('/login')
            }
          }
          return false
        })
    },
    async deleteBankAccount({ commit }, bankaccount) {
      try {
        const res = await useJwt.deleteBankAccount({
          params: { id: bankaccount.id },
        })
        if (res.status === 200 || res.status === 204) {
          commit('DELETE_BANK_ACCOUNT', bankaccount.id)
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
    // LIST USER UPDATE
    async listUserUpdate({ commit }, payload) {
      const { id, tujuan_rek_id } = payload
      const body = {
        tujuan_rek_id,
      }
      try {
        await useJwt.updateData(
          'servicesAccount',
          `/bank-user-rekening-tujuan-update/${id}`,
          body
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
  },
}
