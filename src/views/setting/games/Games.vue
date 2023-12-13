<template>
  <div>
    <!-- Filters Games this-->
    <filter-games :slug="tabReference[tabIndex]" />

    <b-tabs v-model="tabIndex" pills>
      <!-- Tab: GAMES -->
      <b-tab>
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
import { BTab, BTabs } from 'bootstrap-vue'
import FilterGames from './FilterGames.vue'
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
    BTab,
    BTabs,
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
    // filter games
    FilterGames,
  },
  data() {
    return {
      tabIndex: 0,
      tabReference: [
        '4d3d2d',
        'colok-bebas',
        'macau',
        'colok-naga',
        'colok-jitu',
        '50-50-umum',
        '50-50-special',
        '50-50-kombinasi',
        'kombinasi',
        'dasar',
        'shio',
      ],
    }
  },
}
</script>
