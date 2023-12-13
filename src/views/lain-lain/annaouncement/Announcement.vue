<template>
  <div>
    <div>
      <admin />
    </div>
    <div class="mt-2">
      <member />
    </div>
  </div>
</template>

<script>
import BCardCode from '@core/components/b-card-code/BCardCode.vue'
import { BTable, BLink } from 'bootstrap-vue'

import Member from './member/Member.vue'
import Admin from './admin/Admin.vue'

export default {
  components: {
    BCardCode,
    BTable,
    BLink,

    Member,
    Admin,
  },
}
</script>
