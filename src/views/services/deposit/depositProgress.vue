<template>
  <div>
    <!-- deposit-progress-filters -->
    <b-card no-body>
      <b-card-body>
        <b-row>
          <b-col
            cols="12"
            md="12"
            class="mb-md-0 mb-2 d-flex align-items-start"
          >
            <b-form-input
              v-model="username"
              class="d-inline-block mr-1"
              placeholder="Search username..."
            />
            <!-- <b-col cols="4" md="4" class="d-flex align-items-center gap-2">
              <div class="col-3 badge-light-primary">Selet Bank</div>
              <treeselect
                v-model="value"
                :multiple="true"
                :options="formatedData"
                placeholder="Filter by Bank"
            /></b-col> -->
            <b-button
              v-ripple.400="'rgba(255, 255, 255, 0.15)'"
              variant="primary"
              @click="searchWord(username, value)"
            >
              Search
            </b-button>
          </b-col>
        </b-row>
      </b-card-body>
    </b-card>

    <!-- deposit-progress Card -->
    <b-card no-body class="mb-0">
      <div class="m-2">
        <b-row>
          <b-col
            cols="12"
            md="9"
            class="d-flex align-items-center justify-content-start"
          >
            <h2>Deposit in Progress</h2>
          </b-col>
        </b-row>
      </div>
      <b-table
        :fields="fields"
        :items="getDepositList"
        responsive
        show-empty
        empty-text="No Data"
      >
        <!-- NO -->
        <template #cell(No)="{ index }">
          {{ index + 1 }}
        </template>

        <!-- DATE -->
        <template #cell(Date)="{ item }">
          {{ formateDate(item.created_at) }}
        </template>

        <!-- USERNAME -->
        <template #cell(Username)="{ item }">{{
          item.memberUsername
        }}</template>

        <!-- ORIGIN BANK -->
        <template #cell(OriginBank)="{ item }"
          >{{ item.memberRekName }} {{ item.memberNamaRek }}
          {{ item.memberNoRek }}</template
        >

        <!-- DESTINATION BANK -->
        <template
          v-if="filterData.length === 1"
          #cell(DestinationBank)="{ item }"
        >
          <b-form-select id="sortOptions" v-model="item.rekeningBankTujuan">
            <option
              v-for="datas in filterData"
              :key="datas"
              :value="item.rekeningBankTujuan"
            >
              {{ datas.rekening }}
            </option>
          </b-form-select>
        </template>
        <template
          v-else-if="filterData.length > 1"
          #cell(DestinationBank)="{ item }"
        >
          <b-form-select id="sortOptions" v-model="item.rekeningBankTujuan">
            <option v-for="datas in filterData" :key="datas" :value="datas.id">
              {{ datas.rekening }}
            </option>
          </b-form-select>
        </template>

        <!-- AMOUNT -->
        <template #cell(Amount)="{ item }">{{
          formatPrice(item.jumlah)
        }}</template>

        <!-- NOTE -->
        <template #cell(Note)="{ item }">
          <b-form-group>
            <b-form-input
              id="basicInput"
              v-model="item.rekNote"
              placeholder="Enter Note"
            /> </b-form-group
        ></template>

        <!-- APPROVAL -->
        <template #cell(Approval)> Manual </template>

        <!-- ACTIONS -->
        <template #cell(actions)="{ item }">
          <div class="text-nowrap">
            <!-- APPROVE ICON THIS -->
            <feather-icon
              :id="`invoice-row-${item.id}-CheckIcon-icon`"
              icon="CheckIcon"
              size="16"
              class="cursor-pointer mx-1"
              @click="flipInApprove('success', 'top-center', item)"
            />
            <b-tooltip
              title="Approve"
              :target="`invoice-row-${item.id}-CheckIcon-icon`"
            />

            <!-- SAVE ICON THIS -->
            <feather-icon
              :id="`invoice-row-${item.id}-save-icon`"
              icon="SaveIcon"
              size="16"
              class="cursor-pointer mx-1"
              @click="
                flipInSave(
                  'success',
                  'top-center',
                  item.members_id,
                  item.rekeningBankTujuan,
                  item.rekNote,
                  item.id
                )
              "
            />
            <b-tooltip
              title="Save"
              :target="`invoice-row-${item.id}-save-icon`"
            />

            <!-- DELETE ICON THIS -->
            <feather-icon
              :id="`invoice-row-${item.id}-Trash2Icon-icon`"
              icon="Trash2Icon"
              size="16"
              class="cursor-pointer mx-1"
              @click="deleteProgress(item, 'success', 'top-center')"
            />
            <b-tooltip
              title="Delete"
              :target="`invoice-row-${item.id}-Trash2Icon-icon`"
            />
          </div>
        </template>
      </b-table>

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

          <!-- Pagination -->
          <b-col
            v-if="getDepositList"
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
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import 'animate.css'
import flatPickr from 'vue-flatpickr-component'
import useJwt from '@/auth/jwt/useJwt'
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
    BTooltip,
    BCardHeader,
    BCardBody,
    BFormDatepicker,
    vSelect,
    Treeselect,
  },

  computed: {
    ...mapGetters('services', ['getDepositList']),
    ...mapGetters('services', ['getRekening']),
    ...mapGetters('services', ['getBankList']),

    allTotal() {
      const total = this.getDepositList
      const arr = []
      let max = 0
      if (total) {
        arr.push(total.total)
        max = Math.max(...arr)
      }
      return max
    },

    formatedData() {
      const data = this.getBankList
      const newData = []
      data.map((oneData) => {
        const person = new Object()
        person.id = oneData.id
        person.label = oneData.name
        person.children = oneData.rekenings
        if (oneData.rekenings.length > 0) {
          oneData.rekenings.map((datas, index) => {
            person.children[index].id = datas.id
            person.children[index].label = datas.nama_rekening
          })
        }
        newData.push(person)
      })
      return newData
    },

    // admin perpage
    perPage() {
      const perpage = this.getDepositList
      let perPage = 0
      if (perpage) {
        perPage = perpage.per_page
      }
      return perPage
    },

    filterData() {
      const bank = this.value
      const getRekeningData = this.getRekening
      let datas
      if (bank != null) {
        bank.map((item, index) => {
          const eachBank = bank[index]
          datas = getRekeningData.filter((x) => x.id === eachBank)
        })
        if (bank.length === 0) {
          datas = getRekeningData
        }
      } else {
        datas = getRekeningData
      }

      return datas
    },
  },

  created() {
    const payload = {
      page: 1,
      username: '',
    }

    setInterval(() => {
      this.fetchDepositList(payload)
    }, 2000)

    this.fetchRekeningList()
    this.fetchBankList()
  },

  mounted() {
    this.fetchBankList()
  },

  methods: {
    ...mapActions('services', ['fetchDepositList', 'ApproveDepositProg']),
    ...mapActions('services', ['fetchRekeningList']),
    ...mapActions('services', ['fetchBankList']),

    formateDate(date) {
      return days(date).format('DD MMM YYYY HH:mm')
    },

    formatPrice(value) {
      let val = (value / 1).toFixed('.', ',')
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    },

    deleteProgress(deposit_progress, variant, position) {
      this.$swal({
        title: 'Are you sure?',
        confirmButtonText: 'Delete',
        cancelButtonText: 'No, I changed my mind!',
        showCancelButton: true,
        customClass: {
          confirmButton: 'btn btn-danger',
          cancelButton: 'btn btn-secondary ml-1',
        },
        showClass: {
          popup: 'animate__animated animate__flipInX',
        },
        buttonsStyling: false,
      }).then((result) => {
        if (result.value) {
          this.$store.dispatch('services/deleteProgress', deposit_progress)
          // toast notification this
          this.$toast(
            {
              component: ToastificationContent,
              props: {
                title: 'Success',
                icon: 'CheckIcon',
                text: 'Deleted successfully!',
                variant,
              },
            },
            {
              position,
            }
          )
        } else if (result.dismiss === 'cancel') {
          this.$swal({
            title: 'Cancelled',
            text: 'Ok your data is not Updated.',
            confirmButtonText: 'Ok',
            customClass: {
              cancelButton: 'btn btn-secondary',
            },
          })
        }
      })
    },

    async changePage(number) {
      const payload = {
        username: '',
        page: number,
      }
      await this.fetchDepositList(payload)
    },

    async searchWord(username, value) {
      let bank
      if (value != null) {
        bank = `${value.toString()}`
      }
      const payload = {
        username,
        page: 1,
        value: bank,
      }
      await this.fetchDepositList(payload)
      this.currentPage = 1
    },

    // method fromat curreny
    formatPrice(value) {
      const val = (value / 1).toFixed('.', ',')
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    },

    // flipInApprove
    async flipInApprove(variant, position, item) {
      const res = await this.$swal({
        title: 'Are you sure?',
        text: 'Data will be updated.',
        confirmButtonText: 'Approve',
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
        if (await this.ApproveDepositProg(item)) {
          // toast notification this
          this.$toast(
            {
              component: ToastificationContent,
              props: {
                title: 'Success',
                icon: 'CheckIcon',
                text: 'Success Approve Deposit',
                variant,
              },
            },
            {
              position,
            }
          )
        }
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
    },

    // flipInCancel
    flipInCancel(variant, position) {
      this.$swal({
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
      }).then((result) => {
        if (result.value) {
          // toast notification this
          this.$toast(
            {
              component: ToastificationContent,
              props: {
                title: 'Success',
                icon: 'CheckIcon',
                text: 'Deposit Cancelled',
                variant,
              },
            },
            {
              position,
            }
          )
        } else if (result.dismiss === 'cancel') {
          this.$swal({
            title: 'Cancelled',
            text: 'Ok your data is still there and safe',
            confirmButtonText: 'Ok',
            customClass: {
              cancelButton: 'btn btn-secondary',
            },
          })
        }
      })
    },

    // flipInSave
    flipInSave(variant, position, membersId, rekTujuan, note, id) {
      this.$swal({
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
      }).then((result) => {
        if (result.value) {
          const body = {
            members_id: membersId,
            rekeningBankTujuan: rekTujuan,
            rekNote: note,
          }
          useJwt
            .updateData(
              'servicesAccount',
              `/deposit/update-deposit-in-progress/${id}`,
              body
            )
            .then((response) => {
              this.$toast(
                {
                  component: ToastificationContent,
                  props: {
                    title: 'Success',
                    icon: 'CheckIcon',
                    text: 'Updated Successfully',
                    variant,
                  },
                },
                {
                  position,
                }
              )
            })
            .catch((error) => {
              this.$toast(
                {
                  component: ToastificationContent,
                  props: {
                    title: 'Error',
                    icon: 'AlertCircleIcon',
                    text: error.response.data.message,
                    variant: 'danger',
                  },
                },
                {
                  position,
                }
              )
            })
        } else if (result.dismiss === 'cancel') {
          this.$swal({
            title: 'Cancelled',
            text: 'Ok your data is still there and safe',
            confirmButtonText: 'Ok',
            customClass: {
              cancelButton: 'btn btn-secondary',
            },
          })
        }
      })
    },

    // flipInDelete
    flipInDelete(variant, position) {
      this.$swal({
        title: 'Are you sure?',
        text: 'Data will be permanently deleted.',
        confirmButtonText: 'Delete',
        cancelButtonText: 'No, I changed my mind!',
        showCancelButton: true,
        customClass: {
          confirmButton: 'btn btn-danger',
          cancelButton: 'btn btn-secondary ml-1',
        },
        showClass: {
          popup: 'animate__animated animate__flipInX',
        },
        buttonsStyling: false,
      }).then((result) => {
        if (result.value) {
          // toast notification this
          this.$toast(
            {
              component: ToastificationContent,
              props: {
                title: 'Success',
                icon: 'CheckIcon',
                text: 'Success Deposit Deleted.',
                variant,
              },
            },
            {
              position,
            }
          )
        } else if (result.dismiss === 'cancel') {
          this.$swal({
            title: 'Cancelled',
            text: 'Ok your data is still there and safe.',
            confirmButtonText: 'Ok',
            customClass: {
              cancelButton: 'btn btn-secondary',
            },
          })
        }
      })
    },
  },

  data() {
    return {
      notify: null,
      username: '',
      currentPage: 1,
      value: null,
      bankList: this.getBankList,
      fields: [
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
          key: 'OriginBank',
        },
        {
          key: 'DestinationBank',
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
      options: [
        {
          id: '1',
          label: 'a',
          children: [
            {
              id: '12',
              label: 'aa',
            },
            {
              id: '22',
              label: 'ab',
            },
          ],
        },
        {
          id: '2',
          label: 'b',
          children: [
            {
              id: '33',
              label: 'aa',
            },
            {
              id: '23',
              label: 'ab',
            },
          ],
        },
        {
          id: '3',
          label: 'd',
        },
        {
          id: '4',
          label: 'j',
        },
        {
          id: '5',
          label: 'h',
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
