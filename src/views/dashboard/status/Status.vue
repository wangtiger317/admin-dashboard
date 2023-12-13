<template>
  <section>
    <b-row class="match-height mt-1">
      <!--/*********************************************************************
           *  4 July 2022 04:00 AM
           * this is Dashboard Status
       ********************************************************************/ -->
      <!-- Website Status -->
      <b-col lg="4" md="6">
        <b-card class="card-congratulation-medal">
          <h4><b>Website Status </b></h4>
          <h3 class="mb-75 mt-2 pt-50">
            <b-link class="text-success">{{
              getDashboards.websiteStatus
            }}</b-link>
          </h3>
        </b-card>
      </b-col>

      <!-- Total Creadit -->
      <b-col lg="4" md="6">
        <b-card class="card-tiny-line-stats" body-class="pb-50">
          <h4><b>Total Credit</b></h4>
          <h3 class="font-weight-bolder text-success mb-75 mt-2 pt-50">
            Rp. {{ formatPrice(getDashboards.totalCredit) }}
          </h3>
        </b-card>
      </b-col>

      <!-- Last Update -->
      <b-col lg="4" md="6">
        <b-card class="earnings-card">
          <b-row>
            <b-col cols="12">
              <b-card-title class="mb-75 pb-2">
                <b>Last Update</b>
              </b-card-title>
              <b-card-text class="text-muted mb-75">
                <span class="text-dark">
                  {{ formateDate(getDashboards.lastUpdate) }}</span
                >
              </b-card-text>
            </b-col>
            <b-col cols="6"> </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>

    <!-- Total Members -->
    <b-row>
      <b-col lg="12" md="6">
        <b-row>
          <b-col lg="3">
            <b-card no-body class="earnings-card">
              <b-card-body class="statistics-body">
                <h4 class="pb-2"><b>Total Members</b></h4>
                <b>{{ getDashboards.totalUser }}</b>
              </b-card-body>
            </b-card>
          </b-col>

          <b-col lg="3">
            <b-card no-body class="earnings-card">
              <b-card-body class="statistics-body">
                <h4 class="pb-2"><b>Active Members</b></h4>
                <b>{{ getDashboards.activeUser }}</b>
              </b-card-body>
            </b-card>
          </b-col>

          <b-col lg="3">
            <b-card no-body class="earnings-card">
              <b-card-body class="statistics-body">
                <h4 class="pb-2"><b>Suspended Members</b></h4>
                <b>{{ getDashboards.suspendedUser }}</b>
              </b-card-body>
            </b-card>
          </b-col>

          <b-col lg="3">
            <b-card no-body class="earnings-card">
              <b-card-body class="statistics-body">
                <h4 class="pb-2"><b>Banned Members</b></h4>
                <b>{{ getDashboards.bannedUser }}</b>
              </b-card-body>
            </b-card>
          </b-col>
        </b-row>
      </b-col>
    </b-row>

    <!-- Active Members -->
    <b-row class="match-height">
      <b-col lg="4" md="6">
        <b-card body-class="pb-50">
          <h4><b>Total Members Online</b></h4>
          <h5 class="mb-75 mt-2 pt-50">{{ getDashboards.totalUserOnline }}</h5>
        </b-card>
      </b-col>

      <!-- Members List -->
      <b-col lg="8" md="6">
        <b-card>
          <b-row>
            <b-col
              v-for="datas in getDashboards.activeUserList"
              :key="datas.id"
            >
              <h4>{{ datas.username }}</h4>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>
  </section>
</template>

<script>
import {
  BLink,
  BCard,
  BRow,
  BCol,
  BCardTitle,
  BCardText,
  BCardHeader,
  BCardBody,
  BMedia,
  BMediaAside,
  BAvatar,
  BMediaBody,
} from 'bootstrap-vue'
import { mapActions, mapGetters } from 'vuex'
import days from 'dayjs'

export default {
  name: 'DashboardStatus',
  components: {
    BLink,
    BCard,
    BCardTitle,
    BCardText,
    BRow,
    BCol,
    BCardHeader,
    BCardBody,
    BMedia,
    BMediaAside,
    BAvatar,
    BMediaBody,
  },
  computed: {
    ...mapGetters('dashboard', ['getDashboards']),
  },

  created() {
    const response = this.dashboardlist()
  },

  methods: {
    // FORMAT DATE
    formateDate(date) {
      return days(date).format('dddd DD MMM YYYY HH:mm')
    },

    ...mapActions('dashboard', ['dashboardlist']),

    // FROMAT CURRENCY
    formatPrice(value) {
      let val = (value / 1).toFixed('.', ',')
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    },
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
@import '@core/scss/vue/libs/vue-sweetalert.scss';
@import '@core/scss/vue/libs/vue-flatpicker.scss';
</style>
