<template>
  <div>
    <b-card no-body>
      <b-card-body>
        <b-row>
          <!-- Bonus -->
          <b-col cols="12" md="2" class="mb-md-0 mb-2">
            <label>Event</label>
            <b-form-select v-model="events" id="sortOptions">
              <option value="">Semua Bank</option>
              <option
                v-for="datas in getBankEvents"
                :key="datas"
                :value="datas.id"
              >
                {{ datas.name }}
              </option>
            </b-form-select>
          </b-col>

          <!-- seacrh this -->
          <b-col cols="12" md="2" class="mb-md-0 mb-2">
            <label>Sort By</label>
            <b-form-select v-model="orderBy" id="sortOptions">
              <option value="">All</option>
              <option value="jumlah">Jumlah</option>
              <option value="created_at">Date</option>
              <option value="event">Event</option>
              <option value="username">Username</option>
            </b-form-select>
          </b-col>

          <!-- filter date this -->
          <b-col cols="12" md="2" class="mb-md-0 mb-2">
            <label>Sort By AZ</label>
            <b-form-select v-model="sortType" id="sortOptions">
              <option value="asc">AZ</option>
              <option value="desc">ZA</option>
            </b-form-select>
          </b-col>

          <!-- Time -->
          <!-- Time  Join Date To Date-->
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
              @click="searchPicker(fromDate, toDate, events, orderBy, sortType)"
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
            <h2>Non-bank Nett</h2>
          </b-col>
        </b-row>
      </div>

      <!-- TABLE -->
      <b-table
        :fields="fields"
        :items="getPotonganProvider.data.data"
        responsive
        show-empty
        empty-text="No Data"
        class="position-relative"
      >
        <!-- NO -->
        <template #cell(no)="{ index }">{{ index + 1 }}</template>

        <!-- TANGGAL -->
        <template #cell(Tanggal)="{ item }">{{ formateDate(item.created_at) }}</template>

        <!-- NAME -->
        <template #cell(name)="{ item }">{{ item.nama_rekening }}</template>

        <!-- USERNAME -->
        <template #cell(Username)="{ item }">{{ item.username }}</template>

        <!-- EVENT -->
        <template #cell(event)="{ item }">{{ item.event }}</template>

        <!-- JUMLAH -->
        <template #cell(jumlah)="{ item }">{{ formatPrice(item.jumlah) }}</template>
      </b-table>

      <!-- TOTAL THIS -->
      <b-tfoot>
        <b-tr>
          <div class="totals">
            <b-col md="12" class="text-right">
              <b-td colspan="12">
                Total Bet: <b>{{ formatPrice(getPotonganProvider.totalAmount) }}</b>
              </b-td>
            </b-col>
          </div>
        </b-tr>
      </b-tfoot>

      <!-- PAGINATION -->
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
            v-if="getPotonganProvider"
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
    BFormSelect,
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

    vSelect,
  },

  computed: {
    ...mapGetters('bonus', ['getPotonganProvider']),
    ...mapGetters('bonus', ['getBankEvents']),

    allTotal() {
      const total = this.getPotonganProvider.data
      const arr = []
      let max = 0
      if (total) {
        arr.push(total.total)
        max = Math.max(...arr)
      }
      return max
    },
    perPage() {
      const perpage = this.getPotonganProvider.data
      let perPage = 0
      if (perpage) {
        perPage = perpage.per_page
      }
      return perPage
    },
  },

  created() {
    const payload = {
      orderBy: '',
      sortType: '',
      event: '',
      toDate: '',
      page: 1,
      fromDate: '',
    }
    this.potonganProviderList(payload)
    this.eventBankList()
  },

  methods: {
    // flip in sweet alert this
    ...mapActions('bonus', ['potonganProviderList']),
    ...mapActions('bonus', ['eventBankList']),
    async changePage(number) {
      const payload = {
        orderBy: '',
        sortType: '',
        event: '',
        toDate: '',
        fromDate: '',
        page: number,
      }
      await this.potonganProviderList(payload)
    },

    formateDate(date) {
      return days(date).format('DD MMM YYYY HH:mm')
    },

    formatPrice(value) {
      let val = (value / 1).toFixed('.', ',')
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    },

    async searchPicker(fromDate, toDate, events, orderBy, sortType) {
      const payload = {
        orderBy,
        sortType,
        event: events,
        toDate,
        fromDate,
        page: 1,
      }
      await this.potonganProviderList(payload)
      this.currentPage = 1
    },
  },

  data() {
    const date = new Date().toISOString().split('T')[0]
    const fromDate = new Date().toISOString().split('T')[0]
    return {
      events: '',
      sortType: 'asc',
      orderBy: '',
      fromDate: fromDate,
      toDate: date,
      currentPage: 1,
      fields: [
        {
          key: 'no',
          label: 'no',
        },
        {
          key: 'Tanggal',
          label: 'Tanggal',
        },
        {
          key: 'name',
          label: 'name',
        },
        {
          key: 'Username',
          label: 'username',
        },
        {
          key: 'event',
          label: 'Event',
        },
        {
          key: 'jumlah',
          label: 'jumlah',
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
  padding-right: 730px;
}
.totals {
  margin-right: 135px;
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
