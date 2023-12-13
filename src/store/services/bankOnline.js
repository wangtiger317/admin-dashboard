// module services this
import useJwt from '@/auth/jwt/useJwt'

export default {
  state: {
    bankOnline: [],
  },

  getters: {
    getBankOnline: (state) => state.bankOnline,
  },

  mutations: {
    setBankOnline(state, payload) {
      state.bankOnline = payload
    },
  },

  actions: {
    // list this
    bankOnlinelist({ commit }, payload) {
      useJwt
        .fetchData('servicesAccount', `/bank-online-list`, {
          params: {
            page: payload.page,
          },
        })
        .then((response) => {
          commit('setBankOnline', response.data.data)
        })
        .catch((error) => {
          commit('setBankOnline', error.response.data.message)
        })
    },

    // update this
    async bankOnlineUpdate({ commit }, payload) {
      const { id, ...data } = payload
      const body = {
        status: data.status,
      }
      try {
        await useJwt.updateData(
          'servicesAccount',
          `/bank-online-update?id=${id}`,
          {
            ...body,
          }
        )
        return true
      } catch (error) {
        return false
      }
    },
  },
}
