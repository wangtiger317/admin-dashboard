<template>
  <div>
    <!-- Filters -->
    <b-card no-body>
      <b-card-body>
        <b-row>
          <!-- THIS OPTION -->
          <b-col cols="12" md="2" class="mb-md-0 mb-2">
            <label>Search</label>
            <b-form-select v-model="whereOption" id="sortOptions">
              <option value="">Pilih Option</option>
              <option value="username">Username</option>
              <option value="namaRek ">Nama Rekening</option>
              <option value="nomorRek">Nomor Rekening</option>
              <option value="phone">Nomor Telepon</option>
              <option value="lastIp">Last Ip</option>
              <option value="referral">Referral</option>
            </b-form-select>
          </b-col>

          <b-col cols="12" md="2" class="mb-md-0 mt-2">
            <b-form-input
              v-model="nameOption"
              id="basicInput"
              placeholder="Musakan Data"
            />
          </b-col>

          <!-- Buuton Search This-->
          <b-col cols="12" md="1" class="mb-md-0 mt-2 my-sm-2 mr-3">
            <b-button
              v-ripple.400="'rgba(255, 255, 255, 0.15)'"
              variant="primary"
              @click="searchWord(whereOption, nameOption)"
            >
              Search
            </b-button>
          </b-col>

          <!-- Join Date -->
          <b-col cols="12" md="2" class="mb-md-0 mb-2">
            <label>Join Date</label>
            <template>
              <b-form-group>
                <flat-pickr
                  v-model="fromDate"
                  placeholder="Dari"
                  class="form-control"
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
                  placeholder="Sampai"
                  class="form-control"
                />
              </b-form-group>
            </template>
          </b-col>

          <!-- Buuton Search This-->
          <b-col cols="12" md="1" class="mb-md-0 mt-2">
            <b-button
              v-ripple.400="'rgba(255, 255, 255, 0.15)'"
              variant="primary"
              @click="searchDate(fromDate, toDate)"
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
            <h2>Member List</h2>
          </b-col>
        </b-row>
      </div>
      <b-table
        :fields="fields"
        :items="getMembers.data.data"
        responsive
        show-empty
        empty-text="No Data"
        class="position-relative"
      >
        <!-- NO -->
        <template #cell(no)="{ index }">
          {{ index + 1 }}
        </template>

        <!-- USERNAME -->
        <template #cell(username)="{ item }">{{ item.username }}</template>

        <!-- CREDIT -->
        <template #cell(credit)="{ item }">{{
          formatPrice(item.credit)
        }}</template>

        <!-- LAST IP -->
        <template #cell(lastIp)="{ item }">{{ item.last_login_ip }}</template>

        <!-- JOIN DATE -->
        <template #cell(joinDate)="{ item }">{{
          formateDate(item.created_at)
        }}</template>

        <!-- NAME -->
        <template #cell(name)="{ item }">
          <b-form-group>
            <b-form-input
              id="basicInput"
              v-model="item.memberNamaRek"
              :value="item.memberNamaRek"
              placeholder="Name"
            /> </b-form-group
        ></template>

        <!-- REKENING -->
        <template #cell(rekening)="{ item }">
          <b-form-select v-model="item.rek_member_id">
            <option
              v-for="datas in item.rekening_members"
              :key="datas"
              :value="datas.id"
            >
              {{ datas.const_rekening[0].name }} - {{ datas.nomor_rekening }} -
              {{ datas.nama_rekening }}
            </option>
          </b-form-select>
        </template>

        <!-- STATUS -->
        <template #cell(status)="{ item }">
          <b-form-select v-model="item.status">
            <option value="1">Active</option>
            <option value="2">Suspend</option>
            <option value="0">Banned</option>
          </b-form-select>
        </template>

        <!-- ACTIONS -->
        <template #cell(actions)="{ item }">
          <div class="text-nowrap">
            <!-- Save this icon -->
            <feather-icon
              :id="`invoice-row-${item.id}-save-icon`"
              icon="SaveIcon"
              size="16"
              class="cursor-pointer mx-1"
              @click="
                flipInUpdate(
                  item.id,
                  item.memberNamaRek,
                  item.rek_member_id,
                  item.status,
                  'success',
                  'top-center'
                )
              "
            />
            <b-tooltip
              title="Save"
              :target="`invoice-row-${item.id}-save-icon`"
            />

            <!-- Form Deposit this -->
            <feather-icon
              :id="`invoice-row-${item.id}-CornerLeftUpIcon-icon`"
              icon="CornerLeftUpIcon"
              size="16"
              class="cursor-pointer mx-1"
              @click="
                $router.push({
                  name: 'members-all-members-form',
                  params: { id: item.id },
                })
              "
            />
            <b-tooltip
              title="Form Deposit/Withdraw"
              :target="`invoice-row-${item.id}-CornerLeftUpIcon-icon`"
            />

            <!-- Change password -->
            <feather-icon
              :id="`invoice-row-${item.id}-eye-icon`"
              icon="EyeIcon"
              size="16"
              class="cursor-pointer mx-1"
              @click="
                $router.push({
                  name: 'members-all-members-edit',
                  params: { id: item.id },
                })
              "
            />
            <b-tooltip
              title="Change Password"
              :target="`invoice-row-${item.id}-eye-icon`"
            />

            <!-- Edit Profile -->
            <feather-icon
              :id="`invoice-row-${item.id}-UserIcon-icon`"
              icon="UserIcon"
              size="16"
              class="cursor-pointer mx-1"
              @click="
                $router.push({
                  name: 'members-all-members-profile',
                  params: { id: item.id },
                })
              "
            />
            <b-tooltip
              title="Edit Profile"
              :target="`invoice-row-${item.id}-UserIcon-icon`"
            />

            <!-- Referral -->
            <feather-icon
              :id="`invoice-row-${item.id}-CopyIcon-icon`"
              icon="CopyIcon"
              size="16"
              class="cursor-pointer mx-1"
              @click="
                $router.push({
                  name: 'members-all-members-refferal',
                  params: { id: item.id },
                })
              "
            />
            <b-tooltip
              title="Referral"
              :target="`invoice-row-${item.id}-CopyIcon-icon`"
            />

            <!-- History -->
            <feather-icon
              :id="`invoice-row-${item.id}-CalendarIcon-icon`"
              icon="CalendarIcon"
              class="cursor-pointer mx-1"
              size="16"
              @click="
                $router.push({
                  name: 'members-all-members-history',
                  params: { id: item.id },
                })
              "
            />
            <b-tooltip
              title="History"
              :target="`invoice-row-${item.id}-CalendarIcon-icon`"
            />

            <!-- Edit Credit -->
            <feather-icon
              @click="
                $router.push({
                  name: 'members-all-members-credit',
                  params: { id: item.id },
                })
              "
              :id="`invoice-row-${item.id}-DatabaseIcon-icon`"
              icon="DatabaseIcon"
              class="cursor-pointer mx-1"
              size="16"
            />
            <b-tooltip
              title="Edit Credit"
              class="cursor-pointer"
              :target="`invoice-row-${item.id}-DatabaseIcon-icon`"
            />

            <!-- Edit Rekening -->
            <feather-icon
              @click="
                $router.push({
                  name: 'members-all-members-rekening',
                  params: { id: item.id },
                })
              "
              :id="`invoice-row-${item.id}-CreditCardIcon-icon`"
              icon="CreditCardIcon"
              class="cursor-pointer mx-1"
              size="16"
            />
            <b-tooltip
              title="Edit Rekening"
              class="cursor-pointer"
              :target="`invoice-row-${item.id}-CreditCardIcon-icon`"
            />
          </div>
        </template>

        <!-- FREE BET -->
        <template #cell(freeBet)="{ item }">
          <v-row v-if="item.free_bets[0]" class="d-flex">
            <div v-for="datas in item.free_bets" :key="datas">
              <feather-icon
                v-if="!datas.is_use"
                :id="`invoice-row-${datas.id}-StarIcon-icon`"
                icon="StarIcon"
                size="16"
                class="cursor-pointer mx-1"
                @click="freeBetSend(datas.id, 'success', 'top-center')"
              />
              <feather-icon
                v-if="datas.is_use"
                :id="`invoice-row-${datas.id}-StarIcon-icon`"
                icon="StarIcon"
                size="16"
                class="cursor-pointer mx-1 text-warning"
              />
              <b-tooltip
                :title="'Bonus, Rp.' + formatPrice(datas.amount)"
                :target="`invoice-row-${datas.id}-StarIcon-icon`"
              />
            </div>
          </v-row>
          <b-row v-else> - </b-row>
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
            v-if="getMembers"
            cols="12"
            sm="6"
            class="d-flex align-items-center justify-content-center justify-content-sm-end"
          >
            <b-pagination
              v-if="allTotal > perPages"
              v-model="currentPage"
              :total-rows="allTotal"
              :per-page="perPages"
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
import vSelect from 'vue-select'
import useJwt from '@/auth/jwt/useJwt'
import { mapActions, mapGetters } from 'vuex'
import { ref } from '@vue/composition-api'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import 'animate.css'
import flatPickr from 'vue-flatpickr-component'
import days from 'dayjs'

export default {
  components: {
    BCardHeader,
    BCardBody,
    BFormDatepicker,
    flatPickr,
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
    BTooltip,
    BFormSelect,

    vSelect,
  },

  computed: {
    ...mapGetters('members', ['getMembers']),

    allTotal() {
      const total = this.getMembers.data
      const arr = []
      let max = 0
      if (total) {
        arr.push(total.total)
        max = Math.max(...arr)
      }
      return max
    },

    perPages() {
      const perpage = this.getMembers.data
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
    this.memberlist(payload)
  },

  methods: {
    ...mapActions('members', ['memberlist']),

    formateDate(date) {
      return days(date).format('DD MMM YYYY HH:mm')
    },

    async changePage(number) {
      const payload = {
        page: number,
        whereOption: '',
        nameOption: '',
        fromDate: '',
        toDate: '',
      }
      await this.memberlist(payload)
    },

    // Search
    async searchWord(whereOption, nameOption) {
      const payload = {
        whereOption,
        nameOption,
        fromDate: '',
        toDate: '',
        page: 1,
      }
      await this.memberlist(payload)
      this.currentPage = 1
    },

    // currency format
    formatPrice(value) {
      let val = (value / 1).toFixed('.', ',')
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    },

    async searchDate(fromDate, toDate) {
      const payload = {
        whereOption: '',
        nameOption: '',
        fromDate,
        toDate,
        page: 1,
      }
      await this.memberlist(payload)
      this.currentPage = 1
    },

    moment: function () {
      return moment()
    },

    // UPDATE MEMBER
    flipInUpdate(id, name_rekening, rek_member_id, status, variant, position) {
      this.$swal({
        title: 'Are you sure?',
        text: 'Data will be updated.',
        confirmButtonText: 'Update',
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
            memberNamaRek: name_rekening,
            rek_member_id: rek_member_id,
            status: status,
          }
          useJwt
            .updateData('allMembers', `/member-update/${id}`, body)
            .then((response) => {
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

    // Send FreeBets
    freeBetSend(id, variant, position) {
      this.$swal({
        title: 'Are you sure?',
        text: 'Data will be sent.',
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
      }).then((result) => {
        if (result.value) {
          useJwt
            .updateData('allMembers', `/free-bets-send/${id}`)
            .then((response) => {
              const payload = {
                whereOption: '',
                nameOption: '',
                fromDate: '',
                toDate: '',
                page: 1,
              }
              this.memberlist(payload)
              this.$toast(
                {
                  component: ToastificationContent,
                  props: {
                    title: 'Success',
                    icon: 'CheckIcon',
                    text: 'Send bonus successfully!',
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
                text: 'Success Admin IP 123.345.678.* was deleted.',
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

    // flipInEnable
    flipInEnable(variant, position) {
      this.$swal({
        title: 'Are you sure?',
        text: 'Data will be updated.',
        confirmButtonText: 'Update',
        cancelButtonText: 'No, I changed my mind!',
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
                text: 'Admin IP 123.234.231.* was enabled',
                variant,
              },
            },
            {
              position,
            }
          )
        }
        // else if (result.dismiss === 'cancel') {
        //   this.$swal({
        //     title: 'Cancelled',
        //     text: 'Ok your data is still there and safe',
        //     confirmButtonText: 'Ok',
        //     customClass: {
        //       cancelButton: 'btn btn-secondary',
        //     },
        //   })
        // }
      })
    },
  },

  data() {
    return {
      rangeDate: null,
      whereOption: '',
      selected: { title: 'Pilih Option' },
      option: [
        { title: 'Pilih Option' },
        { title: 'Activity' },
        { title: 'Username' },
        { title: 'Deskrispi' },
        { title: 'Target' },
      ],
      currentPage: 1,
      fields: [
        {
          key: 'no',
        },
        {
          key: 'username',
        },
        {
          key: 'credit',
        },
        {
          key: 'lastIp',
        },
        {
          key: 'joinDate',
        },
        {
          key: 'name',
        },
        {
          key: 'rekening',
        },
        {
          key: 'status',
        },
        {
          key: 'actions',
        },
        {
          key: 'freeBet',
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
@import '@core/scss/vue/libs/vue-select.scss';
@import '@core/scss/vue/libs/vue-flatpicker.scss';
</style>
