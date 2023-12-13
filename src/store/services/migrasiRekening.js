import useJwt from '@/auth/jwt/useJwt'

export default {
  state: {
    rekeningAsal: [],
    rekeningTujuan: [],
  },

  getters: {
    getRekeningAsal: state => state.rekeningAsal,
    getRekeningTujuan: state => state.rekeningTujuan,
  },

  mutations: {
    rekeningAsalMutation(state, payload) {
      state.rekeningAsal = payload
    },

    rekeningTujuanMutation(state, payload) {
      state.rekeningTujuan = payload
    },
  },

  actions: {
    rekeningAsalList({ commit }) {
      useJwt
        .fetchData('servicesAccount', '/rekening-asal')
        .then(response => {
          commit('rekeningAsalMutation', response.data.data)
        })
        .catch(error => {
          commit('rekeningAsalMutation', error.response.data.message)
          if (error.response.data.code === 403) {            
            if (!alert(error.response.data.message)) {
              this.$router.push('/login')
            }
          }
          return false
        })
    },

    rekeningTujuanList({ commit }, payload) {
      useJwt
        .fetchData('servicesAccount', '/rekening-tujuan', {
          params: {
            id: payload.id,
          },
        })
        .then(response => {
          commit('rekeningTujuanMutation', response.data.data)
        })
        .catch(error => {
          commit('rekeningTujuanMutation', error.response.data.message)
          if (error.response.data.code === 403) {            
            if (!alert(error.response.data.message)) {
              this.$router.push('/login')
            }
          }
          return false
        })
    },

    async migrateRekining({ commit }, payload) {
      try {
        const response = await useJwt.updateData('servicesAccount', '/migrasi-rekening', {
          ...payload,
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
          errors: error?.response,
        }
      }
    },
  },
}