import useJwt from '@/auth/jwt/useJwt'

export default {
  state: {
    withdrawal: [],
    withdrawProg: [],
    originBank: [],
    bankListDropDown: [],
  },

  getters: {
    getWithdrawalCount: (state) => state.withdrawal,
    getWithdrawProgress: (state) => state.withdrawProg,
    getOriginBank: (state) => state.originBank,
    getBankWithdrawList: (state) => state.bankListDropDown,
  },

  mutations: {
    WITHDRAWALAPPROVED(state, payload) {
      state.withdrawal = payload
    },

    setWithdrawProgress(state, payload) {
      state.withdrawProg = payload
    },

    setOriginBank(state, payload) {
      state.originBank = payload
    },

    DeleteWithdrawProgress(state, deleteProgress) {
      const eventIndex = state.withdrawProg.data.data.filter(
        (e) => e.id != deleteProgress
      )
      state.withdrawProg.data = eventIndex
    },
    setBankListDropdown(state, payload) {
      state.bankListDropDown = payload
    },
  },

  actions: {
    // withdrawallist approved list
    withdrawallist({ commit }, payload) {
      useJwt
        .withdrawalApproved({
          params: {
            page: payload.page,
            username: payload.username,
          },
        })
        .then((response) => {
          commit('WITHDRAWALAPPROVED', response.data.data)
        })
        .catch((error) => {
          commit('WITHDRAWALAPPROVED', error.response.data.message)
          if (error.response.data.code === 403) {
            if (!alert(error.response.data.message)) {
              this.$router.push('/login')
            }
          }
          return false
        })
    },

    // withdraw progress list
    withdrawProgresList({ commit }, payload) {
      useJwt
        .withdrawProgress({
          params: {
            page: payload.page,
            username: payload.username,
            bank: payload.value,
          },
        })
        .then((response) => {
          commit('setWithdrawProgress', response.data.data)
        })
        .catch((error) => {
          commit('setWithdrawProgress', error.response.data.message)
          if (error.response.data.code === 403) {
            if (!alert(error.response.data.message)) {
              this.$router.push('/login')
            }
          }
          return false
        })
    },

    // origin bank
    fetchOriginList({ commit }) {
      useJwt
        .fetchData('servicesAccount', '/withdraw-origin-bank')
        .then((response) => {
          commit('setOriginBank', response.data.data)
        })
        .catch((error) => {
          commit('setOriginBank', error.response.data.message)
          if (error.response.data.code === 403) {
            if (!alert(error.response.data.message)) {
              this.$router.push('/login')
            }
          }
          return false
        })
    },

    async ApproveWithdraw({ commit }, payload) {
      const { id } = payload
      try {
        await useJwt.updateData(
          'servicesAccount',
          `/withdrawal/approve-withdral/${id}`
        )
        // approve
        useJwt
          .withdrawalApproved({
            params: {
              page: payload.page,
              username: payload.username,
            },
          })
          .then((response) => {
            commit('WITHDRAWALAPPROVED', response.data.data)
          })
          .catch((error) => {
            commit('WITHDRAWALAPPROVED', error.response.data.message)
            if (error.response.data.code === 403) {
              if (!alert(error.response.data.message)) {
                this.$router.push('/login')
              }
            }
            return false
          })

        // progress
        useJwt
          .withdrawProgress({
            params: {
              page: payload.page,
              username: payload.username,
            },
          })
          .then((response) => {
            commit('setWithdrawProgress', response.data.data)
          })
          .catch((error) => {
            commit('setWithdrawProgress', error.response.data.message)
            if (error.response.data.code === 403) {
              if (!alert(error.response.data.message)) {
                this.$router.push('/login')
              }
            }
            return false
          })
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

    // DELETE THIS
    async DeleteWithdrawProgress({ commit }, payload) {
      const { id } = payload
      try {
        await useJwt.DeleteProgressData(
          'servicesAccount',
          `/withdrawal/delete-withdral/${id}`
        )
        commit('DeleteWithdrawProgress', payload.id)
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

    fetchBankWithdrawList({ commit }) {
      try {
        useJwt
          .fetchData('servicesAccount', '/bank-list-dropdown-wd')
          .then((response) => {
            commit('setBankListDropdown', response.data.data)
          })
          .catch((error) => {
            commit('setBankListDropdown', error.response.data.message)
          })
      } catch (err) {
        console.log(err)
      }
    },

    // CANCEL WIHDRAW
    async cancelApprove({ commit }, payload) {
      const { id } = payload.item
      try {
        await useJwt.updateData('servicesAccount', `/withdraw-cancel?id=${id}`)

        // approve
        useJwt
          .withdrawalApproved({
            params: {
              page: payload.page,
              username: payload.username,
            },
          })
          .then((response) => {
            commit('WITHDRAWALAPPROVED', response.data.data)
          })
          .catch((error) => {
            commit('WITHDRAWALAPPROVED', error.response.data.message)
            if (error.response.data.code === 403) {
              if (!alert(error.response.data.message)) {
                this.$router.push('/login')
              }
            }
            return false
          })

        // progress
        useJwt
          .withdrawProgress({
            params: {
              page: payload.page,
              username: payload.username,
            },
          })
          .then((response) => {
            commit('setWithdrawProgress', response.data.data)
          })
          .catch((error) => {
            commit('setWithdrawProgress', error.response.data.message)
            if (error.response.data.code === 403) {
              if (!alert(error.response.data.message)) {
                this.$router.push('/login')
              }
            }
            return false
          })
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
