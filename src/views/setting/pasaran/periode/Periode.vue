<template>
  <div>
    <div><list-periode /></div>
  </div>
</template>

<script>
import { BTable, BLink, BTab, BTabs, BCard, BAlert } from 'bootstrap-vue'
import ListPeriode from './list-periode/ListPeriode.vue'
export default {
  components: {
    BTable,
    BLink,
    BTab,
    BTabs,
    BCard,
    BAlert,
    // ListPeriode
    ListPeriode,
  },
  data() {
    return {}
  },
}
</script>
