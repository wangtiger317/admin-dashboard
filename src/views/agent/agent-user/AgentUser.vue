<template>
  <div>
    <b-col cols="12">
      <agent-active />
    </b-col>
    <b-col cols="12">
      <agent-deactive />
    </b-col>
  </div>
</template>

<script>
import { BRow, BCol } from 'bootstrap-vue'
import AgentActive from './AgentActive.vue'
import AgentDeactive from './AgentDeactive.vue'

export default {
  components: {
    AgentActive,
    AgentDeactive,
    BRow,
    BCol,
  },
}
</script>
