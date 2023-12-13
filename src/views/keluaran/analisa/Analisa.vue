<template>
  <div>
    <!-- FILTER THIS -->
    <AnalisFilter @showDataCon="UpdateData()" />

    <!-- SHOW DATA THIS -->
    <div v-if="show">
      <b-alert variant="dark" show>
        <h3 class="alert-heading text-center py-2">
          {{ getAnalisaKeluaran.hasil }}
        </h3>
      </b-alert>

      <!-- TABLE ONE -->
      <b-card no-body>
        <div class="m-2 mt-1">
          <b-row>
            <b-col
              cols="12"
              md="9"
              class="d-flex align-items-center justify-content-start"
            >
              <h2>Analisa Keluaran</h2>
            </b-col>
          </b-row>
        </div>

        <!-- TABLE ONE -->
        <b-row>
          <b-col
            cols="12"
            md="12"
            class="d-flex align-items-center justify-content-start"
          >
            <b-table
              :fields="btFields"
              :items="getAnalisaKeluaran.analis"
              responsive
            >
              <template #cell(Deskripsi)="{ item }">{{
                item.description
              }}</template>
              <template #cell(total)="{ item }">{{
                formatPrice(item.total)
              }}</template>
            </b-table>
          </b-col>
        </b-row>
      </b-card>

      <!-- TABLE TWO -->
      <b-card no-body class="mb-0">
        <div class="m-2">
          <b-row>
            <b-col
              cols="12"
              md="9"
              class="d-flex align-items-center justify-content-start"
            >
              <h2>Get Pasaran</h2>
            </b-col>
          </b-row>
        </div>

        <!-- TABLE THIS  -->
        <b-table :fields="fields" :items="getAnalisaKeluaran.details.data">
          <!-- NUMBER -->
          <template #cell(No)="{ index }"> {{ index + 1 }} </template>

          <!-- PASARAN -->
          <template #cell(Pasaran)="{ item }"> {{ item.Pasaran }} </template>

          <!-- USERNAME -->
          <template #cell(Username)="{ item }"> {{ item.Username }} </template>

          <!-- GAME -->
          <template #cell(Game)="{ item }"> {{ item.Game }} </template>

          <!-- NOMOR -->
          <template #cell(Nomor)="{ item }"> {{ item.Nomor }} </template>

          <!-- BET -->
          <template #cell(Bet)="{ item }">
            {{ formatPrice(item.Bet) }}
          </template>

          <!-- BAYAR -->
          <template #cell(Bayar)-="{ item }">
            {{ formatPrice(item.Bayar) }}
          </template>

          <!-- PRICE -->
          <template #cell(price)="{ item }">
            {{ formatPrice(item.Prize) }}
          </template>
        </b-table>

        <!-- THIS PAGINATION -->
        <div class="mx-2 mb-2 mt-2">
          <b-row>
            <b-col
              cols="12"
              sm="6"
              class="
                d-flex
                align-items-center
                justify-content-center justify-content-sm-start
              "
            >
            </b-col>
            <b-col
              v-if="getAnalisaKeluaran"
              cols="12"
              sm="6"
              class="
                d-flex
                align-items-center
                justify-content-center justify-content-sm-end
              "
            >
              <b-pagination
                v-if="allTotal > totalPage"
                v-model="currentPage"
                :total-rows="allTotal"
                :per-page="totalPage"
                first-number
                last-number
                class="mb-0 mt-1 mt-sm-0"
                prev-class="prev-item"
                next-class="next-item"
                @change="changePage"
              >
                <template #prev-text>
                  <feather-icon icon="ChevronLeftIcon" size="18" />
                </template>
                <template #next-text>
                  <feather-icon icon="ChevronRightIcon" size="18" />
                </template>
              </b-pagination>
            </b-col>
          </b-row>
        </div>
      </b-card>
    </div>
  </div>
</template>

<script>
import {
  BCard,
  BRow,
  BCol,
  BFormInput,
  BButton,
  BTable,
  BMedia,
  BAvatar,
  BLink,
  BBadge,
  BDropdown,
  BDropdownItem,
  BPagination,
  BAlert,
  BFormCheckbox,
} from 'bootstrap-vue'
import vSelect from 'vue-select'
import { ref } from '@vue/composition-api'
import AnalisFilter from './AnalisFilter.vue'
import flatPickr from 'vue-flatpickr-component'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import 'animate.css'
import { mapActions, mapGetters } from 'vuex'

export default {
  components: {
    ToastificationContent,
    AnalisFilter,
    flatPickr,
    BFormCheckbox,
    BCard,
    BRow,
    BCol,
    BFormInput,
    BButton,
    BTable,
    BAlert,
    BMedia,
    BAvatar,
    BLink,
    BBadge,
    BDropdown,
    BDropdownItem,
    BPagination,
    vSelect,
  },

  data() {
    return {
      show: false,
      currentPage: 1,
      fields: [
        {
          key: 'No',
          label: 'no',
        },
        {
          key: 'Pasaran',
          label: 'pasaran',
        },
        {
          key: 'Username',
        },
        {
          key: 'Game',
        },
        {
          key: 'Nomor',
        },
        {
          key: 'Bet',
        },
        {
          key: 'Bayar',
        },
        {
          key: 'price',
          label: 'price',
        },
      ],
      btFields: [
        {
          key: 'Deskripsi',
          label: 'Deskripsi',
        },
        {
          key: 'total',
          label: 'total',
        },
      ],
    }
  },

  computed: {
    ...mapGetters('kelauran', ['getAnalisaKeluaran']),
    ...mapGetters('settings', ['getListPeriode']),

    allTotal() {
      const total = this.getAnalisaKeluaran.details
      const arr = []
      let max = 0
      if (total) {
        arr.push(total.total)
        max = Math.max(...arr)
      }
      return max
    },

    totalPage() {
      const perpage = this.getAnalisaKeluaran.details
      let perPage = 0
      if (perpage) {
        perPage = perpage.per_page
      }
      return perPage
    },
  },

  created() {
    const payload = {
      id_pasaran: '',
      hasil: '',
      page: 1,
    }
    this.analisaKeluaranList(payload)
    this.periodeList()
  },

  methods: {
    ...mapActions('kelauran', ['analisaKeluaranList']),
    ...mapActions('settings', ['periodeList']),

    formatPrice(value) {
      let val = (value / 1).toFixed('.', ',')
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    },

    UpdateData() {
      this.show = true
    },

    // Number Only
    onlyNumber($event) {
      let keyCode = $event.keyCode ? $event.keyCode : $event.which
      if ((keyCode < 48 || keyCode > 57) && keyCode !== 190) {
        $event.preventDefault()
      }
    },

    // DATA SHOW
    showDataCon() {
      this.$emit('showDataCon')
    },

    // CHANGE PAGE
    async changePage(number) {
      const payload = {
        page: number,
        id_pasaran: '',
        hasil: '',
      }
      await this.analisaKeluaranList(payload)
    },

    async searchPicker(id_pasaran, hasil) {
      const payload = {
        id_pasaran,
        hasil,
        page: 1,
      }
      await this.analisaKeluaranList(payload)
      this.currentPage = 1
    },
  },

  setup() {
    const isAddNewUserSidebarActive = ref(false)
    return {
      isAddNewUserSidebarActive,
    }
  },
}
</script>

<style lang="scss" scoped>
.btns {
  display: flex;
  justify-content: end;
}
.per-page-selector {
  width: 90px;
}
</style>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
@import '@core/scss/vue/libs/vue-sweetalert.scss';
</style>
<style lang="scss">
@import '@core/scss/vue/libs/vue-flatpicker.scss';
</style>
