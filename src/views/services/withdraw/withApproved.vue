<template>
  <div>
    <!-- SEARCH THIS -->
    <b-card no-body class="mt-3">
      <b-card-body>
        <b-row>
          <b-col cols="11" md="11" class="mb-md-0 mb-2 d-flex">
            <b-form-input
              v-model="search"
              class="d-inline-block mr-1"
              placeholder="Search Username..."
            />
            <b-button
              v-ripple.400="'rgba(255, 255, 255, 0.15)'"
              variant="primary"
              @click="searchWord(search)"
            >
              Search
            </b-button>
          </b-col>
        </b-row>
      </b-card-body>
    </b-card>

    <!-- TITLE THIS -->
    <b-card no-body class="mb-0">
      <div class="m-2">
        <b-row>
          <b-col
            cols="12"
            md="9"
            class="d-flex align-items-center justify-content-start"
          >
            <h2>Withdraw Approved</h2>
          </b-col>
        </b-row>
      </div>

      <!-- TABLE THIS -->
      <b-table
        :fields="fields2"
        :items="getWithdrawalCount.data.data"
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
        <template #cell(Date)="{ item }">
          {{ formateDate(item.date) }}
        </template>

        <!-- USERNAME -->
        <template #cell(Username)="{ item }">
          {{ item.memberUsername }}
        </template>

        <!-- DESTINATION BANK -->
        <template #cell(DestinationBank)="{ item }">
          {{ item.memberRekName }} {{ item.memberNamaRek }}
          <br /> {{ item.memberNoRek }}
        </template>

        <!-- ORIGIN BANK TRANSFER -->
        <template #cell(OriginBankTransfer)="{ item }">
          {{ item.asalRekName }} {{ item.asalNamaRek }} 
          <br /> {{ item.asalNoRek }}
        </template>

        <!-- AMOUNT -->
        <template #cell(Amount)="{ item }">
          {{ formatPrice(item.amount) }}
        </template>

        <!-- NOTE -->
        <template #cell(Note)="{ item }">{{ item.note }} </template>

        <!-- Approval -->
        <template #cell(Approval)="{ item }"> {{ item.adminName }} </template>

        <!-- ACTIONS -->
        <template #cell(actions)="item">
          <div class="text-nowrap">
            <feather-icon
              :id="`invoice-row-${item.id}-RotateCcwIcon-icon`"
              icon="RotateCcwIcon"
              size="16"
              class="cursor-pointer mx-1"
              @click="CancelWithdrawss('success', 'top-center', item)"
            />
            <b-tooltip
              title="Cancel"
              :target="`invoice-row-${item.id}-RotateCcwIcon-icon`"
            />
          </div>
        </template>
      </b-table>
      <hr />

      <!-- This Total -->
      <b-row>
        <b-col cols="7" md="7" class="mb-md-0"></b-col>
        <b>Total:</b>
        <span class="ml-3">
          {{ formatPrice(getWithdrawalCount.totalAmmount) }}
        </span>
      </b-row>

      <!-- This pagination -->
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
            v-if="getWithdrawalCount"
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
  BTooltip,
  BCardBody,
} from 'bootstrap-vue'
import vSelect from 'vue-select'
import { ref } from '@vue/composition-api'
import { mapActions, mapGetters } from 'vuex'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import 'animate.css'
import days from 'dayjs'

export default {
  components: {
    BCardHeader,
    BCardBody,
    ToastificationContent,
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
    vSelect,
    BTooltip,
  },

  computed: {
    ...mapGetters('services', ['getWithdrawalCount']),

    // getWithdrawalCount
    allTotal() {
      const total = this.getWithdrawalCount.data
      const arr = []
      let max = 0
      if (total) {
        arr.push(total.total)
        max = Math.max(...arr)
      }
      return max
    },
    perPage() {
      const perpage = this.getWithdrawalCount.data
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
      page: 1,
    }
    this.withdrawallist(payload)
  },

  methods: {
    // withdrawallist
    ...mapActions('services', ['withdrawallist', 'cancelApprove']),

    async changePage(number) {
      const payload = {
        username: '',
        page: number,
      }
      await this.withdrawallist(payload)
    },

    formateDate(date) {
      return days(date).format('DD MMM YYYY HH:mm')
    },

    formatPrice(value) {
      let val = (value / 1).toFixed('.', ',')
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    },

    async searchWord(username) {
      const payload = {
        username,
        page: 1,
      }
      await this.withdrawallist(payload)
      this.currentPage = 1
    },

    // currency format
    formatPrice(value) {
      let val = (value / 1).toFixed('.', ',')
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    },

    // flipInSave
    async CancelWithdrawss(variant, position, item) {
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
        if (await this.cancelApprove(item)) {
          // toast notification this
          this.$toast(
            {
              component: ToastificationContent,
              props: {
                title: 'Success',
                icon: 'CheckIcon',
                text: 'Success Withdraw Cancelled',
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
      username: '',
      currentPage: 1,
      selecteds: null,
      fields2: [
        {
          key: 'No',
        },
        {
          key: 'Date',
        },
        {
          key: 'Username',
        },
        {
          key: 'DestinationBank',
        },
        {
          key: 'OriginBankTransfer',
        },
        {
          key: 'Amount',
        },
        {
          key: 'Note',
        },
        {
          key: 'Approval',
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
@import '@core/scss/vue/libs/vue-select.scss';
@import '@core/scss/vue/libs/vue-sweetalert.scss';
</style>
