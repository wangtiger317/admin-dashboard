// module services this
import useJwt from '@/auth/jwt/useJwt'

export default {
  state: {
    memoList: [],
    memoDetail: [],
    memberDrop: [],
  },

  getters: {
    getMemoList: (state) => state.memoList,
    getMemoDetail: (state) => state.memoDetail,
    getMemberDrop: (state) => state.memberDrop,
  },

  mutations: {
    MESSAGELIST(state, payload) {
      state.memoList = payload
    },

    MESSAGEDETAIL(state, payload) {
      state.memoDetail = payload
    },

    MEMBERLISTDROP(state, payload) {
      state.memberDrop = payload
    },
  },

  actions: {
    // MESSAGE LIST
    fetchMemolist({ commit }, payload) {
      useJwt
        .fetchData('allMembers', '/memo-list', {
          params: {
            changeMod: payload.changeMod,
            searchMemo: payload.searchMemo,
            page: payload.page,
          },
        })
        .then((response) => {
          commit('MESSAGELIST', response.data.data)
          return true
        })
        .catch((error) => {
          commit('MESSAGELIST', error.response.data.message)
          if (error.response.data.code === 403) {
            if (!alert(error.response.data.message)) {
              this.$router.push('/login')
            }
          }
          return false
        })
    },

    async fetchMemberlist({ commit }) {
      try {
        const res = await useJwt.fetchData('filterUsername')
        commit('MEMBERLISTDROP', res.data.data)
      } catch (error) {
        // throw error.response.data.message
        if (error.response.data.code === 403) {
          if (!alert(error.response.data.message)) {
            this.$router.push('/login')
          }
        }
        return false
      }
    },

    // MESSAGE DETAIL
    async detailMemoList({ commit }, payload) {
      const { id } = payload
      try {
        const res = await useJwt.fetchData('allMembers', `/memo-details/${id}`)
        commit('MESSAGEDETAIL', res.data.data)
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
