<template>
  <div>
    <!-- Table Container Card -->
    <b-card no-body class="mb-0">
      <div class="m-2">
        <b-row>
          <b-col
            cols="12"
            md="9"
            class="d-flex align-items-center justify-content-start"
          >
            <h2>Referral</h2>
          </b-col>
        </b-row>
      </div>
      <!-- TABEL THIS -->
      <b-table
        :fields="fields"
        :items="getMemberReferral.data"
        responsive
        show-empty
        empty-text="No Data"
        class="position-relative"
      >
        <!-- NO -->
        <template #cell(No)="{ index }">{{ index + 1 }}</template>

        <!-- USER REFERRAL -->
        <template #cell(userReferral)="{ item }">{{ item.username }}</template>

        <!-- LAST ACTIVITY -->
        <template #cell(lastActivity)="{ item }">
          {{ formatDate(item.last_activity) }}
        </template>

        <!-- BONUS REFERRAL (TOTAL) -->
        <template #cell(bonusReferral)="{ item }">
          {{ formatPrice(item.bonusReferral) }}
        </template>
      </b-table>

      <!-- BACK  -->
      <b-row>
        <b-col cols="10" md="10" class="text-left ml-2 py-2">
          <b-button
            v-ripple.400="'rgba(255, 255, 255, 0.15)'"
            variant="primary"
            @click="$router.push({ name: 'members-all-members' })"
          >
            Back
          </b-button>
        </b-col>
      </b-row>

      <!-- PAGINATION -->
      <div class="mx-2 mb-2 mt-2">
        <b-row>
          <b-col
            cols="12"
            sm="6"
            class="
              d-flex
              align-items-center
              justify-content-center justify-content-sm-start
            "
          >
            <!-- <span class="text-muted">Showing 1 to {{}} entries</span> -->
          </b-col>
          <b-col
            v-if="getMemberReferral"
            cols="12"
            sm="6"
            class="
              d-flex
              align-items-center
              justify-content-center justify-content-sm-end
            "
          >
            <b-pagination
              v-if="allTotal > perPages"
              v-model="currentPage"
              :total-rows="allTotal"
              :per-page="perPages"
              first-number
              last-number
              class="mb-0 mt-1 mt-sm-0"
              prev-class="prev-item"
              next-class="next-item"
              @change="changePage"
            >
              <template #prev-text>
                <feather-icon icon="ChevronLeftIcon" size="18" />
              </template>
              <template #next-text>
                <feather-icon icon="ChevronRightIcon" size="18" />
              </template>
            </b-pagination>
          </b-col>
        </b-row>
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
} from 'bootstrap-vue'
import vSelect from 'vue-select'
import { ref } from '@vue/composition-api'
import days from 'dayjs'
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
    ...mapGetters('members', ['getMemberReferral']),
    allTotal() {
      const total = this.getMemberReferral.data
      const arr = []
      let max = 0
      if (total) {
        arr.push(total.total)
        max = Math.max(...arr)
      }
      return max
    },

    perPages() {
      const perpage = this.getMemberReferral.data
      let perPage = 0
      if (perpage) {
        perPage = perpage.per_page
      }
      return perPage
    },
  },

  created() {
    let idParams = this.$route.params.id
    const payload = {
      id: idParams,
      page: 1,
    }
    this.refferalList(payload)
  },

  methods: {
    ...mapActions('members', ['refferalList']),

    formatDate(date) {
      return days(date).format('DD MMM YYYY HH:mm')
    },
    formatPrice(value) {
      let val = (value / 1).toFixed('.', ',')
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    },

    async changePage(number) {
      const payload = {
        page: number,
        id: '',
      }
      await this.refferalList(payload)
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
          key: 'userReferral',
        },
        {
          key: 'lastActivity',
        },
        {
          key: 'bonusReferral',
          label: 'Bonus Referral (Total)',
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
