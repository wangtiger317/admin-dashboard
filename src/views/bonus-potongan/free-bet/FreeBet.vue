<template>
  <div>
    <!-- add -->
    <broadcast-add-new
      :is-add-new-user-sidebar-active.sync="isAddNewUserSidebarActive"
      :role-options="roleOptions"
      :plan-options="planOptions"
      @refetch-data="refetchData"
    />

    <!-- SEARCH THIS -->
    <b-card no-body>
      <b-card-body>
        <b-row>
          <b-col cols="11" md="11" class="mb-md-0 mb-2 d-flex">
            <b-form-input
              v-model="search"
              class="d-inline-block mr-1"
              placeholder="Search Free Bet..."
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

    <!-- Table Container Card -->
    <b-card no-body class="mb-0">
      <div class="m-2">
        <b-row>
          <b-col
            cols="12"
            md="9"
            class="d-flex align-items-center justify-content-start"
          >
            <h2>Free Bet</h2>
          </b-col>
          <!-- create Broadcast Admin THIS -->
          <b-col cols="12" md="3" class="text-right">
            <b-button
              variant="primary"
              @click="isAddNewUserSidebarActive = true"
            >
              Create
            </b-button>
          </b-col>
        </b-row>
      </div>

      <!-- TABLE THIS -->
      <b-table
        :fields="fields"
        :items="getFreeBet.data"
        responsive
        show-empty
        empty-text="No Data"
        class="position-relative"
      >
        <!-- NO -->
        <template #cell(nomor)="{ index }">
          {{ parseInt(parseInt(index) + 1) }}
        </template>

        <!-- EVENT -->
        <template #cell(list)="{ item }" class="border-none">
          <b-form-group>
            <b-form-input
              v-model="item.event"
              id="basicInput"
              placeholder="Enter Free Bet List" /></b-form-group
        ></template>

        <!-- AMOUNT -->
        <template #cell(amount)="{ item }">
          <b-form-group
            ><b-form-input
              :value="item.amount"
              id="basicInput"
              placeholder="Enter Free Bet List"
              readonly
            />
          </b-form-group>
        </template>

        <!-- RP -->
        <template #cell(rp)="{ item }"
          ><b-form-group>
            <b-form-input
              v-model="item.type"
              id="basicInput"
              placeholder="Enter Free Bet List"
              readonly /></b-form-group
        ></template>

        <!-- TOTAL USER -->
        <template #cell(total)="{ item }">{{ item.user_count }}</template>

        <!--CREATE DATE -->
        <template #cell(create)="{ item }">
          {{ formateDate(item.created_at) }}</template
        >

        <!-- STATUS -->
        <template #cell(status)="{ item }">
          <div class="mt-2">
            <b-form-group>
              <b-form-checkbox
                v-model="item.status"
                name="check-button"
                switch
                inline
              >
              </b-form-checkbox>
            </b-form-group>
          </div>
        </template>

        <!-- ACTIONS -->
        <template #cell(actions)="{ item }">
          <div class="text-nowrap">
            <!-- SAVE -->
            <feather-icon
              :id="`invoice-row-${item.id}-save-icon`"
              icon="SaveIcon"
              size="16"
              class="cursor-pointer mx-1"
              @click="flipInSave('success', 'top-center', item)"
            />
            <b-tooltip
              title="Save"
              :target="`invoice-row-${item.id}-save-icon`"
            />

            <!-- DELETE -->
            <feather-icon
              @click="Deleted('success', 'top-center', item)"
              :id="`invoice-row-${item.id}-delete-icon`"
              icon="Trash2Icon"
              class="cursor-pointer"
              size="16"
            />
            <b-tooltip
              title="Delete"
              class="cursor-pointer"
              :target="`invoice-row-${item.id}-delete-icon`"
            />

            <!-- DETAIL -->
            <feather-icon
              :id="`invoice-row-${item.id}-eye-icon`"
              icon="EyeIcon"
              size="16"
              class="cursor-pointer mx-1"
              @click="jump(item.id)"
            />
            <b-tooltip
              title="Detail"
              :target="`invoice-row-${item.id}-eye-icon`"
            />
            <!-- endaction this -->
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
            v-if="getFreeBet"
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

    <!-- TABLE DETAIL THIS -->
    <b-card no-body class="mb-0 mt-2" v-if="visible">
      <div class="m-2">
        <b-row>
          <b-col
            cols="12"
            md="4"
            class="d-flex align-items-center justify-content-start"
          >
            <h2>List Free Bet Event</h2>
          </b-col>
          <b-col md="8" class="text-right">
            <!-- Change password -->
            <feather-icon
              icon="XIcon"
              @click="cancel"
              size="20"
              class="cursor-pointer mx-1"
            />
            <b-tooltip title="Change Password" />
          </b-col>
        </b-row>
      </div>

      <b-table :fields="fieldss" :items="getFreeBetDetail.data.data">
        <!-- NO -->
        <template #cell(nomor)="{ index }">{{
          parseInt(parseInt(index) + 1)
        }}</template>

        <!-- 	DATE -->
        <template #cell(date)="{ item }" class="border-none">
          {{ formateDate(item.created_at) }}
        </template>

        <!-- USERNAME -->
        <template #cell(username)="{ item }">
          {{ item.username }}
        </template>

        <!-- EVENT -->
        <template #cell(event)="{ item }">
          {{ item.event }}
        </template>

        <!-- AMOUNT -->
        <template #cell(amount)="{ item }">
          {{ formatPrice(item.amount) }}
        </template>
        <template #foot()>
          {{ getFreeBetDetail.totalAmount }}
        </template>
      </b-table>
      <b-tfoot>
        <b-tr>
          <b-col class="text-right my-2">
            <b-td> Total Bet: </b-td>
            <b-td class="total__content">
              {{ formatPrice(getFreeBetDetail.totalAmount) }}
            </b-td>
          </b-col>
        </b-tr>
      </b-tfoot>
    </b-card>
  </div>
</template>

<script>
import {
  BCard,
  BCardHeader,
  BCardBody,
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
} from 'bootstrap-vue'
import vSelect from 'vue-select'
import { ref } from '@vue/composition-api'
import BCardCode from '@core/components/b-card-code'
import Cleave from 'vue-cleave-component'
import 'cleave.js/dist/addons/cleave-phone.us'
import BroadcastAddNew from './BetAddNew.vue'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import 'animate.css'
import { mapActions, mapGetters } from 'vuex'
import days from 'dayjs'

export default {
  components: {
    BTooltip,
    BCardHeader,
    BCardBody,
    Cleave,
    BCardCode,
    ToastificationContent,
    BroadcastAddNew,
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

    vSelect,
  },

  data() {
    return {
      visible: false,
      currentPage: 1,
      options: {
        number: {
          numeral: true,
          numeralThousandsGroupStyle: 'thousand',
        },
      },
      fields: [
        {
          key: 'nomor',
          label: 'no',
        },

        {
          key: 'list',
          label: 'event',
        },
        {
          key: 'amount',
          label: 'Amount',
        },

        {
          key: 'rp',
          label: 'Rp',
        },
        {
          key: 'total',
          label: 'total user',
        },
        {
          key: 'create',
          label: 'Create date',
        },
        {
          key: 'status',
          label: 'status',
        },
        {
          key: 'actions',
        },
      ],
      fieldss: [
        {
          key: 'nomor',
          label: 'no',
        },

        {
          key: 'date',
          label: 'date',
        },
        {
          key: 'username',
          label: 'username',
        },

        {
          key: 'event',
          label: 'event',
        },
        {
          key: 'amount',
          label: 'amount',
        },
      ],
      itemss: [
        {
          nomor: 1,
          date: 'test',
          amount: 'test',
          event: 'test',
          username: 'test',
        },
      ],
    }
  },

  computed: {
    ...mapGetters('bonus', ['getFreeBet']),
    ...mapGetters('bonus', ['getFreeBetDetail']),

    allTotal() {
      const total = this.getFreeBet
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
      const perpage = this.getFreeBet
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
      search: '',
    }
    this.fetchDatalist(payload)
  },

  methods: {
    ...mapActions('bonus', [
      'rekFreelist',
      'updateFree',
      'freeBetDelete',
      'freebetDetail',
    ]),
    // test

    async fetchDatalist(payload) {
      await this.rekFreelist(payload)
    },

    formateDate(date) {
      return days(date).format('DD MMM YYYY HH:mm')
    },

    formatPrice(value) {
      let val = (value / 1).toFixed('.', ',')
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    },

    async changePage(number) {
      const payload = {
        search: '',
        page: number,
      }
      await this.rekFreelist(payload)
    },

    async searchWord(search) {
      const payload = {
        search,
        page: 1,
      }
      await this.rekFreelist(payload)
      this.currentPage = 1
    },

    jump(id) {
      this.visible = true
      const payload = {
        id,
        page: 1,
      }
      this.freebetDetail(payload)
    },
    cancel() {
      this.visible = false
    },

    // flipInSave
    async flipInSave(variant, position, item) {
      const res = await this.$swal({
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
      })

      if (res.value) {
        if (await this.updateFree(item)) {
          // toast notification this
          this.$toast(
            {
              component: ToastificationContent,
              props: {
                title: 'Success',
                icon: 'CheckIcon',
                text: `Updated successfully! `,
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

    // deleted this
    async Deleted(variant, position, item) {
      const res = await this.$swal({
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
      })

      if (res.value) {
        if (await this.freeBetDelete(item)) {
          this.$toast(
            {
              component: ToastificationContent,
              props: {
                title: 'Success',
                icon: 'CheckIcon',
                text: `Deleted successfully!`,
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
                text: 'test broadcast was status.',
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

  setup() {
    const isAddNewUserSidebarActive = ref(false)
    return {
      isAddNewUserSidebarActive,
    }
  },
}
</script>

<style lang="scss" scoped>
.total__content {
  padding-right: 12%;
  margin-left: 1%;
}
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
