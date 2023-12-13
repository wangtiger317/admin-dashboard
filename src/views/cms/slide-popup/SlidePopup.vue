<template>
  <div>
    <b-col cols="12">
      <pop-up />
    </b-col>
    <b-col cols="12">
      <banner />
    </b-col>
    <b-col cols="12">
      <slide />
    </b-col>
  </div>
</template>

<script>
import { BRow, BCol } from 'bootstrap-vue'

import PopUp from './pop-up/PopUp.vue'
import Banner from './banner-mobile/Banner.vue'
import Slide from './slide/Slide.vue'

export default {
  components: {
    BRow,
    PopUp,
    Slide,
    Banner,
    BCol,
  },
}
</script>
