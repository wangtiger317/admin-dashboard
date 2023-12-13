<template>
  <div class="row">
    <div v-if="getBroadcastTop.announcement !== null && getBroadcastTop.bonus !== 0" class="col-md-12 d-flex">
      <div class="col-md-6">
        <div class="bg-primary mb-0 rounded-sm text-white">
          <div class="col">          
            <marquee>
              {{ getBroadcastTop.announcement }}
            </marquee>
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="bg-danger rounded-sm text-white">
          <div class="col">
            <marquee>
              Bonus belum dikirim melebihi batas tanggal hari ini. Silahkan kirim
              bonus kepada member
            </marquee>
          </div>
        </div>
      </div>    
    </div>
    <div v-if="getBroadcastTop.announcement !== null && getBroadcastTop.bonus === 0" class="col-md-12">
      <div class="bg-primary mb-0 rounded-sm text-white">
        <div class="col">          
          <marquee>
            {{ getBroadcastTop.announcement }}
          </marquee>
        </div>
      </div>
    </div>    
    <div v-if="getBroadcastTop.announcement === null && getBroadcastTop.bonus !== 0" class="col-md-12">
      <div class="bg-danger rounded-sm text-white">
        <div class="col">
          <marquee>
            Bonus belum dikirim melebihi batas tanggal hari ini. Silahkan kirim
            bonus kepada member
          </marquee>
        </div>
      </div>
    </div>    
  </div>
</template>

<script>

import { mapActions, mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters('broadcast', ['getBroadcastTop'])
  },

  created(){
    this.broadcashTop()
  },

  methods: {
    ...mapActions('broadcast', ['broadcashTop'])
  }
}
</script>

<style lang="scss" scoped></style>
