<template>
  <b-tabs pills class="mt-3">

    <!-- Terms and Conditions -->
    <b-tab active>
      <template #title>
        <span class="d-none d-sm-inline">Terms and Conditions</span>
      </template>
      <TermsCondition class="mt-2 pt-75" />
    </b-tab>

    <!-- About -->
    <b-tab>
      <template #title>
        <span class="d-none d-sm-inline">About</span>
      </template>
      <about class="mt-2 pt-75" />
    </b-tab>

    <!--  Help -->
    <b-tab>
      <template #title>
        <span class="d-none d-sm-inline">Help</span>
      </template>
      <help class="mt-2 pt-75" />
    </b-tab>

    <!-- Rules -->
     <b-tab>
      <template #title>
        <span class="d-none d-sm-inline">Rules</span>
      </template>
      <Rules class="mt-2 pt-75" />
    </b-tab>

    <!-- Bank Information -->
     <b-tab>
      <template #title>
        <span class="d-none d-sm-inline">Bank Information</span>
      </template>
      <BankInfo class="mt-2 pt-75" />
    </b-tab>
  </b-tabs>
</template>

<script>
import { BTabs, BTab } from 'bootstrap-vue'
import TermsCondition from './TermsCondition.vue'
import About from './About.vue'
import Help from './Help.vue'
import Rules from './Rules.vue'
import BankInfo from './BankInfo.vue'

export default {
  components: {
    BTabs,
    BTab,
    TermsCondition,
    About,
    Help,
    Rules,
    BankInfo
  },
}
</script>