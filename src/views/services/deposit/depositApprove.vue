<template>
  <div>
    <!-- Deposit history Approved -->
    <b-card no-body class="mt-3">
      <b-card-body>
        <b-row>
          <!-- slect options -->
          <b-col cols="12" md="2" class="mb-md-0 mb-2">
            <label>Option</label>
            <b-form-select v-model="whereOption" id="sortOptions">
              <option value="">Pilih Option</option>
              <option value="username ">Username</option>
              <option value="nomor-rekening">No Rekening</option>
              <option value="nama-rekening">Nama Rekening</option>
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

    <!-- DEPOSIT APPROVE -->
    <!-- deposit-approved Card -->
    <b-card no-body class="mb-0">
      <div class="m-2">
        <b-row>
          <b-col
            cols="12"
            md="9"
            class="d-flex align-items-center justify-content-start"
          >
            <h2>Deposit Approved</h2>
          </b-col>
        </b-row>
      </div>

      <!-- table this -->
      <b-table
        :fields="fieldsApproved"
        :items="getDepositApproved.data.data"
        responsive
        show-empty
        empty-text="No Data"
      >
        <!-- NO -->
        <template #cell(no)="{ index }">
          {{ index + 1 }}
        </template>

        <!-- Date -->
        <template #cell(date)="{ item }">
          {{ formateDate(item.date) }}</template>

        <!-- Username -->
        <template #cell(username)="{ item }">{{
          item.memberUsername
        }}</template>

        <!-- Origin Bank -->
        <template #cell(originBank)="{ item }">
          {{ item.memberRekName }}
          {{ item.memberNamaRek }}
          {{ item.memberNoRek }}</template>

        <!-- Destination Bank -->
        <template #cell(destinationBank)="{ item }">
          {{ item.tujuanRekName }}
          {{ item.tujuanNamaRek }}
          {{ item.tujuanNoRek }}</template>

        <!-- Amount -->
        <template #cell(amount)="{ item }">{{
          formatPrice(item.amount)
        }}</template>

        <!-- Note -->
        <template #cell(note)="{ item }">{{ item.rekNote }}</template>

        <!-- Approval -->
        <template #cell(approval)="{ item }">{{ item.adminName }}</template>

        <!-- action -->
        <template #cell(actions)="item">
          <div class="text-nowrap">
            <feather-icon
              :id="`invoice-row-${item.id}-RotateCcwIcon-icon`"
              icon="RotateCcwIcon"
              size="16"
              class="cursor-pointer mx-1"
              @click="flipInCancel('success', 'top-center', item)"
            />
            <b-tooltip
              title="Cancel"
              :target="`invoice-row-${item.id}-RotateCcwIcon-icon`"
            />
          </div>
        </template>
      </b-table>
      <hr />

      <!-- TOTAL This -->
      <b-row class="">
        <b-col cols="7" md="7" class="mb-md-0 ml-5"></b-col>
        <b>Total:</b>
        <b-col cols="2" md="2" class="mb-md-0">{{
          formatPrice(getDepositApproved.totalAmount)
        }}</b-col>
      </b-row>

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
            v-if="getDepositApproved"
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
  BFormTextarea,
  BFormSelect,
  BCardHeader,
  BCardBody,
  BFormDatepicker,
  BTooltip,
} from 'bootstrap-vue'
import vSelect from 'vue-select'
import { ref } from '@vue/composition-api'
import { mapActions, mapGetters } from 'vuex'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import 'animate.css'
import flatPickr from 'vue-flatpickr-component'
import days from 'dayjs'

export default {
  components: {
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
    BFormTextarea,
    BFormSelect,
    BCardHeader,
    BCardBody,
    BFormDatepicker,
    vSelect,
    BTooltip,
  },

  computed: {
    ...mapGetters('services', ['getDepositApproved']),

    allTotal() {
      const total = this.getDepositApproved.data
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
      const perpage = this.getDepositApproved.data
      let perPage = 0
      if (perpage) {
        perPage = perpage.per_page
      }
      return perPage
    },
  },

  created() {
    const payload = {
      page: 1,
      fromDate: '',
      toDate: '',
      whereOption: '',
      nameOption: '',
    }
    this.fetchApprovedList(payload)
  },

  methods: {
    ...mapActions('services', ['fetchApprovedList', 'CancelProg']),
    // flip in sweet alert this
    async changePage(number) {
      const payload = {
        whereOption: '',
        nameOption: '',
        fromDate: '',
        toDate: '',
        page: number,
      }
      await this.adminloglist(payload)
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
      await this.fetchApprovedList(payload)
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
      await this.fetchApprovedList(payload)
      this.currentPage = 1
    },

    // method fromat curreny
    formatPrice(value) {
      let val = (value / 1).toFixed('.', ',')
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    },

    // flipInCancel
    async flipInCancel(variant, position, item) {
      const res = await this.$swal({
        title: 'Are you sure?',
        text: 'Data will be Cancelled.',
        confirmButtonText: 'Ok',
        cancelButtonText: 'No, I changed my mind!',
        showCancelButton: true,
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-secondary ml-1',
        },
        showClass: {
          popup: 'animate__animated animate__flipInX',
        },
        buttonsStyling: false,
      })
      if (res.value) {
        if (await this.CancelProg(item)) {
          // toast notification this
          this.$toast(
            {
              component: ToastificationContent,
              props: {
                title: 'Success',
                icon: 'CheckIcon',
                text: 'Success Deposit Cancelled',
                variant,
              },
            },
            {
              position,
            }
          )
        } else if (res.dismiss === 'cancel') {
          this.$swal({
            title: 'Cancelled',
            text: 'Ok your data is still there and safe',
            confirmButtonText: 'Ok',
            customClass: {
              cancelButton: 'btn btn-secondary',
            },
          })
        }
      }
    },
  },

  data() {
    return {
      nameOption: '',
      whereOption: '',
      fromDate: '',
      toDate: '',
      currentPage: 1,
      selecteds: null,
      fieldsApproved: [
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
          key: 'originBank',
        },
        {
          key: 'destinationBank',
        },
        {
          key: 'amount',
        },
        {
          key: 'note',
        },
        {
          key: 'approval',
        },
        {
          key: 'actions',
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
</style>

<style lang="scss">
@import '@core/scss/vue/libs/vue-sweetalert.scss';
@import '@core/scss/vue/libs/vue-select.scss';
@import '@core/scss/vue/libs/vue-flatpicker.scss';
</style>
