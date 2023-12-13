// module services this
import useJwt from '@/auth/jwt/useJwt'
export default {
  state: {
    promoTurnovers: [],
    promoNewMembers: [],
    promoNextDepo: [],
    promoCashback: [],
    promoRolingan: [],
    promoReferral: [],
  },

  getters: {
    // promo
    getPromoTurnover: (state) => state.promoTurnovers,
    getPromoNewMember: (state) => state.promoNewMembers,
    getPromoNextDepo: (state) => state.promoNextDepo,
    getPromoCashback: (state) => state.promoCashback,
    getPromoRolingan: (state) => state.promoRolingan,
    getPromoReferral: (state) => state.promoReferral,
  },

  mutations: {
    // PROMO PAGE THIS
    PROMOTURNOVER(state, payload) {
      state.promoTurnovers = payload
    },
    PROMONEWMEMBER(state, payload) {
      state.promoNewMembers = payload
    },
    PRMONEXTDEPO(state, payload) {
      state.promoNextDepo = payload
    },
    PROMOCASHBACK(state, payload) {
      state.promoCashback = payload
    },
    PROMOROLINGAN(state, payload) {
      state.promoRolingan = payload
    },
    PROMOREFERRAL(state, payload) {
      state.promoReferral = payload
    },
  },

  actions: {
    // turnover
    promoTurnoverlist({ commit }, payload) {
      useJwt
        .promoPage({
          params: {
            type: payload.type,
          },
        })
        .then((response) => {
          commit('PROMOTURNOVER', response.data.data)
        })
        .catch((error) => {
          commit('PROMOTURNOVER', error.response.data.message)
          if (error.response.data.code === 403) {
            if (!alert(error.response.data.message)) {
              this.$router.push('/login')
            }
          }
          return false
        })
    },

    // new member
    promoNewMemberlist({ commit }, payload) {
      useJwt
        .promoPage({
          params: {
            type: payload.type,
          },
        })
        .then((response) => {
          commit('PROMONEWMEMBER', response.data.data)
        })
        .catch((error) => {
          commit('PROMONEWMEMBER', error.response.data.message)
          if (error.response.data.code === 403) {
            if (!alert(error.response.data.message)) {
              this.$router.push('/login')
            }
          }
          return false
        })
    },

    //  next deposit
    promoNexDepositlist({ commit }, payload) {
      useJwt
        .promoPage({
          params: {
            type: payload.type,
          },
        })
        .then((response) => {
          commit('PRMONEXTDEPO', response.data.data)
        })
        .catch((error) => {
          commit('PRMONEXTDEPO', error.response.data.message)
          if (error.response.data.code === 403) {
            if (!alert(error.response.data.message)) {
              this.$router.push('/login')
            }
          }
          return false
        })
    },

    // cashback slot
    promoCashbacklist({ commit }, payload) {
      useJwt
        .promoPage({
          params: {
            type: payload.type,
          },
        })
        .then((response) => {
          commit('PROMOCASHBACK', response.data.data)
        })
        .catch((error) => {
          commit('PROMOCASHBACK', error.response.data.message)
          if (error.response.data.code === 403) {
            if (!alert(error.response.data.message)) {
              this.$router.push('/login')
            }
          }
          return false
        })
    },

    // rolingan live
    promoRolinganlist({ commit }, payload) {
      useJwt
        .promoPage({
          params: {
            type: payload.type,
          },
        })
        .then((response) => {
          commit('PROMOROLINGAN', response.data.data)
        })
        .catch((error) => {
          commit('PROMOROLINGAN', error.response.data.message)
          if (error.response.data.code === 403) {
            if (!alert(error.response.data.message)) {
              this.$router.push('/login')
            }
          }
          return false
        })
    },

    // referral
    promoReferrallist({ commit }, payload) {
      useJwt
        .promoPage({
          params: {
            type: payload.type,
          },
        })
        .then((response) => {
          commit('PROMOREFERRAL', response.data.data)
        })
        .catch((error) => {
          commit('PROMOREFERRAL', error.response.data.message)
          if (error.response.data.code === 403) {
            if (!alert(error.response.data.message)) {
              this.$router.push('/login')
            }
          }
          return false
        })
    },

    async updatenextDeposit({ commit }, payload) {
      const { id, ...data } = payload
      const body = {
        alt: data.alt,
        path: 'photos/cms/promotion/0pYvB1Nc4FARGsqvk7JQNvAj1WZJ9SvHDvZiKTtB.jpeg',
        title: data.title,
        content: data.content,
        value_bonus: data.value_bonus,
        max_bonus_given: data.max_bonus_given,
      }
      try {
        await useJwt.updateData(
          'cms',
          `/promo-page-bonus-next-deposit-update/${id}`,
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
