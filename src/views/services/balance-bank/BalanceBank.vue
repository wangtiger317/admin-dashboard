<template>
  <div>
    <!-- Table Container Card -->
    <b-card no-body class="mb-0">
      <div class="m-2">
        <b-row>
          <b-col
            cols="12"
            md="9"
            class="d-flex align-items-center justify-content-start"
          >
            <h2>Balance Bank</h2>
          </b-col>
        </b-row>
      </div>
      <b-table
        :fields="fields"
        :items="mutatedBalanceBank"
        responsive
        show-empty
        empty-text="No Data"
        class="position-relative"
      >
        <!-- number -->
        <template #cell(no)="{ index }">
          {{ index + 1 }}
        </template>

        <template #cell(Bank)="{ item }">
          {{ item.namaBank }} - {{ item.nomor_rekening }} - {{ item.namaRek }}
        </template>

        <template #cell(BeginningBalance)="{ item }">
          <b-form-input
            id="basicInput"
            v-model="item.saldoAwal"
            @keypress="onlyNumber"
          />
        </template>

        <template #cell(Balance)="{ item }">
          {{ formatPrice(item.balance) }}
        </template>

        <template #cell(BalanceCorrection)="{ item }">
          <b-form-select v-model="item.koreksiBalance">
            <option value="update">Update</option>
            <option value="plus">Tambah</option>
            <option value="minus">Kurangi</option>
          </b-form-select>
        </template>

        <template #cell(Amount)="{ item }">
          <b-form-input
            id="basicInput"
            v-model="item.jumlahBalance"
            @keypress="onlyNumber"
          />
        </template>

        <template #cell(Description)="{ item }">
          <b-form-input id="basicInput2" v-model="item.deskripsi" />
        </template>

        <!-- Action -->
        <template #cell(Action)="{ item }">
          <div class="text-nowrap">
            <!-- save this -->
            <feather-icon
              :id="`invoice-row-${item.id}-save-icon`"
              icon="SaveIcon"
              size="16"
              class="cursor-pointer mx-1"
              @click="update('success', 'top-center', item)"
            />
            <b-tooltip
              title="Save"
              :target="`invoice-row-${item.id}-save-icon`"
            />
          </div>
        </template>
      </b-table>
      <hr />

      <b-row>
        <b-col cols="1" md="1" class="mb-md-0 ml-0" />
        <b-col cols="2" md="2" class="mb-md-0 ml-0">
          <b>Total:</b>
        </b-col>
        <b-col cols="1" md="1" class="mb-md-0 ml-2">{{
          formatPrice(getbalanceBank.totalSaldoAwal)
        }}</b-col>
        <b-col cols="2" md="3" class="mb-md-0 ml-3">{{
          formatPrice(getbalanceBank.totalBalance)
        }}</b-col>
        <b-col cols="2" md="3" class="mb-md-0 ml-0">{{
          formatPrice(getbalanceBank.totalAmount)
        }}</b-col>
      </b-row>

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
            v-if="getbalanceBank"
            cols="12"
            sm="6"
            class="d-flex align-items-center justify-content-center justify-content-sm-end"
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
  BTooltip,
  BBadge,
  BDropdown,
  BDropdownItem,
  BPagination,
  BFormTextarea,
  BFormSelect,
} from 'bootstrap-vue'
import { mapActions, mapGetters } from 'vuex'
import vSelect from 'vue-select'
import { ref } from '@vue/composition-api'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import 'animate.css'
import days from 'dayjs'

export default {
  components: {
    ToastificationContent,
    BFormSelect,
    BCard,
    BRow,
    BCol,
    BFormInput,
    BButton,
    BTable,
    BMedia,
    BAvatar,
    BTooltip,
    BLink,
    BBadge,
    BDropdown,
    BDropdownItem,
    BPagination,
    BFormTextarea,
    vSelect,
  },

  data() {
    return {
      koreksiBalance: 'update',
      currentPage: 1,
      selected: null,
      fields: [
        {
          key: 'no',
        },
        {
          key: 'Bank',
        },
        {
          key: 'BeginningBalance',
        },
        {
          key: 'Balance',
        },
        {
          key: 'BalanceCorrection',
        },
        {
          key: 'Amount',
        },
        {
          key: 'Description',
        },
        {
          key: 'Action',
        },
      ],
    }
  },

  computed: {
    ...mapGetters('services', ['getbalanceBank']),

    mutatedBalanceBank() {
      return this.getbalanceBank?.data?.data?.map((item) => {
        item.saldoAwal = item.saldoAwal == null ? 0 : item.saldoAwal
        item.jumlahBalance = item.jumlahBalance == null ? 0 : item.jumlahBalance
        // item.jumlahBalance = null
        item.deskripsi = ''
        return item
      })
    },

    allTotal() {
      const total = this.getbalanceBank.data
      const arr = []
      let max = 0
      if (total) {
        arr.push(total.total)
        max = Math.max(...arr)
      }
      return max
    },

    totalPage() {
      const perpage = this.getbalanceBank.data
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
    }
    this.fetchDataList(payload)
  },

  methods: {
    ...mapActions('services', ['balanceBankList', 'updateBalance']),

    async changePage(number) {
      const payload = {
        page: number,
      }
      await this.balanceBankList(payload)
    },

    formateDate(date) {
      return days(date).format('DD MMM YYYY HH:mm')
    },

    async fetchDataList(payload) {
      await this.balanceBankList(payload)
    },
    // flip in sweet alert this

    onlyNumber($event) {
      const keyCode = $event.keyCode ? $event.keyCode : $event.which
      if ((keyCode < 48 || keyCode > 57) && keyCode !== 190) {
        $event.preventDefault()
      }
    },

    // method fromat curreny
    formatPrice(value) {
      const val = (value / 1).toFixed('.', ',')
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    },

    // flipInSave
    async update(variant, position, item) {
      const res = await this.$swal({
        title: 'Are you sure?',
        text: 'Data will be Saved.',
        confirmButtonText: 'Save',
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
        if (!(await this.validateData(item))) return

        if (await this.updateBalance(item)) {
          this.$toast(
            {
              component: ToastificationContent,
              props: {
                title: 'Success',
                icon: 'CheckIcon',
                text: 'Updated successfully!',
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

    async validateData(item) {
      const validationErros = []

      // if (item.saldoAwal == null) {
      //   validationErros.push('Begining Balance Is Empty')
      // }
      //
      // if (item.saldoAwal == null) {
      //   validationErros.push('Amount Is Empty')
      // }

      if (item.deskripsi == '') {
        validationErros.push('Description Is Empty')
      }

      if (validationErros.length) {
        validationErros.forEach((text) => {
          this.$toast(
            {
              component: ToastificationContent,
              props: {
                title: 'Error',
                icon: 'error',
                text,
                variant: 'error',
              },
            },
            {
              position: 'top-center',
            }
          )
        })

        return false
      }

      return true
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
