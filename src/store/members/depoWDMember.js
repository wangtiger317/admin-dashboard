// module services this
import useJwt from '@/auth/jwt/useJwt'

export default {
  state: {
    member: [],
    rekeningTujuan: [],
  },

  getters: {
    getMemberDepoWd: (state) => state.member,
    getRekeningTujuan: (state) => state.rekeningTujuan,
  },

  mutations: {
    MEMBERDEPOWD(state, payload) {
      state.member = payload
    },
    REKENINGTUJUAN(state, payload) {
      state.rekeningTujuan = payload
    },
  },
  actions: {
    memberDepoWd({ commit }, payload) {
        const {id} = payload
        useJwt
          .fetchData('allMembers', `/member-depowd/${id}`, {})
          .then((response) => {            
            commit('MEMBERDEPOWD', response.data.data)
          })
          .catch((error) => {
            commit('MEMBERDEPOWD', error.response.data.message)
            if (error.response.data.code === 403) {            
              if (!alert(error.response.data.message)) {
                this.$router.push('/login')
              }
            }
            return false
          })
    },
    rekeningTujuanMember({ commit }, payload) {
        const {form} = payload
        useJwt
          .fetchData('allMembers', `/rekening-tujuan-dropdown/${form}`, {})
          .then((response) => {            
            commit('REKENINGTUJUAN', response.data.data)
          })
          .catch((error) => {
            commit('REKENINGTUJUAN', error.response.data.message)
            if (error.response.data.code === 403) {            
              if (!alert(error.response.data.message)) {
                this.$router.push('/login')
              }
            }
            return false
          })
    },
  }
}
