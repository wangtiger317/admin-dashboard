<template>
  <div style="height: inherit">
    <div
      :class="`${kind}-item`"
      @click="handleTaskClick"
    >
      <div :class="`${kind}-item__action`">
        {{ kind }}
        <span class="ml-1">
          <feather-icon
            :badge="count"
            :badge-classes="kind === 'deposit' ? 'bg-success' : 'bg-danger'"
            class="text-body"
            icon="false"
            size="21"
          />
        </span>
      </div>
    </div>

    <!-- Task Handler -->
    <c-transaction-sidebar
      v-model="isTaskHandlerSidebarActive"
      :kind="kind"
    />
  </div>
</template>

<script>
import CTransactionSidebar from './CTransactionSidebar.vue'

export default {
  components: {
    // App SFC
    CTransactionSidebar,
  },
  props: {
    kind: {
      type: String,
      required: true,
      validator(value) {
        return ['deposit', 'withdraw'].includes(value)
      },
    },
    count: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      isTaskHandlerSidebarActive: false,
    }
  },
  methods: {
    handleTaskClick() {
      this.isTaskHandlerSidebarActive = true
    },
  },
}
</script>

<style lang="scss" scoped>
.deposit-item, .withdraw-item {
  text-transform: capitalize;
}
</style>
