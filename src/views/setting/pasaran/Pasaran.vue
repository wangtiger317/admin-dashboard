<template>
  <div>
    <b-tabs pills class="my-2">
      <!-- Tab: GAMES -->
      <b-tab active>
        <template #title>
          <span class="d-none d-sm-inline">Periode Online Offline</span>
        </template>
        <periode class="mt-2 pt-75" />
      </b-tab>
      <b-tab>
        <template #title>
          <span class="d-none d-sm-inline">Tambah / Hapus Pasaran</span>
        </template>
        <tambah class="mt-2 pt-75" />
      </b-tab>
    </b-tabs>
    <!-- </b-card> -->
  </div>
</template>

<script>
import { BTable, BLink, BTab, BTabs, BCard, BAlert } from 'bootstrap-vue'
import Periode from './periode/Periode.vue'
import Tambah from './tambah/Tambah.vue'

export default {
  components: {
    BTable,
    BLink,
    BTab,
    BTabs,
    BCard,
    BAlert,
    // Periode
    Periode,
    // Tambah
    Tambah,
  },
  data() {
    return {}
  },
}
</script>
