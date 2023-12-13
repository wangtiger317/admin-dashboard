<template>
  <div>
    <!-- ADMIN ADD -->
    <add-new
      :is-add-new-user-sidebar-active.sync="isAddNewUserSidebarActive"
      :role-options="roleOptions"
      :plan-options="planOptions"
      @refetch-data="refetchData"
    />

    <!-- Filters -->
    <b-card no-body>
      <b-card-body>
        <b-row>
          <b-col cols="11" md="11" class="mb-md-0 mb-2 d-flex">
            <b-form-input
              v-model="search"
              class="d-inline-block mr-1"
              placeholder="Search member broadcast..."
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
            <h2>Announcement Agent</h2>
          </b-col>

          <!-- create Announcement Agent THIS -->
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
        :items="getBroadcast.data"
        responsive
        show-empty
        empty-text="No Data"
        class="position-relative"
      >
        <!-- NO -->
        <template #cell(no)="{ index }">
          {{ parseInt(parseInt(index) + 1) }}
        </template>

        <!-- BROADCAST LIST -->
        <template #cell(list)="{ item }">
          <b-form-group>
            <b-form-input
              v-model="item.message"
              id="basicInput"
              placeholder="Enter Announcement list member"
            /> </b-form-group
        ></template>

        <!-- ENABLED -->
        <template #cell(enabled)="{ item }">
          <b-form-checkbox
            v-model="item.enabled"
            name="check-button"
            switch
            inline
          >
          </b-form-checkbox
        ></template>

        <!-- ACTIONS -->
        <template #cell(actions)="{ item }">
          <div class="text-nowrap">
            <feather-icon
              :id="`invoice-row-${item.id}-save-icon`"
              icon="SaveIcon"
              size="16"
              class="cursor-pointer mx-1"
              @click="
                flipInSave('success', 'top-center', item, getBroadcast.data)
              "
            />
            <b-tooltip
              title="Save"
              :target="`invoice-row-${item.id}-save-icon`"
            />

            <!-- Delete this -->
            <feather-icon
              :id="`invoice-row-${item.id}-delete-icon`"
              icon="Trash2Icon"
              class="cursor-pointer"
              size="16"
              @click="deleteAdmin(item, 'success', 'top-center')"
            />
            <b-tooltip
              title="Delete"
              class="cursor-pointer"
              :target="`invoice-row-${item.id}-delete-icon`"
            />
          </div>
        </template>
      </b-table>

      <div class="mx-2 mb-2 mt-2">
        <b-row>
          <b-col
            cols="12"
            sm="6"
            class="
              d-flex
              align-items-center
              justify-content-center justify-content-sm-start
            "
          >
            <!-- <span class="text-muted"
              >Showing 1 to {{ broadcastTotal }} entries</span
            > -->
          </b-col>
          <b-col
            v-if="getBroadcast"
            cols="12"
            sm="6"
            class="
              d-flex
              align-items-center
              justify-content-center justify-content-sm-end
            "
          >
            <b-pagination
              v-if="broadcastTotal > broadcastPage"
              v-model="currentPage"
              :total-rows="broadcastTotal"
              :per-page="broadcastPage"
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
  BCardHeader,
  BCardBody,
} from 'bootstrap-vue'
import vSelect from 'vue-select'
import { mapActions, mapGetters } from 'vuex'
import { ref } from '@vue/composition-api'
import AddNew from './AddNew.vue'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import 'animate.css'

export default {
  components: {
    ToastificationContent,
    BCardHeader,
    BCardBody,
    AddNew,
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

  computed: {
    ...mapGetters('broadcast', ['getBroadcast']),

    // broadcats total
    broadcastTotal() {
      const total = this.getBroadcast
      const arr = []
      let max = 0
      if (total) {
        arr.push(total.total)
        max = Math.max(...arr)
      }
      return max
    },

    // broadcats perpage
    broadcastPage() {
      const perpage = this.getBroadcast
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
    this.fetchDataList(payload)
  },

  // test
  methods: {
    ...mapActions('broadcast', ['adminBrodacastList', 'updateAdmin']),
    async changeAdminPage(number) {
      const payload = {
        search: '',
        page: number,
      }
      await this.adminBrodacastList(payload)
    },

    async fetchDataList(payload) {
      await this.adminBrodacastList(payload)
    },

    async searchWord(search) {
      const payload = {
        search,
        page: 1,
      }
      await this.adminBrodacastList(payload)
      this.currentPage = 1
    },

    // flip in sweet alert this
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
        if (await this.updateAdmin(item)) {
          // toast notification this
          this.$toast(
            {
              component: ToastificationContent,
              props: {
                title: 'Success',
                icon: 'CheckIcon',
                text: `Updated successfully!`,
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

    // flipInDelete
    deleteAdmin(broadcast, variant, position) {
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
          this.$store.dispatch('broadcast/deleteAdmin', broadcast)
          // toast notification this
          this.$toast(
            {
              component: ToastificationContent,
              props: {
                title: 'Success',
                icon: 'CheckIcon',
                text: `Success Agent was Deleted`,
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
  },

  data() {
    return {
      currentPage: 1,
      fields: [
        {
          key: 'no',
        },
        {
          key: 'list',
          label: 'Announcement List',
        },
        {
          key: 'enabled',
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
