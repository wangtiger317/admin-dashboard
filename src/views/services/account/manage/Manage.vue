<template>
  <div>
    <!-- FILTER SORT -->
    <b-card no-body>
      <b-card-body>
        <b-row>
          <!-- BANK -->
          <b-col cols="12" md="3" class="mb-md-0 mb-2">
            <label>Bank</label>
            <b-form-select v-model="bank" id="sortOptions">
              <option value="">Semua Bank</option>
              <option
                v-for="datas in getBankFilter"
                :key="datas"
                :value="datas.id"
              >
                {{ datas.name }}
              </option>
            </b-form-select>
          </b-col>

          <!-- REKENING -->
          <b-col cols="12" md="3" class="mb-md-0 mb-2">
            <label>Rekening Tujuan</label>
            <b-form-select v-model="rekTujuan" id="sortOptions">
              <option value="">Semua Rekening Tujuan</option>
              <option
                v-for="datas in getRekeningFilter"
                :key="datas"
                :value="datas.id"
              >
                {{ datas.nama_rekening }}
              </option>
            </b-form-select>
          </b-col>

          <!-- SORT BY -->
          <b-col cols="12" md="3" class="mb-md-0 mb-2">
            <label>Sort By</label>
            <b-form-select v-model="orderBy" id="sortOptions">
              <option value="">All</option>
              <option value="username">Username</option>
              <option value="memberNamaRek">Nama Rekening Member</option>
              <option value="ConstRekNamaBank">Bank</option>
              <option value="memberNoRek ">No Rekening</option>
              <option value="rekeningTujuanName">Rekening Tujuan</option>
              <option value="created_at">Created Date</option>
            </b-form-select>
          </b-col>

          <!-- SORT BY -->
          <b-col cols="12" md="3" class="mb-md-0 mb-2 mt-2">
            <b-form-select v-model="sortBy" id="sortOptions">
              <option value="asc">ZA</option>
              <option value="desc">AZ</option>
            </b-form-select>
          </b-col>
        </b-row>
      </b-card-body>
    </b-card>

    <!-- SEARCH INPUT THIS -->
    <b-card no-body>
      <b-card-body>
        <b-row>
          <b-col cols="11" md="11" class="mb-md-0 mb-2 d-flex">
            <b-form-input
              v-model="username"
              class="d-inline-block mr-1"
              placeholder="Search List User..."
            />
            <b-button
              v-ripple.400="'rgba(255, 255, 255, 0.15)'"
              variant="primary"
              @click="searchWord(username, bank, rekTujuan, orderBy, sortBy)"
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
            <h2>List User</h2>
          </b-col>
        </b-row>
      </div>
      <!-- THIS TABLE -->
      <b-table
        :fields="fields"
        :items="getBankUser.data"
        responsive
        show-empty
        empty-text="No Data"
        class="position-relative"
      >
        <!-- NO -->
        <template #cell(no)="{ index }">
          {{ parseInt(parseInt(index) + 1) }}
        </template>

        <!-- USERNAME -->
        <template #cell(username)="{ item }">{{ item.username }}</template>

        <!-- NAMA REKENING -->
        <template #cell(namarekening)="{ item }">{{
          item.memberNamaRek
        }}</template>

        <!-- BANK -->
        <template #cell(bank)="{ item }">{{ item.ConstRekNamaBank }}</template>

        <!-- NOMOR RKEKENING -->
        <template #cell(norekening)="{ item }">{{ item.memberNoRek }}</template>

        <!-- REKENING TUJUAN -->
        <template #cell(rekeningtujuan)="{ item }">
          <b-form-select :id="item.id" v-model="item.rekeningTujuanId">
            <option
              v-for="datas in item.tujuan_rekening.original.data"
              :key="datas"
              :value="datas.id"
            >
              {{ datas.rekening }}
            </option>
          </b-form-select>
        </template>

        <!-- CREATED DATE -->
        <template #cell(createddate)="{ item }">{{ item.created_at }}</template>

        <!-- ACTIONSssssssssssssss -->
        <template #cell(actions)="{ item }">
          <div class="text-nowrap">
            <!-- save this -->
            <feather-icon
              :id="`invoice-row-${item.id}-save-icon`"
              icon="SaveIcon"
              size="16"
              class="cursor-pointer mx-1"
              @click="updateManageList('success', 'top-center', item)"
            />
            <b-tooltip
              title="Save"
              :target="`invoice-row-${item.id}-save-icon`"
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
            class="
              d-flex
              align-items-center
              justify-content-center justify-content-sm-start
            "
          >
            <!-- <span class="text-muted">Showing 1 to {{ allTotal }} entries</span> -->
          </b-col>
          <b-col
            v-if="getBankUser"
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
  BCardHeader,
  BCardBody,
  BFormSelect,
} from 'bootstrap-vue'
import vSelect from 'vue-select'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import 'animate.css'
import { mapActions, mapGetters } from 'vuex'

export default {
  components: {
    BFormSelect,
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
    BCardHeader,
    BCardBody,
    vSelect,
  },

  data() {
    return {
      sortBy: 'asc',
      orderBy: '',
      rekTujuan: '',
      bank: '',
      username: '',
      currentPage: 1,
      fields: [
        {
          key: 'no',
        },
        {
          key: 'username',
        },
        {
          key: 'namarekening',
          label: 'Nama Rekening',
        },
        {
          key: 'bank',
        },

        {
          key: 'norekening',
          label: 'No Rekening',
        },
        {
          key: 'rekeningtujuan',
          label: 'Rekening Tujuan',
        },
        {
          key: 'createddate',
          label: 'Created Date',
        },
        {
          key: 'actions',
        },
      ],
    }
  },

  computed: {
    ...mapGetters('services', ['getBankUser']),
    ...mapGetters('services', ['getBankFilter']),
    ...mapGetters('services', ['getRekeningFilter']),

    //  total
    allTotal() {
      const total = this.getBankUser
      const arr = []
      let max = 0
      if (total) {
        arr.push(total.total)
        max = Math.max(...arr)
      }
      return max
    },

    // perpage
    porPage() {
      const perpage = this.getBankUser
      let perPage = 0
      if (perpage) {
        perPage = perpage.per_page
      }
      return perPage
    },
  },

  created() {
    const payload = {
      username: '',
      bank: '',
      rekTujuan: '',
      orderBy: '',
      sortBy: '',
      page: 1,
    }
    this.bankUserList(payload)
    this.bankFilterlist()
    this.rekeningFilterlist()
    this.rekeningTujunDrop()
  },

  methods: {
    ...mapActions('services', ['bankUserList']),
    ...mapActions('services', ['bankFilterlist']),
    ...mapActions('services', ['rekeningFilterlist']),
    ...mapActions('services', ['listUserUpdate']),

    //  Pagination
    async changePage(number) {
      const payload = {
        username: '',
        bank: '',
        rekTujuan: '',
        orderBy: '',
        sortBy: '',
        page: number,
      }
      await this.bankUserList(payload)
    },

    // Search
    async searchWord(username, bank, rekTujuan, orderBy, sortBy) {
      const payload = {
        username,
        bank,
        rekTujuan,
        orderBy,
        sortBy,
        page: 1,
      }
      await this.bankUserList(payload)
      this.currentPage = 1
    },

    flipInSave(variant, position) {
      this.$swal({
        title: 'Are you sure?',
        confirmButtonText: 'OK',
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
      })
    },

    async updateManageList(variant, position, item) {
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
        const payload = {
          id: item.id,
          tujuan_rek_id: item.rekeningTujuanId,
        }
        if (await this.listUserUpdate(payload)) {
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
