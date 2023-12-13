import useJwt from '@/auth/jwt/useJwt'

export default {
  state: {
    rekeningList: [],
  },
  getters: {
    getRekeningList: (state) => state.rekeningList,
  },
  mutations: {
    setRekeningList(state, payload) {
      state.rekeningList = payload
    },

    updateRekening(state, payload) {
      state.rekeningList.data.map((datas) => {
        if (datas.id === payload.id) return payload
        return datas
      })
    },

    DELETEREKENINGPAULSA(state, accountid) {
      const eventIndex = state.rekeningList.data.filter(
        (e) => e.id != accountid
      )
      state.rekeningList.data = eventIndex
    },
  },

  actions: {
    // LIST
    fetchRekeningList({ commit }, payload) {
      useJwt
        .fetchData('servicesAccount', '/rekening-pulsa-list', {
          params: {
            page: payload.page,
          },
        })
        .then((response) => {
          commit('setRekeningList', response.data.data)
        })
        .catch((error) => {
          commit('setRekeningList', error.response.data.message)
          if (error.response.data.code === 403) {
            if (!alert(error.response.data.message)) {
              this.$router.push('/login')
            }
          }
          return false
        })
    },

    // REKENING PULSA ADD
    async createRekeningPulsa({ commit }, payload) {
      try {
        await useJwt.createData(
          'servicesAccount',
          `/rekening-pulsa-create`,
          payload
        )
        useJwt
          .fetchData('servicesAccount', '/rekening-pulsa-list', {
            params: {
              page: payload.page,
            },
          })
          .then((response) => {
            commit('setRekeningList', response.data.data)
          })
          .catch((error) => {
            commit('setRekeningList', error.response.data.message)
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

    // UPDATE
    async updateRekening({ commit }, payload) {
      const { id, ...data } = payload
      const body = {
        nomor_rekening: data.noRek,
        keteranganNonBank: data.keterangan,
        nett: data.nett,
        enabled: data.is_default === true || data.is_default === 'true' ? 1 : 0,
      }
      try {
        const res = await useJwt.updateData(
          'servicesAccount',
          `/rekening-pulsa-update/${id}`,
          {
            ...body,
          }
        )
        commit('updateRekening', res.data.data)
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

    async deleteAccount({ commit }, account) {
      try {
        const res = await useJwt.deleteBankAccount({
          params: { id: account.id },
        })
        if (res.status == 200 || res.status == 204) {
          commit('DELETEREKENINGPAULSA', account.id)
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
