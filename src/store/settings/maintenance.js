// module services this
import useJwt from '@/auth/jwt/useJwt'

export default {
  state: {
    listMaintenace: [],
  },

  getters: {
    getMaintenace: (state) => state.listMaintenace,
  },

  mutations: {
    MAINTENANCE(state, payload) {
      state.listMaintenace = payload
    },

    updatedMaintenance(state, payload) {
      state.listMaintenace.data.map((datas) => {
        if (datas.id === payload.id) return payload
        return datas
      })
    },
  },

  actions: {
    // LIST THIS
    maintenanceList({ commit }) {
      useJwt
        .fetchData('settingAll', '/maintenance')
        .then((response) => {
          commit('MAINTENANCE', response.data.data)
        })
        .catch((error) => {
          commit('MAINTENANCE', error.response.data.message)
          if (error.response.data.code === 403) {            
            if (!alert(error.response.data.message)) {
              this.$router.push('/login')
            }
          }
          return false
        })
    },

    // UPDATE MAINTENANCE
    async updateMaintenance({ commit }, payload) {
      const { ...data } = payload
      const body = {
        main_maintenance: data.main_maintenance,
        main_maintenance_description: data.main_maintenance_description,
        status: data.status,
      }
      try {
        await useJwt.updateData(
          'settingAll',
          '/maintenance-update',

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
  },
}
