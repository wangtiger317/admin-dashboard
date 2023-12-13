<template>
  <div>
    <blok-add
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
            <h2>Block Number</h2>
          </b-col>

          <!-- Create Block Number -->
          <b-col cols="12" md="3" class="text-right">
            <b-button
              variant="primary"
              @click="isAddNewUserSidebarActive = true"
            >
              Create Block Number
            </b-button>
          </b-col>
        </b-row>
      </div>

      <!-- TABLE THIS -->
      <b-table
        :fields="fields"
        :items="getSettingBloks.data"
        responsive
        show-empty
        empty-text="No Data"
        class="position-relative"
      >
        <!-- NO -->
        <template #cell(nomor)="{ index }">{{ index + 1 }}</template>

        <!-- PASARAN -->
        <template #cell(pasaran)="{ item }">{{ item.pasaran }}</template>

        <!-- GAME -->
        <template #cell(game)="{ item }">{{ item.game }}</template>

        <!-- NOMOR -->
        <template #cell(numberblok)="{ item }"
          >{{ item.number_3 }}{{ item.number_4 }}{{ item.number_5
          }}{{ item.number_6 }}</template
        >

        <!-- action -->
        <template #cell(actions)="data">
          <div class="text-nowrap">
            <!-- Delete this -->
            <feather-icon
              @click="deleteBlok(data.item, 'success', 'top-center')"
              :id="`invoice-row-${data.item.id}-delete-icon`"
              icon="Trash2Icon"
              class="cursor-pointer"
              size="16"
            />
            <b-tooltip
              title="Delete"
              class="cursor-pointer"
              :target="`invoice-row-${data.item.id}-delete-icon`"
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
            class="
              d-flex
              align-items-center
              justify-content-center justify-content-sm-start
            "
          >
            <!-- <span class="text-muted">Showing 1 to {{ allTotal }} entries</span> -->
          </b-col>
          <b-col
            v-if="getSettingBloks"
            cols="12"
            sm="6"
            class="
              d-flex
              align-items-center
              justify-content-center justify-content-sm-end
            "
          >
            <b-pagination
              v-if="allTotal > totalPage"
              v-model="currentPage"
              :total-rows="allTotal"
              :per-page="totalPage"
              first-number
              last-number
              class="mb-0 mt-1 mt-sm-0"
              prev-class="prev-item"
              next-class="next-item"
              @change="changePaginat"
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
import BlokAdd from './BlokAdd.vue'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import 'animate.css'
import { mapActions, mapGetters } from 'vuex'

export default {
  components: {
    BTooltip,
    ToastificationContent,
    BlokAdd,
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
    ...mapGetters('settings', ['getSettingBloks']),

    //  total
    allTotal() {
      const total = this.getSettingBloks
      const arr = []
      let max = 0
      if (total) {
        arr.push(total.total)
        max = Math.max(...arr)
      }
      return max
    },

    //  perpage
    totalPage() {
      const perpage = this.getSettingBloks
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
    }
    this.settingBlokList(payload)
  },

  methods: {
    // flip in sweet alert this
    ...mapActions('settings', ['settingBlokList']),

    deleteBlok(blok, variant, position) {
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
          this.$store.dispatch('settings/deleteBlok', blok)
          // toast notification this
          this.$toast(
            {
              component: ToastificationContent,
              props: {
                title: 'Success',
                icon: 'CheckIcon',
                text: 'Successfully Delete Pasaran.',
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
                text: 'Pasaran deleted.',
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
      currentPage: 1,
      fields: [
        {
          key: 'nomor',
          label: 'no',
        },

        {
          key: 'pasaran',
        },
        {
          key: 'game',
        },
        {
          key: 'numberblok',
          label: 'nomor',
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
