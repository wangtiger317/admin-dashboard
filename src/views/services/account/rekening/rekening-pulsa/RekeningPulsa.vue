<template>
  <div>
    <rekening-add-new
      :is-add-new-user-sidebar-active.sync="isAddNewUserSidebarActive"
      :role-options="roleOptions"
      :plan-options="planOptions"
      @refetch-data="refetchData"
    />

    <!-- Table Container Card -->
    <b-card no-body class="mb-0">
      <div class="m-2">
        <b-row>
          <b-col
            cols="12"
            md="9"
            class="d-flex align-items-center justify-content-start"
          >
            <h2>Rekening Pulsa</h2>
          </b-col>

          <!-- create aRekening Pulsa THIS -->
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

      <!-- THIS TABLE -->
      <b-table
        :fields="fields"
        :items="getRekeningList.data"
        responsive
        show-empty
        empty-text="No Data"
        class="position-relative"
      >
        <!-- NO -->
        <template #cell(nomor)="{ index }">
          {{ parseInt(parseInt(index) + 1) }}
        </template>

        <!-- BANK -->
        <template #cell(bank)="{ item }">
          {{ item.providerName }}
        </template>

        <!-- Rekening/No. Provider -->
        <template #cell(rek)="{ item }">
          <b-form-group>
            <b-form-input
              v-model="item.noRek"
              type="number"
              id="basicInput"
              placeholder="Enter Rekening provider"
            /> </b-form-group
        ></template>

        <!-- KETERANGAN -->
        <template #cell(description)="{ item }">
          <b-form-group>
            <b-form-input
              v-model="item.keterangan"
              id="basicInput"
              placeholder="Enter Description"
            /> </b-form-group
        ></template>

        <!-- NETT (0.01 ~ 1.00) -->
        <template #cell(net)="{ item }">
          <b-form-group>
            <b-form-input
              v-model="item.nett"
              type="number"
              id="basicInput"
              placeholder="Enter Nett"
            /> </b-form-group
        ></template>

        <!-- ENABLE -->
        <template #cell(enabled)="{ item }">
          <b-form-checkbox
            v-model="item.is_default"
            name="check-button"
            switch
            inline
          >
          </b-form-checkbox
        ></template>

        <!-- ACTION -->
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
            <!-- @click="flipInDelete('success', 'top-center')" -->
            <feather-icon
              @click="deleteAccount(item, 'success', 'top-center')"
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
            class="
              d-flex
              align-items-center
              justify-content-center justify-content-sm-start
            "
          >
            <!-- <span class="text-muted">Showing 1 to {{ allTotal }} entries</span> -->
          </b-col>
          <b-col
            v-if="getRekeningList"
            cols="12"
            sm="6"
            class="
              d-flex
              align-items-center
              justify-content-center justify-content-sm-end
            "
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
  BTooltip,
} from 'bootstrap-vue'
import vSelect from 'vue-select'
import { ref } from '@vue/composition-api'
import { mapActions, mapGetters } from 'vuex'
import RekeningAddNew from './RekeningAddNew.vue'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import 'animate.css'

export default {
  components: {
    ToastificationContent,
    RekeningAddNew,
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
      currentPage: 1,
      fields: [
        {
          key: 'nomor',
          label: 'no',
        },
        {
          key: 'bank',
        },
        {
          key: 'rek',
          label: 'Rekening/No. Provider',
        },
        {
          key: 'description',
          label: 'Keterangan / Deskripsi',
        },
        {
          key: 'net',
          label: 'Nett (0.01 ~ 1.00)',
        },
        {
          key: 'enabled',
        },
        {
          key: 'actions',
        },
      ],
      items: [
        {
          nomor: 1,
          bank: 'Telkomsel',
          ip: '103.115.175.247',
          enabled: 'Male',
          description: 42,
          net: 'net',
          actions: 'tes action',
        },
      ],
    }
  },

  // computed
  computed: {
    ...mapGetters('services', ['getRekeningList']),

    allTotal() {
      const list = this.getRekeningList
      const arr = []
      let max = 0
      if (list) {
        arr.push(list.total)
        max = Math.max(...arr)
      }
      return max
    },

    perPage() {
      const list = this.getRekeningList
      let perPage = 0
      if (list) {
        perPage = list.per_page
      }
      return perPage
    },
  },

  // created
  async created() {
    const payload = {
      page: 1,
    }
    await this.fetchDataList(payload)
  },

  // methods
  methods: {
    ...mapActions('services', ['fetchRekeningList', 'updateRekening']),

    // fetchDataList store
    async fetchDataList(payload) {
      await this.fetchRekeningList(payload)
    },

    // Change Pagination
    async changePage(number) {
      const payload = {
        page: number,
      }
      await this.fetchRekeningList(payload)
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
        if (await this.updateRekening(item)) {
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

    // flipIn Delete
    deleteAccount(account, variant, position) {
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
          this.$store.dispatch('services/deleteAccount', account)
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
