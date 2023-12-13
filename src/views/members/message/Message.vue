<template>
  <div>
    <b-card no-body>
      <b-card-body>
        <b-row>
          <b-col cols="11" md="11" class="mb-md-0 mb-2 d-flex">
            <b-form-select v-model="changeMod" id="sortOptions">
              <option value="">All</option>
              <option value="unread">Belum Dibaca</option>
            </b-form-select>

            <b-form-input
              v-model="searchMemo"
              id="basicInput"
              class="ml-2"
              placeholder="Search Username"
            />
            <b-button
              v-ripple.400="'rgba(255, 255, 255, 0.15)'"
              class="ml-1"
              variant="primary"
              @click="searchWord(searchMemo, changeMod)"
            >
              Search
            </b-button>
          </b-col>
        </b-row>
      </b-card-body>
    </b-card>

    <!-- Table Container Card -->
    <b-card no-body class="mb-0">
      <div class="m-2">
        <b-row>
          <b-col
            cols="12"
            md="3"
            class="d-flex align-items-center justify-content-start"
          >
            <h2>Message List</h2>
          </b-col>
          <b-col cols="12" md="9" class="text-right">
            <b-button
              class="ml-1"
              variant="primary"
              @click="flipInSendAll('success', 'top-center', getMemoList)"
            >
              <feather-icon icon="SendIcon" class="mr-50" />
              <span
                class="align-middle"
                @click="
                  $router.push({
                    name: 'members-message-create',
                  })
                "
                >Create Message</span
              >
            </b-button>
          </b-col>
        </b-row>
      </div>

      <!-- TABLE -->
      <b-table
        :fields="fields"
        :items="getMemoList.data"
        responsive
        show-empty
        empty-text="No Data"
        class="position-relative"
      >
        <!-- NO -->
        <template #cell(no)="{ index }">
          {{ index + 1 }}
        </template>

        <!-- TANGGAL -->
        <template #cell(Tanggal)="{ item }">
          {{ formateDate(item.created_at) }}
        </template>

        <!-- USERNAME -->
        <template #cell(Username)="{ item }">
          {{ item.member.username }}
        </template>

        <!-- SUBJECT -->
        <template #cell(Subject)="{ item }"> {{ item.subject }} </template>

        <!-- ACTION -->
        <template #cell(action)="{ item }">
          <div class="text-nowrap">
            <!-- save this -->
            <feather-icon
              :id="`invoice-row-${item.id}-SearchIcon-icon`"
              icon="SearchIcon"
              size="16"
              class="cursor-pointer mx-1"
              @click="
                $router.push({
                  name: 'members-message-detail',
                  params: { id: item.id },
                })
              "
            />

            <b-tooltip
              title="Detail"
              :target="`invoice-row-${item.id}-SearchIcon-icon`"
            />
          </div>
        </template>
      </b-table>

      <!-- THIS PAGINATION -->
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
          </b-col>
          <b-col
            cols="12"
            v-if="getMemoList"
            sm="6"
            class="
              d-flex
              align-items-center
              justify-content-center justify-content-sm-end
            "
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
    </b-card>
  </div>
</template>

<script>
import {
  BCard,
  BRow,
  BCol,
  BFormInput,
  BFormGroup,
  BButton,
  BTable,
  BMedia,
  BAvatar,
  BLink,
  BBadge,
  BDropdown,
  BDropdownItem,
  BPagination,
  BFormCheckbox,
  BCardHeader,
  BTooltip,
  BCardBody,
  BFormSelect,
} from 'bootstrap-vue'
import vSelect from 'vue-select'
import { ref } from '@vue/composition-api'
import 'animate.css'
import { mapActions, mapGetters } from 'vuex'
import days from 'dayjs'

export default {
  components: {
    BFormSelect,
    BCardHeader,
    BCardBody,
    BFormCheckbox,
    BFormGroup,
    BCard,
    BRow,
    BCol,
    BFormInput,
    BButton,
    BTable,
    BMedia,
    BAvatar,
    BLink,
    BBadge,
    BDropdown,
    BDropdownItem,
    BPagination,
    BTooltip,
    vSelect,
  },

  computed: {
    ...mapGetters('members', ['getMemoList']),

    allTotal() {
      const total = this.getMemoList
      const arr = []
      let max = 0
      if (total) {
        arr.push(total.total)
        max = Math.max(...arr)
      }
      return max
    },

    perPage() {
      const perpage = this.getMemoList
      let perPage = 0
      if (perpage) {
        perPage = perpage.per_page
      }
      return perPage
    },
  },

  created() {
    const payload = {
      changeMod: 'unread',
      searchMemo: '',
      page: 1,
    }
    setInterval(() => {
      this.fetchMemolist(payload)
    }, 2000)
  },

  methods: {
    // flipInCancel
    ...mapActions('members', ['fetchMemolist']),

    async changePage(number) {
      const payload = {
        changeMod: this.changeMod,
        searchMemo: this.searchMemo,
        page: number,
      }
      await this.fetchMemolist(payload)
    },

    formateDate(date) {
      return days(date).format('DD MMM YYYY HH:mm')
    },

    formatPrice(value) {
      let val = (value / 1).toFixed('.', ',')
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    },

    async searchWord(searchMemo, changeMod) {
      const payload = {
        changeMod,
        searchMemo,
        page: 1,
      }
      await this.fetchMemolist(payload)
      this.currentPage = 1
    },
  },

  data() {
    return {
      notify: null,
      changeMod: 'unread',
      searchMemo: '',
      currentPage: 1,
      fields: [
        {
          key: 'no',
          label: 'no',
        },
        {
          key: 'Tanggal',
          label: 'Tanggal ',
        },
        {
          key: 'Username',
          label: 'Username',
        },
        {
          key: 'Subject',
        },
        {
          key: 'action',
          label: 'action',
        },
      ],
      items: [
        {
          Bonus: '103.115.175.247',
          jumlah: 42,
          no: 1,
          Tanggal: '--',
          Username: 'SG-14',
          action: 'tes action',
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
// .btn {
//   background-color: transparent;
// }
.per-page-selector {
  width: 90px;
}
.total__content {
  display: flex;
  justify-content: end;
  padding-right: 100px;
}
.total {
  padding: 8px 0px;
  border-bottom: 1px solid #404656;
}
</style>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
@import '@core/scss/vue/libs/vue-sweetalert.scss';
</style>
<style scoped>
.checkboxs {
  display: flex;
  align-items: center;
}
</style>
