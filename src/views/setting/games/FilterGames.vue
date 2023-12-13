<template>
  <!-- filter games this -->
  <b-card no-body>
    <b-card-body>
      <b-row>
        <!-- OPTION PASARAN -->
        <b-col cols="11" md="11" class="mb-md-0 mb-2">
          <b-form-select v-model="id" id="sortOptions">
            <option value="">Pilih Pasaran</option>
            <option v-for="datas in filter" :key="datas" :value="datas.id">
              {{ datas.name }}
            </option>
          </b-form-select>
        </b-col>

        <b-button
          @click="fetchSettingList(id)"
          v-ripple.400="'rgba(255, 255, 255, 0.15)'"
          variant="primary"
        >
          Search
        </b-button>
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
  BFormSelect,
} from 'bootstrap-vue'
import vSelect from 'vue-select'

export default {
  components: {
    BFormSelect,
    BButton,
    BRow,
    BCol,
    BCard,
    BCardBody,
    vSelect,
  },

  props: {
    slug: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      id: '',
      selected: null,
    }
  },

  computed: {
    filter() {
      return this.$store.getters['settings/getFilterPasaran']
    },
  },

  watch: {
    slug: {
      handler: 'fetchSettingList',
    },
    selected(value) {
      this.fetchSettingList()
      this.$store.dispatch('settings/synchronizeSelectedProvider', value)
    },
  },

  async mounted() {
    await this.fetchFilter()
  },

  methods: {
    async fetchFilter() {
      await this.$store.dispatch('settings/fetchFilterPasaran')
    },
    async fetchSettingList() {
      // if (this.selected !== null && this.slug !== null) {
      const payload = {
        slug: this.slug,
        id: this.id,
      }
      await this.$store.dispatch('settings/fetchGameList', payload)
      // }
    },
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>
