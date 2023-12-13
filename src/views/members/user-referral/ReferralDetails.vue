<template>
  <div>
    <!-- Table Container Card -->
    <b-card no-body class="mb-0"
      ><div class="m-2">
        <b-row>
          <b-col
            cols="12"
            md="9"
            class="d-flex align-items-center justify-content-start"
          >
            <h2>Member Referral</h2>
          </b-col>
        </b-row>
      </div>
      <div class="mx-2">
        <b-row>
          <b-col
            cols="12"
            md="9"
            class="d-flex align-items-center justify-content-start"
          >
            <h5>User : {{ this.$route.params.username }}</h5>
          </b-col>
        </b-row>
      </div>
      <b-table
        :fields="fields"
        :items="getUserReferralDetail.data.data"
        responsive=""
      >
        <template #cell(No)="{ index }">
          {{ parseInt(parseInt(index) + 1) }}
        </template>
        <template #cell(UserReferral)="{ item }">
          {{ item.memberReferral }}
        </template>
        <template #cell(lastActivity)="{ item }">
          {{ item.last_activity }}
        </template>
        <template #cell(bonusRefferal)="{ item }">
          {{ item.bonusReferral }}
        </template>
      </b-table>
      <hr />

      <b-row>
        <b-col cols="5" md="6" class="mb-md-0 ml-5"></b-col>
        <b-col cols="1" md="1" class="mb-md-0 text-right">
          <b>Total:</b>
        </b-col>
        <b-col cols="2" md="4" class="mb-md-0">
          {{ getUserReferralDetail.totalBonus }}
        </b-col>
      </b-row>

      <div class="m-2">
        <b-button
          v-ripple.400="'rgba(113, 102, 240, 0.15)'"
          variant="primary"
          @click="
            $router.push({
              name: 'members-user-referral',
            })
          "
        >
          <span class="align-middle">Back</span>
        </b-button>
      </div>
    </b-card>
  </div>
</template>

<script>
import {
  BCard,
  BRow,
  BCol,
  BFormInput,
  BButton,
  BTable,
  BMedia,
  BAvatar,
  BLink,
  BTooltip,
  BBadge,
  BDropdown,
  BDropdownItem,
  BPagination,
  BFormCheckbox,
} from 'bootstrap-vue'
import vSelect from 'vue-select'
import { ref } from '@vue/composition-api'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import 'animate.css'
import { mapActions, mapGetters } from 'vuex'
export default {
  components: {
    ToastificationContent,
    BCard,
    BRow,
    BCol,
    BFormInput,
    BButton,
    BTable,
    BMedia,
    BAvatar,
    BTooltip,
    BLink,
    BBadge,
    BDropdown,
    BDropdownItem,
    BPagination,
    vSelect,
  },

  computed: {
    ...mapGetters('members', ['getUserReferralDetail']),
  },

  created() {
    const id = this.$route.params.id
    const payload = {
      id,
      page: 1,
    }
    this.userReferralDetaillist(payload)
  },

  methods: {
    ...mapActions('members', ['userReferralDetaillist']),
    ChangeData() {
      this.$emit('ChangeData')
    },
  },

  data() {
    return {
      currentPage: 1,
      fields: [
        {
          key: 'No',
        },
        {
          key: 'UserReferral',
        },
        {
          key: 'lastActivity',
        },
        {
          key: 'bonusRefferal',
          label: 'Bonus Referral (Total User)',
        },
      ],
    }
  },

  setup() {
    const isAddNewUserSidebarActive = ref(false)
    return {
      isAddNewUserSidebarActive,
    }
  },
}
</script>

<style lang="scss" scoped>
.btns {
  display: flex;
  justify-content: end;
}
.per-page-selector {
  width: 90px;
}
</style>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
@import '@core/scss/vue/libs/vue-sweetalert.scss';
</style>
