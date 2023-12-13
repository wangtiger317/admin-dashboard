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
                  {{ datas.name }} - {{ datas.period }}
                </option>
              </b-form-select>
            </b-form-group>
          </b-col>

          <!-- GAME -->
          <b-col cols="12" md="2" class="mb-md-0 mb-2">
            <label>Profix min</label>
            <b-form-select v-model="sortProfitMin" id="sortOptions">
              <option value="">Profix min</option>
              <option value="-100">-100%</option>
              <option value="-95">-95%</option>
              <option value="-90">-90%</option>
              <option value="-85">-85%</option>
              <option value="-80">-80%</option>
              <option value="-75">-75%</option>
              <option value="-70">-70%</option>
              <option value="-65">-65%</option>
              <option value="-60">-60%</option>
              <option value="-55">-55%</option>
              <option value="-50">-50%</option>
              <option value="-45">-45%</option>
              <option value="-40">-40%</option>
              <option value="-35">-35%</option>
              <option value="-30">-30%</option>
              <option value="-25">-25%</option>
              <option value="-20">-20%</option>
              <option value="-15">-15%</option>
              <option value="-10">-10%</option>
              <option value="-5">-5%</option>
              <option value="0">0%</option>
              <option value="5">5%</option>
              <option value="10">10%</option>
              <option value="15">15%</option>
              <option value="20">20%</option>
              <option value="25">25%</option>
              <option value="30">30%</option>
              <option value="35">35%</option>
              <option value="40">40%</option>
              <option value="45">45%</option>
              <option value="50">50%</option>
              <option value="55">55%</option>
              <option value="60">60%</option>
              <option value="65">65%</option>
              <option value="70">70%</option>
              <option value="75">75%</option>
              <option value="80">80%</option>
              <option value="85">85%</option>
              <option value="90">90%</option>
              <option value="95">95%</option>
              <option value="100">100%</option>
            </b-form-select>
          </b-col>

          <!-- SORT BY -->
          <b-col cols="12" md="2" class="mb-md-0">
            <label>Profix max</label>
            <b-form-select v-model="sortProfitMax" id="sortOptions">
              <option value="">Profix max</option>
              <option value="-100">-100%</option>
              <option value="-95">-95%</option>
              <option value="-90">-90%</option>
              <option value="-85">-85%</option>
              <option value="-80">-80%</option>
              <option value="-75">-75%</option>
              <option value="-70">-70%</option>
              <option value="-65">-65%</option>
              <option value="-60">-60%</option>
              <option value="-55">-55%</option>
              <option value="-50">-50%</option>
              <option value="-45">-45%</option>
              <option value="-40">-40%</option>
              <option value="-35">-35%</option>
              <option value="-30">-30%</option>
              <option value="-25">-25%</option>
              <option value="-20">-20%</option>
              <option value="-15">-15%</option>
              <option value="-10">-10%</option>
              <option value="-5">-5%</option>
              <option value="0">0%</option>
              <option value="5">5%</option>
              <option value="10">10%</option>
              <option value="15">15%</option>
              <option value="20">20%</option>
              <option value="25">25%</option>
              <option value="30">30%</option>
              <option value="35">35%</option>
              <option value="40">40%</option>
              <option value="45">45%</option>
              <option value="50">50%</option>
              <option value="55">55%</option>
              <option value="60">60%</option>
              <option value="65">65%</option>
              <option value="70">70%</option>
              <option value="75">75%</option>
              <option value="80">80%</option>
              <option value="85">85%</option>
              <option value="90">90%</option>
              <option value="95">95%</option>
              <option value="100">100%</option>
            </b-form-select>
          </b-col>

          <!-- SORT BY -->
          <b-col cols="12" md="2" class="mb-md-0">
            <label>Sort By</label>
            <b-form-select v-model="sortOptions" id="sortOptions">
              <option value="totalbetwinner">Total Bet Winners</option>
              <option value="totalprofit">Total Profit</option>
            </b-form-select>
          </b-col>

          <!-- BUTTON SEARCH THIS -->
          <b-col class="mb-md-0 mb-2 mt-2">
            <b-button
              v-ripple.400="'rgba(255, 255, 255, 0.15)'"
              variant="primary"
              @click="
                searchPicker(pasaran, sortProfitMin, sortProfitMax, sortOptions)
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
            md="12"
            class="d-flex align-items-center justify-content-start"
          >
            <h2>Scan Lottery</h2>
          </b-col>
        </b-row>
      </div>

      <b-table
        :fields="fields"
        :items="getScanKeluaranList"
        responsive
        show-empty
        empty-text="No Data"
        class="position-relative"
      >
        <!-- NO -->
        <template #cell(no)="{ index }">{{ index + 1 }} </template>

        <!-- HASIL -->
        <template #cell(Hasil)="{ item }"> {{ item.hasil }} </template>

        <!-- BET WIN -->
        <template #cell(bet_win)="{ item }"> {{ formatPrice(item.bet_win) }}</template>

        <!-- BET LOSE -->
        <template #cell(bet_lose)="{ item }"> {{ formatPrice(item.bet_lose) }}</template>

        <!-- TOTAL BAYAR -->
        <template #cell(total_bayar)="{ item }">
          {{ formatPrice(item.total_bayar) }}
        </template>

        <!-- TOTAL USER WIN -->
        <template #cell(total_user_win)="{ item }">
          {{ item.total_user_win }}
        </template>

        <!-- TOTAL PROFIT -->
        <template #cell(total_profit)="{ item }">{{
          formatPrice(item.total_profit)
        }}</template>

        <!-- ACTION -->
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
                  name: 'keluaran-scan-detail',
                  params: { id: item.id },
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
  BTooltip,
} from 'bootstrap-vue'
import vSelect from 'vue-select'
import { mapActions, mapGetters } from 'vuex'
import 'animate.css'
import days from 'dayjs'

export default {
  components: {
    BTooltip,
    BFormSelect,
    BCardHeader,
    BCardBody,
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
    ...mapGetters('settings', ['getListPeriode']),
    ...mapGetters('kelauran', ['getScanKeluaranList']),
  },

  created() {
    const payload = {
      pasaran: '',
      sortProfitMin: '',
      sortProfitMax: '',
      sortOptions: '',
    }
    this.scanKeluaranList(payload)
    this.periodeList()
  },

  methods: {
    ...mapActions('settings', ['periodeList']),
    ...mapActions('kelauran', ['scanKeluaranList']),

    async searchPicker(pasaran, sortProfitMin, sortProfitMax, sortOptions) {
      const payload = {
        pasaran,
        sortProfitMin,
        sortProfitMax,
        sortOptions,
      }
      await this.scanKeluaranList(payload)
    },

    formateDate(date) {
      return days(date).format('DD MMM YYYY HH:mm')
    },

    formatPrice(value) {
      let val = (value / 1).toFixed('.', ',')
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    },
  },

  data() {
    return {
      pasaran: '',
      sortProfitMin: '',
      sortProfitMax: '',
      sortOptions: 'totalbetwinner',

      fields: [
        {
          key: 'no',
          label: 'no',
        },
        {
          key: 'Hasil',
          label: 'Hasil',
        },
        {
          key: 'bet_win',
          label: 'bet Win',
        },
        {
          key: 'bet_lose',
          label: 'bet lose',
        },
        {
          key: 'total_bayar',
          label: 'total bayar',
        },
        {
          key: 'total_user_win',
          label: 'total user win',
        },
        {
          key: 'total_profit',
          label: 'total profit ',
        },
        {
          key: 'action',
          label: 'action',
        },
      ],
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
  padding-right: 100px;
}
.total {
  padding: 8px 0px;
  border-bottom: 1px solid #404656;
}
</style>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
@import '@core/scss/vue/libs/vue-sweetalert.scss';
</style>
<style scoped>
.checkboxs {
  display: flex;
  align-items: center;
}
</style>
