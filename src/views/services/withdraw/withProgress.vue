<template>
  <div>
    <!-- withdraw-progress-filters -->
    <b-card no-body>
      <b-card-body>
        <b-row>
          <b-col
            cols="12"
            md="12"
            class="mb-md-0 mb-2 d-flex align-items-start"
          >
            <b-form-input
              v-model="search"
              class="d-inline-block mr-1"
              placeholder="Search Username..."
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
              @click="searchWord(search, value)"
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
            <h2>Withdraw in Progress</h2>
          </b-col>
        </b-row>
      </div>

      <!-- TABLE THIS -->
      <b-table
        :fields="fields"
        :items="getWithdrawProgress.data"
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

        <!-- asalRekId -->

        <!-- DESTINATION BANK -->
        <template #cell(DestinationBank)="{ item }">
          {{ item.memberRekName }} {{ item.memberNamaRek }} <br />{{
            item.memberNoRek
          }}
        </template>

        <!-- ORIGIN BANK TRANSFER -->

        <!-- v-if="filterData.length === 1" -->
        <template #cell(OriginBankTransfer)="{ item }">
          <b-form-select v-model="item.rekeningBankTujuan" id="sortOptions">
            <option
              v-for="datas in getOriginBank"
              :key="datas"
              :value="datas.id"
            >
              {{ datas.rekening }}
            </option>
          </b-form-select>
        </template>
        <!-- <template
          v-else-if="filterData.length > 1"
          #cell(OriginBankTransfer)="{ item }"
        >
          <b-form-select v-model="item.asalRekId" id="sortOptions">
            <option
              v-for="datas in filterData"
              :key="datas"
              :value="item.asalRekId"
            >
              {{ datas.rekening }}
            </option>
          </b-form-select>
        </template> -->

        <!-- AMOUNT -->
        <template #cell(Amount)="{ item }">
          {{ formatPrice(item.amount) }}
        </template>

        <!-- NOTE -->
        <template #cell(Note)="{ item }">
          <b-form-group>
            <b-form-input
              v-model="item.note"
              id="basicInput"
              placeholder="Enter Note"
            /> </b-form-group
        ></template>

        <!-- Approval -->
        <template #cell(Approval)> Manual </template>

        <!-- ACTIONS -->
        <template #cell(actions)="{ item }">
          <div class="text-nowrap">
            <!-- Form Approve -->
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

            <!-- Save  -->
            <feather-icon
              :id="`invoice-row-${item.id}-save-icon`"
              icon="SaveIcon"
              size="16"
              class="cursor-pointer mx-1"
              @click="
                flipInSave(
                  'success',
                  'top-center',
                  item.memberId,
                  item.rekeningBankTujuan,
                  item.note,
                  item.id
                )
              "
            />
            <b-tooltip
              title="Save"
              :target="`invoice-row-${item.id}-save-icon`"
            />

            <!-- delete -->
            <feather-icon
              :id="`invoice-row-${item.id}-Trash2Icon-icon`"
              icon="Trash2Icon"
              size="16"
              class="cursor-pointer mx-1"
              @click="deleteWithdrawal(item, 'success', 'top-center')"
            />
            <b-tooltip
              title="Delete"
              :target="`invoice-row-${item.id}-Trash2Icon-icon`"
            />
          </div>
        </template>
      </b-table>

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
            v-if="getWithdrawProgress"
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
  BTooltip,
} from 'bootstrap-vue'
import vSelect from 'vue-select'
import { ref } from '@vue/composition-api'
import { mapActions, mapGetters } from 'vuex'
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import 'animate.css'
import useJwt from '@/auth/jwt/useJwt'
import days from 'dayjs'

export default {
  components: {
    BTooltip,
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
    Treeselect,
  },

  computed: {
    ...mapGetters('services', ['getWithdrawProgress']),
    ...mapGetters('services', ['getOriginBank']),
    ...mapGetters('services', ['getBankWithdrawList']),

    allTotal() {
      const total = this.getWithdrawProgress.data
      const arr = []
      let max = 0
      if (total) {
        arr.push(total.total)
        max = Math.max(...arr)
      }
      return max
    },

    formatedData() {
      const data = this.getBankWithdrawList
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

    filterData() {
      const bank = this.value
      const OriginBank = this.getOriginBank
      let datas
      if (bank != null) {
        bank.map((item, index) => {
          const eachBank = bank[index]
          datas = OriginBank.filter((x) => x.id === eachBank)
        })
        if (bank.length === 0) {
          datas = OriginBank
        }
      } else {
        datas = OriginBank
      }
      return datas
    },
    perPage() {
      const perpage = this.getWithdrawProgress.data
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
    setInterval(() => {
      this.withdrawProgresList(payload)
    }, 2000)
    this.fetchOriginList()
    this.fetchBankWithdrawList()
  },

  mounted() {
    this.fetchBankList()
  },
  methods: {
    ...mapActions('services', ['withdrawProgresList', 'ApproveWithdraw']),
    ...mapActions('services', ['fetchOriginList']),
    ...mapActions('services', ['fetchBankWithdrawList']),

    async changePage(number) {
      const payload = {
        username: '',
        page: number,
      }
      await this.withdrawProgresList(payload)
    },

    formateDate(date) {
      return days(date).format('DD MMM YYYY HH:mm')
    },

    formatPrice(value) {
      let val = (value / 1).toFixed('.', ',')
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
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
      await this.withdrawProgresList(payload)
      this.currentPage = 1
    },

    // currency format
    formatPrice(value) {
      let val = (value / 1).toFixed('.', ',')
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    },

    deleteWithdrawal(deleteWithdraw, variant, position) {
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
          this.$store.dispatch(
            'services/DeleteWithdrawProgress',
            deleteWithdraw
          )
          // toast notification this
          this.$toast(
            {
              component: ToastificationContent,
              props: {
                title: 'Success',
                icon: 'CheckIcon',
                text: 'Withdrawal Progress Deleted Successfully.',
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
            rekeningBankAsal: rekTujuan,
            rekNote: note,
          }
          useJwt
            .updateData(
              'servicesAccount',
              `/withdrawal/update-withdral/${id}`,
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
        if (await this.ApproveWithdraw(item)) {
          this.$toast(
            {
              component: ToastificationContent,
              props: {
                title: 'Success',
                icon: 'CheckIcon',
                text: `Success Approve Withdraw`,
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
  },

  data() {
    return {
      notify: null,
      username: '',
      usernames: '',
      currentPage: 1,
      selecteds: null,
      value: null,
      fields: [
        {
          key: 'No',
          label: 'no',
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
