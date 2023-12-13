import useJwt from '@/auth/jwt/useJwt'

export default {
  state: {
    adminBroadcast: [],
    memberBroadcast: [],
    broadcashTop: [],
  },

  getters: {
    getBroadcast: (state) => state.adminBroadcast,
    getMemberCast: (state) => state.memberBroadcast,
    getBroadcastTop: (state) => state.broadcashTop,
  },

  mutations: {
    // ADMIN
    BROADCASTADMIN(state, payload) {
      state.adminBroadcast = payload
    },

    // CREATE
    addAdminList(state, payload) {
      state.adminBroadcast.data.unshift(payload)
    },

    // UPDATE
    updateAdmin(state, payload) {
      state.adminBroadcast.data.map((datas) => {
        if (datas.id === payload.id) return payload
        return datas
      })
    },

    // DELETE
    adminDelete(state, adminsId) {
      const eventIndex = state.adminBroadcast.data.filter(
        (e) => e.id != adminsId
      )
      state.adminBroadcast.data = eventIndex
    },

    //  MEMBER
    BROADCASTMEMBER(state, payload) {
      state.memberBroadcast = payload
    },

    // CREATE
    addMemberList(state, payload) {
      state.memberBroadcast.data.unshift(payload)
    },

    // UPDATE
    updateMember(state, payload) {
      state.memberBroadcast.data.map((datas) => {
        if (datas.id === payload.id) return payload
        return datas
      })
    },

    // DELETE
    memberDelete(state, adminssId) {
      const eventIndex = state.memberBroadcast.data.filter(
        (e) => e.id != adminssId
      )
      state.memberBroadcast.data = eventIndex
    },

    // BROADCASH TOP
    broadcashTop(state, payload) {
      state.broadcashTop = payload
    },
  },

  actions: {
    //  ADMIN BROADCAST LIST
    adminBrodacastList({ commit }, payload) {
      useJwt
        .fetchData('lainLainAll', '/broadcast-admin-list', {
          params: {
            search: payload.search,
            page: payload.page,
          },
        })
        .then((response) => {
          commit('BROADCASTADMIN', response.data.data)
        })
        .catch((error) => {
          commit('BROADCASTADMIN', error.response.data.message)
          if (error.response.data.code === 403) {
            if (!alert(error.response.data.message)) {
              this.$router.push('/login')
            }
          }
          return false
        })
    },

    //  ADMIN BROADCAST CREATE
    async createAdmin({ commit }, payload) {
      const { message } = payload
      const body = {
        message,
      }
      try {
        const res = await useJwt.createData(
          'lainLainAll',
          '/broadcast-admin-create',
          body
        )
        commit('addAdminList', res.data.data)
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

    //  ADMIN BROADCAST UPDATE
    async updateAdmin({ commit }, payload) {
      const { id, ...data } = payload
      const body = {
        message: data.message,
        enabled: data.enabled == 'true' ? true : (data.enabled == 'false'? false : data.enabled),
      }
      try {
        const res = await useJwt.updateData(
          'lainLainAll',
          `/broadcast-update?id=${id}&area=backend`,
          {
            ...body,
          }
        )
        commit('updateAdmin', res.data.data)
        useJwt
          .fetchData('lainLainAll', '/broadcast-admin-list', {
            params: {
              search: payload.search,
              page: payload.page,
            },
          })
          .then((response) => {
            commit('BROADCASTADMIN', response.data.data)
          })
          .catch((error) => {
            commit('BROADCASTADMIN', error.response.data.message)
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

    // ADMIN BROADCAST DELETE
    async deleteAdmin({ commit }, payload) {
      const { id } = payload
      try {
        await useJwt.deleteData(
          'lainLainAll',
          `/broadcast-delete?id=${id}&area=backend`
        )
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

    // MEMBER BROADCAST LIST
    memberBrodacastList({ commit }, payload) {
      useJwt
        .fetchData('lainLainAll', '/broadcast-member-list', {
          params: {
            search: payload.search,
            page: payload.page,
          },
        })
        .then((response) => {
          commit('BROADCASTMEMBER', response.data.data)
        })
        .catch((error) => {
          commit('BROADCASTMEMBER', error.response.data.message)
          if (error.response.data.code === 403) {
            if (!alert(error.response.data.message)) {
              this.$router.push('/login')
            }
          }
          return false
        })
    },

    //  MEMBER BROADCAST CREATE
    async createMember({ commit }, payload) {
      const { message } = payload
      const body = {
        message,
      }
      try {
        const res = await useJwt.createData(
          'lainLainAll',
          '/broadcast-member-create',
          body
        )
        commit('addMemberList', res.data.data)
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

    // MEMBER BROADCAST UPDATE
    async updateMember({ commit }, payload) {
      const { id, ...data } = payload
      const body = {
        message: data.message,
        enabled: data.enabled == 'true' ? true : (data.enabled == 'false'? false : data.enabled),
      }
      try {
        const res = await useJwt.updateData(
          'lainLainAll',
          `/broadcast-update?id=${id}&area=frontend`,
          {
            ...body,
          }
        )
        commit('updateMember', res.data.data)
        useJwt
          .fetchData('lainLainAll', '/broadcast-member-list', {
            params: {
              search: payload.search,
              page: payload.page,
            },
          })
          .then((response) => {
            commit('BROADCASTMEMBER', response.data.data)
          })
          .catch((error) => {
            commit('BROADCASTMEMBER', error.response.data.message)
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
    async deleteMember({ commit }, payload) {
      const { id } = payload
      try {
        await useJwt.deleteData(
          'lainLainAll',
          `/broadcast-delete?id=${id}&area=frontend `
        )
        commit('memberDelete', payload.id)
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

    // BROADCASH TOP
    broadcashTop({ commit }) {
      useJwt
        .fetchData('servicesAccount', `/notif-body`, {})
        .then((response) => {
          commit('broadcashTop', response.data.data)
        })
        .catch((error) => {
          commit('broadcashTop', error.response.data.message)
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
