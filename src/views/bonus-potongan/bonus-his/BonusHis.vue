<template>
  <div>
    <!-- Filters -->
    <b-card no-body>
      <b-card-body>
        <b-row>
          <!-- Bonus -->
          <b-col cols="12" md="2" class="mb-md-0 mb-2">
            <label>Bonus</label>
            <b-form-select v-model="bonus" id="sortOptions">
              <option value="">All</option>
              <option
                v-for="datas in getBonusDropdown"
                :key="datas"
                :value="datas.id"
              >
                {{ datas.nama_bonus }}
              </option>
            </b-form-select>
          </b-col>

          <!-- Sort Bys -->
          <b-col cols="12" md="2" class="mb-md-0 mb-2">
            <label>Sort By</label>
            <b-form-select v-model="orderBy" id="sortOptions">
              <option value="">All</option>
              <option value="jumlah">Jumlah</option>
              <option value="tanggal">Tanggal</option>
              <option value="bonus">Bonus</option>
              <option value="username">Username</option>
            </b-form-select>
          </b-col>

          <!-- Sort By AZ -->
          <b-col cols="12" md="2" class="mb-md-0 mb-2">
            <label>Sort By AZ</label>
            <b-form-select v-model="sortType" id="sortOptions">
              <option value="asc">AZ</option>
              <option value="desc">ZA</option>
            </b-form-select>
          </b-col>

          <!-- FROM DATE -->
          <b-col cols="12" md="2" class="mb-md-0 mb-2">
            <label>From Date</label>
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

          <!-- TO DATE -->
          <b-col cols="12" md="2" class="mb-md-0">
            <label>To Date</label>
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

          <!--button search this -->
          <b-col cols="12" md="1" class="mb-md-0 mt-2">
            <b-button
              @click="searchPicker(fromDate, toDate, bonus, orderBy, sortType)"
              v-ripple.400="'rgba(255, 255, 255, 0.15)'"
              variant="primary"
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
            <h2>Bonus History</h2>
          </b-col>
        </b-row>
      </div>

      <!-- THIS TABLE -->
      <b-table
        :fields="fields"
        :items="getBonusHistory.data.data"
        responsive
        show-empty
        empty-text="No Data"
        class="position-relative"
      >
        <!-- NO -->
        <template #cell(no)="{ index }">{{ index + 1 }}</template>

        <!-- TANGGAL -->
        <template #cell(tanggal)="{ item }">{{ formateDate(item.created_at) }}</template>

        <!-- USERNAME -->
        <template #cell(username)="{ item }">{{ item.username }}</template>

        <!-- BONUS -->
        <template #cell(bonus)="{ item }">{{ item.nama_bonus }}</template>

        <!-- JUMLAH / HADIAH -->
        <template #cell(jumlah)="{ item }">{{ formatPrice(item.jumlah) }}</template>
      </b-table>
      <hr />

      <!-- TOTAL -->
      <b-tfoot>
        <b-tr>
          <div class="totals">
            <b-col md="12" class="text-right">
              <b-td colspan="12">
                Total Bet: <b>{{ formatPrice(getBonusHistory.totalBonus) }}</b>
              </b-td>
            </b-col>
          </div>
        </b-tr>
      </b-tfoot>

      <!--  PAGINATION -->
      <div class="mx-2 mb-2 mt-2">
        <b-row>
          <b-col
            cols="12"
            sm="6"
            class="d-flex align-items-center justify-content-center justify-content-sm-start"
          >
            <!-- <span class="text-muted">Showing 1 to {{ allTotal }} entries</span> -->
          </b-col>
          <b-col
            cols="12"
            v-if="getBonusHistory"
            sm="6"
            class="d-flex align-items-center justify-content-center justify-content-sm-end"
          >
            <b-pagination
              v-if="allTotal > perPage"
              v-model="currentPage"
              :total-rows="allTotal"
              :per-page="perPage"
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
  BCardHeader,
  BCardBody,
  BFormDatepicker,
  BFormSelect,
} from 'bootstrap-vue'
import flatPickr from 'vue-flatpickr-component'
import vSelect from 'vue-select'
import { ref } from '@vue/composition-api'
import 'animate.css'
import { mapActions, mapGetters } from 'vuex'
import days from 'dayjs'

export default {
  components: {
    flatPickr,
    BCardHeader,
    BCardBody,
    BFormDatepicker,
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
    BFormSelect,

    vSelect,
  },

  computed: {
    ...mapGetters('bonus', ['getBonusHistory', 'getBonusDropdown']),

    allTotal() {
      const total = this.getBonusHistory.data
      const arr = []
      let max = 0
      if (total) {
        arr.push(total.total)
        max = Math.max(...arr)
      }
      return max
    },

    perPage() {
      const perpage = this.getBonusHistory.data
      let perPage = 0
      if (perpage) {
        perPage = perpage.per_page
      }
      return perPage
    },
  },

  created() {
    const payload = {
      bonus: '',
      orderBy: '',
      sortType: '',
      toDate: '',
      fromDate: '',
      page: 1,
    }
    this.historyBonusList(payload)
    this.dropDownList()
  },

  methods: {
    ...mapActions('bonus', ['historyBonusList', 'dropDownList']),

    async changePage(number) {
      const payload = {
        bonus: '',
        orderBy: '',
        sortType: '',
        toDate: '',
        fromDate: '',
        page: number,
      }
      await this.historyBonusList(payload)
    },

    formateDate(date) {
      return days(date).format('DD MMM YYYY HH:mm')
    },

    formatPrice(value) {
      let val = (value / 1).toFixed('.', ',')
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    },

    async searchPicker(fromDate, toDate, bonus, orderBy, sortType) {
      const payload = {
        bonus,
        orderBy,
        sortType,
        toDate,
        fromDate,
        page: 1,
      }
      await this.historyBonusList(payload)
      this.currentPage = 1
    },
  },

  data() {
    return {
      orderBy: '',
      bonus: '',
      sortType: 'asc',
      optionBonus: '',
      sortByJumlah: '',
      sortByAz: '',
      fromDate: '',
      toDate: '',
      currentPage: 1,
      fields: [
        {
          key: 'no',
        },
        {
          key: 'tanggal',
        },
        {
          key: 'username',
        },
        {
          key: 'bonus',
        },
        {
          key: 'jumlah',
          label: '	Jumlah / Hadiah',
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
.totals {
  margin-right: 280px;
}
.per-page-selector {
  width: 90px;
}
.total__content {
  display: flex;
  justify-content: end;
  padding-right: 730px;
}
.total {
  padding: 8px 0px;
  border-bottom: 1px solid #404656;
}
</style>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
@import '@core/scss/vue/libs/vue-sweetalert.scss';
@import '@core/scss/vue/libs/vue-flatpicker.scss';
</style>
<style scoped>
.checkboxs {
  display: flex;
  align-items: center;
}
</style>
