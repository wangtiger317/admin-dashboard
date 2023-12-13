<template>
  <p class="clearfix mb-0">
    <span class="float-md-left d-block d-md-inline-block mt-25">
      COPYRIGHT © 2022 - {{ new Date().getFullYear() }}
      <b-link to="/dashboard/status" class="ml-25"> {{ appName }}</b-link>
      <span class="d-none d-sm-inline-block">. All rights Reserved.</span>
    </span>
  </p>
</template>

<script>
import { BLink } from 'bootstrap-vue'

export default {
  components: {
    BLink,
  },
  computed: {
    appName() {
      return process.env.VUE_APP_NAME
    },
  },
}
</script>
