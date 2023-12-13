import useJwt from '@/auth/jwt/useJwt'

export default {
  state: {
    adminIpList: [],
  },
  getters: {
    getAdminIpList: (state) => state.adminIpList,
  },
  mutations: {
    setAdminIpList(state, payload) {
      payload.data.map((item) => {
        const { whitelisted, ...data } = item
        return {
          ...data,
          whitelisted: !!whitelisted,
        }
      })
      state.adminIpList = payload
    },

    addAdminIpList(state, payload) {
      state.adminIpList.data.unshift(payload)
    },

    updateAdminIp(state, payload) {
      state.adminIpList.data.map((ip) => {
        if (ip.id === payload.id) return payload
        return ip
      })
    },
    DELETE_IP_ADDRESS(state, ip_address) {
      const eventIndex = state.adminIpList.data.filter(
        (e) => e.id != ip_address
      )
      state.adminIpList.data = eventIndex
    },
  },
  actions: {
    // LIST DATA
    fetchAdminIpList({ commit }, payload) {
      useJwt
        .fetchData('adminIp', '/list', {
          params: {
            search: payload.search,
            page: payload.page,
          },
        })
        .then((response) => {
          commit('setAdminIpList', response.data.data)
        })
        .catch((error) => {
          commit('setAdminIpList', error.response.data.message)
          if (error.response.data.code === 403) {
            if (!alert(error.response.data.message)) {
              this.$router.push('/login')
            }
          }
          return false
        })
    },

    // UPDATE DATA
    async updateAdminIp({ commit }, payload) {
      const { id, ...data } = payload
      const body = {
        number1: data.ip1,
        number2: data.ip2,
        number3: data.ip3,
        number4: data.ip4,
        description: data.description,
      }
      try {
        const res = await useJwt.updateData('adminIp', `/update/${id}`, {
          ...body,
        })
        commit('updateAdminIp', res.data.data)
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

    // CREATE DATA
    async createAdminIp({ commit }, payload) {
      const { number1, number2, number3, number4, description } = payload
      const body = {
        number1,
        number2,
        number3,
        number4,
        description,
      }
      try {
        const res = await useJwt.createData('adminIp', '/create', body)
        commit('addAdminIpList', res.data.data)
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

    // UPDATE STATUS
    async toggleAdminIpWhitelist({ commit }, payload) {
      const { id, whitelisted } = payload
      const body = {
        whitelisted,
      }
      try {
        const res = await useJwt.updateData(
          'adminIp',
          `/toggle-enabled/${id}`,
          {
            ...body,
          }
        )
        commit('updateAdminIp', res.data.data)
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

    // DELETE ADMIN IP
    async deleteAdminIP({ commit }, payload) {
      const { id } = payload
      try {
        const res = await useJwt.deleteIP('agentIp', `/delete/${id}`)
        commit('DELETE_IP_ADDRESS', payload.id)
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
