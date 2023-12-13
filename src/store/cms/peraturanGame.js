// module services this
import useJwt from '@/auth/jwt/useJwt'

export default {
  state: {
    gameNormal: [],
    colokBebas: [],
    colokMacau: [],
    colokNaga: [],
    colokJitu: [],
    fiftyUmum: [],
    fiftySpecial: [],
    fiftyKombinasi: [],
    lainDasar: [],
    lainKombinasi: [],
    lainShio: [],
  },

  getters: {
    getGameNormal: (state) => state.gameNormal,
    getColokBebas: (state) => state.colokBebas,
    getColokMacau: (state) => state.colokMacau,
    getColokNaga: (state) => state.colokNaga,
    getColokJitu: (state) => state.colokJitu,
    getFiftyUmum: (state) => state.fiftyUmum,
    getFiftySpecial: (state) => state.fiftySpecial,
    getFiftyKombinasi: (state) => state.fiftyKombinasi,
    getLainDasar: (state) => state.lainDasar,
    getLainKombinasi: (state) => state.lainKombinasi,
    getLainShio: (state) => state.lainShio,
  },

  mutations: {
    // 4d3d2d
    GAMENORMAL(state, payload) {
      state.gameNormal = payload
    },

    // COLOK ALL
    COLOKBEBAS(state, payload) {
      state.colokBebas = payload
    },
    COLOKMACAU(state, payload) {
      state.colokMacau = payload
    },
    COLOKNAGA(state, payload) {
      state.colokNaga = payload
    },
    COLOKJITU(state, payload) {
      state.colokJitu = payload
    },

    // 50/50 ALL
    FIFTYUMUM(state, payload) {
      state.fiftyUmum = payload
    },
    FIFTYSPECIAL(state, payload) {
      state.fiftySpecial = payload
    },
    FIFTYKOMBINASI(state, payload) {
      state.fiftyKombinasi = payload
    },

    // LAIN-LAIN ALl
    LAINDASAR(state, payload) {
      state.lainDasar = payload
    },

    LAINKOMBINASI(state, payload) {
      state.lainKombinasi = payload
    },

    LAINSHIO(state, payload) {
      state.lainShio = payload
    },
  },

  actions: {
    // PERATURAN GAME  LIST 4d3d2d
    gameNormallist({ commit }, payload) {
      useJwt
        .fetchData('cms', '/game-content', {
          params: {
            slug: payload.slug,
          },
        })
        .then((response) => {
          commit('GAMENORMAL', response.data.data)
        })
        .catch((error) => {
          commit('GAMENORMAL', error.response.data.message)
          if (error.response.data.code === 403) {            
            if (!alert(error.response.data.message)) {
              this.$router.push('/login')
            }
          }
          return false
        })
    },

    // COLOK BEBAS LIST
    gameColokBebaslist({ commit }, payload) {
      useJwt
        .fetchData('cms', '/game-content', {
          params: {
            slug: payload.slug,
          },
        })
        .then((response) => {
          commit('COLOKBEBAS', response.data.data)
        })
        .catch((error) => {
          commit('COLOKBEBAS', error.response.data.message)
          if (error.response.data.code === 403) {            
            if (!alert(error.response.data.message)) {
              this.$router.push('/login')
            }
          }
          return false
        })
    },

    // COLOK MACAU LIST
    gameColokMacaulist({ commit }, payload) {
      useJwt
        .fetchData('cms', '/game-content', {
          params: {
            slug: payload.slug,
          },
        })
        .then((response) => {
          commit('COLOKMACAU', response.data.data)
        })
        .catch((error) => {
          commit('COLOKMACAU', error.response.data.message)
          if (error.response.data.code === 403) {            
            if (!alert(error.response.data.message)) {
              this.$router.push('/login')
            }
          }
          return false
        })
    },

    // COLOK NAGA LIST
    gameColokNagalist({ commit }, payload) {
      useJwt
        .fetchData('cms', '/game-content', {
          params: {
            slug: payload.slug,
          },
        })
        .then((response) => {
          commit('COLOKNAGA', response.data.data)
        })
        .catch((error) => {
          commit('COLOKNAGA', error.response.data.message)
          if (error.response.data.code === 403) {            
            if (!alert(error.response.data.message)) {
              this.$router.push('/login')
            }
          }
          return false
        })
    },

    // COLOK JITU LIST
    gameColokJitulist({ commit }, payload) {
      useJwt
        .fetchData('cms', '/game-content', {
          params: {
            slug: payload.slug,
          },
        })
        .then((response) => {
          commit('COLOKJITU', response.data.data)
        })
        .catch((error) => {
          commit('COLOKJITU', error.response.data.message)
          if (error.response.data.code === 403) {            
            if (!alert(error.response.data.message)) {
              this.$router.push('/login')
            }
          }
          return false
        })
    },

    // FIFTY UMUM LIST
    gameFiftyUmumlist({ commit }, payload) {
      useJwt
        .fetchData('cms', '/game-content', {
          params: {
            slug: payload.slug,
          },
        })
        .then((response) => {
          commit('FIFTYUMUM', response.data.data)
        })
        .catch((error) => {
          commit('FIFTYUMUM', error.response.data.message)
          if (error.response.data.code === 403) {            
            if (!alert(error.response.data.message)) {
              this.$router.push('/login')
            }
          }
          return false
        })
    },

    // FIFTY SPECIAL LIST
    gameFiftySpeciallist({ commit }, payload) {
      useJwt
        .fetchData('cms', '/game-content', {
          params: {
            slug: payload.slug,
          },
        })
        .then((response) => {
          commit('FIFTYSPECIAL', response.data.data)
        })
        .catch((error) => {
          commit('FIFTYSPECIAL', error.response.data.message)
          if (error.response.data.code === 403) {            
            if (!alert(error.response.data.message)) {
              this.$router.push('/login')
            }
          }
          return false
        })
    },

    // FIFTY KOMBINASIL LIST
    gameFiftyKombinasilist({ commit }, payload) {
      useJwt
        .fetchData('cms', '/game-content', {
          params: {
            slug: payload.slug,
          },
        })
        .then((response) => {
          commit('FIFTYKOMBINASI', response.data.data)
        })
        .catch((error) => {
          commit('FIFTYKOMBINASI', error.response.data.message)
          if (error.response.data.code === 403) {            
            if (!alert(error.response.data.message)) {
              this.$router.push('/login')
            }
          }
          return false
        })
    },

    // LAIN DASAR
    gameLainDasarlist({ commit }, payload) {
      useJwt
        .fetchData('cms', '/game-content', {
          params: {
            slug: payload.slug,
          },
        })
        .then((response) => {
          commit('LAINDASAR', response.data.data)
        })
        .catch((error) => {
          commit('LAINDASAR', error.response.data.message)
          if (error.response.data.code === 403) {            
            if (!alert(error.response.data.message)) {
              this.$router.push('/login')
            }
          }
          return false
        })
    },

    // LAIN KOMBINASI
    gameLainKombinasi({ commit }, payload) {
      useJwt
        .fetchData('cms', '/game-content', {
          params: {
            slug: payload.slug,
          },
        })
        .then((response) => {
          commit('LAINKOMBINASI', response.data.data)
        })
        .catch((error) => {
          commit('LAINKOMBINASI', error.response.data.message)
          if (error.response.data.code === 403) {            
            if (!alert(error.response.data.message)) {
              this.$router.push('/login')
            }
          }
          return false
        })
    },

    // LAIN SHIO
    gameLainShio({ commit }, payload) {
      useJwt
        .fetchData('cms', '/game-content', {
          params: {
            slug: payload.slug,
          },
        })
        .then((response) => {
          commit('LAINSHIO', response.data.data)
        })
        .catch((error) => {
          commit('LAINSHIO', error.response.data.message)
          if (error.response.data.code === 403) {            
            if (!alert(error.response.data.message)) {
              this.$router.push('/login')
            }
          }
          return false
        })
    },

    // UPDATE GAME ALL LIST THIS
    async updateAll({ commit }, payload) {
      const { slug, ...data } = payload
      const body = {
        title: data.title,
        content: data.contents,
      }
      try {
        await useJwt.updateData('cms', `/game-content-update?slug=${slug}`, {
          ...body,
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
