<template>
  <div>
    <!-- filters -->
    <b-card no-body>
      <b-card-body>
        <b-row>
          <b-col cols="11" md="11" class="mb-md-0 mb-2 d-flex">
            <b-form-input
              v-model="search"
              class="d-inline-block mr-1"
              placeholder="Search Agent Role..."
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
            <h2>Agent Role List</h2>
          </b-col>

          <!-- Create Agent Role -->
          <b-col cols="12" md="3" class="text-right">
            <b-button
              variant="primary"
              @click="$router.push({ name: 'agent-agent-role-create' })"
            >
              Create
            </b-button>
          </b-col>
        </b-row>
      </div>

      <b-table
        :fields="fields"
        :items="getAdminLevel.data"
        responsive
        show-empty
        empty-text="No Data"
        class="position-relative"
      >
        <!-- NO -->
        <template #cell(no)="{ index }">
          {{ parseInt(parseInt(index) + 1) }}
        </template>

        <!-- NAME -->
        <template #cell(name)="{ item }">
          {{ item.name }}
        </template>

        <!-- NUMBER OF USERS -->
        <template #cell(NumberOfUsers)="{ item }"
          >{{ item.users_count }}
        </template>

        <!-- ACTIONS -->
        <template #cell(actions)="{ item }">
          <div class="text-nowrap">
            <!-- Edit this -->
            <feather-icon
              :id="`invoice-row-${item.id}-edit-icon`"
              v-if="item.id !== 1 && item.id !== 2"
              icon="EditIcon"
              size="16"
              class="cursor-pointer mx-1"
              @click="
                $router.push({
                  name: 'agent-agent-role-edit',
                  params: { item: item },
                })
              "
            />
            <b-tooltip
              title="Edit"
              :target="`invoice-row-${item.id}-edit-icon`"
            />

            <!-- Delete this -->
            <feather-icon
              :id="`invoice-row-${item.id}-delete-icon`"
              v-if="item.id !== 1 && item.id !== 2"
              icon="Trash2Icon"
              class="cursor-pointer"
              size="16"
              @click="deleteRole(item, 'success', 'top-center')"
            />
            <b-tooltip
              title="Delete"
              class="cursor-pointer"
              :target="`invoice-row-${item.id}-delete-icon`"
            />
            <!-- endaction this -->
          </div>
        </template>
      </b-table>
      <div class="mx-2 mb-2 mt-2">
        <b-row>
          <b-col
            cols="12"
            sm="6"
            class="d-flex align-items-center justify-content-center justify-content-sm-start"
          >
            <!-- <span class="text-muted"
              >Showing 1 of {{ adminTotal }} entries</span
            > -->
            <!-- <span class="text-muted">Showing 1 to 1 of 2 entries</span> -->
          </b-col>
          <b-col
            v-if="getAdminLevel"
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
  BPagination,
  BCardBody,
  BTooltip,
} from 'bootstrap-vue'
import { mapActions, mapGetters } from 'vuex'
import { ref } from '@vue/composition-api'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import 'animate.css'

export default {
  components: {
    BCard,
    BRow,
    BCol,
    BFormInput,
    BButton,
    BTable,
    BPagination,
    BTooltip,
    BCardBody,
  },

  data() {
    return {
      search: '',
      currentPage: 1,
      fields: [
        {
          key: 'no',
          sortable: true,
        },
        {
          key: 'name',
          sortable: true,
        },

        {
          key: 'NumberOfUsers',
          label: 'Number Of Users',
          sortable: true,
        },
        {
          key: 'actions',
        },
      ],
    }
  },

  computed: {
    ...mapGetters('admin', ['getAdminLevel']),
    // admin total
    adminTotal() {
      const total = this.getAdminLevel
      const arr = []
      let max = 0
      if (total) {
        arr.push(total.total)
        max = Math.max(...arr)
      }
      return max
    },

    // admin perpage
    adminTotalPage() {
      const perpage = this.getAdminLevel
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
    this.levelList(payload)
  },

  methods: {
    ...mapActions('admin', ['levelList']),

    deleteRole(role, variant, position) {
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
          this.$store.dispatch('admin/deleteAgentRole', role)
          // toast notification this
          this.$toast(
            {
              component: ToastificationContent,
              props: {
                title: 'Success',
                icon: 'CheckIcon',
                text: 'Deleted Successfully.',
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
        search: '',
        page: number,
      }
      await this.levelList(payload)
    },

    async searchWord(search) {
      const payload = {
        search,
        page: 1,
      }
      await this.levelList(payload)
      this.currentPage = 1
    },

    // flipInSave
    flipInSave(variant, position) {
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
          // toast notification this
          this.$toast(
            {
              component: ToastificationContent,
              props: {
                title: 'Success',
                icon: 'CheckIcon',
                text: 'Success Admin IP 123.123.123.* was updated',
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
                text: 'Success Admin .* was deleted.',
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
@import '@core/scss/vue/libs/vue-flatpicker.scss';
</style>
