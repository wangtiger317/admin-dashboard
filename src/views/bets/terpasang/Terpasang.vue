<template>
  <div>
    <b-card no-body>
      <b-card-body>
        <b-row>
          <!-- PASARAn -->
          <b-col cols="12" md="3" class="mb-md-0 mb-2">
            <b-form-group>
              <label>Pasaran</label>
              <b-form-select v-model="pasaran" id="sortOptions">
                <option value="">All Pasaran</option>
                <option
                  v-for="datas in getListPeriode"
                  :key="datas"
                  :value="datas.id"
                >
                  {{ datas.name }} - {{ datas.name_initial }}
                </option>
              </b-form-select>
            </b-form-group>
          </b-col>

          <!-- GAME -->
          <b-col cols="12" md="2" class="mb-md-0 mb-2">
            <label>Game</label>
            <b-form-select v-model="whereGame" id="sortOptions">
              <option value="">All Game</option>
              <option value="4d">4D</option>
              <option value="3d">3D</option>
              <option value="2d">2D</option>
              <option value="2d_tengah">2D Tengah</option>
              <option value="2d_depan">2D Depan</option>
              <option value="cb">Colok Bebas</option>
              <option value="cm">Colok Macau</option>
              <option value="cn">Colok Naga</option>
              <option value="cj">Colok Jitu</option>
              <option value="5050_umum">5050 Umum</option>
              <option value="5050_special">5050 Special</option>
              <option value="5050_kombinasi">5050 Kombinasi</option>
              <option value="kombinasi">Kombinasi</option>
              <option value="dasar">Dasar</option>
              <option value="shio">Shio</option>
            </b-form-select>
          </b-col>

          <!-- SORT BY -->
          <b-col cols="12" md="2" class="mb-md-0">
            <label>Sort By</label>
            <b-form-select v-model="sortType" id="sortOptions">
              <option value="asc">Total Bet (kecil-besar)</option>
              <option value="desc">Total Bet (besar-kecil)</option>
            </b-form-select>
          </b-col>

          <!-- FROM DATE TO DATE -->
          <b-col cols="12" md="2" class="mb-md-0 mb-2">
            <label>From</label>
            <template>
              <b-form-group>
                <flat-pickr
                  v-model="fromDate"
                  placeholder="From Date"
                  class="form-control"
                />
              </b-form-group>
            </template>
          </b-col>

          <b-col cols="12" md="2" class="mb-md-0">
            <label>To</label>
            <template>
              <b-form-group>
                <flat-pickr
                  v-model="toDate"
                  placeholder="To Date"
                  class="form-control"
                />
              </b-form-group>
            </template>
          </b-col>

          <!-- BUTTON SEARCH THIS -->
          <b-col class="mb-md-0 mb-2 mt-2">
            <b-button
              v-ripple.400="'rgba(255, 255, 255, 0.15)'"
              variant="primary"
              @click="
                searchPicker(fromDate, toDate, sortType, pasaran, whereGame)
              "
            >
              Search
            </b-button>
          </b-col>
        </b-row>
      </b-card-body>
    </b-card>

    <!-- Table Container Card -->
    <b-card no-body class="mb-0">
      <div class="m-2">
        <b-row>
          <b-col
            cols="12"
            md="3"
            class="d-flex align-items-center justify-content-start"
          >
            <h2>Thrown Lottery List</h2>
          </b-col>
        </b-row>
      </div>

      <!-- TABLE THIS -->
      <b-table
        :fields="fields"
        :items="getTerpasangList.data.data"
        responsive
        show-empty
        empty-text="No Data"
        class="position-relative"
      >
        <!-- NO -->
        <template #cell(no)="{ index }">{{ index + 1 }}</template>

        <!-- TANGGAl -->
        <template #cell(Tanggal)="{ item }">{{ formateDate(item.created_at) }}</template>

        <!--  PASARAN -->
        <template #cell(Pasaran)="{ item }">{{ item.Pasaran }} </template>

        <!-- GAME -->
        <template #cell(Game)="{ item }">{{ item.Game }}</template>

        <!-- Nomor -->
        <template #cell(Nomor)="{ item }">{{ item.Nomor }}</template>

        <!-- BET TOTAL -->
        <template #cell(bet_total)="{ item }"> {{ formatPrice(item.bet_total) }} </template>

        <!-- LIMIT BET -->
        <template #cell(Limit_bet)="{ item }"> {{ item.limit_bet }} </template>

        <!-- BUANGAN TERPASAN -->
        <template #cell(Buangan)="{ item }">{{
          formatPrice(item.buangan_terpasang)
        }}</template>
      </b-table>
      <hr />

      <!-- TOTAL -->
      <b-row>
        <b-col cols="6" md="6"></b-col>
        <b class="ml-3">Total:</b>
        <b-col cols="5" md="5" class="mb-md-0 ml-4">
          {{ formatPrice(getTerpasangList.totalBuangan) }}
        </b-col>
      </b-row>

      <!-- PAGINATION -->
      <div class="mx-2 mb-2 mt-2">
        <b-row>
          <b-col
            cols="12"
            sm="6"
            class="d-flex align-items-center justify-content-center justify-content-sm-start"
          >
          </b-col>
          <b-col
            v-if="getTerpasangList"
            cols="12"
            sm="6"
            class="d-flex align-items-center justify-content-center justify-content-sm-end"
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
</template>

<script>
import {
  BCard,
  BRow,
  BCol,
  BFormInput,
  BFormGroup,
  BButton,
  BTable,
  BMedia,
  BAvatar,
  BLink,
  BBadge,
  BDropdown,
  BDropdownItem,
  BPagination,
  BFormCheckbox,
  BFormSelect,
  BCardHeader,
  BCardBody,
  BFormDatepicker,
} from 'bootstrap-vue'
import vSelect from 'vue-select'
import { ref } from '@vue/composition-api'
import { mapGetters, mapActions } from 'vuex'
import flatPickr from 'vue-flatpickr-component'
import days from 'dayjs'

export default {
  components: {
    flatPickr,
    BCardHeader,
    BCardBody,
    BFormDatepicker,
    BFormSelect,
    BFormCheckbox,
    BFormGroup,
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
    vSelect,
  },

  computed: {
    ...mapGetters('bets', ['getTerpasangList']),
    ...mapGetters('settings', ['getListPeriode']),

    allTotal() {
      const total = this.getTerpasangList.data
      const arr = []
      let max = 0
      if (total) {
        arr.push(total.total)
        max = Math.max(...arr)
      }
      return max
    },

    totalPage() {
      const perpage = this.getTerpasangList.data
      let perPage = 0
      if (perpage) {
        perPage = perpage.per_page
      }
      return perPage
    },
  },

  created() {
    const payload = {
      sortType: '',
      whereGame: '',
      pasaran: '',
      toDate: '',
      fromDate: '',
      page: 1,
    }
    this.buanganTerpasangList(payload)
    this.periodeList()
  },

  methods: {
    ...mapActions('bets', ['buanganTerpasangList']),
    ...mapActions('settings', ['periodeList']),

    async searchPicker(fromDate, toDate, sortType, pasaran, whereGame) {
      const payload = {
        sortType,
        whereGame,
        pasaran,
        toDate,
        fromDate,
      }
      await this.buanganTerpasangList(payload)
      this.currentPage = 1
    },

    formateDate(date) {
      return days(date).format('DD MMM YYYY HH:mm')
    },

    formatPrice(value) {
      let val = (value / 1).toFixed('.', ',')
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    },

    async changePage(number) {
      const payload = {
        orderBy: '',
        sortType: '',
        whereGame: '',
        pasaran: '',
        page: number,
      }
      await this.buanganTerpasangList(payload)
    },
  },

  data() {
    return {
      sortType: 'asc',
      whereGame: '',
      pasaran: '',
      toDate: '',
      fromDate: '',
      currentPage: 1,
      fields: [
        {
          key: 'no',
          label: 'no',
        },
        {
          key: 'Tanggal',
          label: 'Tanggal Pasang',
        },
        {
          key: 'Pasaran',
          label: 'Pasaran',
        },
        {
          key: 'Game',
          label: 'Game',
        },
        {
          key: 'Nomor',
        },
        {
          key: 'bet_total',
          label: 'total',
        },
        {
          key: 'Limit_bet',
          label: 'limit bet',
        },
        {
          key: 'Buangan',
          label: 'Buangan terpasang',
        },
      ],
    }
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
.total__content {
  display: flex;
  justify-content: end;
  padding-right: 440px;
}
.total {
  padding: 8px 0px;
  border-bottom: 1px solid #404656;
}
</style>

<style lang="scss">
@import '@core/scss/vue/libs/vue-flatpicker.scss';
@import '@core/scss/vue/libs/vue-select.scss';
@import '@core/scss/vue/libs/vue-sweetalert.scss';
</style>
<style scoped>
.checkboxs {
  display: flex;
  align-items: center;
}
</style>
