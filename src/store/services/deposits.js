import useJwt from '@/auth/jwt/useJwt'

export default {
  state: {
    depositProgres: [],
    depositApproveds: [],
    rekeningTujuan: [],
    bankListDropDown: [],
  },

  getters: {
    getDepositList: (state) => state.depositProgres,
    getDepositApproved: (state) => state.depositApproveds,
    getRekening: (state) => state.rekeningTujuan,
    getBankList: (state) => state.bankListDropDown,
  },

  mutations: {
    setDepositProgress(state, payload) {
      state.depositProgres = payload
    },

    ApproveDepositProg(state, payload) {
      state.depositProgres.data.map((datas) => {
        if (datas.id === payload.id) return payload
        return datas
      })
    },

    setDepositApproved(state, payload) {
      state.depositApproveds = payload
    },

    PROGRESS_DELETE(state, progressID) {
      const eventIndex = state.depositProgres.data.filter(
        (e) => e.id != progressID
      )
      state.depositProgres.data = eventIndex
    },

    setTujuanRekening(state, payload) {
      state.rekeningTujuan = payload
    },
    setBankListDropdown(state, payload) {
      state.bankListDropDown = payload
    },
  },
  actions: {
    // DEPOSIT IN PROGRESS
    fetchDepositList({ commit }, payload) {
      useJwt
        .fetchData('servicesAccount', `/deposit/deposits-in-progress`, {
          params: {
            username: payload.username,
            bank: payload.value,
          },
        })
        .then((response) => {
          commit('setDepositProgress', response.data.data)
        })
        .catch((error) => {
          commit('setDepositProgress', error.response.data.message)
          if (error.response.data.code === 403) {
            if (!alert(error.response.data.message)) {
              this.$router.push('/login')
            }
          }
          return false
        })
    },

    // DEPOSIT APPROVE
    fetchApprovedList({ commit }, payload) {
      useJwt
        .depositApproved({
          params: {
            toDate: payload.toDate,
            fromDate: payload.fromDate,
            whereOption: payload.whereOption,
            nameOption: payload.nameOption,
            page: payload.page,
          },
        })
        .then((response) => {
          commit('setDepositApproved', response.data.data)
        })
        .catch((error) => {
          commit('setDepositApproved', error.response.data.message)
          if (error.response.data.code === 403) {
            if (!alert(error.response.data.message)) {
              this.$router.push('/login')
            }
          }
          return false
        })
    },

    // DELETE PROGRESS
    async deleteProgress({ commit }, payload) {
      const { id } = payload
      try {
        const res = await useJwt.deleteDepositProgress(
          'deleteProgress',
          `/delete-deposit/${id}`
        )
        commit('PROGRESS_DELETE', payload.id)
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

    // rekening tujuan
    fetchRekeningList({ commit }) {
      useJwt
        .fetchData('servicesAccount', '/deposit/rekening-tujuan-depo')
        .then((response) => {
          commit('setTujuanRekening', response.data.data)
        })
        .catch((error) => {
          commit('setTujuanRekening', error.response.data.message)
          if (error.response.data.code === 403) {
            if (!alert(error.response.data.message)) {
              this.$router.push('/login')
            }
          }
          return false
        })
    },

    // bank list dropdown
    fetchBankList({ commit }) {
      try {
        useJwt
          .fetchData('servicesAccount', '/deposit/bank-list-dropdown-depo')
          .then((response) => {
            commit('setBankListDropdown', response.data.data)
          })
          .catch((error) => {
            commit('setBankListDropdown', error.response.data.message)
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

    // apptove
    async ApproveDepositProg({ commit }, payload) {
      const { id, ...data } = payload
      const body = {
        members_id: data.members_id,
        rekening_id: data.rekening_id,
        jumlah: data.jumlah,
        credit: data.credit,
        memberCredit: data.memberCredit,
        saldo_awal: data.saldo_awal,
        saldo_akhir: data.saldo_akhir,
      }
      try {
        await useJwt.updateData('servicesAccount', `/deposit/approve/${id}`, {
          ...body,
        })
        // progress
        useJwt
          .depositProgress({
            params: {
              page: payload.page,
              username: payload.username,
            },
          })
          .then((response) => {
            commit('setDepositProgress', response.data.data)
          })
          .catch((error) => {
            commit('setDepositProgress', error.response.data.message)
            if (error.response.data.code === 403) {
              if (!alert(error.response.data.message)) {
                this.$router.push('/login')
              }
            }
            return false
          })

        // approved
        useJwt
          .depositApproved({
            params: {
              toDate: payload.toDate,
              fromDate: payload.fromDate,
              whereOption: payload.whereOption,
              nameOption: payload.nameOption,
              page: payload.page,
            },
          })
          .then((response) => {
            commit('setDepositApproved', response.data.data)
          })
          .catch((error) => {
            commit('setDepositApproved', error.response.data.message)
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

    // CANCEL
    async CancelProg({ commit }, payload) {
      const { id, ...data } = payload.item
      const body = {
        members_id: data.members_id,
        rekening_id: data.tujuanIdRek,
        jumlah: data.amount,
        memberCredit: data.memberCredit,
        saldo_awal: data.saldo_awal,
        saldo_akhir: data.saldo_akhir,
      }

      try {
        await useJwt.updateData(
          'servicesAccount',
          `/deposit/cancel-deposit/${id}`,
          {
            ...body,
          }
        )

        // progress
        useJwt
          .depositProgress({
            params: {
              page: payload.page,
              username: payload.username,
            },
          })
          .then((response) => {
            commit('setDepositProgress', response.data.data)
          })
          .catch((error) => {
            commit('setDepositProgress', error.response.data.message)
            if (error.response.data.code === 403) {
              if (!alert(error.response.data.message)) {
                this.$router.push('/login')
              }
            }
            return false
          })

        // approved
        useJwt
          .depositApproved({
            params: {
              toDate: payload.toDate,
              fromDate: payload.fromDate,
              whereOption: payload.whereOption,
              nameOption: payload.nameOption,
              page: payload.page,
            },
          })
          .then((response) => {
            commit('setDepositApproved', response.data.data)
          })
          .catch((error) => {
            commit('setDepositApproved', error.response.data.message)
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
