<template>
  <div>
    <!-- FILTER ONE -->
    <b-card no-body>
      <b-card-body>
        <b-row>
          <!-- PASARAn -->
          <b-col cols="12" md="4" class="mb-md-0 mb-2">
            <b-form-group>
              <label>Pasaran</label>
              <b-form-select v-model="pasaran" id="sortOptions">
                <option value="">All Pasaran</option>
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

          <!-- GAME -->
          <b-col cols="12" md="4" class="mb-md-0 mb-2">
            <label>Game</label>
            <b-form-select v-model="whereGame" id="sortOptions">
              <option value="">All Game</option>
              <option value="4d">4D</option>
              <option value="3d">3D</option>
              <option value="2d">2D</option>
              <option value="2d_tengah">2D Tengah</option>
              <option value="2d_depan">2D Depan</option>
              <option value="cb">Colok Bebas</option>
              <option value="cm">Colok Macau</option>
              <option value="cn">Colok Naga</option>
              <option value="cj">Colok Jitu</option>
              <option value="5050_umum">5050 Umum</option>
              <option value="5050_special">5050 Special</option>
              <option value="5050_kombinasi">5050 Kombinasi</option>
              <option value="kombinasi">Kombinasi</option>
              <option value="dasar">Dasar</option>
              <option value="shio">Shio</option>
            </b-form-select>
          </b-col>

          <!-- SORT BY -->
          <b-col cols="12" md="3" class="mb-md-0">
            <label>Sort By</label>
            <b-form-select v-model="sortType" id="sortOptions">
              <option value="asc">Total Bet (kecil-besar)</option>
              <option value="desc">Total Bet (besar-kecil)</option>
            </b-form-select>
          </b-col>

          <!-- BUTTON SEARCH THIS -->
          <b-col class="mb-md-0 mb-2 mt-2">
            <b-button
              v-ripple.400="'rgba(255, 255, 255, 0.15)'"
              variant="primary"
              @click="searchPicker(sortType, pasaran, whereGame)"
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
            md="3"
            class="d-flex align-items-center justify-content-start"
          >
            <h2>Thrown Lottery</h2>
          </b-col>
          <!-- <b-col cols="12" md="9" class="text-right">
            <b-button
              variant="primary"
              @click="flipInSave('success', 'top-center')"
            >
              Pasang Buangan
            </b-button>
          </b-col> -->
        </b-row>
      </div>

      <b-table
        :fields="fields"
        :items="getBuanganList.data.data"
        responsive
        show-empty
        empty-text="No Data"
        class="position-relative"
      >
        <!-- CHECKBOX -->
        <!-- <template #cell(check)="{ item }">
          <div class="mt-2">
            <b-form-group>
              <b-form-checkbox
                v-if="item.is_bets_buangan_terpasang === 1"
                name="checkbox"
                disabled
              >
              </b-form-checkbox>
              <b-form-checkbox
                v-else-if="item.is_bets_buangan_terpasang === 0"
                name="checkbox"
                checked="true"
              >
              </b-form-checkbox>
            </b-form-group>
          </div>
        </template> -->

        <!-- NO -->
        <template #cell(no)="{ index }">{{ index + 1 }}</template>

        <!-- PASARAN -->
        <template #cell(Game)="{ item }">
          <p class="mt-1">{{ item.Game }}</p>
        </template>

        <!-- GAME -->
        <template #cell(Nomor)="{ item }">
          <p class="mt-1">{{ item.Nomor }}</p>
        </template>

        <!-- NOMOR -->
        <template #cell(bet_total)="{ item }"> {{ item.bet_total }} </template>

        <!-- BET TOTAL -->
        <template #cell(Limit_bet)="{ item }">{{ formatPrice(item.limit_bet) }} </template>

        <!-- LIMIT BET -->
        <template #cell(Buangan)="{ item }"
          >{{ formatPrice(item.buangan_terpasang) }}
        </template>

        <!-- SISA BUANGAN -->
        <template #cell(Sisa)="{ item }">
          {{ formatPrice(item.sisa_buangan) }}
        </template>

        <!-- STATUS -->
        <template #cell(Status)="{ item }">
          {{ item.Status }}
        </template>
        <template #cell(action)="{ item }">
          <div class="text-nowrap" v-if="item.is_bets_buangan_terpasang === 0">
            <feather-icon
              :id="`invoice-row-${item.id}-save-icon`"
              icon="SaveIcon"
              size="16"
              class="cursor-pointer mx-1"
              @click="
                pasangBuangan(
                  item.id,
                  item.is_bets_buangan_terpasang,
                  item.sisa_buangan,
                  'success',
                  'top-center'
                )
              "
            />
            <b-tooltip
              title="Pasang Buangan"
              :target="`invoice-row-${item.id}-save-icon`"
            />
          </div>
        </template>
      </b-table>
      <hr />

      <!-- TOTAL -->
      <b-row>
        <b-col cols="4" md="5"></b-col>
        <b class="mr-1">Total:</b>
        <span>
          {{ formatPrice(getBuanganList.totalBet) }}({{ getBuanganList.countBet }})</span
        >
      </b-row>

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
          </b-col>
          <b-col
            v-if="getBuanganList"
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
  BCardHeader,
  BCardBody,
  BFormSelect,
  BTooltip,
} from 'bootstrap-vue'
import vSelect from 'vue-select'
import { mapActions, mapGetters } from 'vuex'
import useJwt from '@/auth/jwt/useJwt'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import 'animate.css'
import days from 'dayjs'

export default {
  components: {
    BFormSelect,
    BCardHeader,
    BCardBody,
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
    BTooltip,
    vSelect,
  },
  computed: {
    ...mapGetters('bets', ['getBuanganList']),
    ...mapGetters('settings', ['getListPeriode']),

    allTotal() {
      const total = this.getBuanganList.data
      const arr = []
      let max = 0
      if (total) {
        arr.push(total.total)
        max = Math.max(...arr)
      }
      return max
    },

    totalPage() {
      const perpage = this.getBuanganList.data
      let perPage = 0
      if (perpage) {
        perPage = perpage.per_page
      }
      return perPage
    },
  },

  created() {
    const payload = {
      orderBy: '',
      sortType: '',
      whereGame: '',
      pasaran: '',
      page: 1,
    }
    this.buanganBetsList(payload)
    this.periodeList()
  },

  methods: {
    ...mapActions('bets', ['buanganBetsList']),
    ...mapActions('settings', ['periodeList']),

    async changePage(number) {
      const payload = {
        orderBy: '',
        sortType: '',
        whereGame: '',
        pasaran: '',
        page: number,
      }
      await this.buanganBetsList(payload)
    },

    formateDate(date) {
      return days(date).format('DD MMM YYYY HH:mm')
    },

    formatPrice(value) {
      let val = (value / 1).toFixed('.', ',')
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    },

    async searchPicker(sortType, pasaran, whereGame) {
      const payload = {
        sortType,
        whereGame,
        pasaran,
      }
      await this.buanganBetsList(payload)
      this.currentPage = 1
    },

    // Pasang Buangan
    pasangBuangan(
      id,
      is_bets_buangan_terpasang,
      sisa_buangan,
      variant,
      position
    ) {
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
            data_object: [{ id, is_bets_buangan_terpasang, sisa_buangan }],
          }
          useJwt
            .updateData('betsBuangan', '/pasang-buangan-di-cikatech', body)
            .then((response) => {
              const payload = {
                orderBy: '',
                sortType: '',
                whereGame: '',
                pasaran: '',
                page: 1,
              }
              this.buanganBetsList(payload)
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
  },

  data() {
    return {
      sortType: 'asc',
      whereGame: '',
      pasaran: '',
      currentPage: 1,
      fields: [
        // {
        //   key: 'check',
        //   label: '',
        // },
        {
          key: 'no',
          label: 'no',
        },
        {
          key: 'Pasaran',
          label: 'Pasaran',
        },
        {
          key: 'Game',
          label: 'Game',
        },
        {
          key: 'Nomor',
        },
        {
          key: 'bet_total',
          label: 'Bet total',
        },
        {
          key: 'Limit_bet',
          label: 'limit bet',
        },
        {
          key: 'Buangan',
          label: 'Buangan terpasang',
        },
        {
          key: 'Sisa',
          label: 'Sisa buangan',
        },
        {
          key: 'Status',
          label: 'Status',
        },
        {
          key: 'action',
          label: '',
        },
      ],
      items: [
        {
          Game: '103.115.175.247',
          bet_total: 'Male',
          Nomor: 42,
          no: 1,
          Pasaran: 'SG-14',
          Limit_bet: '12 Jun 2022 01:54:18',
          Buangan: 'test',
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
  margin-right: 550px;
}
.total {
  padding: 8px 0px;
  font-weight: 600;
  color: white;
  border-bottom: 1px solid grey;
}
</style>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
@import '@core/scss/vue/libs/vue-sweetalert.scss';
</style>
<style scoped></style>
