<template>
  <div>
    <!-- Filters -->
    <b-card no-body class="mt-3">
      <b-card-body>
        <b-row>
          <b-col cols="11" md="11" class="mb-md-0 mb-2 d-flex">
            <b-form-input
              v-model="dactiveSearch"
              class="d-inline-block mr-1"
              placeholder="Search Agent Deactive..."
            />
            <b-button
              v-ripple.400="'rgba(255, 255, 255, 0.15)'"
              variant="primary"
              @click="searcDeative(dactiveSearch)"
            >
              Search
            </b-button>
          </b-col>
        </b-row>
      </b-card-body>
    </b-card>

    <!-- Deactivate Agent User List -->
    <b-card no-body class="mb-0">
      <div class="m-2">
        <b-row>
          <b-col
            cols="12"
            md="9"
            class="d-flex align-items-center justify-content-start"
          >
            <h2>Deactivate Agent User List</h2>
          </b-col>
        </b-row>
      </div>

      <!-- TABLE THIS -->
      <b-table
        :fields="fieldsDeactive"
        :items="getAdminDeactive.data"
        responsive
        show-empty
        empty-text="No Data"
        class="position-relative"
      >
        <template #cell(no)="{ index }">
          {{ parseInt(parseInt(index) + 1) }}
        </template>

        <!-- USER NAME -->
        <template #cell(userName)="{ item }">
          {{ item.username }}
        </template>

        <!-- NAMA -->
        <template #cell(nama)="{ item }">
          {{ item.name }}
        </template>

        <!-- JOIN DATE -->
        <template #cell(joinDate)="{ item }">
          {{ formateDate(item.date) }}
        </template>

        <!-- LEVEL -->
        <template #cell(level)="{ item }">
          {{ item.level }}
        </template>

        <!-- STATUS -->
        <template #cell(status)="{ item }">
          {{ item.status }}
        </template>

        <!-- ACTIONS -->
        <template #cell(actions)="{ item }">
          <div class="text-nowrap">
            <!-- Delete this -->
            <feather-icon
              @click="deleteAdmin(item, 'success', 'top-center')"
              :id="`invoice-row-${item.id}-delete-icon`"
              icon="Trash2Icon"
              class="cursor-pointer mx-1"
              size="16"
            />
            <b-tooltip
              title="Delete"
              class="cursor-pointer"
              :target="`invoice-row-${item.id}-delete-icon`"
            />

            <!-- reactivate this -->
            <b-button
              v-ripple.400="'rgba(255, 255, 255, 0.15)'"
              variant="primary"
              @click="flipInReactivate('success', 'top-center', item)"
            >
              <feather-icon
                :id="`invoice-row-${item.id}-RefreshCwIcon-icon`"
                icon="RefreshCwIcon"
                size="14"
                class="cursor-pointer"
              />
              <b-tooltip
                title="Clear Session"
                :target="`invoice-row-${item.id}-RefreshCwIcon-icon`"
              />
              Reactivate
            </b-button>
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
            <!-- <span class="text-muted"
              >Showing 1 to {{ deactiveTotal }} entries</span
            > -->
          </b-col>
          <b-col
            v-if="getAdminDeactive"
            cols="12"
            sm="6"
            class="d-flex align-items-center justify-content-center justify-content-sm-end"
          >
            <b-pagination
              v-if="deactiveTotal > deactivePage"
              v-model="currentPage"
              :total-rows="deactiveTotal"
              :per-page="deactivePage"
              first-number
              last-number
              class="mb-0 mt-1 mt-sm-0"
              prev-class="prev-item"
              next-class="next-item"
              @change="changeDeactivePage"
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
  BTooltip,
  BCardHeader,
  BCardBody,
} from 'bootstrap-vue'

import vSelect from 'vue-select'
import days from 'dayjs'
import { ref } from '@vue/composition-api'
import { mapActions, mapGetters } from 'vuex'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import 'animate.css'
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
    BTooltip,
    vSelect,
  },

  data() {
    return {
      dactiveSearch: '',
      search: '',
      currentPage: 1,
      fieldsDeactive: [
        {
          key: 'no',
        },
        {
          key: 'userName',
          sortable: true,
        },
        {
          key: 'nama',
          sortable: true,
        },
        {
          key: 'joinDate',
        },
        {
          key: 'level',
        },
        {
          key: 'status',
        },
        {
          key: 'actions',
        },
      ],
    }
  },
  computed: {
    // deactive list
    ...mapGetters('admin', ['getAdminDeactive']),
    deactiveTotal() {
      const total = this.getAdminDeactive
      const arr = []
      let max = 0
      if (total) {
        arr.push(total.total)
        max = Math.max(...arr)
      }
      return max
    },
    deactivePage() {
      const perpage = this.getAdminDeactive
      let perPage = 0
      if (perpage) {
        perPage = perpage.per_page
      }
      return perPage
    },
  },

  created() {
    const payload = {
      search: '',
      page: 1,
    }
    this.adminDeactivelist(payload)
  },

  methods: {
    // deactive
    ...mapActions('admin', ['adminDeactivelist', 'UpdateReactive']),

    // DATE
    formateDate(date) {
      return days(date).format('DD MMM YYYY HH:mm')
    },

    async changeDeactivePage(number) {
      const payload = {
        search: '',
        page: number,
      }
      await this.adminDeactivelist(payload)
    },
    async searcDeative(dactiveSearch) {
      const payload = {
        search: dactiveSearch,
        page: 1,
      }
      await this.adminDeactivelist(payload)
      this.currentPage = 1
    },

    // Flip delete
    deleteAdmin(admin, variant, position) {
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
          this.$store.dispatch('admin/deleteAdminUserDeactivate', admin)
          // toast notification this
          this.$toast(
            {
              component: ToastificationContent,
              props: {
                title: 'Success',
                icon: 'CheckIcon',
                text: 'User Deleted Successfully.',
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

    // flipInReactivate
    async flipInReactivate(variant, position, item) {
      const res = await this.$swal({
        title: 'Are you sure?',
        text: 'Data will be Reactivated.',
        confirmButtonText: 'Reactivate',
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
        if (await this.UpdateReactive(item)) {
          // toast notification this
          this.$toast(
            {
              component: ToastificationContent,
              props: {
                title: 'Success',
                icon: 'CheckIcon',
                text: 'Success Agent User was Reactivated',
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
      }
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
