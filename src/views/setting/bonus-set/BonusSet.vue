<template>
  <b-tabs pills class="mt-2">
    <b-tab active>
      <template #title>
        <span class="d-none d-sm-inline">Bonus Turnover</span>
      </template>
      <TurnOver class="mt-2 pt-75" />
    </b-tab>
    <b-tab>
      <template #title>
        <span class="d-none d-sm-inline">Bonus Cashback</span>
      </template>
      <cash-back class="mt-2 pt-75" />
    </b-tab>
    <b-tab>
      <template #title>
        <span class="d-none d-sm-inline">Bonus Referral</span>
      </template>
      <referral class="mt-2 pt-75" />
    </b-tab>
    <b-tab>
      <template #title>
        <span class="d-none d-sm-inline">Bonus Rolingan Casino</span>
      </template>
      <RolinganCasino class="mt-2 pt-75" />
    </b-tab>
  </b-tabs>
</template>

<script>
import { BTabs, BTab } from 'bootstrap-vue'
import TurnOver from './BonusTurnOver.vue'
import CashBack from './CashBack.vue'
import Referral from './Referrals.vue'
import RolinganCasino from './RolinganCasino.vue'

export default {
  components: {
    BTabs,
    BTab,
    TurnOver,
    CashBack,
    Referral,
    RolinganCasino,
  },
}
</script>
