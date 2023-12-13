<template>
  <div>
    <!-- FILTER THIS -->
    <b-card no-body>
      <b-card-body>
        <b-row>
          <!-- SELECET MULTIPLE -->
          <b-col cols="12" md="2" class="mb-md-0 mb-2">
            <b-form-group class="customCheckbox">
              <label>Select</label>
              <div
                class="form-control custom-select"
                @click.prevent="showDailyDropdown"
              >
                <div class="checkbox-select__title">
                  {{ selectAllText }}
                </div>
              </div>
              <div
                v-show="dropdown && activeTrigger"
                id="dropdown"
                class="checkbox-select__dropdown"
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
                  class="d-flex flex-column"
                  name="check-button"
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

          <!-- SORT BY -->
          <b-col cols="12" md="2" class="mb-md-0 mb-2" @click="setShowDrodown">
            <label>Sort By</label>
            <b-form-select id="sortOptions" v-model="whereSort">
              <option value="username">Username</option>
              <option value="jumlah">Jumlah</option>
            </b-form-select>
          </b-col>
          <!-- SORT BY -->
          <b-col cols="12" md="2" class="mb-md-0 mb-2" @click="setShowDrodown">
            <label>Group By</label>
            <b-form-select id="sortOptions" v-model="whereGroup">
              <option value="username">Username</option>
              <option value="player">Player</option>
            </b-form-select>
          </b-col>

          <!-- AZ -->
          <b-col cols="12" md="1" class="mb-md-0" @click="setShowDrodown">
            <label>AZ</label>
            <b-form-select id="sortOptions" v-model="whereAZ">
              <option value="asc">AZ</option>
              <option value="desc">ZA</option>
            </b-form-select>
          </b-col>

          <!-- FROM DATE TO DATE -->
          <b-col cols="12" md="2" class="mb-md-0 mb-2">
            <label>From</label>
            <template>
              <b-form-group>
                <flat-pickr
                  v-model="fromDate"
                  placeholder="2022-04-16"
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
                  placeholder="2022-06-16"
                  class="form-control"
                  @on-open="setShowDrodown"
                />
              </b-form-group>
            </template>
          </b-col>

          <!-- search this -->
          <b-col cols="12" md="1" class="mb-md-0 mb-2 mt-2">
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

    <!-- Table Container Card -->
    <b-card no-body class="mb-0">
      <div class="m-2">
        <b-row>
          <b-col
            cols="12"
            md="9"
            class="d-flex align-items-center justify-content-start"
          >
            <h2>Daily Referral</h2>
          </b-col>
        </b-row>
      </div>
      <div>
        <b-table
          :fields="fields"
          :items="getReferralLog.data.data"
          responsive
          show-empty
          empty-text="No Data"
          class="position-relative"
        >
          <!-- number -->
          <template #cell(no)="{ index }">
            {{ parseInt(parseInt(index) + 1) }}
          </template>

          <!-- Tanggal -->
          <template #cell(Tanggal)="{ item }">
            {{ formatDate(item.created_at) }}
          </template>

          <!-- Username -->
          <template #cell(Username)="{ item }">
            {{ item.username }}
          </template>

          <!-- Jumlah -->
          <template #cell(Jumlah)="{ item }">
            {{ formatPrice(item.jumlah) }}
          </template>

          <!-- Player -->
          <template #cell(Player)="{ item }">
            {{ item.player || item.memberRefUsername }}
          </template>
          <!-- <template
            v-if="item.memberRefUsername"
            #cell(memberRefUsername)="{ item }"
          >
            {{ item.memberRefUsername }}
          </template> -->
          <!-- Bet -->
          <template #cell(Bet)="{ item }">
            {{ formatPrice(item.bet) }}
          </template>
        </b-table>
      </div>

      <hr />

      <!-- TOTAL -->
      <b-row>
        <b-col cols="5" md="5" class="mb-md-0 ml-5" />
        <b-col cols="1" md="1" class="mb-md-0 ml-1">
          <b>Total: </b>
        </b-col>
        <b-col cols="2" md="2" class="mb-md-0">{{
          getReferralLog.totalBonus
        }}</b-col>
        <b-col cols="2" md="2" class="mb-md-0">{{
          getReferralLog.totalPlayer
        }}</b-col>
        <b-col cols="1" md="1" class="mb-md-0">
          {{ getReferralLog.totalBet }}
        </b-col>
      </b-row>

      <!-- Pagination -->
      <div class="mx-2 mb-2 mt-2">
        <b-row>
          <b-col
            cols="12"
            sm="6"
            class="d-flex align-items-center justify-content-center justify-content-sm-start"
          >
            <!-- <span class="text-muted"
              >Showing 1 of {{ memberTotal }} entries</span
            > -->
          </b-col>
          <b-col
            v-if="getReferralLog"
            cols="12"
            sm="6"
            class="d-flex align-items-center justify-content-center justify-content-sm-end"
          >
            <b-pagination
              v-if="memberTotal > memberTotalPage"
              v-model="currentPage"
              :total-rows="memberTotal"
              :per-page="memberTotalPage"
              first-number
              last-number
              class="mb-0 mt-1 mt-sm-0"
              prev-class="prev-item"
              next-class="next-item"
              @change="changeMemberPage"
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
  BCardBody,
  BFormSelect,
  BFormCheckboxGroup,
  BFormGroup,
} from 'bootstrap-vue'
import vSelect from 'vue-select'
import { ref } from '@vue/composition-api'
import { mapActions, mapGetters } from 'vuex'
import days from 'dayjs'
import flatPickr from 'vue-flatpickr-component'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import 'animate.css'

export default {
  components: {
    BFormSelect,
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
    BFormCheckboxGroup,
    BFormGroup,
    vSelect,
  },
  data() {
    const date = new Date().toLocaleDateString('en-CA')
    return {
      whereAZ: 'desc',
      whereSort: 'username',
      whereGroup: 'username',
      providers: '',
      fromDate: date,
      toDate: date,
      groupBy: 'username',
      sortUsername: '',
      sortJumlah: '',
      currentPage: 1,
      selected1: [],
      showTableDetails: false,
      dropdown: false,
      activeTrigger: false,
      allSelectorSelected: true,
      childSelectorSelected: true,
      checkedFilters: [],
      allSelected: false,
      selectAllText: 'Select',
      fields: [
        {
          key: 'No',
        },
        {
          key: 'Tanggal',
        },
        {
          key: 'Username',
        },
        {
          key: 'Jumlah',
        },
        {
          key: 'Player',
        },
        {
          key: 'Bet',
        },
      ],
    }
  },
  computed: {
    ...mapGetters('members', ['getReferralLog', 'getDropdownList']),
    // admin
    memberTotal() {
      const total = this.getReferralLog.data
      const arr = []
      let max = 0
      if (total) {
        arr.push(total.total)
        max = Math.max(...arr)
      }
      return max
    },

    // admin perpage
    memberTotalPage() {
      const perpage = this.getReferralLog.data

      let perPage = 0
      if (perpage) {
        perPage = perpage.per_page
      }
      return perPage
    },
    dropdownListData() {
      return this.getDropdownList
    },

    selectedAllData: {
      // getter
      get() {
        const data = []
        this.getDropdownList.map((item) => {
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
        text = `All Selected ${this.getDropdownList.length}`
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

  async created() {
    const payload = {
      providers: '1,2,3,4,5,6,7,8,9,10',
      fromDate: this.fromDate,
      toDate: this.toDate,
      groupBy: this.whereGroup,
      sortType: this.whereSort,
      sortBy: this.whereAZ,
      page: 1,
    }
    await this.memberloglist(payload)
    this.fetchDropDownlist()
  },
  methods: {
    ...mapActions('members', ['memberloglist', 'fetchDropDownlist']),
    // multiple dropdown
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
      this.selectAllText = `All selected ${this.getDropdownList.length}`
      this.getDropdownList.map((item) => {
        this.checkedFilters.push(item.name)
      })
    },
    checked() {
      if (this.checkedFilters.length === 1) {
        this.selectAllText = this.checkedFilters.toString()
      } else if (this.checkedFilters.length > 1) {
        this.selectAllText = `${this.checkedFilters.length} selected`
      } else {
        this.selectAllText = 'None Selected'
      }
      if (this.checkedFilters.length < this.getDropdownList.length) {
        this.childSelectorSelected = false
        this.allSelectorSelected = false
      } else {
        this.childSelectorSelected = true
        this.allSelectorSelected = true
        this.selectAllText = `All selected ${this.getDropdownList.length}`
      }
    },
    setShowDrodown() {
      this.dropdown = false
      this.activeTrigger = false
    },
    showDailyDropdown() {
      if (this.dropdown === false) {
        this.dropdown = true
        this.activeTrigger = true
      } else {
        this.dropdown = false
        this.activeTrigger = false
      }
    },
    // end multiple dropdown
    async changeAdminPage(number) {
      const payload = {
        providers: '1,2,3,4,5,6,7,8,9,10',
        fromDate: '',
        toDate: '',
        groupBy: 'username',
        sortUsername: '',
        sortJumlah: '',
        page: number,
      }
      await this.memberloglist(payload)
    },
    async searchWord() {
      const payload = {
        providers: this.checkedFilters,
        fromDate: this.fromDate,
        toDate: this.toDate,
        groupBy: this.whereSort,
        sortType: this.whereSort,
        sortBy: this.whereAZ,
        page: 1,
      }
      await this.memberloglist(payload)
      this.currentPage = 1
    },
    // Filter From Date To Date
    async searchPicker(fromDate, toDate) {
      this.dropdown = false
      this.activeTrigger = false
      const filteredDataBy = this.getDropdownList.filter((item) =>
        this.checkedFilters.includes(item.name)
      )
      const provider = filteredDataBy.map((item) => item.id).join(',')
      const payload = {
        providers: provider,
        fromDate,
        toDate,
        groupBy: this.whereGroup,
        sortType: this.whereSort,
        sortBy: this.whereAZ,
        page: this.currentPage,
      }
      await this.$store.dispatch('members/memberloglist', payload)
      this.currentPage = 1
    },
    formatDate(date) {
      return days(date).format('DD MMM YYYY HH:mm')
    },
    formatPrice(value) {
      let val = (value / 1).toFixed('.', ',')
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
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
