<template>
  <div>
    <b-card no-body>
      <b-card-body>
        <b-row>
          <!--OPTION THIS -->
          <b-col cols="12" md="2">
            <div class="mt-2"></div>
            <!-- <v-select
              v-model="selected"
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              label="title"
              :options="option"
            /> -->
            <b-form-select v-model="whereOption" id="sortOptions">
              <option value="">Pilih Option</option>
              <option value="username">Username</option>
              <option value="description">Description</option>
              <option value="type">Type Bonus</option>
            </b-form-select>
          </b-col>

          <b-col cols="12" md="3">
            <div class="mt-2"></div>
            <b-form-input
              v-model="nameOption"
              id="basicInput"
              type="text"
              placeholder="Enter Data"
            />
          </b-col>
          <b-col cols="12" md="1" class="mb-md-0 mt-2 my-sm-2 mr-3">
            <b-button
              @click="searchWord(whereOption, nameOption)"
              v-ripple.400="'rgba(255, 255, 255, 0.15)'"
              variant="primary"
            >
              Search
            </b-button>
          </b-col>

          <!-- Time form date to date -->
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
              @click="searchPicker(fromDate, toDate)"
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
            md="9"
            class="d-flex align-items-center justify-content-start"
          >
            <h2>Edit Credit</h2>
          </b-col>
        </b-row>
      </div>

      <!-- TABLE THIS -->
      <b-table
        :fields="fields"
        :items="getMutasiEdit.data.data"
        responsive
        show-empty
        empty-text="No Data"
        class="position-relative"
      >
        <!-- NO -->
        <template #cell(no)="{ index }">
          {{ parseInt(parseInt(index) + 1) }}
        </template>

        <!-- DATE -->
        <template #cell(date)="{ item }">
          {{ formateDate(item.date) }}
        </template>

        <!-- USER NAME -->
        <template #cell(userName)="{ item }">
          {{ item.username }}
        </template>

        <!-- TYPE -->
        <template #cell(type)="{ item }">
          {{ item.type }}
        </template>

        <!-- JUMLAH -->
        <template #cell(jumlah)="{ item }">
          {{ formatPrice(item.jumlah) }}
        </template>

        <!-- DETAIL -->
        <template #cell(detail)="{ item }">
          {{ item.detail }}
        </template>

        <!-- DETAIL DESCRIPTION -->
        <template #cell(detaildesc)="{ item }">
          {{ item.detail_description }}
        </template>

        <!-- APRROVAL -->
        <template #cell(aprroval)="{ item }">
          {{ item.adminApproval }}
        </template>
      </b-table>
      <hr />

      <!-- TOTAL THIS -->
      <b-row>
        <b-col cols="5" md="5" class="mb-md-0"></b-col>
        <b-col cols="3" md="1" class="mb-md-0 d-flex">
          <b>Total: </b>
          <span class="ml-3">
            {{ formatPrice(getMutasiEdit.totalJumlah) }}</span
          >
        </b-col>
      </b-row>

      <!-- THIS PAGINATIOn -->
      <div class="mx-2 mb-2 mt-2">
        <b-row>
          <b-col
            cols="12"
            sm="6"
            class="d-flex align-items-center justify-content-center justify-content-sm-start"
          >
            <!-- <span class="text-muted">Showing 1 of {{ allTotal }} entries</span> -->
          </b-col>
          <b-col
            cols="12"
            sm="6"
            class="d-flex align-items-center justify-content-center justify-content-sm-end"
          >
            <b-col
              v-if="getMutasiEdit"
              cols="12"
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
          </b-col>
        </b-row>
      </div>
    </b-card>
  </div>
</template>

<script>
import {
  BCardHeader,
  BCardBody,
  BFormDatepicker,
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
  BTooltip,
  BFormSelect,
} from 'bootstrap-vue'
import { ref } from '@vue/composition-api'
import flatPickr from 'vue-flatpickr-component'
import vSelect from 'vue-select'
import { mapActions, mapGetters } from 'vuex'
import 'cleave.js/dist/addons/cleave-phone.us'
import days from 'dayjs'

export default {
  components: {
    BCardHeader,
    BCardBody,
    BFormDatepicker,
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
    BTooltip,
    flatPickr,
    vSelect,
    BFormSelect,
  },

  data() {
    return {
      whereOption: '',
      fromDate: '',
      toDate: '',
      username: '',
      type: '',
      description: '',
      selected: { title: 'Pilih Option' },
      option: [
        { title: 'Pilih Option' },
        { title: 'Username' },
        { title: 'Description' },
        { title: 'Type Bonus' },
      ],
      currentPage: 1,
      fields: [
        {
          key: 'no',
        },
        {
          key: 'date',
        },
        {
          key: 'userName',
        },
        {
          key: 'type',
        },

        {
          key: 'jumlah',
        },
        {
          key: 'detail',
        },
        {
          key: 'detaildesc',
          label: 'detail description',
        },
        {
          key: 'aprroval',
        },
      ],
    }
  },
  computed: {
    ...mapGetters('services', ['getMutasiEdit']),

    // creadit total total
    allTotal() {
      const total = this.getMutasiEdit.data
      const arr = []
      let max = 0
      if (total) {
        arr.push(total.total)
        max = Math.max(...arr)
      }
      return max
    },

    // creadit total perpage
    perPage() {
      const perpage = this.getMutasiEdit.data
      let perPage = 0
      if (perpage) {
        perPage = perpage.per_page
      }
      return perPage
    },
  },

  created() {
    const payload = {
      username: '',
      description: '',
      type: '',
      fromDate: '',
      toDate: '',
      page: 1,
    }
    this.mutasiEditlist(payload)
  },

  // test
  methods: {
    ...mapActions('services', ['mutasiEditlist']),
    async changePaginat(number) {
      const payload = {
        username: '',
        description: '',
        type: '',
        fromDate: '',
        toDate: '',
        page: number,
      }
      await this.mutasiEditlist(payload)
    },

    formateDate(date) {
      return days(date).format('DD MMM YYYY HH:mm')
    },

    // Filter Seacrh
    async searchWord(whereOption, nameOption) {
      const payload = {
        whereOption,
        nameOption,
        fromDate: '',
        toDate: '',
        page: 1,
      }
      await this.mutasiEditlist(payload)
      this.currentPage = 1
    },

    // Filter From Date To Date
    async searchPicker(fromDate, toDate) {
      const payload = {
        username: '',
        description: '',
        type: '',
        fromDate,
        toDate,
        page: 1,
      }
      await this.mutasiEditlist(payload)
      this.currentPage = 1
    },

    // currency format
    formatPrice(value) {
      let val = (value / 1).toFixed('.', ',')
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
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
