// module services this
import useJwt from '@/auth/jwt/useJwt'

export default {
  state: {
    members: [],
    singlePofile: [],
    rekMember: [],
    limitLine: [],
    rekening: [],
    refferalList: [],
  },

  getters: {
    getMembers: (state) => state.members,
    getSingleProfile: (state) => state.singlePofile,
    getRekMember: (state) => state.rekMember,
    getLimitLine: (state) => state.limitLine,
    getRekening: (state) => state.rekening,
    getMemberReferral: (state) => state.refferalList,
  },

  mutations: {
    ALLMEMBERS(state, payload) {
      state.members = payload
    },
    SINGLEPROFILE(state, payload) {
      state.singlePofile = payload
    },
    REKENINGMEMBER(state, payload) {
      state.rekMember = payload
    },
    REFERRAL(state, payload) {
      state.refferalList = payload
    },
    setLimitLine(state, payload) {
      state.limitLine = payload
    },
    setRekening(state, payload) {
      state.rekening = payload
    },
  },
  actions: {
    // member list
    memberlist({ commit }, payload) {
      useJwt
        .fetchData('allMembers', '/list', {
          params: {
            page: payload.page,
            whereOption: payload.whereOption,
            nameOption: payload.nameOption,
            fromDate: payload.fromDate,
            toDate: payload.toDate,
          },
        })
        .then((response) => {
          commit('ALLMEMBERS', response.data.data)
        })
        .catch((error) => {
          commit('ALLMEMBERS', error.response.data.message)
          if (error.response.data.code === 403) {            
            if (!alert(error.response.data.message)) {
              this.$router.push('/login')
            }
          }
          return false
        })
    },

    refferalList({ commit }, payload) {
      useJwt
        .fetchData('allMembers', '/member-referral-list', {
          params: {
            id: payload.id,
            page: payload.page,
          },
        })
        .then((response) => {
          commit('REFERRAL', response.data.data.data)
        })
        .catch((error) => {
          commit('REFERRAL', error.response.data.message)
          if (error.response.data.code === 403) {            
            if (!alert(error.response.data.message)) {
              this.$router.push('/login')
            }
          }
          return false
        })
    },

    memberRekening({ commit }, payload) {
      const { id } = payload
      useJwt
        .fetchData('allMembers', `/rekening-dropdown/${id}`, {})
        .then((response) => {
          commit('REKENINGMEMBER', response.data.data)
        })
        .catch((error) => {
          commit('REKENINGMEMBER', error.response.data.message)
          if (error.response.data.code === 403) {            
            if (!alert(error.response.data.message)) {
              this.$router.push('/login')
            }
          }
          return false
        })
    },

    fetchRekening({ commit }, payload) {
      const { constantId } = payload
      useJwt
        .fetchData('allMembers', `/member-rekening-tujuan/${constantId}`, {})
        .then((response) => {
          commit('setRekening', response.data.data)
        })
        .catch((error) => {
          commit('setRekening', error.response.data.message)
          if (error.response.data.code === 403) {            
            if (!alert(error.response.data.message)) {
              this.$router.push('/login')
            }
          }
          return false
        })
    },

    // PROFILE
    singleProfile({ commit }, payload) {
      const { id } = payload
      useJwt
        .fetchData('allMembers', `/profile-member?id=${id}`, {})
        .then((response) => {
          commit('SINGLEPROFILE', response.data.data)
        })
        .catch((error) => {
          commit('SINGLEPROFILE', error.response.data.message)
          if (error.response.data.code === 403) {            
            if (!alert(error.response.data.message)) {
              this.$router.push('/login')
            }
          }
          return false
        })
    },

    // LIMIT LINE
    fetchLimitLine({ commit }, payload) {
      const { id } = payload
      useJwt
        .fetchData('allMembers', `/limit-line-togel/${id}`, {})
        .then((response) => {
          commit('setLimitLine', response.data.data)
        })
        .catch((error) => {
          commit('setLimitLine', error.response.data.message)
          if (error.response.data.code === 403) {            
            if (!alert(error.response.data.message)) {
              this.$router.push('/login')
            }
          }
          return false
        })
    },

    // data: patload
    // EDIT LIMIT
    async updateLImitLine({ commit }, payload) {
      const { id } = payload
      const body = {
        data: payload,
      }
      try {
        await useJwt.updateData(
          'allMembers',
          `/limit-line-togel-update/${id}`,
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
