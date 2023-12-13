<template>
  <div>
    <div v-if="!showSearch">
      <b-card no-body>
        <b-card-body>
          <b-row>
            <b-col cols="12" md="3" class="mb-md-0 m-2">
              <b-form-select v-model="whereOption" id="sortOptions">
                <option value="">All</option>
                <option value="">Deposit & Withdraw Only</option>
              </b-form-select>
            </b-col>
            <b-col cols="12" md="3" class="mb-md-0 mb-2">
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
            <b-col cols="12" md="3" class="mb-md-0">
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
                @click="searchPicker(fromDate, toDate, whereOption)"
                v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                variant="primary"
              >
                Search
              </b-button>
            </b-col>
          </b-row>
        </b-card-body>
      </b-card>

      <b-card no-body>
        <b-card-body class="p-2">
          <b-row class="mb-2">
            <b-col
              cols="6"
              md="6"
              class="d-flex align-items-center justify-content-start"
            >
              <h2>Bank Mutation</h2>
            </b-col>
            <b-col
              cols="6"
              md="6"
              class="d-flex align-items-center justify-content-end"
            >
              <b-button
                variant="primary"
                type="submit"
                @click.prevent="validationForm"
              >
                <feather-icon icon="ArrowDownIcon" class="mr-50" />
                <span class="align-middle" @click="DownloadCSV"
                  >Download CSV</span
                >
              </b-button>
            </b-col>
          </b-row>

          <!-- Table Container Card -->
          <b-card no-body class="mb-0">
            <b-table
              :fields="fields"
              :items="getmutasiBank.data.data"
              responsive
              empty-text="No Data"
            >
              <!-- NO -->
              <template #cell(no)="{ index }">
                {{ index + 1 }}
              </template>

              <!-- NAMA BANK -->
              <template #cell(NamaBank)="{ item }">{{
                item.namaBank
              }}</template>

              <!-- MASUK(TOTAL) -->
              <template #cell(masuk)="{ item }">
                {{ item.totalDepo ? formatPrice(item.totalDepo) : 0 }} ({{
                  item.countDepo || 0
                }})
              </template>

              <!-- KELUAR(TOTAL) -->
              <template #cell(keluar)="{ item }">
                {{ item.totalWd ? formatPrice(item.totalWd) : 0 }} ({{
                  item.CountWd || 0
                }})
              </template>

              <!-- (MASUK-KELUAR) -->
              <template #cell(masukkeluar)="{ item }">
                {{ formatPrice(item.masukKeluar) }}
              </template>

              <template #cell(action)="{ item }">
                <div class="text-nowrap">
                  <!-- save this -->
                  <feather-icon
                    :id="`invoice-row-${item.id}-SearchIcon-icon`"
                    icon="SearchIcon"
                    size="16"
                    class="cursor-pointer mx-1"
                    @click="
                      $router.push({
                        name: 'services-mutasi-bank-detail',
                        params: { id: item.rekId, namaBank: item.namaBank },
                      })
                    "
                  />
                  <b-tooltip
                    title="Detail"
                    :target="`invoice-row-${item.id}-SearchIcon-icon`"
                  />
                </div>
              </template>
            </b-table>
            <hr />

            <!-- TOTAL THIS -->
            <b-row>
              <b-col cols="5" md="2" class="mb-md-0 ml-4"> </b-col>
              <b-col cols="1" md="1" class="mb-md-0"><b>Total:</b> </b-col>
              <b-col cols="2" md="2" class="mb-md-0">
                {{ formatPrice(getmutasiBank.totalMasuk) }}
              </b-col>
              <b-col cols="2" md="2" class="mb-md-0 ml-3">
                {{ formatPrice(getmutasiBank.totalKeluar) }}
              </b-col>
              <b-col cols="1" md="1" class="mb-md-0 ml-2">
                {{ formatPrice(getmutasiBank.totalMasukKeluar) }}
              </b-col>
            </b-row>

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
                  v-if="getmutasiBank"
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
                    @change="changePaginat"
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
        </b-card-body>
      </b-card>
    </div>
  </div>
</template>

<script>
import {
  BTooltip,
  BTable,
  BCard,
  BLink,
  BRow,
  BCol,
  BButton,
  BFormInput,
  BFormDatepicker,
  BCardHeader,
  BCardBody,
  BTableSimple,
  BFormSelect,
} from 'bootstrap-vue'
import { mapActions, mapGetters } from 'vuex'
import flatPickr from 'vue-flatpickr-component'
import vSelect from 'vue-select'
import exportFromJSON from 'export-from-json'
import MutasiDetail from './MutasiDetail.vue'
import days from 'dayjs'

export default {
  components: {
    MutasiDetail,
    BTooltip,
    BFormSelect,
    BCard,
    BRow,
    BCol,
    BTable,
    BLink,
    BButton,
    BTableSimple,
    BFormInput,
    BFormDatepicker,
    BCardHeader,
    BCardBody,
    flatPickr,
    vSelect,
  },

  data() {
    const date = new Date().toISOString().split('T')[0]

    return {
      currentPage: 1,
      whereOption: '',
      fromDate: date,
      toDate: date,
      showSearch: false,
      fields: [
        {
          key: 'no',
        },
        {
          key: 'NamaBank',
        },
        {
          key: 'masuk',
          label: 'masuk(total)',
        },
        {
          key: 'keluar',
          label: 'keluar(total)',
        },
        {
          key: 'masukkeluar',
          label: '(masuk-keluar)',
        },
        {
          key: 'action',
        },
      ],
    }
  },

  computed: {
    ...mapGetters('services', ['getmutasiBank', 'getMutasDownload']),

    allTotal() {
      const total = this.getmutasiBank.data
      const arr = []
      let max = 0
      if (total) {
        arr.push(total.total)
        max = Math.max(...arr)
      }
      return max
    },

    totalPage() {
      const perpage = this.getmutasiBank.data
      let perPage = 0
      if (perpage) {
        perPage = perpage.per_page
      }
      return perPage
    },

    // COMPUTED DOWNLOAD CSV
    filtedDownloadList() {
      const { data } = this.getMutasDownload
      const { totalMasuk } = this.getMutasDownload
      const { totalKeluar } = this.getMutasDownload
      const { totalMasukKeluar } = this.getMutasDownload
      const arrayObject = data
      const newArray = new Object()
      newArray.total = 'Total : '
      newArray.total_masuk = totalMasuk
      newArray.total_keluar = totalKeluar
      newArray.total_masuk_keluar = totalMasukKeluar
      arrayObject.push(newArray)
      return arrayObject
    },
  },

  created() {
    const payload = {
      fromDate: '',
      toDate: '',
      page: 1,
    }

    const downloadList = {
      fromDate: '',
      toDate: '',
    }

    this.mutasiBankList(payload)
    this.downloadMutasiList(downloadList)
  },

  methods: {
    ...mapActions('services', ['mutasiBankList', 'downloadMutasiList']),

    formateDate(date) {
      return days(date).format('DD MMM YYYY HH:mm')
    },

    formatPrice(value) {
      let val = (value / 1).toFixed('.', ',')
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    },

    // METHOD DOWLOAD CSV
    async DownloadCSV() {
      const data = this.filtedDownloadList
      const fileName = 'Mutation Bank'
      const exportType = exportFromJSON.types.csv
      if (data) exportFromJSON({ data, fileName, exportType })
    },

    async searchPicker(fromDate, toDate, whereOption) {
      const payload = {
        whereOption,
        fromDate,
        toDate,
        page: 1,
      }
      const downloadList = {
        fromDate: this.fromDate,
        toDate: this.toDate,
      }
      await this.mutasiBankList(payload)
      await this.downloadMutasiList(downloadList)
      this.currentPage = 1
    },

    // PAGINATION
    async changePaginat(number) {
      const payload = {
        whereOption: this.whereOption,
        fromDate: this.fromDate,
        toDate: this.toDate,
        page: number,
      }
      await this.mutasiBankList(payload)
    },
  },
}
</script>

<style lang="scss">
#customers {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

#customers td,
#customers th {
  border: 1px solid #ddd;
  padding: 8px;
}

#customers tr:nth-child(even) {
  background-color: #f2f2f2;
}

#customers tr:hover {
  background-color: #ddd;
}

#customers th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #f3f2f7;
  color: #000;
}
</style>
