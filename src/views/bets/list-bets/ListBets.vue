<template>
  <div>
    <!-- Filters -->
    <b-card no-body>
      <b-card-body>
        <b-row>
          <!-- PASARAN -->
          <b-col cols="12" md="2">
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
          </b-col>

          <!-- PERIODE -->
          <b-col cols="12" md="2" class="mb-md-0 mb-2">
            <label>Periode</label>
            <b-form-select v-model="sortType" id="sortOptions">
              <option value="desc">Terakhir</option>
            </b-form-select>
          </b-col>

          <!-- GAME -->
          <b-col cols="12" md="2" class="mb-md-0 mb-2">
            <label>Game</label>
            <b-form-select v-model="whereGame" id="sortOptions">
              <option value="">All Game</option>
              <option value="4d">4D</option>
              <option value="3d">3D</option>
              <option value="2d">2D</option>
              <option value="2d_tengah">2D Tengah</option>
              <option value="2d_depan">2D Depan</option>
              <option value="4d3d2d">4D/3D/2D Set</option>
              <option value="quick2d">Quick 2D</option>
              <option value="bb">Bolak Balik</option>
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
          <b-col cols="12" md="2" class="mb-md-0 mb-2">
            <label>Sorted By</label>
            <b-form-select v-model="orderBy" id="sortOptions">
              <option value="">Pilih Option</option>
              <option value="betBesar">Bet (besar-kecil)</option>
              <option value="betKecil">Bet (kecil-besar)</option>
              <option value="bayarBesar">Bayar (besar-kecil)</option>
              <option value="bayarKecil">Bayar (kecil-besar)</option>
            </b-form-select>
          </b-col>

          <b-col cols="12" md="2" class="mb-md-0 mb-2">
            <label>Username</label>
            <b-form-input
              id="basicInput"
              v-model="username"
              placeholder="search username"
            />
          </b-col>
          <!--button search this -->
          <b-col cols="12" md="1" class="mb-md-0 mt-2">
            <b-button
              @click="
                searchWord(pasaran, sortType, whereGame, orderBy, username)
              "
              v-ripple.400="'rgba(255, 255, 255, 0.15)'"
              variant="primary"
            >
              Search
            </b-button>
          </b-col>
        </b-row>
      </b-card-body>
    </b-card>

    <b-card no-body class="my-3">
      <b-table :fields="btFields" :items="getBetsList.total" responsive="sm">
        <template #cell(totalBet)="{ item }">{{ item.totalBet }}</template>
        <template #cell(total)="{ item }">{{
          formatPrice(item.total)
        }}</template>
        <template #cell(maxbet)="{ item }">{{ item.max_min }}</template>
        <template #cell(totalmin)="{ item }">{{
          formatPrice(item.totalMaxMin)
        }}</template>
      </b-table>
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
            <h2>Lottery Running</h2>
          </b-col>
        </b-row>
      </div>
      <b-table
        :fields="fields"
        :items="getBetsList.data.data"
        responsive
        show-empty
        empty-text="No Data"
        class="position-relative"
      >
        <!-- number -->
        <template #cell(no)="{ index }">{{
          parseInt(parseInt(index) + 1)
        }}</template>
        <template #cell(date)="{ item }">{{
          formateDate(item.created_at)
        }}</template>
        <template #cell(ip)="{ item }">{{ item.IP }}</template>
        <template #cell(username)="{ item }">{{ item.Username }}</template>
        <template #cell(pasaran)="{ item }">{{ item.Pasaran }}</template>
        <template #cell(game)="{ item }">{{ item.Game }}</template>
        <template #cell(nomor)="{ item }">{{ item.Nomor }}</template>
        <template #cell(bet)="{ item }">{{ formatPrice(item.Bet) }}</template>
        <template #cell(bayar)="{ item }">{{
          formatPrice(item.Bayar)
        }}</template>
        <template #cell(disc)="{ item }">{{ item.discKey }}</template>
        <template #cell(win)="{ item }">{{ item.Win }}</template>
        <template #cell(status)="{ item }">{{ item.Status }}</template>

        <!-- adim -->
        <template #cell(action)="{ item }">
          <feather-icon
            icon="Trash2Icon"
            class="mr-50 cursor-pointer"
            @click="deleteAdmin('success', 'top-center', item)"
          />
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
            <!-- <span class="text-muted">Showing 1 to 10 entries</span> -->
            <!-- <span class="text-muted">Showing 1 to 1 of 2 entries</span> -->
          </b-col>
          <!-- Pagination -->
          <b-col
            v-if="getBetsList"
            cols="12"
            sm="6"
            class="
              d-flex
              align-items-center
              justify-content-center justify-content-sm-end
            "
          >
            <b-pagination
              v-if="betTotal > BetsTotalPage"
              v-model="currentPage"
              :total-rows="betTotal"
              :per-page="BetsTotalPage"
              first-number
              last-number
              class="mb-0 mt-1 mt-sm-0"
              prev-class="prev-item"
              next-class="next-item"
              @change="changeBetsPage"
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
  BCardHeader,
  BCardBody,
  BFormDatepicker,
  BFormSelect,
} from 'bootstrap-vue'
import { ref } from '@vue/composition-api'
import flatPickr from 'vue-flatpickr-component'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import 'animate.css'
import { mapActions, mapGetters } from 'vuex'
import days from 'dayjs'

export default {
  components: {
    BTooltip,
    ToastificationContent,
    flatPickr,
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
    BFormDatepicker,
    BCardHeader,
    BCardBody,
    BFormSelect,
  },

  computed: {
    ...mapGetters('bets', ['getBetsList']),
    ...mapGetters('settings', ['getListPeriode']),

    // bets total
    betTotal() {
      const total = this.getBetsList.data
      const arr = []
      let max = 0
      if (total) {
        arr.push(total.total)
        max = Math.max(...arr)
      }
      return max
    },

    // list bets perpage
    BetsTotalPage() {
      const perpage = this.getBetsList.data
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
      orderBy: '',
      sortType: 'desc',
      whereGame: '',
      username: '',
      page: 1,
    }
    this.fetchBetsList(payload)
    this.periodeList()
  },

  methods: {
    ...mapActions('bets', ['fetchBetsList']),
    ...mapActions('settings', ['periodeList']),

    async changeBetsPage(number) {
      const payload = {
        pasaran: '',
        orderBy: '',
        sortType: 'desc',
        whereGame: '',
        username: '',
        page: number,
      }
      await this.fetchBetsList(payload)
    },

    formateDate(date) {
      return days(date).format('DD MMM YYYY HH:mm')
    },

    formatPrice(value) {
      let val = (value / 1).toFixed('.', ',')
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    },

    // flipInDelete
    deleteAdmin(variant, position, bets) {
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
          this.$store.dispatch('bets/deleteAdmin', bets)
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

    // filter
    async searchWord(pasaran, sortType, whereGame, orderBy, username) {
      const payload = {
        pasaran,
        orderBy,
        sortType,
        whereGame,
        username,
        page: 1,
      }
      await this.fetchBetsList(payload)
      this.currentPage = 1
    },
  },

  data() {
    return {
      currentPage: 1,
      pasaran: '',
      sortType: 'desc',
      orderBy: '',
      whereGame: '',
      username: '',
      fields: [
        {
          key: 'no',
        },
        {
          key: 'date',
        },
        {
          key: 'ip',
        },
        {
          key: 'username',
        },
        {
          key: 'pasaran',
        },
        {
          key: 'game',
        },
        {
          key: 'nomor',
        },
        {
          key: 'bet',
        },
        {
          key: 'bayar',
        },
        {
          key: 'disc',
          label: 'Disc/Kei',
        },
        {
          key: 'win',
        },
        {
          key: 'status',
        },
        {
          key: 'Action',
        },
      ],
      btFields: [
        {
          key: 'totalBet',
          label: 'total Bet',
        },
        {
          key: 'total',
          label: 'total',
        },
        {
          key: 'maxbet',
          label: 'Maximum/Minimum Bet',
        },
        {
          key: 'totalmin',
          label: 'Total',
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
<style lang="scss">
@import '@core/scss/vue/libs/vue-flatpicker.scss';
</style>
