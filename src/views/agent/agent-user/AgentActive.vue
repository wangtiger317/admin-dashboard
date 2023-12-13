<template>
  <div>
    <!-- Filters -->
    <b-card no-body>
      <b-card-body>
        <b-row>
          <b-col cols="11" md="11" class="mb-md-0 mb-2 d-flex">
            <b-form-input
              v-model="search"
              class="d-inline-block mr-1"
              placeholder="Search Agent User..."
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

    <!-- Agent User List -->
    <b-card no-body class="mb-0">
      <div class="m-2">
        <b-row>
          <b-col
            cols="12"
            md="9"
            class="d-flex align-items-center justify-content-start"
          >
            <h2>Agent User List</h2>
          </b-col>
          <!-- create admin user -->
          <b-col cols="12" md="3" class="text-right">
            <b-button
              variant="primary"
              @click="$router.push({ name: 'agent-agent-user-create' })"
            >
              Create
            </b-button>
          </b-col>
        </b-row>
      </div>

      <!-- THIS TABLE  -->
      <b-table
        :fields="fieldsActive"
        :items="getAdminList.data"
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
            <!-- edit this icon -->
            <feather-icon
              :id="`invoice-row-${item.id}-edit-icon`"
              v-if="item.id !== 1"
              icon="EditIcon"
              size="16"
              class="cursor-pointer mx-1"
              @click="
                $router.push({
                  name: 'agent-agent-user-edit',
                  params: { id: item.id },
                })
              "
            />
            <b-tooltip
              title="Edit"
              :target="`invoice-row-${item.id}-edit-icon`"
            />

            <!-- Change password -->
            <feather-icon
              :id="`invoice-row-${item.id}-eye-icon`"
              icon="EyeIcon"
              size="16"
              class="cursor-pointer mx-1"
              @click="
                $router.push({
                  name: 'agent-agent-user-change-password',
                  params: { id: item.id },
                })
              "
            />
            <b-tooltip
              title="Change Password"
              :target="`invoice-row-${item.id}-eye-icon`"
            />

            <!-- Deactivate -->
            <feather-icon
              :id="`invoice-row-${item.id}-MinusCircle-icon`"
              v-if="item.id !== 1"
              icon="MinusCircleIcon"
              size="16"
              class="cursor-pointer mx-1"
              @click="flipInDeactivate('success', 'top-center', item)"
            />
            <b-tooltip
              title="Deactivate"
              :target="`invoice-row-${item.id}-MinusCircle-icon`"
            />

            <!-- Clear Session -->
            <!-- <feather-icon
              :id="`invoice-row-${item.id}-archive-icon`"
              v-if="item.id !== 1"
              icon="ArchiveIcon"
              size="16"
              class="cursor-pointer mx-1"
              @click="flipClearSession('success', 'top-center')"
            />
            <b-tooltip
              title="Clear Session"
              :target="`invoice-row-${item.id}-archive-icon`"
            /> -->

            <!-- Delete this -->
            <feather-icon
              @click="deleteAdmin('success', 'top-center', item)"
              v-if="item.id !== 1"
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
              >Showing 1 to {{ adminTotal }} entries</span
            > -->
          </b-col>
          <b-col
            v-if="getAdminList"
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
      // fieldsActive
      fieldsActive: [
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
    // avtive list
    ...mapGetters('admin', ['getAdminList']),
    adminTotal() {
      const total = this.getAdminList
      const arr = []
      let max = 0
      if (total) {
        arr.push(total.total)
        max = Math.max(...arr)
      }
      return max
    },
    adminTotalPage() {
      const perpage = this.getAdminList
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
    this.adminActivelist(payload)
  },

  methods: {
    // avtive
    ...mapActions('admin', ['adminActivelist', 'UpdateDeactive']),

    formateDate(date) {
      return days(date).format('DD MMM YYYY HH:mm')
    },

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
          this.$store.dispatch('admin/deleteAdmin', admin)
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
    async changeAdminPage(number) {
      const payload = {
        search: '',
        page: number,
      }
      await this.adminActivelist(payload)
    },

    async searchWord(search) {
      const payload = {
        search,
        page: 1,
      }
      await this.adminActivelist(payload)
      this.currentPage = 1
    },

    async flipInDeactivate(variant, position, item) {
      const res = await this.$swal({
        title: 'Are you sure?',
        text: 'Data will be Deactivated.',
        confirmButtonText: 'Deactivate',
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
        if (await this.UpdateDeactive(item)) {
          // toast notification this
          this.$toast(
            {
              component: ToastificationContent,
              props: {
                title: 'Success',
                icon: 'CheckIcon',
                text: 'Success Agent User Was Deactivated',
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

    // flipInReactivate
    flipInReactivate(variant, position) {
      this.$swal({
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
      }).then((result) => {
        if (result.value) {
          // toast notification this
          this.$toast(
            {
              component: ToastificationContent,
              props: {
                title: 'Success',
                icon: 'CheckIcon',
                text: 'Success Admin was Reactivated',
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
                text: 'Success Admin User was deleted.',
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
