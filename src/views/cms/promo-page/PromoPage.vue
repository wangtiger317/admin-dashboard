<template>
  <div>
    <b-col cols="12">
      <tur-nover />
    </b-col>
    <b-col cols="12">
      <bonus-member />
    </b-col>
    <b-col cols="12">
      <bonus-next />
    </b-col>
    <b-col cols="12">
      <cash-back />
    </b-col>
    <b-col cols="12">
      <bonus-rol />
    </b-col>
    <b-col cols="12">
      <bonus-ref />
    </b-col>
  </div>
</template>

<script>
import { BRow, BCol } from 'bootstrap-vue'

import turNover from './turNover.vue'
import bonusMember from './bonusMember.vue'
import bonusNext from './bonusNext.vue'
import cashBack from './cashBack.vue'
import bonusRol from './bonusRol.vue'
import bonusRef from './bonusRef.vue'

export default {
  components: {
    BRow,
    turNover,
    bonusMember,
    bonusNext,
    cashBack,
    bonusRol,
    bonusRef,
    BCol,
  },
}
</script>
