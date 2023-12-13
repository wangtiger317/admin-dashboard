<template>
  <div v-on-clickaway="closeIfClickedOutside">
    <!-- FILTER ONE -->
    <b-card no-body>
      <b-card-body>
        <b-row>
          <!-- SLECT MULTIPLE -->
          <b-col cols="12" md="2" class="mb-md-0 mb-2">
            <b-form-group class="customCheckbox">
              <label>Select</label>
              <div
                class="form-control custom-select"
                @click.prevent="showDropdown"
              >
                <div class="checkbox-select__title">
                  {{ selectAllText }}
                </div>
              </div>
              <div
                v-show="dropdown && activeTrigger"
                id="dropdown"
                class="checkbox-select__dropdown"
                :class="{ isActive: !fromDate }"
              >
                <div class="checkbox-select__col">
                  <div class="checkbox-select__select-all">
                    <b-form-checkbox
                      id="checkbox-1"
                      v-model="allSelectorSelected"
                      name="checkbox-1"
                      @input="selectAll"
                    >
                      Select All
                    </b-form-checkbox>
                  </div>
                </div>
                <b-form-checkbox-group
                  v-model="checkedFilters"
                  name="check-button"
                  class="d-flex flex-column"
                >
                  <b-form-checkbox
                    v-for="filter in selectedAllData"
                    :key="filter"
                    :value="filter"
                    inline
                    @input="checked()"
                  >
                    {{ filter }}
                  </b-form-checkbox>
                </b-form-checkbox-group>
              </div>
            </b-form-group>
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
                  @on-open="setShowDrodown"
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
                  @on-open="setShowDrodown"
                />
              </b-form-group>
            </template>
          </b-col>

          <!-- SORTBY -->
          <b-col cols="12" md="2" class="mb-md-0 mb-2">
            <label>Sort By</label>
            <b-form-select
              id="sortOptions"
              v-model="whereSort"
              @input="setShowDrodown"
            >
              <option value="sortDate">Date</option>
              <option value="sortBalance">Balance</option>
              <option value="sortWin">Win</option>
              <option value="sortLose">Lose</option>
              <option value="sortPlayerWL">Player W/L</option>
            </b-form-select>
          </b-col>

          <!-- AZ -->
          <b-col cols="12" md="2" class="mb-md-0">
            <label>AZ</label>
            <b-form-select id="sortOptions" v-model="whereAZ">
              <option value="ASC">AZ</option>
              <option value="DESC">ZA</option>
            </b-form-select>
          </b-col>

          <!-- BUTTON SEARCH THIS -->
          <b-col cols="12" md="2" class="mb-md-0 mb-2 mt-2">
            <b-button
              v-ripple.400="'rgba(255, 255, 255, 0.15)'"
              variant="primary"
              @click="searchPicker(fromDate, toDate)"
            >
              Search
            </b-button>
          </b-col>
        </b-row>
      </b-card-body>
    </b-card>

    <!-- FILTER SEARCH -->
    <b-card no-body>
      <b-card-header class="pb-50" />
      <b-card-body>
        <b-row>
          <b-col cols="12" md="9" class="mb-md-0 mb-2">
            <b-form-input
              v-model="username"
              class="d-inline-block mr-1"
              placeholder="Search..."
            />
          </b-col>
          <b-col cols="12" md="3" class="mb-md-0 mb-2 d-flex">
            <b-button
              v-ripple.400="'rgba(255, 255, 255, 0.15)'"
              variant="primary"
              @click="searchWord(username)"
            >
              Search
            </b-button>
            <b-button
              v-ripple.400="'rgba(113, 102, 240, 0.15)'"
              class="ml-3"
              variant="primary"
              v-if="showTableDetails === false ? 'hidden' : ''"
              @click="DownloadCSVList"
            >
              <feather-icon icon="ArrowDownIcon" class="mr-50" />
              <span class="align-middle">Download CSV</span>
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
            md="9"
            class="d-flex align-items-center justify-content-start"
          >
            <h2>Win Lose List</h2>
          </b-col>
        </b-row>
      </div>
      <div v-if="!showTableDetails">
        <b-table
          :fields="fields"
          :items="getWinLose.data"
          responsive
          show-empty
          empty-text="No Data"
          class="position-relative"
        >
          <!-- NO -->
          <template #cell(no)="{ index }">
            {{ index + 1 }}
          </template>

          <!-- USERNAME -->
          <template #cell(username)="{ item }">
            {{ item.username }}
          </template>

          <!-- PLAYER W/L -->
          <template #cell(player)="{ item }">
            {{ formatPrice(item.total_wl) }}
          </template>

          <!-- WIN -->
          <template #cell(win)="{ item }">
            {{ formatPrice(item.total_win) }}
          </template>

          <!-- BET -->
          <template #cell(bet)="{ item }">
            {{ formatPrice(item.total_bet) }}
          </template>

          <!-- BET DATE -->
          <template #cell(betDate)="{ item }">
            {{ formateDate(item.created_at) }}
          </template>

          <!-- BALANCE -->
          <template #cell(balance)="{ item }">
            {{ formatPrice(item.credit) }}
          </template>

          <!-- Details -->
          <template #cell(actions)="{ item }">
            <div class="text-nowrap">
              <!-- save this -->
              <feather-icon
                :id="`invoice-row-${item.id}-SearchIcon-icon`"
                icon="SearchIcon"
                size="16"
                class="cursor-pointer mx-1"
                @click="showDetails(item.memberID, fromDate, toDate)"
              />
              <b-tooltip
                title="Save"
                :target="`invoice-row-${item.id}-SearchIcon-icon`"
              />
            </div>
          </template>
        </b-table>
        <hr />

        <!-- TOTAL THIS -->
        <b-row class="mb-2">
          <b-col cols="2" md="2" class="mb-md-0" />
          <b-col cols="1" md="1" class="mb-md-0">
            <b>Total:</b>
          </b-col>
          <b-col cols="2" md="1" class="mb-md-0">{{
            formatPrice(getWinLose.totalPlayerWL)
          }}</b-col>
          <b-col cols="1" md="1" class="ml-1 pl-2 mb-md-0 ml-0">
            {{ formatPrice(getWinLose.totalWin) }}</b-col
          >
          <b-col cols="2" md="2" class="mb-md-0 ml-4">
            {{ formatPrice(getWinLose.totalBet) }}</b-col
          >
        </b-row>
      </div>
      <div v-if="showTableDetails">
        <b-card no-body class="mb-5">
          <div class="mx-2">
            <b-row>
              <b-col
                cols="12"
                md="10"
                class="d-flex align-items-center justify-content-start"
              >
                <h5>History Transaksi Win Lose List</h5>
              </b-col>

              <b-button
                v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                class="ml-3"
                variant="primary"
                @click="DownloadCSVDetail"
              >
                <feather-icon icon="ArrowDownIcon" class="mr-50" />
                <span class="align-middle">Download CSV</span>
              </b-button>
            </b-row>
            <!-- TESTHistory Transaksi Win Lose List -->
          </div>
          <hr />
          <b-table
            :fields="fieldsdetail"
            :items="getWinLoseDetail.data"
            responsive=""
          >
            <template #cell(No)="{ index }">
              {{ index + 1 }}
            </template>
            <template #cell(Tanggal)="{ item }"
              >{{ formateDate(item.created_at) }}
            </template>
            <template #cell(Game)="{ item }"
              >{{ item.name_provider }}
            </template>
            <template #cell(GameId)="{ item }">
              {{ item.bet_id }}
            </template>
            <template #cell(Deskripsi)="{ item }"
              >{{ item.deskripsi }}
            </template>
            <template #cell(Debit)="{ item }">
              {{ formatPrice(item.bet) }}
            </template>
            <template #cell(Kredit)="{ item }">
              {{ formatPrice(item.win) }}
            </template>
            <template #cell(Balance)="{ item }">
              {{ formatPrice(item.credit) }}
            </template>
            <template #cell()="{ item }">
              <div v-if="item.tables === 'bets'">
                <feather-icon
                  :id="`invoice-row-${item.betId}-SearchIcon-icon`"
                  icon="SearchIcon"
                  size="16"
                  class="cursor-pointer mx-1"
                  @click="providerDetail(item.betId, item.name_provider)"
                />
                <b-tooltip
                  title="Detail"
                  :target="`invoice-row-${item.betId}-SearchIcon-icon`"
                />
              </div>
            </template>
          </b-table>
          <b-row>
            <b-col cols="2" md="7" class="mb-md-0" />
            <b-col cols="1" md="1" class="mb-md-0">
              <b>Total:</b>
            </b-col>
            <b-col cols="2" md="1" class="mb-md-0">{{
              getWinLoseDetail.totalBetDetail
            }}</b-col>
            <b-col cols="1" md="1" class="mb-md-0 ml-0">{{
              getWinLoseDetail.totalWinDetail
            }}</b-col>
          </b-row>
          <div class="m-2">
            <b-button
              v-ripple.400="'rgba(113, 102, 240, 0.15)'"
              variant="primary"
              @click="showCon()"
            >
              <span class="align-middle">Back</span>
            </b-button>
          </div>
        </b-card>
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
  BFormDatepicker,
  BCardHeader,
  BCardBody,
  BFormSelect,
  BFormCheckboxGroup,
  BFormGroup,
} from 'bootstrap-vue'
import vSelect from 'vue-select'
import { ref } from '@vue/composition-api'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import 'animate.css'
import { mapActions, mapGetters } from 'vuex'
import flatPickr from 'vue-flatpickr-component'
import exportFromJSON from 'export-from-json'
import { mixin as clickaway } from 'vue-clickaway'
import useJwt from '@/auth/jwt/useJwt'
import days from 'dayjs'

export default {
  components: {
    BFormDatepicker,
    BCardHeader,
    BCardBody,
    ToastificationContent,
    flatPickr,
    BFormCheckbox,
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
    BFormCheckboxGroup,
    BFormGroup,
  },

  mixins: [clickaway],

  computed: {
    ...mapGetters('members', [
      'getWinLose',
      'getProviders',
      'getDownloadList',
      'getWinLoseDetail',
      'getWinLoseDetailDownload',
    ]),

    providerListOptions() {
      const data = this.getProviders
      const listOption = data.map((item) => ({
        value: item.id,
        title: item.name,
      }))
      return listOption
    },

    // DONLOAD DETAIL THIS
    filterdDownloadDetailList() {
      const { data } = this.getWinLoseDetailDownload
      const { totalBetDetail } = this.getWinLoseDetailDownload
      const { totalWinDetail } = this.getWinLoseDetailDownload
      const arrayObject = data
      const newArray = new Object()
      newArray.total = 'Total'
      newArray.total_bet = totalBetDetail
      newArray.total_win = totalWinDetail
      arrayObject.push(newArray)
      return arrayObject
    },

    // test download
    filtersdDownloadList() {
      const { data } = this.getDownloadList
      const { totalBet } = data
      const { totalWin } = data
      const { totalPlayerWL } = data
      const arrayObject = data.data
      const newArray = new Object()
      newArray.Total = 'Total'
      newArray.total_bet = totalBet
      newArray.total_win = totalWin
      newArray.total_wl = totalPlayerWL
      arrayObject.push(newArray)
      return arrayObject
    },

    filteredList() {
      return this.filters.filter((item) =>
        item.toLowerCase().includes(this.search.toLowerCase())
      )
    },

    selected() {
      return this.fromDate
    },

    selectedAllData: {
      // getter
      get() {
        const data = []
        this.getProviders.map((item) => {
          data.push(item.name)
        })
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.$data.checkedFilters = data
        return data
      },
      set(data) {
        this.$data.checkedFilters = data
      },
    },

    selectedText: {
      get() {
        let text = 'Non Selected'
        text = `All Selected ${this.getProviders.length}`
        return text
      },
    },
  },

  watch: {
    checkedFilters() {
      this.selectAllText = `All selected ${this.checkedFilters.length}`
      return this.checkedFilters
    },
  },

  created() {
    const payload = {
      providers: '',
      username: '',
      fromDate: '',
      toDate: '',
      sortDate: '',
      sortBalance: '',
      sortWin: '',
      sortLose: '',
      sortPlayerWL: '',
    }

    const downloadPayload = {
      providers: '',
      username: this.username,
      fromDate: this.fromDate,
      toDate: this.toDate,
    }

    this.winLoselist(payload)
    this.fetchProviders()
    this.winLoseDownload(downloadPayload)
  },

  mounted() {
    this.selectedProviders = this.providerListOptions
  },

  methods: {
    ...mapActions('members', [
      'winLoselist',
      'fetchProviders',
      'winLoseDownload',
      'winLosedetail',
      'winLosedetailDownload',
    ]),

    formateDate(date) {
      return days(date).format('DD MMM YYYY HH:mm')
    },

    formatPrice(value) {
      let val = (value / 1).toFixed('.', ',')
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    },

    showCon(_e) {
      this.showTableDetails = false
    },

    showDetails(memberId, fromDate, toDate) {
      const filteredDataBy = this.getProviders.filter((item) =>
        this.checkedFilters.includes(item.name)
      )
      const providers = filteredDataBy.map((item) => item.id).join(',')

      const payload = {
        providers,
        memberId,
        fromDate,
        toDate,
      }
      this.winLosedetail(payload)
      this.winLosedetailDownload(payload)
      this.showTableDetails = true
    },

    // SEARCH USERNAME
    async searchWord(username) {
      this.searchClick = true
      const filteredDataBy = this.getProviders.filter((item) =>
        this.checkedFilters.includes(item.name)
      )
      const providers = filteredDataBy.map((item) => item.id).join(',')
      this.filterProvider = providers

      const payload = {
        providers,
        username,
        fromDate: this.fromDate,
        toDate: this.toDate,
        sortDate: this.whereSort,
        sortBalance: this.whereAZ,
        sortWin: this.whereAZ,
        sortLose: this.whereAZ,
        sortPlayerWL: this.whereAZ,
      }
      await this.winLoselist(payload)
      this.winLoseDownload(payload)
    },

    // SEARCH DATE
    async searchPicker(fromDate, toDate) {
      this.searchClick = true
      this.dropdown = false
      this.activeTrigger = false
      const filteredDataBy = this.getProviders.filter((item) =>
        this.checkedFilters.includes(item.name)
      )
      const providers = filteredDataBy.map((item) => item.id).join(',')
      this.filterProvider = providers
      const payload = {
        providers,
        username: '',
        fromDate,
        toDate,
        sortDate: this.whereSort,
        sortBalance: this.whereAZ,
        sortWin: this.whereAZ,
        sortLose: this.whereAZ,
        sortPlayerWL: this.whereAZ,
      }
      await this.winLoselist(payload)
      this.winLoseDownload(payload)
    },

    requestPayloadBuild() {
      const { whereSort } = this
      const order = this.whereAZ
      const item = {}
      item[whereSort] = order
      item.fromDate = this.fromDate
      item.toDate = this.toDate

      return item
    },

    // DETAIL  DOWNLOAD  THIS
    async DownloadCSVDetail() {
      const data = this.filterdDownloadDetailList
      const fileName = 'Detail WinLoseAll'
      const exportType = exportFromJSON.types.csv
      if (data) exportFromJSON({ data, fileName, exportType })
    },

    // DOWNLOAD LIST
    async DownloadCSVList() {
      const data = this.filtersdDownloadList
      const fileName = 'WinLoseAll'
      const exportType = exportFromJSON.types.csv
      if (data) exportFromJSON({ data, fileName, exportType })
    },

    // Select all dropdown methods
    selectAll() {
      if (this.allSelectorSelected === false) {
        if (this.childSelectorSelected) {
          this.checkedFilters = []
          this.childSelectorSelected = true
        }
      } else {
        this.selectAllRenderer()
        this.childSelectorSelected = true
      }
    },

    selectAllRenderer() {
      this.checkedFilters = []
      this.selectAllText = `All selected ${this.getProviders.length}`
      this.getProviders.map((item) => {
        this.checkedFilters.push(item.name)
      })
    },

    checked(item) {
      if (this.checkedFilters.length === 1) {
        this.selectAllText = this.checkedFilters.toString()
      } else if (this.checkedFilters.length > 1) {
        this.selectAllText = `${this.checkedFilters.length} selected`
      } else {
        this.selectAllText = 'None Selected'
      }
      if (this.checkedFilters.length < this.getProviders.length) {
        this.childSelectorSelected = false
        this.allSelectorSelected = false
      } else {
        this.childSelectorSelected = true
        this.allSelectorSelected = true
        this.selectAllText = `All selected ${this.getProviders.length}`
      }
    },

    showDropdown() {
      if (this.dropdown === false) {
        this.dropdown = !this.dropdown
        this.activeTrigger = !this.activeTrigger
      } else if (this.fromDate) {
        this.dropdown = false
        this.activeTrigger = false
      } else {
        this.dropdown = !this.dropdown
        this.activeTrigger = !this.activeTrigger
      }
    },

    closeIfClickedOutside(e) {
      if (!this.$el.contains(e.target)) {
        this.dropdown = false
        this.activeTrigger = false
      }
      // this.dropdown = true
      // this.activeTrigger = true
    },

    setShowDrodown() {
      this.dropdown = false
      this.activeTrigger = false
    },

    // DETAIL PROVIDERS
    providerDetail(id, pasaran) {
      // PRAGMATIC SLOT & CASINO
      if (pasaran === 'Pragmatic Slot' || pasaran === 'Pragmatic Live Casino') {
        useJwt
          .fetchData('allMembers', `/detail-pragmatic/${id}`, {})
          .then((response) => {
            const { url } = response.data
            window.open(url, '', 'width=1180,height=750')
          })
          .catch((error) => {
            this.$toast({
              component: ToastificationContent,
              position: 'top-center',
              props: {
                title: 'Error',
                icon: 'AlertCircleIcon',
                variant: 'danger',
                text: error.data.message,
              },
            })
          })
      }

      // HABANERO Slot
      if (pasaran === 'Habanero Slot') {
        useJwt
          .fetchData('allMembers', `/detail-habanero/${id}`, {})
          .then((response) => {
            const { url } = response.data
            window.open(url, '', 'width=1180,height=750')
          })
          .catch((error) => {
            this.$toast({
              component: ToastificationContent,
              position: 'top-center',
              props: {
                title: 'Error',
                icon: 'AlertCircleIcon',
                variant: 'danger',
                text: error.data.message,
              },
            })
          })
      }

      // PG SOFT Slot
      if (pasaran === 'Pg Soft Slot') {
        useJwt
          .fetchData('allMembers', `/detail-pgsoft/${id}`, {})
          .then((response) => {
            const { url } = response.data
            window.open(url, '', 'width=1180,height=750')
          })
          .catch((error) => {
            this.$toast({
              component: ToastificationContent,
              position: 'top-center',
              props: {
                title: 'Error',
                icon: 'AlertCircleIcon',
                variant: 'danger',
                text: error.data.message,
              },
            })
          })
      }

      // ONE GAME Slot
      if (pasaran === 'One Game Slot') {
        useJwt
          .fetchData('allMembers', `/detail-queen-maker/${id}`, {})
          .then((response) => {
            const { url } = response.data
            window.open(url, '', 'width=1180,height=750')
          })
          .catch((error) => {
            this.$toast({
              component: ToastificationContent,
              position: 'top-center',
              props: {
                title: 'Error',
                icon: 'AlertCircleIcon',
                variant: 'danger',
                text: error.data.message,
              },
            })
          })
      }

      // RED TIGER Slot
      if (pasaran === 'Red Tiger Slot') {
        useJwt
          .fetchData('allMembers', `/detail-queen-maker/${id}`, {})
          .then((response) => {
            const { url } = response.data
            window.open(url, '', 'width=1180,height=750')
          })
          .catch((error) => {
            this.$toast({
              component: ToastificationContent,
              position: 'top-center',
              props: {
                title: 'Error',
                icon: 'AlertCircleIcon',
                variant: 'danger',
                text: error.data.message,
              },
            })
          })
      }

      // ION X Casino
      if (pasaran === 'ION Casino') {
        useJwt
          .fetchData('allMembers', `/detail-ion/${id}`, {})
          .then((response) => {
            const { url } = response.data
            window.open(url, '', 'width=1180,height=750')
          })
          .catch((error) => {
            this.$toast({
              component: ToastificationContent,
              position: 'top-center',
              props: {
                title: 'Error',
                icon: 'AlertCircleIcon',
                variant: 'danger',
                text: error.data.message,
              },
            })
          })
      }

      // JOKER GAMING Slot and Fish
      if (pasaran === 'Joker Gaming Slot' || pasaran === 'Joker Gaming Fish') {
        useJwt
          .fetchData('allMembers', `/detail-joker/${id}`, {})
          .then((response) => {
            const { url } = response.data
            window.open(url, '', 'width=1180,height=750')
          })
          .catch((error) => {
            this.$toast({
              component: ToastificationContent,
              position: 'top-center',
              props: {
                title: 'Error',
                icon: 'AlertCircleIcon',
                variant: 'danger',
                text: error.data.message,
              },
            })
          })
      }

      // GAME HALL -> JDB Slot & JDB Fish & Sexy Gaming live
      if (
        pasaran === 'JDB Slot' ||
        pasaran === 'JDB Fish' ||
        pasaran === 'Sexy Gaming Live Casino'
      ) {
        useJwt
          .fetchData('allMembers', `/detail-game-hall/${id}`, {})
          .then((response) => {
            const { url } = response.data
            window.open(url, '', 'width=1180,height=750')
          })
          .catch((error) => {
            this.$toast({
              component: ToastificationContent,
              position: 'top-center',
              props: {
                title: 'Error',
                icon: 'AlertCircleIcon',
                variant: 'danger',
                text: error.data.message,
              },
            })
          })
      }

      // SPADE GAMING Slot & Fish
      if (pasaran === 'Spade Gaming Slot' || pasaran === 'Spade Gaming Fish') {
        useJwt
          .fetchData('allMembers', `/detail-spade/${id}`, {})
          .then((response) => {
            const { url } = response.data
            window.open(url, '', 'width=1180,height=750')
          })
          .catch((error) => {
            this.$toast({
              component: ToastificationContent,
              position: 'top-center',
              props: {
                title: 'Error',
                icon: 'AlertCircleIcon',
                variant: 'danger',
                text: error.data.message,
              },
            })
          })
      }
    },
  },

  data() {
    const date = new Date().toLocaleDateString('en-CA')
    const fromDate = new Date(new Date().setDate(new Date().getDate()))
      .toISOString()
      .split('T')[0]

    return {
      fromDate: date,
      toDate: date,
      username: '',
      whereSort: 'sortDate',
      whereAZ: 'ASC',
      showTableDetails: false,
      currentPage: 1,
      selectedProviders: [],
      searchClick: false,
      filterProvider: '1,2,3,4,5,6,7,8,7,10,11,12,13,14,15,16',
      fields: [
        {
          key: 'no',
        },
        {
          key: 'username',
        },
        {
          key: 'player',
          label: 'Player W/L',
        },
        {
          key: 'win',
        },
        {
          key: 'bet',
        },
        {
          key: 'betDate',
        },
        {
          key: 'balance',
        },
        {
          key: 'actions',
        },
      ],
      fieldsdetail: [
        {
          key: 'No',
        },
        {
          key: 'Tanggal',
        },
        {
          key: 'Game',
        },
        {
          key: 'GameId',
        },
        {
          key: 'Deskripsi',
        },
        {
          key: 'Debit',
        },
        {
          key: 'Kredit',
        },
        {
          key: 'Balance',
        },
        {
          key: '',
        },
      ],
      filters: [
        'Bungalow',
        'Chalet',
        'Guesthouse',
        'Hotel',
        'Townhouse',
        'Apartment',
        'Boutique hotel',
        'Cabin',
        'Guest suite',
        'Hostel',
        'Loft',
        'Villa',
      ],
      checkedFilters: [],
      allSelected: false,
      selectAllText: 'Select',
      activeTrigger: false,
      dropdown: false,
      showLoader: false,
      allSelectorSelected: true,
      childSelectorSelected: true,
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
.selector-css-mutation {
  height: 130px;
  overflow-y: scroll;
}

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
@import '@core/scss/vue/libs/vue-flatpicker.scss';
</style>
