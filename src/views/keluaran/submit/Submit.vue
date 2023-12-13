<template>
  <div>
    <!-- FILTER THIS -->
    <div>
      <b-card no-body>
        <b-card-body>
          <b-row>
            <!-- PASARAn -->
            <b-col cols="12" md="4" class="mb-md-0 mb-2">
              <b-form-group>
                <label>Pasaran</label>
                <b-form-select v-model="providerSubmit" id="sortOptions">
                  <option value="">Pilih Pasaran</option>
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

            <!-- INPUT NUMBER  -->
            <b-col cols="12" md="3" class="mb-md-0 mb-2">
              <b-form-group>
                <label>Input</label>
                <b-form-input
                  v-model="hasil"
                  maxlength="4"
                  @keypress="onlyNumber"
                  placeholder="Input Number"
                />
              </b-form-group>
            </b-col>

            <b-col cols="12" md="3" class="mb-md-0 mb-2">
              <b-form-group>
                <label>Date</label>
                <b-form-input
                  readonly
                  v-model="tanggal"
                  placeholder="Input Date"
                />
              </b-form-group>
            </b-col>

            <!-- BUTTON SEARCH THIS -->
            <b-col class="mb-md-0 mb-2 mt-2">
              <b-button
                v-model="providerSubmit"
                v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                variant="primary"
                @click="flipInSubmit(providerSubmit, hasil, tanggal)"
              >
                Submit
              </b-button>
            </b-col>
          </b-row>
        </b-card-body>
      </b-card>
    </div>

    <!-- SHOW DATA THIS -->
    <div v-if="showResult">
      <b-alert variant="dark" show>
        <h3 class="alert-heading text-center py-2">
          {{ resultSubmit.numberResults }}
        </h3>
      </b-alert>
      <!-- TABLE ONE -->
      <b-card no-body>
        <div class="m-2 mt-1">
          <b-row>
            <b-col
              cols="12"
              md="9"
              class="d-flex align-items-center justify-content-start"
            >
              <h2>Data Submit Successfully</h2>
            </b-col>
          </b-row>
        </div>

        <!-- TABLE ONE -->
        <b-row>
          <b-col
            cols="12"
            md="12"
            class="d-flex align-items-center justify-content-start"
          >
            <!-- :items="getSubmitList.analis" -->
            <b-table
              :fields="fields1"
              :items="resultSubmit.resultTotal"
              responsive
            >
              <template #cell(description)="{ item }"
                >{{ item.description }}
              </template>
              <template #cell(total)="{ item }">
                {{ formatPrice(item.total) }}
              </template>
            </b-table>
          </b-col>
        </b-row>
      </b-card>

      <!-- TABLE TWO -->
      <b-card no-body class="mb-0">
        <div class="m-2">
          <b-row>
            <b-col
              cols="12"
              md="9"
              class="d-flex align-items-center justify-content-start"
            >
              <h2>Get Pasaran</h2>
            </b-col>
          </b-row>
        </div>

        <!-- TABLE THIS  -->
        <b-table
          :fields="fields"
          :items="resultSubmit.dataAfterSubmit"
          responsive
        >
          <template #cell(No)="{ index }"> {{ index + 1 }} </template>
          <template #cell(Pasaran)="{ item }"> {{ item.pasaran }} </template>
          <template #cell(Username)="{ item }"> {{ item.Username }} </template>
          <template #cell(Game)="{ item }"> {{ item.Game }} </template>
          <template #cell(Nomor)="{ item }"> {{ item.Nomor }} </template>
          <template #cell(Bet)="{ item }">
            {{ formatPrice(item.Bet) }}
          </template>
          <template #cell(Bayar)="{ item }">
            {{ formatPrice(item.Bayar) }}
          </template>
          <template #cell(price)="{ item }">
            {{ formatPrice(item.winTogel) }}
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
            </b-col>
            <b-col
              v-if="getSubmitList"
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
  BAlert,
} from 'bootstrap-vue'
import vSelect from 'vue-select'
import days from 'dayjs'
import { mapActions, mapGetters } from 'vuex'
import useJwt from '@/auth/jwt/useJwt'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import 'animate.css'

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
    BAlert,
    vSelect,
  },

  computed: {
    ...mapGetters('settings', ['getListPeriode']),

    allTotal() {
      const total = this.getAnalisaKeluaran.data
      const arr = []
      let max = 0
      if (total) {
        arr.push(total.total)
        max = Math.max(...arr)
      }
      return max
    },

    totalPage() {
      const perpage = this.getAnalisaKeluaran.data
      let perPage = 0
      if (perpage) {
        perPage = perpage.per_page
      }
      return perPage
    },
  },

  created() {
    this.periodeList()
  },

  methods: {
    ...mapActions('settings', ['periodeList']),

    flipInSubmit(providerSubmit, hasil, tanggal, variant, position) {
      variant = variant ?? 'success'
      position = position ?? 'top-right'

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
          const body = {
            providerSubmit,
            hasil,
            tanggal,
          }
          useJwt
            .createData('allKeluaran', '/submit', body)
            .then((response) => {
              this.resultSubmit = response.data.data
              this.showResult = true
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
            text: 'Ok your data is still there and safe',
            confirmButtonText: 'Ok',
            customClass: {
              cancelButton: 'btn btn-secondary',
            },
          })
        }
      })
    },

    // Number Only
    onlyNumber($event) {
      let keyCode = $event.keyCode ? $event.keyCode : $event.which
      if ((keyCode < 48 || keyCode > 57) && keyCode !== 190) {
        $event.preventDefault()
      }
    },

    formatPrice(value) {
      let val = (value / 1).toFixed('.', ',')
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    },
  },

  data() {
    const date = new Date()
    const now = days(date).format('YYYY-MM-DD HH:mm:ss')
    return {
      currentPage: 1,
      tanggal: now,
      resultSubmit: [],
      showResult: null,
      providerSubmit: '',
      id_pasaran: '',
      hasil: '',
      fields: [
        {
          key: 'No',
        },
        {
          key: 'Pasaran',
        },
        {
          key: 'Username',
        },
        {
          key: 'Game',
        },
        {
          key: 'Nomor',
        },
        {
          key: 'Bet',
        },
        {
          key: 'Bayar',
        },
        {
          key: 'price',
        },
      ],
      fields1: [
        {
          key: 'description',
        },
        {
          key: 'total',
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
</style>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
@import '@core/scss/vue/libs/vue-sweetalert.scss';
</style>
<style lang="scss">
@import '@core/scss/vue/libs/vue-flatpicker.scss';
</style>
