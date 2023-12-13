<template>
  <div>
    <b-table :fields="fields"></b-table>
    <b-row class="match-height mt-1">
      <b-col lg="2">
        <div>{{ getMyacount.name }}</div>
      </b-col>
      <b-col lg="2">
        <div>{{ getMyacount.timezone }}</div>
      </b-col>
      <b-col class="content">
        <div>{{ getMyacount.Created }} ({{ getMyacount.created_ago }})</div>
      </b-col>
      <b-col class="contents">
        <div>{{ getMyacount.Updated }} ({{ getMyacount.updated_ago }})</div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import {
  BCard,
  BTable,
  BRow,
  BCol,
  BCardTitle,
  BCardText,
  BCardHeader,
  BCardBody,
  BMedia,
  BMediaAside,
  BAvatar,
  BMediaBody,
} from 'bootstrap-vue'
import { mapActions, mapGetters } from 'vuex'

export default {
  components: {
    BCard,
    BTable,
    BCardTitle,
    BCardText,
    BRow,
    BCol,
    BCardHeader,
    BCardBody,
    BMedia,
    BMediaAside,
    BAvatar,
    BMediaBody,
  },
  data() {
    return {
      fields: [
        {
          key: 'names',
          label: 'Name',
        },
        {
          key: 'timezone',
          label: 'Timezone',
        },
        {
          key: 'account',
          label: 'Account Created',
        },
        {
          key: 'updates',
          label: 'Last Updated',
        },
      ],
    }
  },
  computed: {
    ...mapGetters('account', ['getMyacount']),
  },

  created() {
    this.accountlist()
  },

  methods: {
    ...mapActions('account', ['accountlist']),
  },
}
</script>

<style lang="scss" scoped>
.content {
  margin-left: 120px;
}
.contents {
  margin-left: 90px;
}
</style>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
@import '@core/scss/vue/libs/vue-sweetalert.scss';
@import '@core/scss/vue/libs/vue-flatpicker.scss';
</style>
