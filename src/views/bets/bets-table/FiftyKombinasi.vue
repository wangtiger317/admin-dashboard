<template>
  <div>
    <b-card-code no-body>
      <h3 class="mt-2 ml-2 mb-2">Fifty Kombinasi</h3>
      <b-table-simple hover caption-top responsive class="rounded-bottom mb-0">
        <b-tbody>
          <b-tr v-for="data in dataList.data" :key="data">
            <b-th>{{ data.number }}</b-th>
            <b-td v-b-tooltip.hover :title="data.username_bet_amount_1">{{
              data.total
            }}</b-td>
          </b-tr>
        </b-tbody>
        <b-tfoot>
          <b-tr>
            <b-td colspan="12" class="text-right">
              Total Nomor: <b>{{ dataList.nomorCount }}</b> Total User Bet:
              <b>{{ dataList.total_user_bet }}</b> Total Bet:
              <b>{{ dataList.total_bet }}</b>
            </b-td>
          </b-tr>
        </b-tfoot>
      </b-table-simple>
    </b-card-code>
  </div>
</template>

<script>
import BCardCode from '@core/components/b-card-code/BCardCode.vue'
import {
  BTableSimple,
  BThead,
  BTr,
  BTh,
  BTd,
  BTbody,
  BTfoot,
} from 'bootstrap-vue'

export default {
  components: {
    BCardCode,
    BTableSimple,
    BThead,
    BTr,
    BTh,
    BTd,
    BTbody,
    BTfoot,
  },
  data() {
    return {}
  },
  computed: {
    dataList() {
      return this.$store.getters['bets/getGameList']
    },
  },
}
</script>
