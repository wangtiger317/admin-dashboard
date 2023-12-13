// module services this
import useJwt from '@/auth/jwt/useJwt'
export default {
  state: {
    balanceBank: [],
  },

  getters: {
    getbalanceBank: (state) => state.balanceBank,
  },

  mutations: {
    // list this
    BALANCEBANK(state, payload) {
      state.balanceBank = payload
    },
  },

  actions: {
    // list this
    balanceBankList({ commit }, payload) {
      useJwt
        .fetchData('servicesAccount', '/balance-bank-list', {
          params: {
            page: payload.page,
          },
        })
        .then((response) => {
          commit('BALANCEBANK', response.data.data)
        })
        .catch((error) => {
          commit('BALANCEBANK', error.response.data.message)
          if (error.response.data.code === 403) {
            if (!alert(error.response.data.message)) {
              this.$router.push('/login')
            }
          }
          return false
        })
    },

    // update Balance this
    async updateBalance({ commit }, payload) {
      const { id, ...data } = payload
      const body = {
        saldoAwal: data.saldoAwal,
        koreksi: data.koreksiBalance,
        jumlah: data.jumlahBalance,
        description: data.deskripsi,
      }
      try {
        await useJwt.updateData(
          'servicesAccount',
          `/balance-bank-update?id=${id}`,
          {
            ...body,
          }
        )
        useJwt
          .fetchData('servicesAccount', '/balance-bank-list', {
            params: {
              page: payload.page,
            },
          })
          .then((response) => {
            commit('BALANCEBANK', response.data.data)
          })
          .catch((error) => {
            commit('BALANCEBANK', error.response.data.message)
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
  },
}
