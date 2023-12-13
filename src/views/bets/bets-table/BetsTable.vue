<template>
  <div>
    <!-- Filters Games this-->
    <filter-bets :game="tabReference[tabIndex]" />

    <!-- tab this -->
    <b-tabs v-model="tabIndex" pills>
      <!-- Tab: GAMES -->
      <b-tab>
        <template #title>
          <span class="d-none d-sm-inline">2D</span>
        </template>
        <two-d class="mt-2 pt-75" />
      </b-tab>
      <b-tab>
        <template #title>
          <span class="d-none d-sm-inline">2D Front</span>
        </template>
        <two-d-front class="mt-2 pt-75" />
      </b-tab>
      <b-tab>
        <template #title>
          <span class="d-none d-sm-inline">2D Middle</span>
        </template>
        <two-d-middle class="mt-2 pt-75" />
      </b-tab>
      <b-tab>
        <template #title>
          <span class="d-none d-sm-inline">3D</span>
        </template>
        <three-d class="mt-2 pt-75" />
      </b-tab>
      <b-tab>
        <template #title>
          <span class="d-none d-sm-inline">4D</span>
        </template>
        <four-d class="mt-2 pt-75" />
      </b-tab>
      <b-tab>
        <template #title>
          <span class="d-none d-sm-inline">Colok Bebas</span>
        </template>
        <colok-bebas class="mt-2 pt-75" />
      </b-tab>
      <b-tab>
        <template #title>
          <span class="d-none d-sm-inline"> Macau</span>
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
          <span class="d-none d-sm-inline">Fifty Umum</span>
        </template>
        <fifty-umum class="mt-2 pt-75" />
      </b-tab>
      <b-tab>
        <template #title>
          <span class="d-none d-sm-inline">Fifty Special</span>
        </template>
        <fifty-special class="mt-2 pt-75" />
      </b-tab>
      <b-tab>
        <template #title>
          <span class="d-none d-sm-inline">Fifty Kombinasi</span>
        </template>
        <fifty-kombinasi class="mt-2 pt-75" />
      </b-tab>
      <b-tab>
        <template #title>
          <span class="d-none d-sm-inline"> Kombinasi</span>
        </template>
        <kombinasi class="mt-2 pt-75" />
      </b-tab>
      <b-tab>
        <template #title>
          <span class="d-none d-sm-inline"> Dasar</span>
        </template>
        <dasar class="mt-2 pt-75" />
      </b-tab>
      <b-tab>
        <template #title class="mt-4">
          <span class="d-none d-sm-inline"> Shio</span>
        </template>
        <shio class="mt-2 pt-75" />
      </b-tab>
    </b-tabs>
  </div>
</template>

<script>
import BCardCode from '@core/components/b-card-code/BCardCode.vue'
import { BTable, BLink, BTab, BTabs, BCard, BAlert } from 'bootstrap-vue'
import FilterBets from './FilterBets.vue'
import TwoD from './TwoD.vue'
import TwoDFront from './TwoDFront.vue'
import TwoDMiddle from './TwoDMiddle.vue'
import ThreeD from './ThreeD.vue'
import FourD from './FourD.vue'
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
    // 2D
    TwoD,
    // 2D Front
    TwoDFront,
    // 2D Middle
    TwoDMiddle,
    // 3D
    ThreeD,
    // 4D
    FourD,
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
    // Lain Kombinasi
    Kombinasi,
    // Lain Dasar
    Dasar,
    // Lain Shio
    Shio,
    // filter Bets
    FilterBets,
  },
  data() {
    return {
      tabIndex: 0,
      tabReference: [
        'two_d',
        'two_d_front',
        'two_d_middle',
        'three_d',
        'four_d',
        'colok_bebas',
        'colok_macau',
        'colok_naga',
        'colok_jitu',
        'fifty_umum',
        'fifty_special',
        'fifty_kombinasi',
        'lain_kombinasi',
        'lain_dasar',
        'lain_shio',
      ],
    }
  },
}
</script>
