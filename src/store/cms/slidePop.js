// module services this
import useJwt from '@/auth/jwt/useJwt'
export default {
  state: {
    slidePopup: [],
    slideMobile: [],
    slideSlide: [],
  },

  getters: {
    getSlidePopUp: (state) => state.slidePopup,
    getSlideMobile: (state) => state.slideMobile,
    getSlide: (state) => state.slideSlide,
  },

  mutations: {
    // slide
    SLIDEPOPUP(state, payload) {
      state.slidePopup = payload
    },
    SLIDEMOBILE(state, payload) {
      state.slideMobile = payload
    },
    SLIDESLIDE(state, payload) {
      state.slideSlide = payload
    },
    DELETE_SLIDES_IMAGE(state, payload){
      const eventIndex = state.slideSlide.filter(
        e => e.id != payload,
      )
      state.slideSlide = eventIndex
    }
  },

  actions: {
    // SLIDE POP UP
    slidePopuplist({ commit }, payload) {
      useJwt
        .slidePopup({
          params: {
            type: payload.type,
          },
        })
        .then((response) => {
          commit('SLIDEPOPUP', response.data.data)
        })
        .catch((error) => {
          commit('SLIDEPOPUP', error.response.data.message)
          if (error.response.data.code === 403) {            
            if (!alert(error.response.data.message)) {
              this.$router.push('/login')
            }
          }
          return false
        })
    },

    // SLIDE MOBILE
    slideMobilelist({ commit }, payload) {
      useJwt
        .slidePopup({
          params: {
            type: payload.type,
          },
        })
        .then((response) => {
          commit('SLIDEMOBILE', response.data.data)
        })
        .catch((error) => {
          commit('SLIDEMOBILE', error.response.data.message)
          if (error.response.data.code === 403) {            
            if (!alert(error.response.data.message)) {
              this.$router.push('/login')
            }
          }
          return false
        })
    },

    slidelist({ commit }, payload) {
      useJwt
        .slidePopup({
          params: {
            type: payload.type,
          },
        })
        .then((response) => {
          commit('SLIDESLIDE', response.data.data)
        })
        .catch((error) => {
          commit('SLIDESLIDE', error.response.data.message)
          if (error.response.data.code === 403) {            
            if (!alert(error.response.data.message)) {
              this.$router.push('/login')
            }
          }
          return false
        })
    },
    async deleteSlide({ commit }, payload) {
      const { id } = payload
      try {
        const res = await useJwt.deleteSlideImg('cms',
          `/slide-delete/${id}`)
        commit('DELETE_SLIDES_IMAGE', payload.id)
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
