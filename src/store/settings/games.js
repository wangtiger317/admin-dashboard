import useJwt from '@/auth/jwt/useJwt'

export default {
  state: {
    filterPasaran: [],
    gameList: [],
    fetchShio: [],
    selectedProvider: null,
  },
  getters: {
    getFilterPasaran: (state) => state.filterPasaran,
    getGameList: (state) => state.gameList,
    getShioList: (state) => state.fetchShio,
    getSelectedProvider: (state) => state.selectedProvider,
  },
  mutations: {
    setFilterPasaran(state, payload) {
      state.filterPasaran = payload
    },
    setGameList(state, payload) {
      state.gameList = payload
    },
    setShio(state, payload) {
      state.fetchShio = payload
    },

    setSelectedProvider(state, payload) {
      state.selectedProvider = payload
    },
  },
  actions: {
    // FILTER PASARAN THIS
    async fetchFilterPasaran({ commit }) {
      try {
        const res = await useJwt.fetchData('filterPasaran')
        commit('setFilterPasaran', res.data.data)
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

    async fetchShioList({ commit }) {
      try {
        const res = await useJwt.fetchData('settingAll', '/shio-list')
        commit('setShio', res.data.data)
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

    // LIST THIS
    async fetchGameList({ commit }, payload) {
      try {
        const res = await useJwt.fetchData('gameList', '', {
          params: payload,
        })
        commit('setGameList', res.data.data)
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

    // UPDATE COLOK BEBAS
    async updateColokBebas({ commit }, payload) {
      const { id, ...data } = payload[0]
      const body = {
        id_pasaran: data.constant_provider_togel_id,
        min_bet_cb: data.min_bet,
        max_bet_cb: data.max_bet,
        win_x_cb: data.win_x,
        disc_cb: data.disc,
        limit_buang_cb: data.limit_buang,
        limit_total_cb: data.limit_total,
      }
      try {
        await useJwt.createData('settingAll', `/colok-bebas-update/${id}`, {
          ...body,
        })
        // body after
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

    // UPDATE 50:50 Umum
    async updateFiftyFiftyUmum({ commit }, payload) {
      const { id, ...data } = payload[0]
      const body = {
        id_pasaran: data.constant_provider_togel_id,
        min_bet_umum: data.min_bet,
        max_bet_umum: data.max_bet,
        win_bet_umum: data.win_x,
        kei_besar_umum: data.kei_besar,
        kei_kecil_umum: data.kei_kecil,
        kei_genap_umum: data.kei_genap,
        kei_ganjil_umum: data.kei_ganjil,
        kei_tengah_umum: data.kei_tengah,
        kei_tepi_umum: data.kei_tepi,
        limit_buang_umum: data.limit_buang,
        limit_total_umum: data.limit_total,
      }
      try {
        await useJwt.createData('settingAll', `/5050-umum-update/${id}`, {
          ...body,
        })
        return true
      } catch (error) {
        return false
      }
    },

    // UPDATE 50:50 Special
    async updateFiftyFiftySpecial({ commit }, payload) {
      const { id, ...data } = payload[0]
      const body = {
        id_pasaran: data.constant_provider_togel_id,
        min_bet_special: data.min_bet,
        max_bet_special: data.max_bet,
        win_bet_special: data.win_x,
        kei_as_besar_special: data.kei_as_besar,
        kei_as_kecil_special: data.kei_as_kecil,
        kei_as_genap_special: data.kei_as_genap,
        kei_as_ganjil_special: data.kei_as_ganjil,
        kei_kop_besar_special: data.kei_kop_besar,
        kei_kop_kecil_special: data.kei_kop_kecil,
        kei_kop_genap_special: data.kei_kop_genap,
        kei_kop_ganjil_special: data.kei_kop_ganjil,
        kei_kepala_besar_special: data.kei_kepala_besar,
        kei_kepala_kecil_special: data.kei_kepala_kecil,
        kei_kepala_genap_special: data.kei_kepala_genap,
        kei_kepala_ganjil_special: data.kei_kepala_ganjil,
        kei_ekor_besar_special: data.kei_ekor_besar,
        kei_ekor_kecil_special: data.kei_ekor_kecil,
        kei_ekor_genap_special: data.kei_ekor_genap,
        kei_ekor_ganjil_special: data.kei_ekor_ganjil,
        limit_buang_special: data.limit_buang,
        limit_total_special: data.limit_total,
      }
      try {
        await useJwt.createData('settingAll', `/5050-special-update/${id}`, {
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

    // UPDATE 50:50 Kombinasi
    async updateFiftyFiftyKombinasi({ commit }, payload) {
      const { id, ...data } = payload[0]
      const body = {
        id_pasaran: data.constant_provider_togel_id,
        min_bet_5050_kombinasi: data.min_bet,
        max_bet_5050_kombinasi: data.max_bet,
        win_bet_kombinasi: data.win_x,
        belakang_kei_mono_5050_kombinasi: data.belakang_kei_mono,
        belakang_kei_stereo_5050_kombinasi: data.belakang_kei_stereo,
        belakang_kei_kembang_5050_kombinasi: data.belakang_kei_kembang,
        belakang_kei_kempis_5050_kombinasi: data.belakang_kei_kempis,
        belakang_kei_kembar_5050_kombinasi: data.belakang_kei_kembar,
        tengah_kei_mono_5050_kombinasi: data.tengah_kei_mono,
        tengah_kei_stereo_5050_kombinasi: data.tengah_kei_stereo,
        tengah_kei_kembang_5050_kombinasi: data.tengah_kei_kembang,
        tengah_kei_kempis_5050_kombinasi: data.tengah_kei_kempis,
        tengah_kei_kembar_5050_kombinasi: data.tengah_kei_kembar,
        tengah_kei_mono_5050_kombinasi: data.tengah_kei_mono,
        depan_kei_mono_5050_kombinasi: data.depan_kei_mono,
        depan_kei_stereo_5050_kombinasi: data.depan_kei_stereo,
        depan_kei_kembang_5050_kombinasi: data.depan_kei_kembang,
        depan_kei_kempis_5050_kombinasi: data.depan_kei_kempis,
        depan_kei_kembar_5050_kombinasi: data.depan_kei_kembar,
        limit_buang_5050_kombinasi: data.limit_buang,
        limit_total_5050_kombinasi: data.limit_total,
      }
      try {
        await useJwt.createData('settingAll', `/5050-kombinasi-update/${id}`, {
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

    // UPDATE 4D/3D/2D
    async update4d3d2d({ commit }, payload) {
      const { id, ...data } = payload[0]
      const body = {
        id_pasaran: data.constant_provider_togel_id,

        min_bet: data.min_bet,
        max_bet_4d: data.max_bet_4d,
        max_bet_3d: data.max_bet_3d,
        max_bet_2d: data.max_bet_2d,
        max_bet_2d_depan: data.max_bet_2d_depan,
        max_bet_2d_tengah: data.max_bet_2d_tengah,
        win_4d_x: data.win_4d_x,
        win_3d_x: data.win_3d_x,
        win_2d_x: data.win_2d_x,
        win_2d_depan_x: data.win_2d_depan_x,
        win_2d_tengah_x: data.win_2d_tengah_x,
        disc_4d: data.disc_4d,
        disc_3d: data.disc_3d,
        disc_2d: data.disc_2d,
        disc_2d_depan: data.disc_2d_depan,
        disc_2d_tengah: data.disc_2d_tengah,
        limit_buang_4d: data.limit_buang_4d,
        limit_buang_3d: data.limit_buang_3d,
        limit_buang_2d: data.limit_buang_2d,
        limit_buang_2d_depan: data.limit_buang_2d_depan,
        limit_buang_2d_tengah: data.limit_buang_2d_tengah,
        limit_total_4d: data.limit_total_4d,
        limit_total_3d: data.limit_total_3d,
        limit_total_2d: data.limit_total_2d,
        limit_total_2d_depan: data.limit_total_2d_depan,
        limit_total_2d_tengah: data.limit_total_2d_tengah,
      }
      try {
        await useJwt.createData('settingAll', `/game-4d3d2d-update/${id}`, {
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

    // UPDATE COLOK NAGA
    async updateColokNaga({ commit }, payload) {
      const { id, ...data } = payload[0]
      const body = {
        id_pasaran: data.constant_provider_togel_id,
        min_bet_cn: data.min_bet,
        max_bet_cn: data.max_bet,
        win_3d_x_cn: data.win_3d_x,
        win_4d_x_cn: data.win_4d_x,
        disc_cn: data.disc,
        limit_buang_cn: data.limit_buang,
        limit_total_cn: data.limit_total,
      }
      try {
        await useJwt.createData('settingAll', `/colok-naga-update/${id}`, {
          ...body,
        })
        // body after
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

    // UPDATE COLOK JITU
    async updateColokJitu({ commit }, payload) {
      const { id, ...data } = payload[0]
      const body = {
        id_pasaran: data.constant_provider_togel_id,
        min_bet_cj: data.min_bet,
        max_bet_cj: data.max_bet,
        win_as_cj: data.win_as,
        win_kop_cj: data.win_kop,
        win_kepala_cj: data.win_kepala,
        win_ekor_cj: data.win_ekor,
        disc_cj: data.disc,
        limit_buang_cj: data.limit_buang,
        limit_total_cj: data.limit_total,
      }
      try {
        await useJwt.createData('settingAll', `/colok-jitu-update/${id}`, {
          ...body,
        })
        // body after
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

    // UPDATE COLOK MACAU
    async updateColokMacau({ commit }, payload) {
      const { id, ...data } = payload[0]
      const body = {
        id_pasaran: data.constant_provider_togel_id,
        min_bet_macau: data.min_bet,
        max_bet_macau: data.max_bet,
        win_2d_x_macau: data.win_2d_x,
        win_3d_x_macau: data.win_3d_x,
        win_4d_x_macau: data.win_4d_x,
        disc_macau: data.disc,
        limit_buang_macau: data.limit_buang,
        limit_total_macau: data.limit_total,
      }
      try {
        await useJwt.createData('settingAll', `/colok-macau-update/${id}`, {
          ...body,
        })
        // body after
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

    // UPDATE SHIO
    async updateShio({ commit }, payload) {
      const { id, ...data } = payload[0]
      const body = {
        id_pasaran: data.constant_provider_togel_id,
        togel_shio_name_id: data.togel_shio_name_id,
        min_bet_shio: data.min_bet,
        max_bet_shio: data.max_bet,
        win_x_shio: data.win_x,
        disc_shio: data.disc,
        limit_buang_shio: data.limit_buang,
        limit_total_shio: data.limit_total,
      }
      try {
        await useJwt.createData('settingAll', `/game-shio-update/${id}`, {
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

    // UPDATE Kombinasi
    async updateKombinasi({ commit }, payload) {
      const { id, ...data } = payload[0]
      const body = {
        id_pasaran: data.constant_provider_togel_id,
        min_bet_kombinasi: data.min_bet,
        max_bet_kombinasi: data.max_bet,
        win_x_kombinasi: data.win_x,
        disc_kombinasi: data.disc,
        limit_buang_kombinasi: data.limit_buang,
        limit_total_kombinasi: data.limit_total,
      }
      try {
        await useJwt.createData('settingAll', `/game-kombinasi-update/${id}`, {
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

    // UPDATE Dasar
    async updateDasar({ commit }, payload) {
      const { id, ...data } = payload[0]
      const body = {
        id_pasaran: data.constant_provider_togel_id,
        min_bet_dasar: data.min_bet,
        max_bet_dasar: data.max_bet,
        win_bet_dasar: data.win_x,
        kei_besar_dasar: data.kei_besar,
        kei_kecil_dasar: data.kei_kecil,
        kei_genap_dasar: data.kei_genap,
        kei_ganjil_dasar: data.kei_ganjil,
        limit_buang_dasar: data.limit_buang,
        limit_total_dasar: data.limit_total,
      }
      try {
        await useJwt.createData('settingAll', `/game-dasar-update/${id}`, {
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

    synchronizeSelectedProvider({ commit }, payload) {
      commit('setSelectedProvider', payload)
    },
  },
}
