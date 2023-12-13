<template>
  <div class="navbar-container d-flex content align-items-center">
    <!-- Nav Menu Toggler -->
    <ul class="nav navbar-nav d-xl-none">
      <li class="nav-item">
        <b-link class="nav-link" @click="toggleVerticalMenuActive">
          <feather-icon icon="MenuIcon" size="21" />
        </b-link>
      </li>
    </ul>

    <!-- Deposit & Withdraw -->
    <div
      class="bookmark-wrapper align-items-center flex-grow-1 d-none d-lg-flex w-75"
    >
      <div class="text-dark cursor-pointer">
        <!-- <c-transaction kind="deposit" /> -->
        <withdraw />
      </div>
      <div class="text-dark cursor-pointer ml-2">
        <!-- <c-transaction kind="withdraw" /> -->
        <deposit />
      </div>
      <div class="ml-2 col-md-10">
        <marquee />
      </div>

      <!-- message -->
    </div>

    <!-- Them and user Dropdown -->
    <b-navbar-nav class="nav align-items-center ml-auto">
      <dark-Toggler class="d-none d-lg-block mr-1" />

      <b-link @click="goToMessage">
        <feather-icon
          icon="MessageSquareIcon"
          badge-classes="bg-warning"
          :badge="getBroadcastTop.memo"
          size="21"
        />
      </b-link>
      <span class="ml-1"> <user-dropdown /></span>
    </b-navbar-nav>
  </div>
</template>

<script>
import { BLink, BNavbarNav } from 'bootstrap-vue'
import DarkToggler from './components/DarkToggler.vue'
import UserDropdown from './components/UserDropdown.vue'
import Deposit from './components/Deposit.vue'
import Withdraw from './components/Withdraw.vue'
import CTransaction from './components/CTransaction.vue'
import Marquee from './components/Marquee.vue'
import { mapActions, mapGetters } from 'vuex'

export default {
  components: {
    Withdraw,
    BLink,
    BNavbarNav,
    Deposit,
    CTransaction,
    DarkToggler,
    UserDropdown,
    Marquee,
  },
  props: {
    toggleVerticalMenuActive: {
      type: Function,
      default: () => {},
    },
  },

  data() {
    return {
      notify: null,
    }
  },

  created() {
    this.broadcashTop()
    this.pollData()
  },

  computed: {
    ...mapGetters('broadcast', ['getBroadcastTop']),

    withdrawCount() {
      return this.$store.getters['services/getWithdrawCount']
    },
  },

  methods: {
    ...mapActions('broadcast', ['broadcashTop']),

    //  TEST INTERVAL
    pollData() {
      this.notify = setInterval(() => {
        this.$store.dispatch('broadcast/broadcashTop')
      }, 2000)
    },

    goToMessage() {
      this.$router.push('/members/message')
    },
  },
  // async mounted() {
  //   await this.$store.dispatch('services/fetchDeposit')
  //   await this.$store.dispatch('services/fetchWithdraw')
  // },
}
</script>
