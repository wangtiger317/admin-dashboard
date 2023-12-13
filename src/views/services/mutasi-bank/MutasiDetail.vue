<template>
  <div>
    <b-card no-body>
      <b-card-body class="p-2">
        <b-row class="mb-2">
          <b-col
            cols="6"
            md="6"
            class="d-flex align-items-center justify-content-start"
          >
            <h3>
              {{ getDetailMutasi.tujuanRekName }} -
              {{ getDetailMutasi.tujuanNoRek }} -
              {{ getDetailMutasi.tujuanNamaRek }}
            </h3>
          </b-col>

          <b-col
            cols="6"
            md="6"
            class="d-flex align-items-center justify-content-end"
          >
            <b-button
              variant="primary"
              type="submit"
              @click.prevent="validationForm"
            >
              <feather-icon icon="ArrowDownIcon" class="mr-50" />
              <!-- <span class="align-middle">Download CSV</span> -->
            </b-button>
          </b-col>
        </b-row>

        <b-card no-body>
          <!-- TABLE THIS -->
          <b-table :fields="fields" :items="getDetailMutasi.data.data">
            <!-- NO  -->
            <template #cell(nomor)="{ index }">{{ index + 1 }}</template>

            <!-- CREATED AT -->
            <template #cell(tanggal)="{ item }">{{
              formateDate(item.created_at)
            }}</template>

            <!-- USERNMAE -->
            <template #cell(username)="{ item }">{{
              item.memberUsername
            }}</template>

            <!-- DESKRIPTION -->
            <template #cell(deskripsi)="{ item }">{{
              item.deskripsi || '-'
            }}</template>

            <!-- MASUK -->
            <template #cell(masuk)="{ item }">{{
              formatPrice(item.masuk) || 0
            }}</template>

            <!-- KELUAR -->
            <template #cell(keluar)="{ item }">{{
              formatPrice(item.keluar) || 0
            }}</template>

            <!-- BALANANCE -->
            <template #cell(balance)="{ item }">{{
              formatPrice(item.balance)
            }}</template>

            <!-- APPROVED -->
            <template #cell(approved)="{ item }">{{ item.adminName }}</template>
          </b-table>
          <hr />

          <!-- TOTAL THIS -->
          <div class="">
            <!-- TOTAL KELUAR -->
            <b-row class="">
              <b-col cols="3" md="8" class="mb-md-0"></b-col>
              <b-col cols="1" md="1" class="mb-md-0"
                ><b>Total Keluar : </b></b-col
              >
              <b-col cols="2" md="2" class="mb-md-0">{{
                formatPrice(getDetailMutasi.totalKeluar)
              }}</b-col>
            </b-row>
            <hr />

            <!-- SALDO AWAL -->
            <b-row class="">
              <b-col cols="5" md="8" class="mb-md-0"></b-col>
              <b-col cols="1" md="1" class="mb-md-0"><b>Saldo Awal :</b></b-col>
              <b-col cols="2" md="2" class="mb-md-0">{{
                formatPrice(getDetailMutasi.totalSaldoAwal)
              }}</b-col>
            </b-row>
            <hr />

            <!-- SALDO AKHIR -->
            <b-row class="">
              <b-col cols="5" md="8" class="mb-md-0"></b-col>
              <b-col cols="1" md="1" class="mb-md-0"
                ><b>Saldo Akhir :</b></b-col
              >
              <b-col cols="2" md="2" class="mb-md-0">{{
                formatPrice(getDetailMutasi.totalSaldoAkhir)
              }}</b-col>
            </b-row>
          </div>
        </b-card>
        <div>
          <b-button
            variant="primary"
            type="submit"
            class="mb-1"
            @click="$router.push({ name: 'services-mutasi-bank' })"
          >
            Back
          </b-button>
        </div>
      </b-card-body>
    </b-card>
  </div>
</template>

<script>
import {
  BTable,
  BCard,
  BLink,
  BRow,
  BCol,
  BButton,
  BTableSimple,
} from 'bootstrap-vue'
import { mapGetters, mapActions } from 'vuex'
import days from 'dayjs'

export default {
  components: {
    BCard,
    BRow,
    BCol,
    BTable,
    BLink,
    BButton,
    BTableSimple,
  },

  computed: {
    ...mapGetters('services', ['getDetailMutasi']),
  },

  created() {
    const rekId = this.$route.params.id
    const payload = {
      rekId,
      page: 1,
    }
    this.detailMutasiList(payload)
  },

  methods: {
    ...mapActions('services', ['detailMutasiList']),
    ChangeData() {
      this.$emit('ChangeData')
    },

    formateDate(date) {
      return days(date).format('DD MMM YYYY HH:mm')
    },

    formatPrice(value) {
      let val = (value / 1).toFixed('.', ',')
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    },
  },

  data() {
    return {
      fields: [
        {
          key: 'nomor',
          label: 'no',
        },
        {
          key: 'tanggal',
        },
        {
          key: 'username',
        },
        {
          key: 'deskripsi',
        },
        {
          key: 'masuk',
        },
        {
          key: 'keluar',
        },

        {
          key: 'balance',
        },
        {
          key: 'approved',
          label: 'approved by',
        },
      ],
      items: [
        {
          nomor: 1,
          tanggal: '06 Jun 2022 05:28:27',
          username: 'uatcikatech',
          deskripsi: 'APPROVED: Withdraw BCA - Uat Cikatech test - 34242343',
          masuk: '0',
          keluar: '2,925,579',
          balance: '-2,915,579',
          approved: 'Super Admin',
        },
      ],
    }
  },
}
</script>

<style lang="scss">
#customers {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

#customers td,
#customers th {
  border: 1px solid #ddd;
  padding: 8px;
}

#customers tr:nth-child(even) {
  background-color: #f2f2f2;
}

#customers tr:hover {
  background-color: #ddd;
}

#customers th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #f3f2f7;
  color: #000;
}
</style>
