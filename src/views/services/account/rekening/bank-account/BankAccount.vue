<template>
  <div>
    <bank-add-new
      :is-add-new-user-sidebar-active.sync="isAddNewUserSidebarActive"
      :role-options="roleOptions"
      :plan-options="planOptions"
    />

    <!-- Filters -->
    <b-card no-body>
      <b-card-body>
        <b-row>
          <b-col cols="11" md="11" class="mb-md-0 mb-2 d-flex">
            <b-form-input
              v-model="nameAccount"
              class="d-inline-block mr-1"
              placeholder="Search Bank Account"
            />
            <b-button
              v-ripple.400="'rgba(255, 255, 255, 0.15)'"
              variant="primary"
              @click="searchWord(nameAccount)"
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
            <h2>Bank account</h2>
          </b-col>

          <!-- create Bank account -->
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
        :fields="fields"
        :items="getBankAccount.data"
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

        <!-- NAME -->
        <template #cell(name)="{ item }">
          <b-form-group>
            <b-form-input
              id="basicInput"
              v-model="item.rekName"
              placeholder="Enter name" /></b-form-group
        ></template>

        <!-- ACCOUNT -->
        <template #cell(account)="{ item }">
          <b-form-group>
            <b-form-input
              id="basicInput"
              v-model="item.noRek"
              type="number"
              placeholder="Enter account" /></b-form-group
        ></template>

        <!-- USER BANKING -->
        <template #cell(userbank)="{ item }">
          <b-form-group>
            <b-form-input
              id="basicInput"
              v-model="item.userBanking"
              placeholder="Enter user" /></b-form-group
        ></template>

        <!-- PASS BANGKING -->
        <template #cell(pasbank)="{ item }">
          <b-form-group>
            <b-form-input
              id="basicInput"
              v-model="item.passBanking"
              placeholder="Enter pass" /></b-form-group
        ></template>

        <!-- APPROVAL -->
        <template #cell(approval)> Manual </template>

        <!-- FOR DEPOSI/WITHDRAW -->
        <template #cell(depowd)="{ item }">
          <b-form-select v-model="item.status">
            <option value="1">Deposit</option>
            <option value="2">Withdraw</option>
            <option value="0">None</option>
          </b-form-select>
        </template>

        <!-- REKENING MEMBER -->
        <template #cell(memberrek)="{ item }">{{
          item.totalRekMember
        }}</template>

        <!-- ACTION -->
        <template #cell(actions)="{ item }">
          <div class="text-nowrap">
            <!-- save this -->
            <feather-icon
              :id="`invoice-row-${item.id}-save-icon`"
              icon="SaveIcon"
              size="16"
              class="cursor-pointer mx-1"
              @click="updatedBank('success', 'top-center', item)"
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
              @click="deleteAccount(item, 'success', 'top-center')"
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
            v-if="getBankAccount"
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
  BPagination,
  BFormSelect,
  BCardBody,
  BTooltip,
} from 'bootstrap-vue'
import { ref } from '@vue/composition-api'
import { mapActions, mapGetters } from 'vuex'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import BankAddNew from './BankAddNew.vue'
import 'animate.css'

export default {
  components: {
    BTooltip,
    BFormSelect,
    BCardBody,
    // BankAddNew
    BankAddNew,
    // BankFilters,
    BCard,
    BRow,
    BCol,
    BFormInput,
    BButton,
    BTable,
    BPagination,
  },
  data() {
    return {
      nameAccount: '',
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
          key: 'name',
        },
        {
          key: 'account',
        },

        {
          key: 'userbank',
          label: 'User Banking',
        },
        {
          key: 'pasbank',
          label: 'Pass Banking',
        },
        {
          key: 'approval',
        },
        {
          key: 'depowd',
          label: 'For Deposi/Withdraw',
        },
        {
          key: 'memberrek',
          label: 'Member Rekening',
        },
        {
          key: 'actions',
        },
      ],
    }
  },

  computed: {
    ...mapGetters('services', ['getBankAccount']),

    allTotal() {
      const total = this.getBankAccount
      const arr = []
      let max = 0
      if (total) {
        arr.push(total.total)
        max = Math.max(...arr)
      }
      return max
    },

    porPage() {
      const perpage = this.getBankAccount
      let perPage = 0
      if (perpage) {
        perPage = perpage.per_page
      }
      return perPage
    },
  },
  created() {
    const payload = {
      nameAccount: '',
      page: 1,
    }
    this.bankAccountlist(payload)
  },
  methods: {
    ...mapActions('services', ['bankAccountlist', 'bankAccountUpdate']),

    // deleting bank account
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
          this.$store.dispatch('services/deleteBankAccount', account)
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
    async changePage(number) {
      const payload = {
        nameAccount: '',
        page: number,
      }
      await this.bankAccountlist(payload)
    },

    async searchWord(nameAccount) {
      const payload = {
        nameAccount,
        page: 1,
      }
      await this.bankAccountlist(payload)
      this.currentPage = 1
    },

    // flipInSave
    async updatedBank(variant, position, item) {
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
        if (await this.bankAccountUpdate(item)) {
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
