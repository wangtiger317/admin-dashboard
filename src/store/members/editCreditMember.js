// module services this
import useJwt from '@/auth/jwt/useJwt'

export default {
  state: {
    member: [],
    rekeningTujuan: [],
  },

  getters: {
    getMemberEditCredit: (state) => state.member,
  },

  mutations: {
    MEMBERDEPOWD(state, payload) {
      state.member = payload
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
  }
}
