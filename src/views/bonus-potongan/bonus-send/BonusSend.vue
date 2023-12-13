<template>
  <div>
    <b-card no-body>
      <b-card-body>
        <b-row>
          <b-col cols="11" md="11" class="mb-md-0 mb-2 d-flex">
            <b-form-input
              v-model="searchUsername"
              class="d-inline-block mr-1"
              placeholder="Search Username..."
            />
            <b-button
              v-ripple.400="'rgba(255, 255, 255, 0.15)'"
              variant="primary"
              @click="searchWord(searchUsername)"
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
            md="3"
            class="d-flex align-items-center justify-content-start"
          >
            <h2>Bonus To Send</h2>
          </b-col>
          <b-col cols="12" md="9" class="text-right">
            <b-button
              v-ripple.400="'rgba(113, 102, 240, 0.15)'"
              class="ml-3"
              variant="primary"
              @click="DownloadCSV"
            >
              <feather-icon icon="ArrowDownIcon" class="mr-50" />
              <span class="align-middle">Download CSV</span>
            </b-button>
            <b-button
              class="ml-1"
              variant="primary"
              @click="flipInSendAll('success', 'top-center', getBonusSend)"
            >
              <feather-icon icon="SendIcon" class="mr-50" />
              <span class="align-middle"> Send All</span>
            </b-button>
          </b-col>
        </b-row>
      </div>

      <!-- TABLE -->
      <b-table
        :fields="fields"
        :items="getBonusSend.data"
        responsive
        show-empty
        empty-text="No Data"
        class="position-relative"
      >
        <!-- NO -->
        <template #cell(no)="{ index }"> {{ index + 1 }} </template>

        <!-- TANGGAL -->
        <template #cell(Tanggal)="{ item }">
          {{ formateDate(item.created_at) }}
        </template>

        <!-- USERNAME -->
        <template #cell(Username)="{ item }"> {{ item.username }} </template>

        <!-- BONUS -->
        <template #cell(Bonus)="{ item }"> {{ item.nama_bonus }} </template>

        <!-- JUMLAH/HADIAH -->
        <template #cell(jumlah)="{ item }">
          {{ formatPrice(item.jumlah) }}
        </template>

        <!-- ACTION -->
        <template #cell(action)="{ item }">
          <div class="text-nowrap">
            <!-- save this -->
            <feather-icon
              :id="`invoice-row-${item.id}-save-icon`"
              icon="RotateCcwIcon"
              size="16"
              class="cursor-pointer mx-1"
              @click="flipInCancel('success', 'top-center', item)"
            />
            <b-tooltip
              title="Cancel"
              class="cursor-pointer mt-2"
              :target="`invoice-row-${item.id}-save-icon`"
            />

            <feather-icon
              :id="`invoice-row-${item.id}-delete-icon`"
              icon="SendIcon"
              class="cursor-pointer"
              size="16"
              @click="flipInSend('success', 'top-center', item)"
            />
            <b-tooltip
              title="Send"
              class="cursor-pointer"
              :target="`invoice-row-${item.id}-delete-icon`"
            />
          </div>
        </template>
      </b-table>

      <!-- THIS PAGINATION -->
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
            cols="12"
            v-if="getBonusSend"
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
  BCardHeader,
  BTooltip,
  BCardBody,
} from 'bootstrap-vue'
import vSelect from 'vue-select'
import { ref } from '@vue/composition-api'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import 'animate.css'
import { mapActions, mapGetters } from 'vuex'
import exportFromJSON from 'export-from-json'
import days from 'dayjs'

export default {
  components: {
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
    BTooltip,
    vSelect,
  },

  computed: {
    ...mapGetters('bonus', [
      'getBonusSend',
      'getDownloadList',
      'getDownloadFilteredList',
    ]),
    ...mapGetters('broadcast', ['getBroadcastTop']),

    allTotal() {
      const total = this.getBonusSend
      const arr = []
      let max = 0
      if (total) {
        arr.push(total.total)
        max = Math.max(...arr)
      }
      return max
    },

    perPage() {
      const perpage = this.getBonusSend
      let perPage = 0
      if (perpage) {
        perPage = perpage.per_page
      }
      return perPage
    },

    downloadList() {
      const { data } = this.getDownloadList
      const arrayObject = data
      const newArray = new Object()
      arrayObject.push(newArray)
      return arrayObject
    },

    filterdDownloadList() {
      const { data } = this.getDownloadList
      const arrayObject = data
      const newArray = new Object()
      arrayObject.push(newArray)
      return arrayObject
    },
  },

  created() {
    const payload = {
      searchUsername: '',
      page: 1,
    }

    const downloadPayload = {
      searchUsername: this.searchUsername,
    }
    setInterval(() => {
      this.bonusSendList(payload)
    }, 2000)
    this.bonusDownload(downloadPayload)
  },

  methods: {
    ...mapActions('bonus', [
      'bonusSendList',
      'cancelBonus',
      'sendBonus',
      'sendAllBonus',
      'bonusDownload',
    ]),
    ...mapActions('broadcast', ['broadcashTop']),

    formateDate(date) {
      return days(date).format('DD MMM YYYY HH:mm')
    },

    formatPrice(value) {
      let val = (value / 1).toFixed('.', ',')
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    },

    // download csv
    async DownloadCSV() {
      if (this.searchUsername !== '') {
        // get filtered list by username
        const data = this.filterdDownloadList
        const fileName = 'BonusToSend'
        const exportType = exportFromJSON.types.csv
        if (data) exportFromJSON({ data, fileName, exportType })
      } else {
        // get all list
        const data = this.downloadList
        const fileName = 'BonusToSend'
        const exportType = exportFromJSON.types.csv
        if (data) exportFromJSON({ data, fileName, exportType })
        // this.searchClick = false
      }
    },

    async changePage(number) {
      const payload = {
        searchUsername: '',
        page: number,
      }
      await this.bonusSendList(payload)
    },

    async searchWord(searchUsername) {
      // this.searchClick = true
      const payload = {
        searchUsername,
        page: 1,
      }
      const downloadPayload = {
        searchUsername: this.searchUsername,
      }
      await this.bonusSendList(payload)
      await this.bonusDownload(downloadPayload)
      this.currentPage = 1
    },

    async flipInCancel(variant, position, item) {
      const res = await this.$swal({
        title: 'Are you sure?',
        confirmButtonText: 'Cancel',
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
        if (await this.cancelBonus(item)) {
          // toast notification this
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

    // flipInSend
    async flipInSend(variant, position, item) {
      const res = await this.$swal({
        title: 'Are you sure?',
        confirmButtonText: 'Send',
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
        if (await this.sendBonus(item)) {
          // toast notification this
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
          this.broadcashTop()
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

    // sendall bonus
    async flipInSendAll(variant, position, item) {
      const res = await this.$swal({
        title: 'Are you sure?',
        confirmButtonText: 'Send',
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
        if (await this.sendAllBonus(item)) {
          // toast notification this
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
          this.broadcashTop()
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
      notify: null,
      searchUsername: '',
      searchClick: false,
      currentPage: 1,
      fields: [
        {
          key: 'no',
          label: 'no',
        },
        {
          key: 'Tanggal',
          label: 'Tanggal ',
        },
        {
          key: 'Username',
          label: 'Username',
        },
        {
          key: 'Bonus',
          label: 'Bonus',
        },
        {
          key: 'jumlah',
          label: 'jumlah/hadiah',
        },

        {
          key: 'action',
          label: 'action',
        },
      ],
      items: [
        {
          Bonus: '103.115.175.247',
          jumlah: 42,
          no: 1,
          Tanggal: '--',
          Username: 'SG-14',
          action: 'tes action',
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
// .btn {
//   background-color: transparent;
// }
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
