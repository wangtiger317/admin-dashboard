<template>
  <div>
    <b-col cols="12">
      <deposit-progress />
    </b-col>
    <b-col cols="12">
      <deposit-approve />
    </b-col>
  </div>
</template>

<script>
import depositProgress from './depositProgress.vue'
import depositApprove from './depositApprove.vue'
import { BRow, BCol } from 'bootstrap-vue'

export default {
  components: {
    depositProgress,
    depositApprove,
    BRow,
    BCol,
  },
}
</script>
