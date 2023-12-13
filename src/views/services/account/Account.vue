<template>
  <div>
    <b-tabs pills>
      <!-- Tab: GAMES -->
      <b-tab active>
        <template #title>
          <span class="d-none d-sm-inline">Rekening Agent</span>
        </template>
        <rekening-agent class="mt-2 pt-75" />
      </b-tab>
      <b-tab>
        <template #title>
          <span class="d-none d-sm-inline">Manage User Rekening</span>
        </template>
        <manage class="mt-2 pt-75" />
      </b-tab>
    </b-tabs>
  </div>
</template>

<script>
import { BTab, BTabs } from 'bootstrap-vue'
import Manage from './manage/Manage.vue'
import RekeningAgent from './rekening/RekeningAgent.vue'

export default {
  components: {
    BTab,
    BTabs,

    // Manage
    Manage,

    // Rekening agent
    RekeningAgent,
  },
  data() {
    return {}
  },
}
</script>
