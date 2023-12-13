// module services this
import useJwt from '@/auth/jwt/useJwt'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

export default {
  component:{    
    ToastificationContent,
  },

  state: {
    dashboards: [],
  },

  getters: {
    getDashboards: (state) => state.dashboards,
  },

  mutations: {
    DASHBOARD(state, payload) {
      state.dashboards = payload
    },
  },

  actions: {
    //  Dashboard
    dashboardlist({ commit }) {
      useJwt
        .dashboardStatus({})
        .then((response) => {
          commit('DASHBOARD', response.data.data)
        })
        .catch((error) => {          
          commit('DASHBOARD', error.response.data)
          if (error.response.data.code === 403) {            
            if (!alert(error.response.data.message)) {
              this.$router.push('/login')
            }
          }
          return false
        })
    },
  },
}
