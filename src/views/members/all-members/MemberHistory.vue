<template>
  <div>
    <!-- User Table Container Card -->
    <b-card no-body class="mb-0">
      <div class="mt-2 ml-2">
        <b-row>
          <b-col
            cols="12"
            md="9"
            class="d-flex align-items-center justify-content-start"
          >
            <h2>User: {{ getHistoryMember.username }}</h2>
          </b-col>
        </b-row>
      </div>
      <div class="m-2">
        <b-row>
          <b-col
            cols="12"
            md="6"
            class="d-flex align-items-center justify-content-start"
          >
            <b-table
              :fields="fields1"
              :items="getHistoryMember.bets"
              responsive
            >
              <template #cell(LoseWin)="{ item }">{{ item.losewin }}</template>
              <template #cell(Total)="{ item }"
                >{{ formatPrice(item.total) }} ( {{ item.count }} )</template
              >
            </b-table>
          </b-col>
          <b-col
            cols="12"
            md="6"
            class="d-flex align-items-center justify-content-start"
          >
            <b-table
              :fields="fields2"
              :items="getHistoryMember.depoWd"
              responsive
            >
              <template #cell(Deposit)="{ item }">{{ item.depoWd }}</template>
              <template #cell(Total)="{ item }"
                >{{ formatPrice(item.total) }} ( {{ item.count }} )</template
              >
            </b-table>
          </b-col>
        </b-row>
      </div>
    </b-card>

    <!-- History Search filter  -->
    <b-card class="mt-2">
      <b-card-body>
        <b-row>
          <b-col cols="12" md="3" class="mb-md-0 mb-2">
            <label>Pasaran</label>
            <b-form-select v-model="filter" id="sortOptions">
              <option value="all">All</option>
              <option value="depositWithdraw">Deposit/Withdraw</option>
              <option value="loginLogout">Login/Logout</option>
              <option value="togel">Transaksi Togel</option>
              <option value="pragmaticSlot">Transaksi Pragmatic Slot</option>
              <option value="pragmaticCasino">
                Transaksi Pragmatic Live Casino
              </option>
              <option value="habaneroSlot">Transaksi Habanero Slot</option>
              <option value="spadeFish">Transaksi Spade Gaming Fish</option>
              <option value="spadeSlot">Transaksi Spade Gaming Slot</option>
              <option value="jokerFish">Transaksi Joker Gaming Fish</option>
              <option value="jokerSlot">Transaksi Joker Gaming Slot</option>
              <option value="pgSlot">Transaksi PG Soft Slot</option>
              <option value="ionxCasino">Transaksi ION Live Casino</option>
              <option value="jdbFish">Transaksi JDB Fish</option>
              <option value="jdbSlot">Transaksi JDB Slot</option>
              <option value="sexyGCasino">
                Transaksi Sexy Gaming Live Casino
              </option>
              <option value="oneGSlot">Transaksi One Game Slot</option>
              <option value="playtechSlot">Transaksi Playtech Slot</option>
              <option value="redTSlot">Transaksi Red Tiger Slot</option>
              <option value="refTogel">Referal Togel</option>
              <option value="BonusPromo">Bonus/Promo/FreeBet</option>
            </b-form-select>
          </b-col>

          <b-col cols="12" md="3" class="mb-md-0 mt-2">
            <b-form-input
              v-model="betId"
              id="basicInput"
              placeholder="Bet/Game ID"
            />
          </b-col>
          <!-- search this -->
          <b-col cols="12" md="2" class="mb-md-0 mt-2 my-sm-2 mr-3">
            <b-button
              v-ripple.400="'rgba(255, 255, 255, 0.15)'"
              variant="primary"
              @click="searchWord(filter, betId)"
            >
              SEARCH
            </b-button>
          </b-col>
        </b-row>
      </b-card-body>
    </b-card>

    <!-- History Table Container Card -->
    <b-card no-body class="mb-0" v-if="!showDetail">
      <div class="mt-2 ml-2">
        <b-row>
          <b-col
            cols="12"
            md="12"
            class="d-flex align-items-center justify-content-start"
          >
            <h2>History Transaksi</h2>
          </b-col>
        </b-row>
      </div>
      <div class="m-2">
        <b-row>
          <b-col
            cols="12"
            md="12"
            class="d-flex align-items-center justify-content-start"
          >
            <b-table
              :fields="fields3"
              :items="getHistoryTransaksi.data"
              responsive
            >
              <!-- NO -->
              <template #cell(no)="{ index }">{{ index + 1 }}</template>

              <!-- CREATE AT -->
              <template #cell(date)="{ item }">{{
                formateDate(item.created_at)
              }}</template>

              <!-- PASARAN -->
              <template #cell(PasaranGame)="{ item }">{{
                item.pasaran === null ? ' - ' : item.pasaran
              }}</template>

              <!-- BET GAME ID -->
              <template #cell(BetGameId)="{ item }">{{
                item.bet_id === null ? ' - ' : item.bet_id
              }}</template>

              <!-- DESKRIPSI -->
              <template #cell(Deskripsi)="{ item }">{{
                item.deskripsi
              }}</template>

              <!-- DEBIT -->
              <template #cell(Debit)="{ item }">{{
                item.bet === null ? ' - ' : formatPrice(item.bet)
              }}</template>

              <!-- KREDIT -->
              <template #cell(Kredit)="{ item }">{{
                item.win === null ? ' - ' : formatPrice(item.win)
              }}</template>

              <!-- BALANCE -->
              <template #cell(Balance)="{ item }">{{
                formatPrice(item.credit)
              }}</template>

              <!-- ADMIN -->
              <template #cell(Admin)="{ item }">{{
                item.tables === 'withdraw' || item.tables === 'deposit'
                  ? item.admin_by
                  : ' - '
              }}</template>

              <!-- ACTIONS -->
              <template #cell()="{ item }">
                <div v-if="item.tables === 'bets togel'">
                  <feather-icon
                    :id="`invoice-row-${item.bet_id}-SearchIcon-icon`"
                    icon="SearchIcon"
                    size="16"
                    class="cursor-pointer mx-1"
                    @click="togelDetail(item.bet_id)"
                  />
                  <b-tooltip
                    title="Detail"
                    :target="`invoice-row-${item.bet_id}-SearchIcon-icon`"
                  />
                </div>
                <div v-if="item.tables === 'bets'">
                  <feather-icon
                    :id="`invoice-row-${item.betId}-SearchIcon-icon`"
                    icon="SearchIcon"
                    size="16"
                    class="cursor-pointer mx-1"
                    @click="providerDetail(item.betId, item.pasaran)"
                  />
                  <b-tooltip
                    title="Detail"
                    :target="`invoice-row-${item.betId}-SearchIcon-icon`"
                  />
                </div>
              </template>
            </b-table>
          </b-col>
        </b-row>

        <div class="mx-2 mb-2 mt-2">
          <b-row>
            <b-col
              cols="12"
              sm="6"
              class="d-flex align-items-center justify-content-center justify-content-sm-start"
            >
              <!-- <span class="text-muted">Showing 1 to 10 entries</span> -->
              <!-- <span class="text-muted">Showing 1 to 1 of 2 entries</span> -->
            </b-col>
            <!-- Pagination -->
            <b-col
              v-if="getHistoryTransaksi"
              cols="12"
              sm="6"
              class="d-flex align-items-center justify-content-center justify-content-sm-end"
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
        <b-button
          v-ripple.400="'rgba(255, 255, 255, 0.15)'"
          variant="primary"
          class="mt-2"
          @click="
            $router.push({
              name: 'members-all-members',
            })
          "
        >
          Back
        </b-button>
      </div>
    </b-card>
    <b-card no-body class="mb-0" v-if="showDetail">
      <div class="mt-2 ml-2">
        <b-row>
          <b-col
            cols="12"
            md="12"
            class="d-flex align-items-center justify-content-center justify-content-sm-start"
          >
            <h2>Detail Transaction {{ getDetailHistoryTransaksi.pasaran }}</h2>
          </b-col>
        </b-row>
      </div>
      <div class="m-2">
        <b-row>
          <b-col
            cols="12"
            md="12"
            class="d-flex align-items-center justify-content-center justify-content-sm-end"
          >
            <b-table
              :fields="fields4"
              :items="getDetailHistoryTransaksi.data.data"
              responsive
            >
              <template #cell(no)="{ index }">{{ index + 1 }}</template>
              <template #cell(date)="{ item }">{{
                formateDate(item.created_at)
              }}</template>
              <template #cell(game)="{ item }">{{ item.Game }}</template>
              <template #cell(tebak)="{ item }">{{ item.Nomor }}</template>
              <template #cell(status)="{ item }">{{ item.Status }}</template>
              <template #cell(bet)="{ item }">{{
                formatPrice(item.Bet)
              }}</template>
              <template #cell(diskon)="{ item }">{{ item.discKey }}</template>
              <template #cell(bayar)="{ item }">{{
                formatPrice(item.Bayar)
              }}</template>
            </b-table>
          </b-col>
        </b-row>

        <div class="mx-2 mb-2 mt-2">
          <b-row>
            <b-col
              cols="12"
              sm="6"
              class="d-flex align-items-center justify-content-center justify-content-sm-start"
            >
              <!-- <span class="text-muted">Showing 1 to 10 entries</span> -->
              <!-- <span class="text-muted">Showing 1 to 1 of 2 entries</span> -->
            </b-col>
            <!-- Pagination -->
            <b-col
              v-if="getDetailHistoryTransaksi"
              cols="12"
              sm="6"
              class="d-flex align-items-center justify-content-center justify-content-sm-end"
            >
              <b-pagination
                v-if="allTotalDetail > perPageDetail"
                v-model="currentPageDetail"
                :total-rows="allTotalDetail"
                :per-page="perPage"
                first-number
                last-number
                class="mb-0 mt-1 mt-sm-0"
                prev-class="prev-item"
                next-class="next-item"
                @change="changePageDetail"
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
        <b-button
          v-ripple.400="'rgba(255, 255, 255, 0.15)'"
          variant="primary"
          class="mt-2"
          @click="showDetail = false"
        >
          Back
        </b-button>
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
  BFormCheckbox,
  BFormSelect,
} from 'bootstrap-vue'
import { ref } from '@vue/composition-api'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import 'animate.css'
import { mapActions, mapGetters } from 'vuex'
import useJwt from '@/auth/jwt/useJwt'
import days from 'dayjs'
export default {
  components: {
    ToastificationContent,
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
    BFormSelect,
  },
  computed: {
    ...mapGetters('members', ['getHistoryMember']),
    ...mapGetters('members', ['getHistoryTransaksi']),
    ...mapGetters('members', ['getDetailHistoryTransaksi']),

    // history
    allTotal() {
      const total = this.getHistoryTransaksi
      const arr = []
      let max = 0
      if (total) {
        arr.push(total.total)
        max = Math.max(...arr)
      }
      return max
    },

    allTotalDetail() {
      const total = this.getDetailHistoryTransaksi.data
      const arr = []
      let max = 0
      if (total) {
        arr.push(total.total)
        max = Math.max(...arr)
      }
      return max
    },

    // history perpage
    perPage() {
      const perpage = this.getHistoryTransaksi
      let perPage = 0
      if (perpage) {
        perPage = perpage.per_page
      }
      return perPage
    },

    perPageDetail() {
      const perpage = this.getDetailHistoryTransaksi.data
      let perPage = 0
      if (perpage) {
        perPage = perpage.per_page
      }
      return perPage
    },
  },
  methods: {
    ...mapActions('members', ['historyMember']),
    ...mapActions('members', ['historyTransaksi']),
    ...mapActions('members', ['detailHistoryTransaksi']),

    formatPrice(value) {
      let val = (value / 1).toFixed('.', ',')
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    },

    formateDate(date) {
      return days(date).format('DD MMM YYYY HH:mm')
    },

    async changePage(number) {
      const idParams = this.$route.params.id
      const payload = {
        page: number,
        id: idParams,
        filter: this.filter,
        betId: this.betId,
      }
      await this.historyTransaksi(payload)
    },

    async changePageDetail(number) {
      const payload = {
        page: number,
        id: this.betIdTogel,
      }
      this.detailHistoryTransaksi(payload)
    },

    async searchWord(filter, betId) {
      const idParams = this.$route.params.id
      const payload = {
        page: 1,
        id: idParams,
        filter,
        betId,
      }
      await this.historyTransaksi(payload)
      this.currentPage = 1
    },

    //  Detail Togel
    togelDetail(id) {
      this.showDetail = true
      this.betIdTogel = id
      const payload = {
        id,
        page: 1,
      }
      this.detailHistoryTransaksi(payload)
    },

    // Detail Provider
    async providerDetail(id, pasaran) {
      const payload = {
        betId: id,
      }

      // PRAGMATIC SLOT & CASINO
      if (pasaran === 'Pragmatic Slot' || pasaran === 'Pragmatic Live Casino') {
        useJwt
          .fetchData('allMembers', `/detail-pragmatic/${id}`, {})
          .then((response) => {
            let url = response.data.url
            window.open(url, '', 'width=1180,height=750')
          })
          .catch((error) => {
            this.$toast({
              component: ToastificationContent,
              position: 'top-center',
              props: {
                title: 'Error',
                icon: 'AlertCircleIcon',
                variant: 'danger',
                text: error.data.message,
              },
            })
          })
      }

      // HABANERO SLOT
      if (pasaran === 'Habanero Slot') {
        useJwt
          .fetchData('allMembers', `/detail-habanero/${id}`, {})
          .then((response) => {
            let url = response.data.url
            window.open(url, '', 'width=1180,height=750')
          })
          .catch((error) => {
            this.$toast({
              component: ToastificationContent,
              position: 'top-center',
              props: {
                title: 'Error',
                icon: 'AlertCircleIcon',
                variant: 'danger',
                text: error.data.message,
              },
            })
          })
      }

      // SPADE GAMING SLOT
      if (pasaran === 'Spade Gaming Slot') {
        useJwt
          .fetchData('allMembers', `/detail-spade/${id}`, {})
          .then((response) => {
            let url = response.data.url
            window.open(url, '', 'width=1180,height=750')
          })
          .catch((error) => {
            this.$toast({
              component: ToastificationContent,
              position: 'top-center',
              props: {
                title: 'Error',
                icon: 'AlertCircleIcon',
                variant: 'danger',
                text: error.data.message,
              },
            })
          })
      }

      // SPADE GAMING FISH
      if (pasaran === 'Spade Gaming Fish') {
        useJwt
          .fetchData('allMembers', `/detail-spade/${id}`, {})
          .then((response) => {
            let url = response.data.url
            window.open(url, '', 'width=1180,height=750')
          })
          .catch((error) => {
            this.$toast({
              component: ToastificationContent,
              position: 'top-center',
              props: {
                title: 'Error',
                icon: 'AlertCircleIcon',
                variant: 'danger',
                text: error.data.message,
              },
            })
          })
      }

      // JOKER GAMING SLOT
      if (pasaran === 'Joker Gaming Slot') {
        useJwt
          .fetchData('allMembers', `/detail-joker/${id}`, {})
          .then((response) => {
            let url = response.data.url
            window.open(url, '', 'width=1180,height=750')
          })
          .catch((error) => {
            this.$toast({
              component: ToastificationContent,
              position: 'top-center',
              props: {
                title: 'Error',
                icon: 'AlertCircleIcon',
                variant: 'danger',
                text: error.data.message,
              },
            })
          })
      }

      // JOKER GAMING FISH
      if (pasaran === 'Joker Gaming Fish') {
        useJwt
          .fetchData('allMembers', `/detail-joker/${id}`, {})
          .then((response) => {
            let url = response.data.url
            window.open(url, '', 'width=1180,height=750')
          })
          .catch((error) => {
            this.$toast({
              component: ToastificationContent,
              position: 'top-center',
              props: {
                title: 'Error',
                icon: 'AlertCircleIcon',
                variant: 'danger',
                text: error.data.message,
              },
            })
          })
      }

      // ONE GAMING SLOT
      if (pasaran === 'One Game Slot') {
        useJwt
          .fetchData('allMembers', `/detail-queen-maker/${id}`, {})
          .then((response) => {
            let url = response.data.url
            window.open(url, '', 'width=1180,height=750')
          })
          .catch((error) => {
            this.$toast({
              component: ToastificationContent,
              position: 'top-center',
              props: {
                title: 'Error',
                icon: 'AlertCircleIcon',
                variant: 'danger',
                text: error.data.message,
              },
            })
          })
      }

      // RED TIGER SLOT
      if (pasaran === 'Red Tiger Slot') {
        useJwt
          .fetchData('allMembers', `/detail-queen-maker/${id}`, {})
          .then((response) => {
            let url = response.data.url
            window.open(url, '', 'width=1180,height=750')
          })
          .catch((error) => {
            this.$toast({
              component: ToastificationContent,
              position: 'top-center',
              props: {
                title: 'Error',
                icon: 'AlertCircleIcon',
                variant: 'danger',
                text: error.data.message,
              },
            })
          })
      }

      // JBD FISH
      if (pasaran === 'JDB Fish') {
        useJwt
          .fetchData('allMembers', `/detail-game-hall/${id}`, {})
          .then((response) => {
            let url = response.data.url
            window.open(url, '', 'width=1180,height=750')
          })
          .catch((error) => {
            this.$toast({
              component: ToastificationContent,
              position: 'top-center',
              props: {
                title: 'Error',
                icon: 'AlertCircleIcon',
                variant: 'danger',
                text: error.data.message,
              },
            })
          })
      }

      // SEXY GAMING LIVE CASINO
      if (pasaran === 'Sexy Gaming Live Casino') {
        useJwt
          .fetchData('allMembers', `/detail-game-hall/${id}`, {})
          .then((response) => {
            let url = response.data.url
            window.open(url, '', 'width=1180,height=750')
          })
          .catch((error) => {
            this.$toast({
              component: ToastificationContent,
              position: 'top-center',
              props: {
                title: 'Error',
                icon: 'AlertCircleIcon',
                variant: 'danger',
                text: error.data.message,
              },
            })
          })
      }

      // JBD SLOT
      if (pasaran === 'JDB Slot') {
        useJwt
          .fetchData('allMembers', `/detail-game-hall/${id}`, {})
          .then((response) => {
            let url = response.data.url
            window.open(url, '', 'width=1180,height=750')
          })
          .catch((error) => {
            this.$toast({
              component: ToastificationContent,
              position: 'top-center',
              props: {
                title: 'Error',
                icon: 'AlertCircleIcon',
                variant: 'danger',
                text: error.data.message,
              },
            })
          })
      }

      // PG SOFT SLOT
      if (pasaran === 'Pg Soft Slot') {
        useJwt
          .fetchData('allMembers', `/detail-pgsoft/${id}`, {})
          .then((response) => {
            let url = response.data.url
            window.open(url, '', 'width=1180,height=750')
          })
          .catch((error) => {
            this.$toast({
              component: ToastificationContent,
              position: 'top-center',
              props: {
                title: 'Error',
                icon: 'AlertCircleIcon',
                variant: 'danger',
                text: error.data.message,
              },
            })
          })
      }

      // ION X Casino
      if (pasaran === 'ION Casino') {
        useJwt
          .fetchData('allMembers', `/detail-ion/${id}`, {})
          .then((response) => {
            let url = response.data.url
            window.open(url, '', 'width=1180,height=750')
          })
          .catch((error) => {
            this.$toast({
              component: ToastificationContent,
              position: 'top-center',
              props: {
                title: 'Error',
                icon: 'AlertCircleIcon',
                variant: 'danger',
                text: error.data.message,
              },
            })
          })
      }
    },
  },

  created() {
    let idParams = this.$route.params.id
    const payload = {
      id: idParams,
      filter: '',
      betId: '',
      page: 1,
    }
    this.historyMember(payload)
    this.historyTransaksi(payload)
  },
  data() {
    return {
      currentPage: 1,
      currentPageDetail: 1,
      filter: 'all',
      showDetail: false,
      betIdTogel: null,
      fields1: [
        {
          key: 'LoseWin',
          label: 'Lose/Win',
        },
        {
          key: 'Total',
        },
      ],
      fields2: [
        {
          key: 'Deposit',
          label: 'Deposit / Withdraw	',
        },
        {
          key: 'Total',
        },
      ],
      fields3: [
        {
          key: 'no',
        },
        {
          key: 'date',
        },
        {
          key: 'PasaranGame',
          label: 'Pasaran/Game',
        },
        {
          key: 'BetGameId',
          label: 'Bet/Game ID',
        },
        {
          key: 'Deskripsi',
        },
        {
          key: 'Debit',
        },
        {
          key: 'Kredit',
        },
        {
          key: 'Balance',
        },
        {
          key: 'Admin',
        },
        {
          key: '',
        },
      ],
      fields4: [
        {
          key: 'no',
        },
        {
          key: 'date',
        },
        {
          key: 'game',
        },
        {
          key: 'tebak',
        },
        {
          key: 'status',
        },
        {
          key: 'bet',
        },
        {
          key: 'diskon',
        },
        {
          key: 'bayar',
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
