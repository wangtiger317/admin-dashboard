<template>
  <b-card no-body>
    <b-card-body>
      <b-row>
        <!-- SELECET PASARAN -->
        <b-col cols="12" md="4" class="mb-md-0 mb-2">
          <label>Pilih Pasaran</label>
          <v-select
            v-model="selected"
            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
            label="name"
            :clearable="false"
            placeholder="Pilih Pasaran"
            :options="filter"
          />
        </b-col>

        <!-- PERIODE -->
        <b-col cols="12" md="3" class="mb-md-0 mb-2">
          <label>Periode</label>
          <v-select
            v-model="periodeBy"
            :clearable="false"
            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
            label="title"
            :options="periodeBy"
          />
        </b-col>

        <!-- SEACRH USERNAME -->
        <b-col cols="12" md="3">
          <label class="mt-1"></label>
          <b-form-input
            v-model="username_search"
            id="basicInput"
            type="text"
            placeholder="Search Username"
          />
        </b-col>

        <!-- Button search -->
        <b-col cols="12" md="1" class="mb-md-0 mt-2 my-sm-2 mr-3">
          <b-button
            @click="searchWord(username_search)"
            v-ripple.400="'rgba(255, 255, 255, 0.15)'"
            variant="primary"
          >
            Search
          </b-button>
        </b-col>
      </b-row>
    </b-card-body>
  </b-card>
</template>

<script>
import {
  BCard,
  BCardBody,
  BRow,
  BCol,
  BButton,
  BFormInput,
  BFormSelect,
} from 'bootstrap-vue'
import vSelect from 'vue-select'
import { mapActions } from 'vuex'

export default {
  components: {
    BFormSelect,
    BRow,
    BCol,
    BCard,
    BCardBody,
    BButton,
    BFormInput,
    vSelect,
  },

  props: {
    game: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      periodeBy: 'Terakhir',
      username_search: '',
      selected: null,
    }
  },

  computed: {
    filter() {
      return this.$store.getters['bets/getFilterPasaran']
    },
  },

  watch: {
    game: {
      handler: 'fetchSettingList',
    },
    selected: {
      handler: 'fetchSettingList',
    },
  },

  async mounted() {
    await this.fetchFilter()
  },

  created() {
    const payload = {
      game: this.game,
      pasaran: this.selected.id,
      username_search: '',
    }
    this.fetchGameList(payload)
  },

  methods: {
    async fetchFilter() {
      await this.$store.dispatch('bets/fetchFilterPasaran')
    },

    // fetch setting
    async fetchSettingList() {
      if (this.selected !== null && this.game !== null) {
        const payload = {
          game: this.game,
          pasaran: this.selected.id,
          username_search: '',
        }
        await this.$store.dispatch('bets/fetchGameList', payload)
      }
    },

    // Method Search
    ...mapActions('bets', ['fetchGameList']),
    async searchWord(username_search) {
      const payload = {
        game: this.game,
        pasaran: this.selected.id,
        username_search,
      }
      await this.fetchGameList(payload)
    },
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>
