<template>
  <div>
    <b-card no-body>
      <b-card-body>
        <b-row>
          <!-- slect options -->
          <b-col cols="12" md="2" class="mb-md-0 mb-2">
            <label>Option</label>
            <b-form-select v-model="whereOption" id="sortOptions">
              <option value="">Pilih Option</option>
              <option value="username">Username</option>
              <option value="activity">Activity</option>
              <option value="target">Target</option>
              <option value="description">Desciption</option>
            </b-form-select>
          </b-col>

          <!-- masukan data  -->
          <b-col cols="12" md="3" class="mb-md-0">
            <label>Data</label>
            <b-form-input
              id="basicInput"
              v-model="nameOption"
              placeholder="Masukan Data"
            />
          </b-col>

          <b-col cols="12" md="1" class="mb-md-0 mt-2">
            <b-button
              :ripple="'rgba(255, 255, 255, 0.15)'"
              variant="primary"
              @click="searchWord(whereOption, nameOption)"
            >
              Search
            </b-button>
          </b-col>

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
            <h2>Member Activity</h2>
          </b-col>
        </b-row>
      </div>

      <!-- THIS TABLE  -->
      <b-table
        :fields="fields"
        :items="getMemberLog.data"
        responsive
        show-empty
        empty-text="No Data"
        class="position-relative"
      >
        <!-- NO -->
        <template #cell(no)="{ index }">
          {{ parseInt(parseInt(index + 1)) }}
        </template>

        <!-- DATE -->
        <template #cell(date)="{ item }">
          {{ formateDate(item.date) }} </template>

        <!-- USERNAME -->
        <template #cell(username)="{ item }">
          {{ item.username }} </template>

        <!-- IP -->
        <template #cell(ipAdress)="{ item }">
          {{ item.properties.ip }}
        </template>

        <!-- DEVICE -->
        <template #cell(device)="{ item }">
          {{ item.properties.device }}
        </template>

        <!-- DEVICE -->
        <template #cell(activity)="{ item }">
          {{ item.properties.activity }}
        </template>

        <!-- TARGET -->
        <template #cell(target)="{ item }">
          {{ item.properties.target }}
        </template>

        <!-- DESCRIPTION -->
        <template #cell(desc)="{ item }"> {{ item.description }} </template>
      </b-table>

      <!-- THIS PAGINATION -->
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
            v-if="getMemberLog"
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
  BFormSelect,
  BCardBody,
} from 'bootstrap-vue'
import vSelect from 'vue-select'
import { ref } from '@vue/composition-api'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import 'animate.css'
import flatPickr from 'vue-flatpickr-component'
import { mapActions, mapGetters } from 'vuex'
import days from 'dayjs'

export default {
  components: {
    ToastificationContent,
    BFormCheckbox,
    BFormSelect,
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
    BCardHeader,
    BCardBody,
    vSelect,
    flatPickr,
  },
  data() {
    return {
      whereOption: '',
      search: '',
      currentPage: 1,
      fields: [
        {
          key: 'no',
        },
        {
          key: 'date',
        },
        {
          key: 'username',
        },
        {
          key: 'ipAdress',
          label: 'ip',
        },
        {
          key: 'device',
        },
        {
          key: 'activity',
        },
        {
          key: 'target',
        },
        {
          key: 'desc',
          label: 'Description',
        },
      ],
    }
  },

  computed: {
    ...mapGetters('members', ['getMemberLog']),

    // admin
    allTotal() {
      const total = this.getMemberLog
      const arr = []
      let max = 0
      if (total) {
        arr.push(total.total)
        max = Math.max(...arr)
      }
      return max
    },

    // admin perpage
    perPage() {
      const perpage = this.getMemberLog
      let perPage = 0
      if (perpage) {
        perPage = perpage.per_page
      }
      return perPage
    },
  },

  created() {
    const payload = {
      whereOption: '',
      nameOption: '',
      fromDate: '',
      toDate: '',
      page: 1,
    }
    this.memberLoglist(payload)
  },

  methods: {
    ...mapActions('members', ['memberLoglist']),

    async changePage(number) {
      const payload = {
        whereOption: this.whereOption,
        nameOption: this.nameOption,
        fromDate: this.fromDate,
        toDate: this.toDate,
        page: number,
      }
      await this.memberLoglist(payload)
    },

    formateDate(date) {
      return days(date).format('DD MMM YYYY HH:mm')
    },

    formatPrice(value) {
      let val = (value / 1).toFixed('.', ',')
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    },

    async searchWord(whereOption, nameOption) {
      const payload = {
        whereOption,
        nameOption,
        fromDate: '',
        toDate: '',
        page: 1,
      }
      await this.memberLoglist(payload)
      this.currentPage = 1
    },

    async searchPicker(fromDate, toDate) {
      const payload = {
        whereOption: '',
        nameOption: '',
        fromDate,
        toDate,
        page: 1,
      }
      await this.memberLoglist(payload)
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
