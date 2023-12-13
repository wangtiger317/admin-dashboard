<template>
  <div>
    <b-col cols="12">
      <with-progress />
    </b-col>
    <b-col cols="12">
      <with-approved />
    </b-col>
  </div>
</template>

<script>
import { BRow, BCol } from 'bootstrap-vue'
import withApproved from './withApproved.vue'
import withProgress from './withProgress.vue'

export default {
  components: {
    withApproved,
    withProgress,
    BRow,
    BCol,
  },
}
</script>
