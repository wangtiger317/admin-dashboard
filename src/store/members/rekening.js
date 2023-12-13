import useJwt from '@/auth/jwt/useJwt'

export default {
  state: {
    memberRekeningList: [],
    constantRekeningList: [],
    constantRekeningTujuanList: [],
    createRekening: [],
  },
  getters: {
    getmemberRekeningList: (state) => state.memberRekeningList,
    getConstantRekeningList: (state) => state.constantRekeningList,
    getConstantRekeningTujuanList: (state) => state.constantRekeningTujuanList,
  },
  mutations: {
    CONSTANTREKENINGLIST(state, payload) {
      state.constantRekeningList = payload
    },

    CONSTANTREKENINGTUJUANLIST(state, payload) {
      state.constantRekeningTujuanList = payload
    },

    addmemberRekeningList(state, payload) {
      state.memberRekeningList = payload
    },

    DELETE_MEMBER_LIST(state, delete_user) {
      const eventIndex = state.memberRekeningList.filter(
        (e) => e.id != delete_user
      )
      state.memberRekeningList = eventIndex
    },
    CREATE__REKENING(state, payload) {
      state.createRekening = payload
    },
  },

  actions: {
    ConstantRekeningList({ commit }) {
      useJwt
        .fetchData('allMembers', '/bank-dropdown')
        .then((response) => {
          commit('CONSTANTREKENINGLIST', response.data.data)
        })
        .catch((error) => {
          commit('CONSTANTREKENINGLIST', error.response.data.message)
          if (error.response.data.code === 403) {
            if (!alert(error.response.data.message)) {
              this.$router.push('/login')
            }
          }
          return false
        })
    },

    ConstantRekeningTujuanList({ commit }, payload) {
      const { constId } = payload
      useJwt
        .fetchData('allMembers', `/member-rekening-tujuan/${constId}`)
        .then((response) => {
          commit('CONSTANTREKENINGTUJUANLIST', response.data.data)
        })
        .catch((error) => {
          commit('CONSTANTREKENINGTUJUANLIST', error.response.data.message)
          if (error.response.data.code === 403) {
            if (!alert(error.response.data.message)) {
              this.$router.push('/login')
            }
          }
          return false
        })
    },

    async memberAccountList({ commit }, payload) {
      const { id } = payload
      try {
        const res = await useJwt.getDataList(
          'allMembers',
          `/member-rekening-list/${id}`
        )
        commit('addmemberRekeningList', res.data.data)
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

    async deleteUserList({ commit }, payload) {
      const { id } = payload
      try {
        const res = await useJwt.deletememberUser(
          'allMembers',
          `/member-delete-rekening/${id}`
        )
        commit('DELETE_MEMBER_LIST', payload.id)
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
    async createRekening({ commit }, payload) {
      const { id } = payload
      const params = {
        constantBankId: payload.bankID,
        nomor_rekening: payload.rekening,
        nama_rekening: payload.name,
      }
      try {
        const res = await useJwt.createData(
          'allMembers',
          `/member-create-rekening/${id}`,
          params
        )
        commit('CREATE__REKENING', res.data.data)
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
