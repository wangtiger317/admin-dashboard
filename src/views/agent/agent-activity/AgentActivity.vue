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
              <option value="deskripsi">Desciption</option>
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
            <h2>Agent Activity</h2>
          </b-col>
        </b-row>
      </div>
      <!-- Table -->
      <b-table
        :fields="fields"
        :items="getAdminLog.data"
        responsive
        show-empty
        empty-text="No Data"
        class="position-relative"
      >
        <!-- NO -->
        <template #cell(no)="{ index }">
          {{ parseInt(parseInt(index) + 1) }}
        </template>

        <!-- USERNAME -->

        <!-- DATE -->
        <template #cell(date)="{ item }">{{ formateDate(item.created_at) }}</template>

        <!-- USERNAME -->
        <template #cell(username)="{ item }">{{ item.username }} </template>

        <!-- IP -->
        <template #cell(ip)="{ item }">{{
          item.properties.ip || '-'
        }}</template>

        <!-- ACTIVITY -->
        <template #cell(activity)="{ item }"
          >{{ item.properties.activity || '-' }}
        </template>

        <!-- TARGET -->
        <template #cell(target)="{ item }">{{
          item.properties.target || '-'
        }}</template>

        <!-- DESCRIPTION -->
        <template #cell(description)="{ item }">{{
          item.description
        }}</template>
      </b-table>

      <!-- Pagination -->
      <div class="mx-2 mb-2 mt-2">
        <b-row>
          <b-col
            cols="12"
            sm="6"
            class="d-flex align-items-center justify-content-center justify-content-sm-start"
          >
            <!-- <span class="text-muted"
              >Showing 1 of {{ adminTotal }} entries</span
            > -->
          </b-col>
          <b-col
            v-if="getAdminLog"
            cols="12"
            sm="6"
            class="d-flex align-items-center justify-content-center justify-content-sm-end"
          >
            <b-pagination
              v-if="adminTotal > adminTotalPage"
              v-model="currentPage"
              :total-rows="adminTotal"
              :per-page="adminTotalPage"
              first-number
              last-number
              class="mb-0 mt-1 mt-sm-0"
              prev-class="prev-item"
              next-class="next-item"
              @change="changeAdminPage"
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
  BPagination,
  BCardBody,
  BFormSelect,
} from 'bootstrap-vue'
import vSelect from 'vue-select'
import { mapActions, mapGetters } from 'vuex'
import { ref } from '@vue/composition-api'
import flatPickr from 'vue-flatpickr-component'
import 'animate.css'
import days from 'dayjs'

export default {
  components: {
    BCard,
    BRow,
    BCol,
    BFormInput,
    BButton,
    BTable,
    BPagination,
    flatPickr,
    vSelect,
    BCardBody,
    BFormSelect,
  },
  data() {
    return {
      currentPage: 1,
      nameOption: '',
      whereOption: '',
      fromDate: '',
      toDate: '',
      username: '',
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
          key: 'ip',
        },
        {
          key: 'activity',
        },
        {
          key: 'target',
        },
        {
          key: 'description',
        },
      ],
    }
  },

  computed: {
    ...mapGetters('admin', ['getAdminLog']),

    // admin
    adminTotal() {
      const total = this.getAdminLog
      const arr = []
      let max = 0
      if (total) {
        arr.push(total.total)
        max = Math.max(...arr)
      }
      return max
    },

    // admin perpage
    adminTotalPage() {
      const perpage = this.getAdminLog
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
    this.adminloglist(payload)
  },

  methods: {
    ...mapActions('admin', ['adminloglist']),

    // format date
    formateDate(date) {
      return days(date).format('DD MMM YYYY HH:mm')
    },

    async changeAdminPage(number) {
      const payload = {
        whereOption: '',
        nameOption: '',
        fromDate: '',
        toDate: '',
        page: number,
      }
      await this.adminloglist(payload)
    },

    async searchWord(whereOption, nameOption) {
      const payload = {
        whereOption,
        nameOption,
        fromDate: '',
        toDate: '',
        page: 1,
      }
      await this.adminloglist(payload)
      this.currentPage = 1
    },

    // Filter From Date To Date
    async searchPicker(fromDate, toDate) {
      const payload = {
        fromDate,
        toDate,
        whereOption: '',
        nameOption: '',
        page: 1,
      }
      await this.adminloglist(payload)
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
