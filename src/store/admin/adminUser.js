// module admin this
import useJwt from '@/auth/jwt/useJwt'

export default {
  state: {
    adminActive: [],
    adminDeactive: [],
    adminRules: [],
    adminRoles: [],
    modulePermissions: [],
    adminUser: null,
  },
  getters: {
    getAdminList: (state) => state.adminActive,
    getAdminDeactive: (state) => state.adminDeactive,
    getAdminRules: (state) => state.adminRules,
    getAdminRoles: (state) => state.adminRoles,
    getmodulePermissions: (state) => state.modulePermissions,
    getAdminUser: (state) => state.adminUser,
  },

  mutations: {
    //set module permissions
    setModulePermissions(state, payload) {
      state.modulePermissions = payload
    },

    // ACTIVE
    adminActive(state, payload) {
      state.adminActive = payload
    },

    // DEACTIVE
    adminDeactive(state, payload) {
      state.adminDeactive = payload
    },

    // ADMIN RULES
    setAdminRules(state, payload) {
      state.adminRules = payload
    },

    setAdminRoles(state, payload) {
      state.adminRoles = payload
    },

    // DELETE
    adminDelete(state, bankId) {
      // const eventIndex = state.adminDeactive.data.filter((e) => e.id != bankId)
      // state.adminDeactive.data = eventIndex
    },

    createAdminUserMutation(state, payload) {
      if (state.adminActive) {
        // let data = state.adminActive
        //
        // data.push(payload)
        // state.adminActive = data;
      }
    },

    adminUserMutation(state, payload) {
      state.adminUser = payload
    },

    updateAdminUserMutation(state, payload) {
      // const existingData = state.adminDeactive.filter((e) => e.id != payload.id)
      // state.adminDeactive.data = existingData
    },
  },

  actions: {
    // Fetch ModulePermissions
    fetchModulePermissions({ commit }) {
      useJwt
        .fetchData('agentAll', '/all/module-permissions')
        // test
        .then((response) => {
          commit('setModulePermissions', response.data.data)
        })
        .catch((error) => {
          commit('setModulePermissions', error.response.data.message)
          if (error.response.data.code === 403) {
            if (!alert(error.response.data.message)) {
              this.$router.push('/login')
            }
          }
          return false
        })
    },

    // ADMIN RULES
    adminRulesList({ commit }) {
      useJwt
        .fetchData('agentAll', '/admin-rules')
        // test
        .then((response) => {
          commit('setAdminRules', response.data.data)
        })
        .catch((error) => {
          commit('setAdminRules', error.response.data.message)
          if (error.response.data.code === 403) {
            if (!alert(error.response.data.message)) {
              this.$router.push('/login')
            }
          }
          return false
        })
    },

    adminRolesList({ commit }) {
      useJwt
        .fetchData('agentAll', '/all/roles')
        // test
        .then((response) => {
          commit('setAdminRoles', response.data.data)
        })
        .catch((error) => {
          commit('setAdminRoles', error.response.data.message)
          if (error.response.data.code === 403) {
            if (!alert(error.response.data.message)) {
              this.$router.push('/login')
            }
          }
          return false
        })
    },

    // ACTIVE ADMIN USER
    adminActivelist({ commit }, payload) {
      useJwt
        .fetchData('agentAll', '/active-user/list', {
          params: {
            search: payload.search,
            page: payload.page,
          },
        })
        .then((response) => {
          commit('adminActive', response.data.data)
        })
        .catch((error) => {
          commit('adminActive', error.response.data.message)
          if (error.response.data.code === 403) {
            if (!alert(error.response.data.message)) {
              this.$router.push('/login')
            }
          }
          return false
        })
    },

    // DEACTIVE USER
    adminDeactivelist({ commit }, payload) {
      useJwt
        .fetchData('agentAll', '/deactivated-user/list', {
          params: {
            search: payload.search,
            page: payload.page,
          },
        })
        .then((response) => {
          commit('adminDeactive', response.data.data)
        })
        .catch((error) => {
          commit('adminDeactive', error.response.data.message)
          if (error.response.data.code === 403) {
            if (!alert(error.response.data.message)) {
              this.$router.push('/login')
            }
          }
          return false
        })
    },

    // UPDATE ACTION DEACTIVE
    async UpdateDeactive({ commit }, payload) {
      const { id } = payload
      try {
        await useJwt.updateData('agentAll', `/deactivate-user/${id}`)
        // active
        useJwt
          .fetchData('agentAll', '/active-user/list', {
            params: {
              search: payload.search,
              page: payload.page,
            },
          })
          .then((response) => {
            commit('adminActive', response.data.data)
          })
          .catch((error) => {
            commit('adminActive', error.response.data.message)
            if (error.response.data.code === 403) {
              if (!alert(error.response.data.message)) {
                this.$router.push('/login')
              }
            }
            return false
          })

        // deactive
        useJwt
          .fetchData('agentAll', '/deactivated-user/list', {
            params: {
              search: payload.search,
              page: payload.page,
            },
          })
          .then((response) => {
            commit('adminDeactive', response.data.data)
          })
          .catch((error) => {
            commit('adminDeactive', error.response.data.message)
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

    // UPDATE ACTION REACTIVE
    async UpdateReactive({ commit }, payload) {
      const { id } = payload
      try {
        await useJwt.updateData('agentAll', `/activate-user/${id}`)
        // active
        useJwt
          .fetchData('agentAll', '/active-user/list', {
            params: {
              search: payload.search,
              page: payload.page,
            },
          })
          .then((response) => {
            commit('adminActive', response.data.data)
          })
          .catch((error) => {
            commit('adminActive', error.response.data.message)
            if (error.response.data.code === 403) {
              if (!alert(error.response.data.message)) {
                this.$router.push('/login')
              }
            }
            return false
          })

        // deactive

        useJwt
          .fetchData('agentAll', '/deactivated-user/list', {
            params: {
              search: payload.search,
              page: payload.page,
            },
          })
          .then((response) => {
            commit('adminDeactive', response.data.data)
          })
          .catch((error) => {
            commit('adminDeactive', error.response.data.message)
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

    // DELETE
    async deleteAdminUserDeactivate({ commit }, payload) {
      const { id } = payload
      try {
        await useJwt.deleteAdmin('agentAll', `/delete-admin/${id}`)
        // active
        useJwt
          .fetchData('agentAll', '/active-user/list', {
            params: {
              search: payload.search,
              page: payload.page,
            },
          })
          .then((response) => {
            commit('adminActive', response.data.data)
          })
          .catch((error) => {
            commit('adminActive', error.response.data.message)
            if (error.response.data.code === 403) {
              if (!alert(error.response.data.message)) {
                this.$router.push('/login')
              }
            }
            return false
          })

        // deactive
        useJwt
          .fetchData('agentAll', '/deactivated-user/list', {
            params: {
              search: payload.search,
              page: payload.page,
            },
          })
          .then((response) => {
            commit('adminDeactive', response.data.data)
          })
          .catch((error) => {
            commit('adminDeactive', error.response.data.message)
            if (error.response.data.code === 403) {
              if (!alert(error.response.data.message)) {
                this.$router.push('/login')
              }
            }
            return false
          })
        commit('adminDelete', payload.id)
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

    async createAdminUser({ commit }, payload) {
      try {
        const response = await useJwt.createData(
          'agentAll',
          `/create-admin`,
          payload
        )

        const data = response?.data?.data
        commit('createAdminUserMutation', data)

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
          data: error?.response,
        }
      }
    },

    async updateAdminUser({ commit }, payload) {
      const id = payload.id
      delete payload.id
      try {
        const response = await useJwt.updateData(
          'agentAll',
          `/update-admin/${id}`,
          payload
        )

        const data = response?.data?.data
        commit('updateAdminUserMutation', data)

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
          data: error?.response,
        }
      }
    },

    async fetchAdminUser({ commit }, id) {
      try {
        const response = await useJwt.fetchData(
          'agentAll',
          `/get-admin-user/${id}`
        )

        const data = response?.data?.data
        commit('adminUserMutation', data)

        return {
          status: true,
          data,
        }
      } catch (error) {
        if (error.response.data.code === 403) {
          if (!alert(error.response.data.message)) {
            this.$router.push('/login')
          }
        }
        return {
          status: false,
          data: error?.response,
        }
      }
    },

    async changePassword({ commit }, payload) {
      const { id } = payload
      delete payload.id
      try {
        const response = await useJwt.updateData(
          'agentAll',
          `/admin-user-change-password/${id}`,
          payload
        )

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
          data: error?.response,
        }
      }
    },
  },
}
