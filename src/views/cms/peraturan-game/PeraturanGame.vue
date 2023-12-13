<template>
  <div>
    <!-- Filters Games this-->
    <!-- <filter-games
      :role-filter.sync="roleFilter"
      :plan-filter.sync="planFilter"
      :status-filter.sync="statusFilter"
      :role-options="roleOptions"
      :plan-options="planOptions"
      :status-options="statusOptions"
    /> -->
    <!-- tab this -->
    <!-- <b-card> -->
    <!-- <b-tabs > -->
    <b-tabs pills class="my-2">
      <!-- Tab: GAMES -->
      <b-tab active>
        <template #title>
          <span class="d-none d-sm-inline">4D/3D/2D</span>
        </template>
        <normal class="mt-2 pt-75" />
      </b-tab>
      <b-tab>
        <template #title>
          <span class="d-none d-sm-inline">Colok Bebas</span>
        </template>
        <colok-bebas class="mt-2 pt-75" />
      </b-tab>
      <b-tab>
        <template #title>
          <span class="d-none d-sm-inline">Macau</span>
        </template>
        <macau class="mt-2 pt-75" />
      </b-tab>
      <b-tab>
        <template #title>
          <span class="d-none d-sm-inline">Colok Naga</span>
        </template>
        <colok-naga class="mt-2 pt-75" />
      </b-tab>
      <b-tab>
        <template #title>
          <span class="d-none d-sm-inline">Colok Jitu</span>
        </template>
        <colok-jitu class="mt-2 pt-75" />
      </b-tab>
      <b-tab>
        <template #title>
          <span class="d-none d-sm-inline">50:50 Umum</span>
        </template>
        <fifty-umum class="mt-2 pt-75" />
      </b-tab>
      <b-tab>
        <template #title>
          <span class="d-none d-sm-inline">50:50 Special</span>
        </template>
        <fifty-special class="mt-2 pt-75" />
      </b-tab>
      <b-tab>
        <template #title>
          <span class="d-none d-sm-inline">50:50 Kombinasi</span>
        </template>
        <fifty-kombinasi class="mt-2 pt-75" />
      </b-tab>
      <b-tab>
        <template #title>
          <span class="d-none d-sm-inline">Kombinasi</span>
        </template>
        <kombinasi class="mt-2 pt-75" />
      </b-tab>
      <b-tab>
        <template #title>
          <span class="d-none d-sm-inline">Dasar</span>
        </template>
        <dasar class="mt-2 pt-75" />
      </b-tab>
      <b-tab>
        <template #title>
          <span class="d-none d-sm-inline">Shio</span>
        </template>
        <shio class="mt-2 pt-75" />
      </b-tab>
    </b-tabs>
    <!-- </b-card> -->
  </div>
</template>

<script>
import BCardCode from '@core/components/b-card-code/BCardCode.vue'
import { BTable, BLink, BTab, BTabs, BCard, BAlert } from 'bootstrap-vue'
// import FilterGames from './PeraturanFilter.vue'
import Normal from './Normal.vue'
import ColokBebas from './ColokBebas.vue'
import Macau from './Macau.vue'
import ColokNaga from './ColokNaga.vue'
import ColokJitu from './ColokJitu.vue'
import FiftyUmum from './FiftyUmum.vue'
import FiftySpecial from './FiftySpecial.vue'
import FiftyKombinasi from './FiftyKombinasi.vue'
import Kombinasi from './Kombinasi.vue'
import Dasar from './Dasar.vue'
import Shio from './Shio.vue'
export default {
  components: {
    BCardCode,
    BTable,
    BLink,
    BTab,
    BTabs,
    BCard,
    BAlert,
    // 4D/3D/2D
    Normal,
    // Colok Bebas
    ColokBebas,
    // Macau
    Macau,
    // Colok Naga
    ColokNaga,
    // Colok Jitu
    ColokJitu,
    // 5050 Umum
    FiftyUmum,
    // 5050 special
    FiftySpecial,
    // 5050 kombinasi
    FiftyKombinasi,
    // Kombinasi
    Kombinasi,
    // Dasar
    Dasar,
    // Shio
    Shio,
  },
  data() {
    return {}
  },
}
</script>
