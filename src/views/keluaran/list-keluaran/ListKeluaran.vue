<template>
  <div>
    <b-card no-body>
      <b-card-body>
        <b-row>
          <!-- PASARAn -->
          <b-col cols="12" md="10" class="mb-md-0 mb-2">
            <b-form-group>
              <label>Pasaran</label>
              <b-form-select v-model="pasaran" id="sortOptions">
                <option value="" disabled hidden>HK SIANG - HKD</option>
                <option
                  v-for="datas in getListPeriode"
                  :key="datas"
                  :value="datas.id"
                >
                  {{ datas.name }} - {{ datas.name_initial }}
                </option>
              </b-form-select>
            </b-form-group>
          </b-col>

          <!-- BUTTON SEARCH THIS -->
          <b-col class="mb-md-0 mb-2 mt-2">
            <b-button
              v-model="pasaran"
              v-ripple.400="'rgba(255, 255, 255, 0.15)'"
              variant="primary"
              @click="searchPicker(pasaran)"
            >
              Search
            </b-button>
          </b-col>
        </b-row>
      </b-card-body>
    </b-card>

    <!-- Filters -->
    <b-row> </b-row>
    <!-- Table Container Card -->
    <b-card no-body class="mb-0">
      <div class="m-2">
        <b-row>
          <b-col
            cols="12"
            md="3"
            class="d-flex align-items-center justify-content-start"
          >
            <h2>Result List</h2>
          </b-col>
        </b-row>
      </div>

      <b-table
        :fields="fields"
        :items="getKeluaranList.data.data"
        responsive
        show-empty
        empty-text="No Data"
        class="position-relative"
      >
        <!-- NO -->
        <template #cell(no)="{ index }"> {{ index + 1 }} </template>

        <!-- TANGGAL-->
        <template #cell(Tanggal)="{ item }">{{ formateDate(item.result_date) }}</template>

        <!-- HARI-->
        <template #cell(Hari)="{ item }"> {{ item.days }} </template>

        <!-- PASARAN -->
        <template #cell(Pasaran)="{ item }">
          {{ item.name_initial }} + {{ item.period }}
        </template>

        <!-- RESULT -->
        <template #cell(Result)="{ item }">
          {{ item.number_result_3 }} {{ item.number_result_4 }}
          {{ item.number_result_5 }} {{ item.number_result_6 }}
        </template>

        <!-- ACTION -->
        <template #cell(actions)="{ item }">
          <div class="text-nowrap" v-if="item.id === getKeluaranList.idDelete">
            <feather-icon
              :id="`invoice-row-${item.id}-delete-icon`"
              icon="Trash2Icon"
              class="cursor-pointer"
              size="16"
              @click="deletedResult(item.id, pasaran, 'success', 'top-center')"
            />
            <b-tooltip
              title="Delete"
              class="cursor-pointer"
              :target="`invoice-row-${item.id}-delete-icon`"
            />
          </div>
        </template>
      </b-table>

      <!-- PAGINATION -->
      <div class="mx-2 mb-2 mt-2">
        <b-row>
          <b-col
            cols="12"
            sm="6"
            class="d-flex align-items-center justify-content-center justify-content-sm-start"
          >
          </b-col>
          <b-col
            v-if="getKeluaranList"
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
  BMedia,
  BAvatar,
  BLink,
  BBadge,
  BDropdown,
  BDropdownItem,
  BPagination,
  BFormCheckbox,
  BFormSelect,
  BCardHeader,
  BCardBody,
  BTooltip,
} from 'bootstrap-vue'
import vSelect from 'vue-select'
import { mapActions, mapGetters } from 'vuex'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import 'animate.css'
import useJwt from '@/auth/jwt/useJwt'
import days from 'dayjs'

export default {
  components: {
    BTooltip,
    BCardHeader,
    BCardBody,
    BFormSelect,
    ToastificationContent,
    BFormCheckbox,
    BFormGroup,
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
    ...mapGetters('kelauran', ['getKeluaranList']),
    ...mapGetters('settings', ['getListPeriode']),

    allTotal() {
      const total = this.getKeluaranList.data
      const arr = []
      let max = 0
      if (total) {
        arr.push(total.total)
        max = Math.max(...arr)
      }
      return max
    },

    totalPage() {
      const perpage = this.getKeluaranList.data
      let perPage = 0
      if (perpage) {
        perPage = perpage.per_page
      }
      return perPage
    },
  },

  created() {
    const payload = {
      pasaran: '',
      page: 1,
    }
    this.keluaranList(payload)
    this.periodeList()
  },

  methods: {
    ...mapActions('kelauran', ['keluaranList']),
    ...mapActions('settings', ['periodeList']),

    async changePage(number) {
      const payload = {
        page: number,
        pasaran: '',
      }
      await this.keluaranList(payload)
    },

    formateDate(date) {
      return days(date).format('DD MMM YYYY HH:mm')
    },

    formatPrice(value) {
      let val = (value / 1).toFixed('.', ',')
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    },

    async searchPicker(pasaran) {
      const payload = {
        pasaran,
        page: 1,
      }
      await this.keluaranList(payload)
      this.currentPage = 1
    },

    deletedResult(id, pasaran, variant, position) {
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
          useJwt
            .deleteData('allKeluaran', `/delete/${id}`)
            .then((response) => {
              const payload = {
                pasaran,
                page: 1,
              }
              this.keluaranList(payload)
              this.$toast(
                {
                  component: ToastificationContent,
                  props: {
                    title: 'Success',
                    icon: 'CheckIcon',
                    text: 'Deleted Successfully',
                    variant,
                  },
                },
                {
                  position,
                }
              )
            })
            .catch((error) => {
              this.$toast(
                {
                  component: ToastificationContent,
                  props: {
                    title: 'Error',
                    icon: 'AlertCircleIcon',
                    text: error.response.data.message,
                    variant: 'danger',
                  },
                },
                {
                  position,
                }
              )
            })
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
      pasaran: '',
      fields: [
        {
          key: 'no',
          label: 'no',
        },
        {
          key: 'Tanggal',
          label: 'Tanggal',
        },
        {
          key: 'Hari',
          label: 'Hari',
        },
        {
          key: 'Pasaran',
          label: 'Pasaran',
        },
        {
          key: 'Result',
          label: 'Result',
        },
        {
          key: 'actions',
        },
      ],
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
.total__content {
  display: flex;
  justify-content: end;
  padding-right: 230px;
}
.total {
  padding: 8px 0px;
  border-bottom: 1px solid #404656;
}
</style>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
@import '@core/scss/vue/libs/vue-sweetalert.scss';
</style>
<style scoped>
.checkboxs {
  display: flex;
  align-items: center;
}
</style>
