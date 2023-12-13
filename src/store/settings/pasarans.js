// module services this
import useJwt from '@/auth/jwt/useJwt'

export default {
  state: {
    listPeriods: [],
    listPasaran: [],
    settingBloks: [],
  },

  getters: {
    getListPeriode: (state) => state.listPeriods,
    getListPasaran: (state) => state.listPasaran,
    getSettingBloks: (state) => state.settingBloks,
  },

  mutations: {
    PERIODE(state, payload) {
      state.listPeriods = payload
    },

    PASARAN_LIST(state, payload) {
      state.listPasaran = payload
    },

    PASARANDELETE(state, pasId) {
      const eventIndex = state.listPasaran.data.filter((e) => e.id != pasId)
      state.listPasaran.data = eventIndex
    },

    BLOKS(state, payload) {
      state.settingBloks = payload
    },
    PASARANDELETE(state, accountid) {
      const eventIndex = state.settingBloks.data.filter(
        (e) => e.id != accountid
      )
      state.settingBloks.data = eventIndex
    },
  },

  actions: {
    periodeList({ commit }) {
      useJwt
        .listPeriode({})
        .then((response) => {
          commit('PERIODE', response.data.data)
        })
        .catch((error) => {
          commit('PERIODE', error.response.data.message)
          if (error.response.data.code === 403) {
            if (!alert(error.response.data.message)) {
              this.$router.push('/login')
            }
          }
          return false
        })
    },

    MarketList({ commit }) {
      useJwt
        .listMarket({})
        .then((response) => {
          commit('PASARAN_LIST', response.data.data)
        })
        .catch((error) => {
          commit('PASARAN_LIST', error.response.data.message)
          if (error.response.data.code === 403) {
            if (!alert(error.response.data.message)) {
              this.$router.push('/login')
            }
          }
          return false
        })
    },

    async pasaranUpdate({ commit }, payload) {
      const { id, ...data } = payload.item
      const body = {
        website_url: data.website_url,
        hari_diundi: data.hari_diundi,
        tutup: data.tutup,
        jadwal: data.jadwal,
        name: data.name,
        name_initial: data.name_initial,
        libur: data.libur,
      }
      await useJwt.updateData('settingAll', `/pasaran-update?id=${id}`, {
        ...body,
      })
      try {
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

    settingBlokList({ commit }, payload) {
      useJwt
        .settingBlok({
          params: {
            page: payload.page,
          },
        })
        .then((response) => {
          commit('BLOKS', response.data.data)
        })
        .catch((error) => {
          commit('BLOKS', error.response.data.message)
          if (error.response.data.code === 403) {
            if (!alert(error.response.data.message)) {
              this.$router.push('/login')
            }
          }
          return false
        })
    },

    async deletePasaran({ commit }, payload) {
      const { id } = payload.item
      try {
        await useJwt.createData('settingAll', `/pasaran-delete?id=${id}`)
        useJwt
          .listMarket({})
          .then((response) => {
            commit('PASARAN_LIST', response.data.data)
          })
          .catch((error) => {
            commit('PASARAN_LIST', error.response.data.message)
            if (error.response.data.code === 403) {
              if (!alert(error.response.data.message)) {
                this.$router.push('/login')
              }
            }
            return false
          })
        commit('PASARANDELETE', payload.id)
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

    async deleteBlok({ commit }, payload) {
      const { id } = payload
      try {
        const res = await useJwt.deleteBlok(
          'settingAll',
          `/block-angka-delete/${id}`
        )
        commit('BLOKITEMDELETE', payload.id)
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

    async createBlok({ dispatch }, payload) {
      try {
        const response = await useJwt.createData(
          'settingAll',
          '/block-angka-create',
          payload
        )

        dispatch('settingBlokList', {
          page: 1,
        })

        return {
          status: true,
          data: response.data,
        }
      } catch (error) {
        if (error.response.data.code === 403) {
          if (!alert(error.response.data.message)) {
            this.$router.push('/login')
          }
        }
        return {
          status: false,
          errors: error.response,
        }
      }
    },
  },
}
