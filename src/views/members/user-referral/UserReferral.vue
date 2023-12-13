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
            <h2>Member Referral</h2>
          </b-col>
        </b-row>
      </div>

      <!-- table -->
      <div v-if="isReferral">
        <b-table
          :fields="fields"
          :items="getUserReferral.data.data"
          responsive
          show-empty
          empty-text="No Data"
          class="position-relative"
        >
          <!-- NO -->
          <template #cell(No)="{ index }">
            {{ parseInt(parseInt(index) + 1) }}
          </template>

          <!-- USER INDUK -->
          <template #cell(userInduk)="{ item }">
            {{ item.username }}
          </template>

          <!-- LAST ACTIVITY -->
          <template #cell(lastActivity)="{ item }">
            {{ item.last_activity }}
          </template>

          <!-- BONUS REFERRAL (TOTAL USER)  -->
          <template #cell(bonusRefferal)="{ item }"
            >{{ item.bonusReferral }} ({{ item.countReferral }})
          </template>

          <!-- DETAILS -->
          <template #cell(Details)="{ item }">
            <div class="text-nowrap">
              <!-- save this -->
              <feather-icon
                :id="`invoice-row-${item.id}-SearchIcon-icon`"
                icon="SearchIcon"
                size="16"
                class="cursor-pointer mx-1"
                @click="
                  $router.push({
                    name: 'members-user-referral-detail',
                    params: { id: item.id, username: item.username },
                  })
                "
              />
              <b-tooltip
                title="Save"
                :target="`invoice-row-${item.id}-SearchIcon-icon`"
              />
            </div>
          </template>
        </b-table>
        <hr />

        <b-row>
          <b-col cols="5" md="5" class="mb-md-0"></b-col>
          <b-col cols="1" md="1" class="mb-md-0 ml-3">
            <b>Total:</b>
          </b-col>
          <b-col cols="2" md="4" class="mb-md-0"
            >{{ getUserReferral.totalBonus }} ({{ getUserReferral.countBonus }})
          </b-col>
        </b-row>

        <div class="mx-2 mb-2 mt-2">
          <b-row>
            <b-col
              cols="12"
              sm="6"
              class="d-flex align-items-center justify-content-center justify-content-sm-start"
            >
              <!-- <span class="text-muted"
                >Showing 1 to {{ allTotal }} entries</span
              > -->
            </b-col>
            <b-col
              v-if="getUserReferral"
              cols="12"
              sm="6"
              class="d-flex align-items-center justify-content-center justify-content-sm-end"
            >
              <b-pagination
                v-if="allTotal > perPage"
                v-model="currentPage"
                :total-rows="allTotal"
                :per-page="perPage"
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
import { mapActions, mapGetters } from 'vuex'
import { ref } from '@vue/composition-api'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import ReferralDetails from './ReferralDetails.vue'
import 'animate.css'
export default {
  components: {
    ToastificationContent,
    ReferralDetails,
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

  data() {
    return {
      isReferral: true,
      currentPage: 1,
      fields: [
        {
          key: 'No',
        },
        {
          key: 'userInduk',
        },
        {
          key: 'lastActivity',
        },
        {
          key: 'bonusRefferal',
          label: 'Bonus Referral (Total User)',
        },
        {
          key: 'Details',
        },
      ],
    }
  },

  computed: {
    ...mapGetters('members', ['getUserReferral']),

    allTotal() {
      const total = this.getUserReferral.data
      const arr = []
      let max = 0
      if (total) {
        arr.push(total.total)
        max = Math.max(...arr)
      }
      return max
    },

    perPage() {
      const perpage = this.getUserReferral.data
      let perPage = 0
      if (perpage) {
        perPage = perpage.per_page
      }
      return perPage
    },
  },

  created() {
    const payload = {
      page: 1,
    }
    this.userReferrallist(payload)
  },

  methods: {
    ...mapActions('members', ['userReferrallist']),
    async changePage(number) {
      const payload = {
        page: number,
      }
      await this.userReferrallist(payload)
    },
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
