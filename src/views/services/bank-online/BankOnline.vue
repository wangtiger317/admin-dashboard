<template>
  <div>
    <!-- THIS TITLE -->
    <b-card no-body class="mb-0">
      <div class="m-2">
        <b-row>
          <b-col
            cols="12"
            md="9"
            class="d-flex align-items-center justify-content-start"
          >
            <h2>Bank Status</h2>
          </b-col>
        </b-row>
      </div>

      <!-- THIS TABLE -->
      <b-table
        :fields="fields"
        :items="getBankOnline.data"
        responsive
        show-empty
        empty-text="No Data"
        class="position-relative"
      >
        <!-- NO -->
        <template #cell(no)="{ index }">
          {{ index + 1 }}
        </template>

        <!-- BANK NAME -->
        <template #cell(bankName)="{ item }">
          {{ item.name }}
        </template>

        <!-- STATUS -->
        <template #cell(status)="{ item }">
          <b-form-select v-model="item.status">
            <option value="1">Online</option>
            <option value="2">Offline</option>
            <option value="3">Gangguan</option>
          </b-form-select>
        </template>

        <!-- ACTION -->
        <template #cell(action)="{ item }">
          <div class="text-nowrap">
            <feather-icon
              :id="`invoice-row-${item.id}-save-icon`"
              icon="SaveIcon"
              size="16"
              class="cursor-pointer mx-1"
              @click="updateBank('success', 'top-center', item)"
            />
            <b-tooltip
              title="Save"
              :target="`invoice-row-${item.id}-save-icon`"
            />
          </div>
        </template>
      </b-table>

      <!-- THIS PAGINATIOn -->
      <div class="mx-2 mb-2 mt-2">
        <b-row>
          <b-col
            cols="12"
            sm="6"
            class="d-flex align-items-center justify-content-center justify-content-sm-start"
          >
            <!-- <span class="text-muted">Showing 1 of {{ allTotal }} entries</span> -->
          </b-col>
          <b-col
            cols="12"
            sm="6"
            class="d-flex align-items-center justify-content-center justify-content-sm-end"
          >
            <b-col
              v-if="getBankOnline"
              cols="12"
              sm="6"
              class="d-flex align-items-center justify-content-center justify-content-sm-end"
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
  BTooltip,
  BBadge,
  BDropdown,
  BDropdownItem,
  BPagination,
  BFormSelect,
} from 'bootstrap-vue'
import vSelect from 'vue-select'
import { ref } from '@vue/composition-api'
import { mapActions, mapGetters } from 'vuex'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import 'animate.css'
export default {
  components: {
    ToastificationContent,
    BFormSelect,
    BCard,
    BRow,
    BCol,
    BFormInput,
    BButton,
    BTable,
    BMedia,
    BAvatar,
    BTooltip,
    BLink,
    BBadge,
    BDropdown,
    BDropdownItem,
    BPagination,
    vSelect,
  },
  computed: {
    ...mapGetters('services', ['getBankOnline', 'updateBankOnline']),

    // admin total
    allTotal() {
      const total = this.getBankOnline
      const arr = []
      let max = 0
      if (total) {
        arr.push(total.total)
        max = Math.max(...arr)
      }
      return max
    },

    // admin perpage
    totalPage() {
      const perpage = this.getBankOnline
      let perPage = 0
      if (perpage) {
        perPage = perpage.perPage
      }
      return perPage
    },
  },

  created() {
    const payload = {
      page: 1,
    }
    this.bankOnlinelist(payload)
  },

  methods: {
    ...mapActions('services', ['bankOnlinelist', 'bankOnlineUpdate']),

    async changePage(number) {
      const payload = {
        page: number,
      }
      await this.bankOnlinelist(payload)
    },

    // Save This
    async updateBank(variant, position, item) {
      const res = await this.$swal({
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
      })
      if (res.value) {
        if (await this.bankOnlineUpdate(item)) {
          // toast notification this
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
      }
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
          key: 'bankName',
        },
        {
          key: 'status',
        },
        {
          key: 'action',
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
