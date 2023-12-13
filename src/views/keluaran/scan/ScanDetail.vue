<template>
  <div>
    <div>
      <b-alert variant="dark" show>
        <h3 class="alert-heading text-center py-2">
          {{ getDetailScan.resultNumber }}
        </h3>
      </b-alert>

      <!-- TABLE ONE -->
      <b-card no-body>
        <div class="m-2 mt-1">
          <b-row>
            <b-col
              cols="12"
              md="9"
              class="d-flex align-items-center justify-content-start"
            >
              <h2>Scan Detail</h2>
            </b-col>
          </b-row>
        </div>

        <!-- TABLE ONE -->
        <b-row>
          <b-col
            cols="12"
            md="12"
            class="d-flex align-items-center justify-content-start"
          >
            <b-table
              :fields="btFields"
              :items="getDetailScan.totalResult"
              responsive
            >
              <template #cell(Deskripsi)="{ item }">{{
                item.description
              }}</template>
              <template #cell(total)="{ item }">{{ item.total }}</template>
            </b-table>
          </b-col>
        </b-row>
      </b-card>

      <!-- TABLE TWO -->
      <b-card no-body class="mb-0">
        <div class="m-2">
          <b-row>
            <b-col
              cols="12"
              md="9"
              class="d-flex align-items-center justify-content-start"
            >
              <h2>Get Pasaran</h2>
            </b-col>
          </b-row>
        </div>

        <!-- TABLE THIS  -->
        <b-table :fields="fields" :items="getDetailScan.details">
          <!-- No -->
          <template #cell(No)="{ index }"> {{ index + 1 }} </template>

          <!-- PASARAN -->
          <template #cell(Pasaran)="{ item }"> {{ item.Pasaran }} </template>

          <!-- USERNAME -->
          <template #cell(Username)="{ item }"> {{ item.Username }} </template>

          <!-- GAME -->
          <template #cell(Game)="{ item }"> {{ item.Game }} </template>

          <!-- NOMOR -->
          <template #cell(Nomor)="{ item }"> {{ item.Nomor }} </template>

          <!-- BET -->
          <template #cell(Bet)="{ item }"> {{ item.Bet }} </template>

          <!-- BAYAR -->
          <template #cell(Bayar)-="{ item }"> {{ item.Bayar }} </template>

          <!-- PRICE -->
          <template #cell(price)="{ item }"> {{ item.Prize }} </template>
        </b-table>
        <div>
          <b-button
            variant="primary"
            type="submit"
            class="my-2 mx-2"
            @click="$router.push({ name: 'keluaran-scan' })"
          >
            Back
          </b-button>
        </div>
      </b-card>
    </div>
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
  BBadge,
  BDropdown,
  BDropdownItem,
  BPagination,
  BAlert,
  BFormCheckbox,
} from 'bootstrap-vue'
import vSelect from 'vue-select'
import { ref } from '@vue/composition-api'
import flatPickr from 'vue-flatpickr-component'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import 'animate.css'
import { mapActions, mapGetters } from 'vuex'

export default {
  components: {
    ToastificationContent,
    flatPickr,
    BFormCheckbox,
    BCard,
    BRow,
    BCol,
    BFormInput,
    BButton,
    BTable,
    BAlert,
    BMedia,
    BAvatar,
    BLink,
    BBadge,
    BDropdown,
    BDropdownItem,
    BPagination,
    vSelect,
  },

  data() {
    return {
      show: false,
      currentPage: 1,
      fields: [
        {
          key: 'No',
          label: 'no',
        },
        {
          key: 'Pasaran',
          label: 'pasaran',
        },
        {
          key: 'Username',
        },
        {
          key: 'Game',
        },
        {
          key: 'Nomor',
        },
        {
          key: 'Bet',
        },
        {
          key: 'Bayar',
        },
        {
          key: 'price',
          label: 'price',
        },
      ],
      btFields: [
        {
          key: 'Deskripsi',
          label: 'Deskripsi',
        },
        {
          key: 'total',
          label: 'total',
        },
      ],
    }
  },

  computed: {
    ...mapGetters('kelauran', ['getDetailScan']),
  },

  created() {
    const id = this.$route.params.id
    const payload = {
      id,
    }
    this.detailKeluaranList(payload)
  },

  methods: {
    ...mapActions('kelauran', ['detailKeluaranList']),
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
<style lang="scss">
@import '@core/scss/vue/libs/vue-flatpicker.scss';
</style>
