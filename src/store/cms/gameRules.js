import useJwt from '@/auth/jwt/useJwt'

export default {
  state: {
    '4d3d2d': null,
    'colok-bebas': null,
    macau: null,
    'colok-naga': null,
    'colok-jitu': null,
    '50-50-umum': null,
    '50-50-special': null,
    '50-50-kombinasi': null,
    kombinasi: null,
    dasar: null,
    shio: null,
    updated: [],
  },

  mutations: {
    setGameRule(state, { slug, data }) {
      state[slug] = data
    },
    // setUpdateGameRule(state, payload) {
    //   state.updated = payload
    // },

    setUpdateGameRule(state, data) {
      state.state[slug].data.map((datas) => {
        if (datas.slug === payload.slug) return data
        return datas
      })
    },
  },

  actions: {
    async fetchGameRule({ commit }, slug) {
      try {
        const { data } = await useJwt.fetchData('cms', '/game-content', {
          params: {
            slug,
          },
        })
        commit('setGameRule', { slug, data: data.data })
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

    async updateGameRule({ commit }, slug) {
      const { data } = await useJwt.fetchData('cms', '/game-content', {
        params: {
          slug,
        },
      })
      const datas = data.data
      const body = {
        title: datas.title,
        content: datas.contents,
      }
      try {
        await useJwt.updateData('cms', `/game-content-update?slug=${slug}`, {
          ...body,
        })
        return true
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
  },
}
