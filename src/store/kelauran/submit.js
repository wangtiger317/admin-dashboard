import useJwt from '@/auth/jwt/useJwt'

export default {
  state: {
    submitList: [],
  },
  getters: {
    getSubmitList: (state) => state.submitList,
  },
  mutations: {
    addKeluaranList(state, payload) {
      state.submitList = payload
    },
  },
  actions: {
    // CREATE DATA
    async createSubmitList({ commit }, payload) {
      const { providerSubmit, hasil, tanggal } = payload
      const body = {
        providerSubmit,
        hasil,
        tanggal,
      }
      try {
        const res = await useJwt.createData('allKeluaran', '/submit', body)
        commit('addKeluaranList', res.data.data)
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
