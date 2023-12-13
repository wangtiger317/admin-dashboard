// module admin this
import useJwt from '@/auth/jwt/useJwt'
export default {
  state: {
    adminLevels: [],
    createAgentRole: [],
    getPermission: [],
  },
  getters: {
    getAdminLevel: (state) => state.adminLevels,
    createAdminAgentRole: (state) => state.createAgentRole,
    GetPermissionList: (state) => state.getPermission,
  },

  mutations: {
    setAdminLevel(state, payload) {
      state.adminLevels = payload
    },
    DELETE_AGENT_ROLE(state, agent_role) {
      const eventIndex = state.adminLevels.data.filter(
        (e) => e.id != agent_role
      )
      state.adminLevels.data = eventIndex
    },
    CREATE_AGENT_ROLE(state, payload) {
      state.createAgentRole = payload
    },
    setPermissionList(state, payload) {
      state.getPermission = payload
    },
  },

  actions: {
    levelList({ commit }, payload) {
      useJwt
        .adminLevel({
          params: {
            search: payload.search,
            page: payload.page,
          },
        })
        .then((response) => {
          commit('setAdminLevel', response.data.data)
        })
        .catch((error) => {
          commit('setAdminLevel', error.response.data)
          if (error.response.data.code === 403) {
            if (!alert(error.response.data.message)) {
              this.$router.push('/login')
            }
          }
          return false
        })
    },
    async deleteAgentRole({ commit }, payload) {
      const { id } = payload
      try {
        const res = await useJwt.deletAdminRole(
          'agentAll',
          `/level/delete/${id}`
        )
        commit('DELETE_AGENT_ROLE', payload.id)
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
    async UpdateAgentRole({ commit }, payload) {
      const { id } = payload
      const params = {
        name: payload.name,
        permissions: payload.permissions,
      }
      try {
        await useJwt.updateData('agentAll', `/level/update/${id}`, params)
        useJwt
          .adminLevel({
            params: {
              page: payload.page,
            },
          })
          .then((response) => {
            commit('setAdminLevel', response.data.data)
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
    async CreateAgentRole({ commit }, payload) {
      try {
        await useJwt.createData('agentAll', '/level/create', payload)
        useJwt
          .adminLevel({
            params: {
              page: payload.page,
            },
          })
          .then((response) => {
            commit('setAdminLevel', response.data.data)
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
    async fetchPermissionList({ commit }) {
      useJwt
        .fetchData('agentAll', '/level/permissions-list')
        .then((response) => {
          commit('setPermissionList', response.data.data)
        })
        .catch((error) => {
          commit('setPermissionList', error.response.data.message)
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
