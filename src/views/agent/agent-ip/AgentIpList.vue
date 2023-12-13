<template>
  <div>
    <ip-list-add-new
      :is-add-new-user-sidebar-active.sync="isAddNewUserSidebarActive"
      @refetch-data="fetchIpList"
    />

    <!-- Filters -->
    <b-card>
      <b-row>
        <b-col cols="11" md="11" class="mb-md-0 mb-2 d-flex">
          <b-form-input
            v-model="search"
            class="d-inline-block mr-1"
            placeholder="Search Agent Ip Address..."
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
            <h2>Agent IP</h2>
          </b-col>

          <!-- create admin IP THIS -->
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

      <b-table
        :per-page="adminTotalPage"
        :current-page="currentPage"
        :fields="fields"
        :items="getAdminIpList.data"
        responsive
        show-empty
        empty-text="No Data"
        class="position-relative"
      >
        <!-- number this  -->
        <template #cell(no)="{ index }">
          {{ index + 1 }}
        </template>

        <!-- ip -->
        <template #cell(ip)="{ item }">
          <v-row class="d-flex">
            <!--INPUT NUMBER 1 -->
            <b-form-input
              v-model="item.ip1"
              data-index="0"
              maxlength="3"
              class="input-cust text-center"
              required
              @keypress="onlyNumber"
              @keyup="focusNext($event, 3)"
            />
            <span class="input-coms">.</span>

            <!-- INPUT NUMBER 2 -->
            <b-form-input
              v-model="item.ip2"
              data-index="1"
              maxlength="3"
              class="input-cust text-center"
              required
              @keypress="onlyNumber"
              @keyup="focusNext($event, 3)"
            />
            <span class="input-coms">.</span>

            <!-- INPUT NUMBER 3 -->
            <b-form-input
              v-model="item.ip3"
              data-index="2"
              maxlength="3"
              class="input-cust text-center"
              @keypress="onlyNumber"
              @keyup="focusNext($event, 3)"
            />
            <span class="input-coms">.</span>

            <!-- INPUT NUMBER 4 -->
            <b-form-input
              v-model="item.ip4"
              data-index="3"
              maxlength="3"
              class="input-cust text-center"
              @keypress="onlyNumber"
              @keyup="focusNext($event, 3)"
            />
          </v-row>
        </template>

        <!-- description -->
        <template #cell(description)="{ item }">
          <b-form-input
            id="basicInput"
            required
            v-model="item.description"
            placeholder="Enter Description"
          />
        </template>

        <!-- whitelisted -->
        <template #cell(whitelisted)="{ item }">
          <b-form-checkbox
            :checked="!!item.whitelisted"
            name="check-button"
            switch
            inline
          />
        </template>

        <!-- updatedAt -->
        <template #cell(updatedAt)="{ item }">
          {{ formateDate(item.updated_at || item.created_at) }}
        </template>

        <!-- action -->
        <template #cell(actions)="{ item }">
          <div class="text-nowrap">
            <!-- save this -->
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

            <!-- Delete this -->
            <feather-icon
              :id="`invoice-row-${item.id}-delete-icon`"
              icon="Trash2Icon"
              class="cursor-pointer"
              size="16"
              @click="deleteip(item, 'success', 'top-center')"
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
            class="d-flex align-items-center justify-content-center justify-content-sm-start"
          >
            <!-- <span class="text-muted"
              >Showing 1 to {{ adminTotal }} entries</span
            > -->
            <!-- <span class="text-muted">Showing 1 to 1 of 2 entries</span> -->
          </b-col>
          <!-- Pagination -->
          <b-col
            v-if="getAdminIpList"
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
              @change="changeAdminIpPage"
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
  BPagination,
  BFormCheckbox,
  BFormTextarea,
  BTooltip,
} from 'bootstrap-vue'
import { mapActions, mapGetters } from 'vuex'
import { ref } from '@vue/composition-api'
import days from 'dayjs'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import Ripple from 'vue-ripple-directive'
import IpListAddNew from './IpListAddNew.vue'
import 'animate.css'

export default {
  name: "AgentIpList",
  components: {
    IpListAddNew,
    BFormGroup,
    BFormTextarea,
    BFormCheckbox,
    BCard,
    BRow,
    BCol,
    BFormInput,
    BButton,
    BTable,
    BPagination,
    BTooltip,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      maxLength: 3,
      currentPage: 1,
      fields: [
        {
          key: 'no',
          sortable: true,
        },
        {
          key: 'ip',
          label: 'IP Address',
          sortable: true,
        },
        {
          key: 'description',
        },
        {
          key: 'whitelisted',
        },
        {
          key: 'updatedAt',
          sortable: true,
        },
        {
          key: 'actions',
        },
      ],
      search: '',
    }
  },

  computed: {
    ...mapGetters('admin', ['getAdminIpList']),

    adminTotal() {
      const list = this.getAdminIpList
      const arr = []
      let max = 0
      if (list) {
        arr.push(list.total)
        max = Math.max(...arr)
      }
      return max
    },
    adminTotalPage() {
      const list = this.getAdminIpList
      let perPage = 0
      if (list) {
        perPage = list.per_page
      }
      return perPage
    },
  },
  async created() {
    const payload = {
      search: '',
      page: 1,
    }
    await this.fetchIpList(payload)
  },

  methods: {
    ...mapActions('admin', ['fetchAdminIpList', 'updateAdminIp']),

    // format date
    formateDate(date) {
      return days(date).format('DD MMM YYYY HH:mm')
    },

    // next input
    focusNext(event, max) {
      if (event.target.value.length === max) {
        let target = event.target
        let index = target.getAttribute('data-index')

        if (index != target.parentElement.children.length - 1)
          target.nextElementSibling.focus()
      }
    },

    // number only
    onlyNumber($event) {
      let keyCode = $event.keyCode ? $event.keyCode : $event.which
      if ((keyCode < 48 || keyCode > 57) && keyCode !== 190) {
        $event.preventDefault()
      }
    },

    deleteip(ip, variant, position) {
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
          this.$store.dispatch('admin/deleteAdminIP', ip)
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
        const togglePayload = {
          id: item.id,
          whitelisted: !item.whitelisted,
        }
        if (
          (await this.updateAdminIp(item)) &&
          (await this.$store.dispatch(
            'admin/toggleAdminIpWhitelist',
            togglePayload
          ))
        ) {
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
    async searchWord(search) {
      const payload = {
        search,
        page: 1,
      }
      await this.fetchAdminIpList(payload)
      this.currentPage = 1
    },

    async fetchIpList(payload) {
      await this.fetchAdminIpList(payload)
    },

    async changeAdminIpPage(number) {
      const payload = {
        search: '',
        page: number,
      }
      await this.fetchAdminIpList(payload)
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
.input-cust {
  width: 70px;
}
.input-coms {
  margin-top: 6px;
}
.per-page-selector {
  width: 90px;
}
</style>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
@import '@core/scss/vue/libs/vue-sweetalert.scss';
</style>
