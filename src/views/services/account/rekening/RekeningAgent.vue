<template>
  <div>
    <!-- // BankAccount -->
    <div><bank-account /></div>

    <!-- // MigrasiRekening -->

    <div class="mt-2 pt-75">
      <migrasi-rekening />
    </div>

    <!-- // RekeningPulsa -->
    <div class="mt-2 pt-75">
      <rekening-pulsa />
    </div>

    <!-- // ListBank -->
    <div class="mt-2 pt-75">
      <list-bank />
    </div>
  </div>
</template>

<script>
import BankAccount from './bank-account/BankAccount.vue'
import MigrasiRekening from './migrasi-rekening/MigrasiRekening.vue'
import RekeningPulsa from './rekening-pulsa/RekeningPulsa.vue'
import ListBank from './list-bank-name/ListBank.vue'

export default {
  components: {
    // BankAccount
    BankAccount,
    // MigrasiRekening
    MigrasiRekening,
    // RekeningPulsa
    RekeningPulsa,
    // ListBank
    ListBank,
  },
  data() {
    return {}
  },
}
</script>
